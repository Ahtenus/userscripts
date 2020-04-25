// ==UserScript==
// @name         Denon
// @namespace    https://barsk.dev/
// @version      0.2
// @description  Improvements to Denon AVR-X1300W web GUI
// @author       Ahtenus
// @match        http://10.0.0.100/MainZone/index.html
// @grant        none
// ==/UserScript==

(() => {
    'use strict';
    const addGlobalStyle = (css) => {
        const head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css.replace(/;/g, ' !important;');
        head.appendChild(style);
    }
    addGlobalStyle(
`
#Volume, #Surround, #QuickSelect, #S3 {
   display: grid;
   grid-template-columns: 1fr 1fr 1fr 1fr;
}

#Volume > div, #Surround > div, #QuickSelect > div {
   width: unset;
}

div.btn31, div.btn32, div.btn33, div.btn34, div.btn35, div.btn36, div.btn37, div.btn38, div.btn39, div.btn310, div.btn311, div.btn312, div.btn313, div.btn314, div.btn315 {
   width: unset;
}

#contents {
    width: auto;
}

div.RParamVolume, div.RParamQuickSelect, div.RParamSoundMode {
    width: auto;
}

#source {
    display: grid;
    grid-template-columns: 100px 1fr 100px;
}

div.btnHome, div.RParamSource, div.btnPlayerView {
    width: unset;
    float: unset;
}

* {
    user-select: none;
}
`);
})();