
const app = getApp();
const $ = require("../../lib/base.js");


Page({
  data: {
    user_name: '',
    user_psd: '',
    name_focus: true,
    psd_focus: true,
    avatarUrl: ""
  },
  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      user_name: e.detail.value
    })
  },
  //加载完成
  onLoad: function () {

  },
  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      user_psd: e.detail.value
    })
  },
  // 登录 
  login: function () {
    if (this.data.user_name.length == 0) {
      $.toast(0, '账号不能为空');
      this.setData({ name_focus: true });
    } else if (this.data.user_psd.length == 0) {
      $.toast(0, '密码不能为空');
      this.setData({ psd_focus: true });
    } else {
      $.post("/Login/login", this.data, function (data) {
        $.toast(1, '登录成功');
        wx.setStorageSync('user_id', data.data[0].user_id);
        wx.setStorageSync('user_name', data.data[0].user_name);
        wx.redirectTo({ url: '../index/index'});
      });
    }
  },
})