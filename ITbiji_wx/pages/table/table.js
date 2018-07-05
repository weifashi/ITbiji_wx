// pages/table/table.js
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    tabs: ["选项一", "选项二", "选项三"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  //页面加载完成
  onLoad: function (options) {
    var that = this;

    //选项卡
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  //显示搜素框
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  //搜索
  search: function () {
    this.setData({
      // inputVal: "",
      inputShowed: false
    });
  },
  //清空搜索框
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  //输入框录入
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
      placeholder: e.detail.value
    });
  },
  //选项卡点击
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
})