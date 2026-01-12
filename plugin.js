(function () {

    function logBox(text) {
        let d = document.createElement('div');
        d.style.position = 'fixed';
        d.style.left = '10px';
        d.style.bottom = '10px';
        d.style.maxWidth = '90%';
        d.style.maxHeight = '40%';
        d.style.overflow = 'auto';
        d.style.background = 'rgba(0,0,0,0.8)';
        d.style.color = '#0f0';
        d.style.padding = '10px';
        d.style.zIndex = 999999;
        d.style.fontSize = '12px';
        d.innerText = text;
        document.body.appendChild(d);
    }

    function start() {
        Lampa.Listener.follow('torrent', function (e) {

            if (e.type !== 'onlong') return;

            // 🔥 КЛЮЧ: смотрим DOM
            let el = document.activeElement || e.target || e.element;

            if (!el) {
                logBox('NO ACTIVE ELEMENT');
                return;
            }

            logBox(el.outerHTML.substring(0, 3000));
        });
    }

    if (window.Lampa) start();
    else document.addEventListener('lampa-ready', start);

})();
