// ==UserScript==
// @name     微信阅读助手
// @description 鼠标上下滚动翻页
// @author   🐱
// @version  1
// @match    https://weread.qq.com/web/reader/*
// @grant    none
// @run-at   document-end
// ==/UserScript==

(function () {
    "use strict";

    //顶部双击返回顶部
    let readerTopBar = document.querySelector(".readerTopBar")
    readerTopBar.addEventListener("dblclick", scrollToTop);

    //判断鼠标滚轮滚动方向
    if (window.addEventListener) {
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
        if (delta){
            handle(delta);
        }
    }

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
            if (Math.ceil(scrollTop + windowHeight) == scrollHeight) {
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

        let prev_item = document.querySelector(".chapterItem.chapterItem_current").previousElementSibling
        if (prev_item) {
            console.log("前往前一章...")
            var evt = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                clientX: 100,
                clientY: 100
            });
            //屏蔽遮罩动画
            changeClassName("wr_mask","wr_mask_fake")
            prev_item.firstChild.dispatchEvent(evt);

            //滚动到底部
            scrollToBottom()
            changeClassName("wr_mask_fake","wr_mask")
            
        } else {
            console.log("已在第一章")
        }
    }
    
    function changeClassName(from,to){
        let elem = document.querySelector(`.${from}`)
        if(elem){
            elem.setAttribute("class",to)
        }
    }

    let count = 10
    function scrollToBottom() {
        let button = document.querySelector(".readerFooter_button")
        if (button) {
            let windowHeight =
                document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
            let scrollHeight =
                document.documentElement.scrollHeight || document.body.scrollHeight;
            window.scroll({ top: scrollHeight - windowHeight, left: 0, behavior: 'auto' });
        } else {
            count -= 1
            if (count >= 0) {
                setTimeout(scrollToBottom, 500)
            } else {
                count = 10
            }
        }
    }

    function scrollToTop() {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
})();
