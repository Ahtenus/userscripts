// ==UserScript==
// @name         Hacker News
// @namespace    https://github.com/Ahtenus/userscripts
// @version      0.2
// @description  Bigger collapse button 
// @author       Ahtenus
// @match        https://news.ycombinator.com/item*
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
