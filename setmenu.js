const superagent = require('superagent');
superagent.post('https://m.api.weibo.com/2/messages/menu/create.json?access_token=2.00jCLboGd55hBD5d2cd028d7ySSLOB').send({
  menu: encodeURI(
    JSON.stringify({
      button: [
        {
          type: 'click',
          name: '今日运势',
          key: 'get_groupon',
        },
        {
          type: 'click',
          name: '星座运势',
          key: 'the_big_brother_need_your_phone',
        },
        {
          name: '日常嫌弃',
          sub_button: [
            {
              type: 'click',
              name: '测试一',
              key: 'the_one',
            },
            {
              type: 'click',
              name: '测试二',
              key: 'the_two',
            },
            {
              type: 'click',
              name: '测试三',
              key: 'the_three',
            },
          ],
        },
      ],
    }),
  ),
}).end((err,res)=>{
  if(err){
    return console.log(err.message);
  }
  console.log('res',res);
})
