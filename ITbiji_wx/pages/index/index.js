const app = getApp();
const $ = require("../../lib/base.js");

Page({
  data: {
    array:[]
  },
  //加载完成 获取目录数据
  onLoad: function () {
    this.getCatalogData();
  },
  //监听下拉刷新
  onPullDownRefresh:function(){
    this.getCatalogData();
  },
  scrolltolower :function(){
    $.confirm("确定重新加载？",function(){
      wx.startPullDownRefresh();
    });
  },
  //获取目录数据
  getCatalogData:function(){
    var $th = this;
    $.post("/Index/getCatalogData", {}, function (data) {
      wx.stopPullDownRefresh();
      $th.setData({ array: data.data });
    },false);
  },
  //目录展开与收缩事件处理函数
  recursion: function (data, pId, index){
    var attr=[];
    for (var i = 0; i < data.length; i++) {
      if (Number(data[i].id) == Number(pId) && data[i]["children"]){
        for (var j = 0; j < data[i]["children"].length; j++) {
          if (data[i]["children"][j].shows) {
            data[i]["children"][j].shows = false;
            function _fn(data){
              for (var k = 0; k < data.length; k++) {
                data[k].shows = false;
                _fn(data[k]["children"]);
              }
            }
            _fn(data[i]["children"][j]["children"]);
          } else {
            data[i]["children"][j].shows = true;
          }
        }
      }
      this.recursion(data[i]["children"], pId,1);
      attr.push(data[i]);
    }
    return attr;
  },
  //目录展开与收缩事件
  showfile: function (e) {
    var _contentFor = this.data.array;
    var _id = e.currentTarget.dataset.id;
    var _type = e.currentTarget.dataset.type;
    if (_type == undefined || _type == 0){
      this.setData({ array: this.recursion(_contentFor, _id) });
    }else{
      $.toast(2);
      $.nav("../table/table",function(){
         wx.hideToast();
      }); 
    }
  }

})
