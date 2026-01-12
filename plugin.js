// Полностью заменить plugin.js этим кодом
(function () {

    // простой визуальный лог в углу — всегда виден
    function appendLog(txt, color) {
        try {
            let id = '__lampa_dbg_area';
            let area = document.getElementById(id);
            if (!area) {
                area = document.createElement('div');
                area.id = id;
                area.style.position = 'fixed';
                area.style.right = '10px';
                area.style.top = '10px';
                area.style.zIndex = 999999;
                area.style.maxWidth = '40%';
                area.style.fontSize = '14px';
                area.style.color = '#fff';
                area.style.background = 'rgba(0,0,0,0.5)';
                area.style.padding = '8px';
                area.style.borderRadius = '6px';
                area.style.maxHeight = '60vh';
                area.style.overflow = 'auto';
                document.body.appendChild(area);
            }
            let el = document.createElement('div');
            el.style.marginBottom = '6px';
            el.style.color = color || '#fff';
            el.innerText = (new Date()).toLocaleTimeString() + ' — ' + txt;
            area.appendChild(el);
        } catch (e) { /* ignore */ }
    }

    // универсальный debug: alert + Noty + DOM
    function dbg(msg, color) {
        try { alert(msg); } catch(e) {}
        try { if (window.Lampa && Lampa.Noty) Lampa.Noty.show(msg); } catch(e) {}
        appendLog(msg, color);
    }

    // МАРКЕР: файл загружен (выполняется при подключении)
    try { dbg('DBG: FILE LOADED', '#4caf50'); } catch (e) {}

    // слушаем инициалицацию Lampa
    document.addEventListener('lampa-ready', function () {
        dbg('DBG: LAMPA READY', '#2196f3');
    });

    // если Lampa уже есть — вручную пометим
    if (window.Lampa) {
        try { dbg('DBG: WINDOW.LAMPA PRESENT', '#2196f3'); } catch(e) {}
    }

    // Регистрируем listener на torrent — и логируем ВСЕ события
    try {
        if (window.Lampa && Lampa.Listener && Lampa.Listener.follow) {
            Lampa.Listener.follow('torrent', function (e) {
                // сразу логируем факт вызова и тип события
                dbg('DBG: GOT torrent event -> ' + String(e && e.type), '#ff9800');

                // Покажем структуру e.data кратко
                try {
                    let t = e && e.data ? e.data : null;
                    if (!t) {
                        dbg('DBG: e.data пустой', '#f44336');
                    } else {
                        // выводим title и url если есть
                        let title = t.title || t.name || 'без названия';
                        let url = t.url || t.link || 'нет url';
                        dbg('DBG: torrent title: ' + title, '#9c27b0');
                        dbg('DBG: torrent url: ' + url, '#9c27b0');

                        // Если есть url и не magnet — сразу пытаемся скачать
                        if (url && !String(url).startsWith('magnet:')) {
                            dbg('DBG: Попытка скачать автоматически', '#4caf50');
                            try {
                                Lampa.Utils.downloadFile(url);
                                dbg('DBG: Вызван Lampa.Utils.downloadFile', '#4caf50');
                            } catch (ex) {
                                dbg('DBG: Ошибка downloadFile: ' + ex.message, '#f44336');
                            }
                        } else if (String(url).startsWith('magnet:')) {
                            dbg('DBG: url — magnet, пропускаем автоскачивание', '#ff5722');
                        }
                    }
                } catch (ex2) {
                    dbg('DBG: Ошибка при обработке e.data: ' + (ex2.message || ex2), '#f44336');
                }
            });

            dbg('DBG: Listener.follow(\\'torrent\\') зарегистрирован', '#03a9f4');
        } else {
            dbg('DBG: Lampa.Listener.follow недоступен', '#f44336');
        }
    } catch (e) {
        dbg('DBG: Ошибка регистрации listener: ' + (e.message || e), '#f44336');
    }

})();
