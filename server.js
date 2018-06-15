//创建express应用
const express = require('express');
const sha1 = require("sha1");
const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs');
const superagent = require('superagent');



//分离初始化模块
var weibo = require('./init').weibo;
var wechat = require('./init').wechat;

var app = express();

app.use(express.static('static'));
app.use(bodyParser.json())
//注册引擎
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('html',require('ejs').__express);


//处理验签
app.get('/weibo', weibo);
app.get('/wechat',wechat);

//返回主页
app.get('/index',function(req,res){
    res.render('index');
})
//处理接口

app.get('/api/answer',function(req,res){
    console.log('访问api/answer');
    var content = getRandomContent();
    res.send(content);
})
app.use((req,res,next)=>{
    const {
        receiver_id,
        sender_id,
    } = req.body;
    const {subtype} = data;
    const obj = {
        "result":true,
        "sender_id":receiver_id,
        "receiver_id":sender_id,
        "type":"text",
        "data":getText(),
    }
        // console.log('body',req.body);
    if(subtype === 'subscribe'){// '关注事件消息'
        obj.data = getText('感谢您的关注，请您畅所欲言')
        return res.json(obj);
    }
    if(subtype === 'follow'){// '订阅事件消息'
        // obj.data = getText('感谢您的关注，请您畅所欲言')
        return false;
    }
    if(subtype === 'unfollow'||subtype === 'unsubscribe'){// '取消关注事件消息'
        obj.data = getText('很遗憾不能再帮问一次！')
        return res.json(obj);
    }

    superagent.get('https://api.weibo.com/2/eps/user/info.json').query({
        access_token:'2.00jCLboGd55hBD5d2cd028d7ySSLOB',
        uid:sender_id
    }).set('Accept', 'application/json').end((err, response) => {
        if(err){
            obj.data = getText('当前系统不可用，请稍后重试！或疯狂发私信给博主，也可以！')
            return res.json(obj)
        }
        if(response.text){
            let userInfo = {};
            try {
                userInfo = JSON.parse(response.text);
            } catch (error) {
                obj.data = getText('当前系统不可用，请稍后重试！或疯狂发私信给博主，也可以！')
                return res.json(obj)
            }
            
            const {follow} = userInfo;
            if(follow !== 1){
                obj.data = getText('请关注后再提问哦！')
                return res.json(obj)
            }
        }
        next();
    });
})
// app.get('/api/answer',function(req,res){
//     // app.post('/users',function(req,res){
//     //接收请求体保存到文件
//     // var user = req.body;
//     var answer = req.query.message;
//     var answers = require(datapath);
//     // user.id = Number(users[users.length-1].id) + 1;
//     answers.push({
//         answer:answer
//     });
//     //保存文件/写文件   异步的方法writeFile
//     fs.writeFile(datapath,JSON.stringify(answers),function(err){
//         res.send('写入完成');
//     });
// })
// app.get('/api/show',function(req,res){
//     // app.post('/users',function(req,res){
//     //接收请求体保存到文件
//     // var user = req.body;
//     // var answer = req.query.message;
//     var answers = require(datapath);
//     answers.reverse();
//     // user.id = Number(users[users.length-1].id) + 1;
//     // answers.push({
//     //     answer:answer
//     // });
//     // //保存文件/写文件   异步的方法writeFile
//     // fs.writeFile(datapath,JSON.stringify(answers),function(err){
//         res.json(answers);
//     // });
// })

const getRandomContent = (()=>{
    const datapath = "./data/answers2.json";
    const db = require(datapath);
    const length = db.length;
    return ()=>{
        const content = db[parseInt(Math.random()*(length-1))];
        return content.answer;
    }
})()

const getText = (content)=>{
    return encodeURI(JSON.stringify({
        "text":content || getRandomContent()
    }))
}

//微博自动回复
app.post('/weibo',function(req,res){
    const {
        receiver_id,
        sender_id,
        data = {}
    } = req.body;
    const {subtype} = data;
    const obj = {
        "result":true,
        "sender_id":receiver_id,
        "receiver_id":sender_id,
        "type":"text",
        "data":getText(),
    }

    // console.log('obj',obj);
    return res.json(obj);
})
//微信自动回复
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
        console.log(MsgType);
        // var Content = getXMLNodeValue('Content',_da);
        var Content = getRandomContent();

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


app.listen(process.env.PORT || 3389,()=>{
    console.log("server start at 3389")
})
app.on("error",function(e){
	console.log(e);
})

