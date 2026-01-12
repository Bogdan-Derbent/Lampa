(function () {

    function start() {

        Lampa.Listener.follow('torrent', function (e) {

            if (e.type !== 'contextmenu') return;

            // e.data — это данные торрента
            let torrent = e.data;

            e.items.push({
                title: '⬇ Скачать торрент',
                icon: 'download',
                onClick: function () {
                    downloadTorrent(torrent);
                }
            });
        });

    }

    function downloadTorrent(torrent) {
        Lampa.Noty.show('Скачивание торрента');

        console.log(torrent);
        // тут будет логика скачивания
    }

    if (window.Lampa) start();
    else document.addEventListener('lampa-ready', start);

})();
