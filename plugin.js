(function () {

    function start() {

        Lampa.Listener.follow('torrent', function (e) {

            // ✅ ВАЖНО: в твоём источнике это onlong
            if (e.type !== 'onlong') return;

            let torrent = e.data;
            if (!torrent || !torrent.url) return;

            // не показываем для magnet
            if (torrent.url.startsWith('magnet:')) return;

            e.items.push({
                title: '⬇ Скачать .torrent',
                icon: 'download',
                onClick: function () {
                    Lampa.Noty.show('Скачивание .torrent');
                    Lampa.Utils.downloadFile(torrent.url);
                }
            });
        });
    }

    if (window.Lampa) start();
    else document.addEventListener('lampa-ready', start);

})();
