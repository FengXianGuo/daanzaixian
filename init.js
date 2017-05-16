var sha1 = require('sha1');
module.exports.weibo = function(req,res){
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
};
module.exports.wechat = function(req,res){
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
}
