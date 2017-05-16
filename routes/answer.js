var Router = require('koa-router');
var sha1 = require('sha1');
let router = new Router()


router.post('/wechat', async(ctx,next)=>{
	// console.log(123);
	var token="weixin";
	var q = ctx.query;
    var signature = q.signature;
    var nonce = q.nonce;
    var timestamp = q.timestamp;
    var echostr = q.echostr;
    var str = [token, timestamp, nonce].sort().join('');
    var sha = sha1(str);
    //将你自己生成的signature和服务器传过来的signature来进行比较，如果成功则验证通过。
    if (sha === signature) {
        ctx.body = echostr + '';
    }
    else {
        ctx.body = 'wrong';
    }
}); // responds to "/users"
router.post('/weibo', async (ctx,next)=>{
	var q = ctx.query; 
	var signature = q.signature;
	var timestamp = q.timestamp;
	var echostr = q.echostr;
	var nonce = q.nonce;
	var appsecret = '3b1f610929071dbababe53a46a2c4cf0';
	var str = [appsecret, timestamp, nonce].sort().join('');  
    var sha = sha1(str); 
    // console.log(sha); 
    if (ctx.method == 'GET') {  
        if (sha == signature) {  
            ctx.body = echostr+'';  
        }else{  
            ctx.body = 'err';  
        }  
    }
}); // responds to "/users/:id"
module.exports = router;