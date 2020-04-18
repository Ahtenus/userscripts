// ==UserScript==
// @name         Hacker News
// @namespace    https://barsk.dev/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://news.ycombinator.com/item*
// @grant        none
// @updateURL   https://raw.githubusercontent.com/Ahtenus/userscripts/master/hackernews.user.js
// @downloadURL https://raw.githubusercontent.com/Ahtenus/userscripts/master/hackernews.user.js
// ==/UserScript==

(function() {
    'use strict';
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css.replace(/;/g, ' !important;');
        head.appendChild(style);
    }
    addGlobalStyle(".togg { font-size: 2em; width: 100px; display: inline-block; }");
})();
