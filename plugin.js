(function () {

    let overlay = null;

    function showOverlay(torrent) {
        removeOverlay();

        overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.right = 0;
        overlay.style.bottom = 0;
        overlay.style.background = 'rgba(0,0,0,0.6)';
        overlay.style.zIndex = 999999;
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';

        let box = document.createElement('div');
        box.style.background = '#1f1f1f';
        box.style.padding = '20px 30px';
        box.style.borderRadius = '8px';
        box.style.color = '#fff';
        box.style.fontSize = '18px';
        box.style.textAlign = 'center';

        let btn = document.createElement('div');
        btn.innerText = '⬇ Скачать .torrent';
        btn.style.marginTop = '10px';
        btn.style.padding = '12px 20px';
        btn.style.background = '#3a8bfd';
        btn.style.borderRadius = '6px';
        btn.style.cursor = 'pointer';

        btn.onclick = function () {
            removeOverlay();
            Lampa.Noty.show('Скачивание .torrent');
            Lampa.Utils.downloadFile(torrent.url);
        };

        box.appendChild(btn);
        overlay.appendChild(box);
        document.body.appendChild(overlay);

        overlay.onclick = removeOverlay;
    }

    function removeOverlay() {
        if (overlay) {
            overlay.remove();
            overlay = null;
        }
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
