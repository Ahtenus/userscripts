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
