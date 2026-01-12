(function () {

    function start() {

        Lampa.Listener.follow('torrent', function (e) {

            // мы уже знаем: используется onlong
            if (e.type !== 'onlong') return;

            let torrent = e.data;
            if (!torrent || !torrent.url) return;

            // magnet не скачиваем
            if (torrent.url.startsWith('magnet:')) {
                alert('MAGNET: ' + (torrent.title || 'без названия'));
                return;
            }

            // 1️⃣ ИМИТАЦИЯ ЗАГРУЗКИ / ОТЛАДКА
            alert('Скачивание:\n' + (torrent.title || torrent.url));

            // 2️⃣ АВТОМАТИЧЕСКОЕ СКАЧИВАНИЕ
            Lampa.Utils.downloadFile(torrent.url);
        });
    }

    if (window.Lampa) start();
    else document.addEventListener('lampa-ready', start);

})();
