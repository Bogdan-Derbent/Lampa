(function () {

    function debug(text, color) {
        let d = document.createElement('div');
        d.style.position = 'fixed';
        d.style.top = '50%';
        d.style.left = '50%';
        d.style.transform = 'translate(-50%, -50%)';
        d.style.background = color || 'red';
        d.style.color = 'white';
        d.style.padding = '20px';
        d.style.zIndex = 999999;
        d.style.fontSize = '18px';
        d.innerText = text;
        document.body.appendChild(d);
        setTimeout(() => d.remove(), 1500);
    }

    function start() {
        debug('PLUGIN OK', 'green');

        let timer = null;

        document.addEventListener('mousedown', function (e) {
            timer = setTimeout(() => {
                debug('LONG PRESS', 'blue');
            }, 600);
        });

        document.addEventListener('mouseup', function () {
            clearTimeout(timer);
        });
    }

    if (window.Lampa) start();
    else document.addEventListener('lampa-ready', start);

})();
