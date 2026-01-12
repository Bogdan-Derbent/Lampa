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
        d.innerText = text;
        document.body.appendChild(d);
        setTimeout(() => d.remove(), 2000);
    }

    function start() {
        debug('PLUGIN STARTED', 'green');

        Lampa.Listener.follow('torrent', function (e) {
            debug('EVENT: ' + e.type, 'blue');

            if (e.type !== 'onlong' && e.type !== 'contextmenu') return;

            // 🔥 проверяем items
            if (!e.items) {
                debug('NO e.items', 'red');
                return;
            }

            debug('ITEMS LENGTH: ' + e.items.length, 'purple');

            e.items.push({
                title: '⬇ DEBUG TORRENT',
                onClick: function () {
                    debug('CLICKED', 'orange');
                }
            });
        });
    }

    if (window.Lampa) start();
    else document.addEventListener('lampa-ready', start);

})();
