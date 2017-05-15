var express = require('express');
var sha1 = require("sha1");
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json())



app.get('/', function (req, res) {
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
    // else if(req.method == 'POST'){  
    //     if (sha != signature) {  
    //         return;  
    //     }  
    //     next();  
    // }  
  // res.send('Hello World')
})
app.post('/',function(req,res){
	// console.log(req.body);
	var obj = {
	    "result": true,
	    "receiver_id":req.body.receiver_id,
	    "sender_id":req.body.sender_id,
	    "tpye": "text",
	    "data":encodeURI(JSON.stringify({
	    	"text":req.body.text
	    }))
	}
	// console.log(obj);
	// 技能树3.png
	res.set('Content-Type','text/plain; charset=utf-8');

	res.json(obj);
})

app.listen(process.env.PORT || 5050)
app.on("error",function(e){
	console.log(e);
})