(function () {

    function start() {

        Lampa.Listener.follow('torrent', function (e) {

            // ⏱️ МЕНЮ ДОЛГОГО УДЕРЖАНИЯ
            if (e.type !== 'contextmenu') return;

            let torrent = e.data;

            // только .torrent файлы
            if (!torrent.url || torrent.url.startsWith('magnet:')) return;

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
