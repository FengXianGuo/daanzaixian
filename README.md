curl  "https://m.api.weibo.com/2/messages/menu/create.json?access_token=2.00jCLboGd55hBD5d2cd028d7ySSLOB" -d 'menus=%7B%22button%22:%5B%7B%22type%22:%22click%22,%22name%22:%22%E4%BB%8A%E6%97%A5%E8%BF%90%E5%8A%BF%22,%22key%22:%22get_today_status%22%7D,%7B%22type%22:%22click%22,%22name%22:%22%E5%A1%94%E7%BD%97%E6%81%8B%E6%83%85%22,%22key%22:%22get_taluo_love%22%7D,%7B%22type%22:%22click%22,%22name%22:%22%E5%8C%B9%E9%85%8D%E7%94%B7%E5%8F%8B%22,%22key%22:%22get_boy_friend%22%7D%5D%7D'

encodeURI(JSON.stringify({
      button: [
        {
          type: 'click',
          name: '今日运势',
          key: 'get_today_status',
        },
        {
          type: 'click',
          name: '塔罗恋情',
          key: 'get_taluo_love',
        },
        {
          type: 'click',
          name: '匹配男友',
          key: 'get_boy_friend',
        },
      ],
    }))