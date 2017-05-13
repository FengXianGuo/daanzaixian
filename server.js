var express = require('express');
var sha1 = require("sha1");
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json())



app.get('/', function (req, res) {
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
    // else if(req.method == 'POST'){  
    //     if (sha != signature) {  
    //         return;  
    //     }  
    //     next();  
    // }  
  // res.send('Hello World')
})
app.post('/',function(req,res){

	var obj = {
		"result": true,
	    "receiver_id":req.body.receiver_id,
	    "sender_id":req.body.sender_id,
	    "type": "text",
	    "data":"%7B%22text%22%3A%22%E4%B8%AD%E6%96%87%E6%B6%88%E6%81%AF%22%7D",
	}
	// obj.data = encodeURI({
	// 	"text": "纯文本响应"
	// });
	console.log(obj);


	res.send(obj);
	// res.send(req.body);
	// res.redirect("/users")//重定向告诉客户端向另外一个地址发请求；
	//res.redirect("back")//*****从哪来回哪去。
})

app.listen(process.env.PORT || 5050)
app.on("error",function(e){
	console.log(e);
})