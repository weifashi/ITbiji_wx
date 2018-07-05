
App({
  //当小程序初始化完成时
  onLaunch: function () {
    //同步清理本地数据缓存
    // wx.clearStorageSync();
    // wx.clearStorage();
  },
  //数据请求地址
  postUrl: "http://172.20.10.14/ITbiji/Home_weixin",
});

