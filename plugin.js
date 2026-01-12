(function () {

    let overlay = null;

    function removeOverlay() {
        if (overlay) {
            overlay.remove();
            overlay = null;
        }
    }

    function showOverlay(torrent) {
        removeOverlay();

        overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.inset = '0';
        overlay.style.background = 'rgba(0,0,0,0.65)';
        overlay.style.zIndex = 999999;
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';

        let box = document.createElement('div');
        box.style.background = '#1f1f1f';
        box.style.padding = '22px 28px';
        box.style.borderRadius = '10px';
        box.style.color = '#fff';
        box.style.fontSize = '18px';
        box.style.textAlign = 'center';
        box.style.minWidth = '260px';

        let title = document.createElement('div');
        title.innerText = torrent.title || 'Torrent';
        title.style.marginBottom = '14px';
        title.style.opacity = '0.8';

        let btn = document.createElement('div');
        btn.innerText = '⬇ Скачать .torrent';
        btn.style.padding = '12px';
        btn.style.background = '#3a8bfd';
        btn.style.borderRadius = '6px';
        btn.style.cursor = 'pointer';

        btn.onclick = function () {
            removeOverlay();
            Lampa.Noty.show('Скачивание .torrent');
            Lampa.Utils.downloadFile(torrent.url);
        };

        box.appendChild(title);
        box.appendChild(btn);
        overlay.appendChild(box);
        document.body.appendChild(overlay);

        overlay.onclick = removeOverlay;
    }

    function start() {
        Lampa.Listener.follow('torrent', function (e) {
            if (e.type !== 'onlong') return;

            let torrent = e.data;
            if (!torrent || !torrent.url) return;

            if (torrent.url.startsWith('magnet:')) {
                Lampa.Noty.show('Magnet не поддерживается');
                return;
            }

            showOverlay(torrent);
        });
    }

    if (window.Lampa) start();
    else document.addEventListener('lampa-ready', start);

})();
