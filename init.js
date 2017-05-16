var sha1 = require('sha1');
module.exports.weibo = function(req,res){
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
