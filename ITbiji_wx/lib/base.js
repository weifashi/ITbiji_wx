//  全局方法
//  使用：
//  const $ = require("../../lib/base.js");   //引入
//  $.post(url, postData, success);           //post请求
//  $.nav(url, success);                      //页面跳转
//  $.toast(mode, title, trime);              //弹窗提示
//  $.confirm(content, success);              //对话框
//  $.alert(content, success);                //只有确定按钮的对话框
//  $.msg(content, success);                  //只有确定按钮的对话框



var app = getApp();

// post 请求
module.exports.post = function (url, postData, success,mode=true){
  if (mode == true){
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
  }
  wx.request({
    url: app.postUrl + url,
    data: postData,
    dataType: "json",
    header: { 
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': 'user_id=' + wx.getStorageSync('user_id')
    },
    method: "POST",
    success: function (e) {
      wx.hideLoading();
      if (e.data.code==0){
        if (success) { success(e.data) }
      }else{
        wx.showLoading({
          title: e.data.message || '请求失败',
          icon: 'none',
          duration: 1500
        });
      }
    },
    fail: function () {
      wx.hideLoading();
      wx.showToast({
        title: '请求错误',
        icon: 'none',
        duration: 2000
      })
    },
    complete: function (e) {
     
    }
  })
};

//只有确定按钮的对话框
module.exports.alert = function (content = "", success) {
  wx.showModal({
    content: content,
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        if (success) { success(res) }
      }
    }
  });
};

//对话框
module.exports.confirm = function (content = "", success, btn1 = "确定", btn2 = "取消") {
  wx.showModal({
    title: "提示",
    content: content,
    confirmText: btn1,
    cancelText: btn2,
    success: function (res) {
      if (res.confirm) {
        if (success) { success(res) }
      }
    }
  });
};

// 弹窗提示
module.exports.toast = function (mode=1, title="", trime) {
  wx.showToast({
    title: title,
    icon: mode == 1 ? 'success' : mode == 2 ? "loading" : "none",
    duration: trime ? trime : 1500
  })
};

// 页面跳转
module.exports.nav = function (url, success, fail, complete) {
  wx.navigateTo({
    url: url,
    success:function(){
      if (success) { success() }
    },
    fail: function () {
      if (fail) { fail() }
    },
    fail: function () {
      if (complete) { complete() }
    }
  })
};