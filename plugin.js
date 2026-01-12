(function () {

    function drawDebug(text, color) {
        let div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.top = '50%';
        div.style.left = '50%';
        div.style.transform = 'translate(-50%, -50%)';
        div.style.background = color || 'red';
        div.style.color = 'white';
        div.style.padding = '20px';
        div.style.zIndex = 99999;
        div.style.fontSize = '18px';
        div.innerText = text;

        document.body.appendChild(div);

        setTimeout(() => div.remove(), 2000);
    }

    function start() {

        // ✅ проверка, что плагин жив
        drawDebug('PLUGIN STARTED', 'green');

        Lampa.Listener.follow('torrent', function (e) {

            // 🔍 покажем, что вообще приходит
            drawDebug(
                'EVENT: ' + e.type,
                e.type === 'contextmenu' ? 'blue' : 'gray'
            );

            // если это не меню — выходим
            if (e.type !== 'contextmenu') return;

            // 🔥 если дошли сюда — ЭТО УЖЕ ПОБЕДА
            drawDebug('CONTEXT MENU TORRENT', 'purple');

            // пробуем добавить пункт
            e.items.push({
                title: '⬇ DEBUG DOWNLOAD',
                onClick: function () {
                    drawDebug('CLICKED', 'orange');
                }
            });
        });
    }

    if (window.Lampa) start();
    else document.addEventListener('lampa-ready', start);

})();
