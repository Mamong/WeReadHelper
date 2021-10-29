// ==UserScript==
// @name     微信阅读触底翻页
// @description 微信阅读助手
// @author   🐱
// @version  1
// @match    https://weread.qq.com/web/reader/*
// @grant    none
// @run-at   document-end
// ==/UserScript==

(function () {
  "use strict";

  //判断鼠标滚轮滚动方向
  if (window.addEventListener){
    console.log("addEventListener")
    //火狐浏览器会识别该方法
    window.addEventListener('DOMMouseScroll', wheel, false);
  }
  //Chrome&IE
  console.log("onmousewheel")
  window.onmousewheel = document.onmousewheel = wheel;

  //统一处理滚轮滚动事件
  function wheel(event) {
      var delta = 0;
      if (!event) event = window.event;
      if (event.wheelDelta) {//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
          delta = event.wheelDelta / 120;
          if (window.opera) delta = -delta;//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
      } else if (event.detail) {//FF浏览器使用的是detail,其值为“正负3”
          delta = -event.detail / 3;
      }
      console.log("delta:"+delta)
      if (delta){
          handle(delta);
      }
  }
  //上下滚动时的具体处理函数
  function handle(delta) {
      if (delta < 0) {//向下滚动
          var scrollTop =
              document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
          var windowHeight =
              document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
          var scrollHeight =
              document.documentElement.scrollHeight || document.body.scrollHeight;
          console.log("scrollTop:"+scrollTop+";windowHeight="+windowHeight+";scrollHeight="+scrollHeight)
          if (ceil(scrollTop + windowHeight) == scrollHeight) {
              gotoNextPage()
          }

      } else {//向上滚动

      }
  }

  function gotoNextPage(){
    let button = document.querySelector(".readerFooter_button")
    console.log("gotoNextPage")
    if(button){
      console.log("前往下一章...")
      var evt = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          clientX: 100,
          clientY: 100
      });
      button.dispatchEvent(evt);
    }else{
      console.log("这个页面没有下一章按钮")
    }
  }
})();
