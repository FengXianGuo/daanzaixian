var express = require('express');
var sha1 = require("sha1");
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json())
// app.use(bodyParser.xml({
//   limit: '1MB',   // Reject payload bigger than 1 MB
//   xmlParseOptions: {
//     normalize: true,     // Trim whitespace inside text nodes
//     normalizeTags: true, // Transform tags to lowercase
//     explicitArray: false // Only put nodes in array if >1
//   }
// }));




app.get('/weibo', function (req, res) {
	console.log(req.query)
	var q = req.query; 
	var signature = q.signature;
	var timestamp = q.timestamp;
	var echostr = q.echostr;
	var nonce = q.nonce;
	var appsecret = '3b1f610929071dbababe53a46a2c4cf0';
	var str = [appsecret, timestamp, nonce].sort().join('');  
    var sha = sha1(str); 
    // console.log(sha); 
    if (req.method == 'GET') {  

        if (sha == signature) {  
            res.send(echostr+'')  
        }else{  
            res.send('err');  
        }  
    }  
})
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

//接入微信初史验签
app.get('/wechat',function(req,res){
	var token="weixin";
    var signature = req.query.signature;
    var nonce = req.query.nonce;
    var timestamp = req.query.timestamp;
    var echostr = req.query.echostr;
    var str = [token, timestamp, nonce].sort().join('');
    var sha = sha1(str);
    console.log("sha="+sha);
	console.log("signture="+signature);
    //将你自己生成的signature和服务器传过来的signature来进行比较，如果成功则验证通过。
    if (sha === signature) {
        res.send(echostr + '');
    }
    else {
        res.send('wrong');
    }
})
app.post('/wechat',function(req,res){
    var _da;
    req.on("data",function(data){
        /*微信服务器传过来的是xml格式的，是buffer类型，因为js本身只有字符串数据类型，所以需要通过toString把xml转换为字符串*/
        _da = data.toString("utf-8");

    });
    req.on("end",function(){
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