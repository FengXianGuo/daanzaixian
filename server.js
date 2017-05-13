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
	console.log(req.body);
	res.send(req.body.text);
	// res.send(req.body);
	// res.redirect("/users")//重定向告诉客户端向另外一个地址发请求；
	//res.redirect("back")//*****从哪来回哪去。
})

app.listen(process.env.PORT || 5050)