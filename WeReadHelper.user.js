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
    if (window.addEventListener) {
        console.log("addEventListener")
        //火狐浏览器会识别该方法
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    //Chrome&IE
    console.log("onmousewheel")
    window.onmousewheel = document.onmousewheel = wheel;

    //上下滚动时的具体处理函数
    function handle(delta) {
        //变量windowHeight是可视区的高度
        let scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
        if (delta < 0) {//向下滚动
            let windowHeight =
                document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
            let scrollHeight =
                document.documentElement.scrollHeight || document.body.scrollHeight;
            if (scrollTop + windowHeight == scrollHeight) {
                gotoNextPage()
            }

        } else {//向上滚动
            if (scrollTop == 0) {
                gotoPrevPage()
            }
        }
    }

    function gotoNextPage() {
        console.log("gotoNextPage")

        let button = document.querySelector(".readerFooter_button")
        if (button) {
            console.log("前往下一章...")
            var evt = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                clientX: 100,
                clientY: 100
            });
            button.dispatchEvent(evt);
        } else {
            console.log("这个页面没有下一章按钮")
        }
    }

    function gotoPrevPage() {
        console.log("gotoPrevPage")

        let items = Array.from(document.querySelectorAll(".chapterItem"))
        let cur_item = document.querySelector(".chapterItem.chapterItem_current")
        let index = items.indexOf(cur_item)
        if (index > 0) {
            console.log("前往前一章...")
            var evt = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                clientX: 100,
                clientY: 100
            });
            items[index - 1].firstChild.dispatchEvent(evt);
        } else {
            console.log("已在第一章")
        }
    }
})();
