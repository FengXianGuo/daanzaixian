var express = require('express');
var sha1 = require("sha1");
var bodyParser = require('body-parser')
var weibo = require('./init').weibo;
var wechat = require('./init').wechat;
var app = express();
app.use(bodyParser.json())

app.get('/weibo', weibo);
app.get('/wechat',wechat);

app.post('/weibo',function(req,res){
    var obj = {
        "result":true,
        "sender_id":req.body.receiver_id,
        "receiver_id":req.body.sender_id,
        "type":"text",
        "data":encodeURI(JSON.stringify({
            "text":req.body.text
        }))
    };

    res.json(obj);
})
app.post('/wechat',function(req,res){
    var _da;
    req.on("data",function(data){
        /*微信服务器传过来的是xml格式的，是buffer类型，因为js本身只有字符串数据类型，所以需要通过toString把xml转换为字符串*/
        _da = data.toString("utf-8");

    });
    req.on("end",function(){
        //console.log("end");
        var ToUserName = getXMLNodeValue('ToUserName',_da);
        var FromUserName = getXMLNodeValue('FromUserName',_da);
        var CreateTime = getXMLNodeValue('CreateTime',_da);
        var MsgType = getXMLNodeValue('MsgType',_da);
        var Content = getXMLNodeValue('Content',_da);
        var MsgId = getXMLNodeValue('MsgId',_da); 
        var xml = '<xml><ToUserName>'+FromUserName+'</ToUserName><FromUserName>'+ToUserName+'</FromUserName><CreateTime>'+CreateTime+'</CreateTime><MsgType>'+MsgType+'</MsgType><Content>'+Content+'</Content></xml>';
        res.send(xml);
    });

	function getXMLNodeValue(node_name,xml){
	    var tmp = xml.split("<"+node_name+">");
	    var _tmp = tmp[1].split("</"+node_name+">");
	    return _tmp[0];
	}
})


app.listen(process.env.PORT || 5050)
app.on("error",function(e){
	console.log(e);
})