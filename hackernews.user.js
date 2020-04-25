// ==UserScript==
// @name         Hacker News
// @namespace    https://github.com/Ahtenus/userscripts
// @version      1.20200425.172314
// @description  Bigger collapse button 
// @author       Ahtenus
// @match        https://news.ycombinator.com/item*
// ==/UserScript==

(() => {
const userscript = {
    globalStyle: (css) => {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css.replace(/;/g, ' !important;');
        head.appendChild(style);
    }
}
    
userscript.globalStyle(
`
.togg {
    font-size: 2em;
    width: 100px;
    display: inline-block;
}

`);
})();
