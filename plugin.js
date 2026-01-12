(function () {

    function debug(text, color) {
        let d = document.createElement('div');
        d.style.position = 'fixed';
        d.style.bottom = '20px';
        d.style.left = '20px';
        d.style.background = color || 'red';
        d.style.color = 'white';
        d.style.padding = '10px';
        d.style.zIndex = 999999;
        d.innerText = text;
        document.body.appendChild(d);
        setTimeout(() => d.remove(), 2000);
    }

    function start() {
        debug('PLUGIN STARTED', 'green');

        Lampa.Listener.follow('torrent', function (e) {
            debug('TORRENT EVENT: ' + e.type, 'blue');

            if (e.type !== 'contextmenu') return;

            debug('CONTEXTMENU DETECTED', 'purple');

            e.items.push({
                title: '⬇ DEBUG DOWNLOAD',
                onClick: function () {
                    debug('CLICK', 'orange');
                }
            });
        });
    }

    if (window.Lampa) start();
    else document.addEventListener('lampa-ready', start);

})();
