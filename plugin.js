(function () {

    function start() {

        Lampa.Listener.follow('torrent', function (e) {

            // Нас интересует меню торрента
            if (e.type !== 'contextmenu') return;

            let torrent = e.data;

            // magnet нельзя "скачать как файл"
            if (!torrent.url || torrent.url.startsWith('magnet:')) return;

            e.items.push({
                title: '⬇ Скачать .torrent',
                icon: 'download',
                onClick: function () {
                    downloadTorrentFile(torrent.url);
                }
            });
        });
    }

    function downloadTorrentFile(url) {
        Lampa.Noty.show('Скачивание torrent-файла');
        Lampa.Utils.downloadFile(url);
    }

    if (window.Lampa) start();
    else document.addEventListener('lampa-ready', start);

})();
