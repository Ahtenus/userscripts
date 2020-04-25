// ==UserScript==
// @name         Denon Remote Improvements
// @namespace    https://github.com/Ahtenus/userscripts
// @version      1.20200425.172314
// @description  Improvements to Denon AVR-X1300W Web-GUI
// @author       Ahtenus
// @match        http://10.0.0.100/MainZone/index.html
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
    },
    whenTrue: (predicate) => new Promise((resolve, reject) => {
        const checkPredicate = () => {
            if(predicate()) {
                resolve()
            } else {
                setTimeout(checkPredicate, 10);
            }
        }
        checkPredicate()
    })
}

userscript.globalStyle(`
#Volume, #Surround, #QuickSelect, #S3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}

#Volume > div, #Surround > div, #QuickSelect > div {
    width: unset;
}

div.btn31, div.btn32, div.btn33, div.btn34, div.btn35, div.btn36, div.btn37, div.btn38, div.btn39, div.btn310, div.btn311, div.btn312, div.btn313, div.btn314, div.btn315 {
    width: unset;
    text-overflow: ellipsis;
    overflow: hidden;
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

div {
    user-select: none;
    -moz-user-select: none;
}

input[type=range] {
    width: 100%; /* Specific width is required for Firefox. */
    background: transparent; /* Otherwise white in Chrome */
}

#ECOMode, #SleepTimer {
    display: none;
}
`);

// Volume slider
userscript.whenTrue(() => typeof loadMainXml !== 'undefined')
.then(() => {
    const volumeSlider = `
    <div id="VolumeSlider">
        <input type="range" id="VolumeSliderInp" style="width: 100%; height: 35px;" name="Volume" min="0" step="0.5" max="80" >
    </div>`

    $(volumeSlider).insertAfter("#Volume")

    const sliderVolume = () => parseFloat($("#VolumeSliderInp").val());
    const currentVolume = () => parseFloat($(".RParamVolume").text());

    let lastSliderChange = 0;
    $("#VolumeSliderInp").bind('input', (v) => {
        lastSliderChange = Date.now();
        fetch("/MainZone/index.put.asp", {
            "method": "POST",
            "body": `cmd0=PutMasterVolumeSet%2F${sliderVolume()-80}`,
        })
            .then(() => loadMainXmlOrig());
    });


    // Chain onto existing polling behaviour

    const postLoadMainXml = () => {
        const volume = currentVolume()
        if(volume != sliderVolume() && Date.now() - lastSliderChange > 1000) {
            $("#VolumeSliderInp").val(volume);
        }
    }

    const loadMainXmlOrig = loadMainXml

    loadMainXml = (arg) => {
        loadMainXmlOrig(arg);
        setTimeout(postLoadMainXml, 0);
    }

});
})();
