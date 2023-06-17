// ==UserScript==
// @name         滚动到顶/底
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  在网页右下添加一个的按钮，通过上下滑动可以切换按钮形态，快速回到页面顶部或底部。
// @author       www.techwb.cn
// @match        *://*/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // 创建按钮元素
    var scrollButton = document.createElement('button');
    scrollButton.textContent = '顶部';
    scrollButton.id = 'scroll-top-button';

    // 添加按钮样式
    scrollButton.style.border = 'none'; // 去掉边框
    scrollButton.style.color = 'black'; // 文字颜色为黑色
    scrollButton.style.padding = '9px 10px'; // 设定按钮的内边距
    scrollButton.style.textAlign = 'center'; // 文字居中
    scrollButton.style.textDecoration = 'none'; // 去掉下划线
    scrollButton.style.display = 'none'; // 默认不显示
    scrollButton.style.borderRadius = '10px'; // 设定圆角
    scrollButton.style.boxShadow = '2px 2px 3px rgba(0, 0, 0, 0.3)'; // 添加阴影效果
    scrollButton.style.cursor = 'pointer'; // 设定鼠标样式为手型
    scrollButton.style.position = 'fixed'; // 设定固定定位
    scrollButton.style.bottom = '15%'; // 设定距离底部的距离
    scrollButton.style.right = '15px'; // 设定距离右侧的距离
    scrollButton.style.zIndex = '9999'; // 设定 z-index

    

    // 添加按钮到页面
    document.body.appendChild(scrollButton);

    // 当用户滚动页面时，如果已经滚动了一定距离，就显示按钮
    var lastScrollPosition = window.pageYOffset; // 上一次滚动的位置
    var hideButtonTimeout;

    window.addEventListener('scroll', function() {
        var currentScrollPosition = window.pageYOffset;
        if (currentScrollPosition > lastScrollPosition) { // 向下滚动
            scrollButton.textContent = ' ▼ ';
            scrollButton.style.background = 'hsla(221, 41%, 98%, 0.8)';
        } else { // 向上滚动
            scrollButton.textContent = ' ▲ ';
            scrollButton.style.background = 'hsla(221, 41%, 98%, 0.8)';
        }
        lastScrollPosition = currentScrollPosition;
        if (window.pageYOffset > 100) { // 滚动距离超过 100px 时
            scrollButton.style.display = 'block'; // 显示按钮
        } else {
            scrollButton.style.display = 'none'; // 否则隐藏按钮
        }

        // 清除之前的计时器
        clearTimeout(hideButtonTimeout);
        // 设置新的计时器，在 2800 毫秒（2.8秒）后隐藏按钮
        hideButtonTimeout = setTimeout(function() {
            scrollButton.style.display = 'none';
        }, 2800);
    });

    // 点击按钮时，回到页面顶部或底部
    scrollButton.addEventListener('click', function() {
        if (scrollButton.textContent === ' ▲ ') {
            window.scrollTo(0, 0); // 将页面滚动到顶部
        } else {
            window.scrollTo(0, document.documentElement.scrollHeight - window.innerHeight); // 将页面滚动到底部
        }
    });
})();
