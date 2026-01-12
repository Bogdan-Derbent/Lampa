// Заменить plugin.js на этот код целиком
(function () {

    // Создаёт / добавляет DOM-лог и возвращает функцию для добавления строк
    function createLogger() {
        try {
            let id = '__lampa_safe_log';
            let area = document.getElementById(id);
            if (!area) {
                area = document.createElement('div');
                area.id = id;
                area.style.position = 'fixed';
                area.style.right = '8px';
                area.style.top = '8px';
                area.style.zIndex = 2147483647; // максимально высокий
                area.style.maxWidth = '48%';
                area.style.fontSize = '13px';
                area.style.color = '#fff';
                area.style.background = 'rgba(0,0,0,0.75)';
                area.style.padding = '8px';
                area.style.borderRadius = '6px';
                area.style.maxHeight = '70vh';
                area.style.overflow = 'auto';
                area.style.boxSizing = 'border-box';
                document.documentElement.appendChild(area);
            }
            return function logLine(txt, clr) {
                try {
                    let el = document.createElement('div');
                    el.style.marginBottom = '6px';
                    el.style.whiteSpace = 'pre-wrap';
                    el.style.color = clr || '#fff';
                    el.innerText = (new Date()).toLocaleTimeString() + ' — ' + String(txt);
                    area.appendChild(el);
                    // прокрутка вниз
                    area.scrollTop = area.scrollHeight;
                } catch (e) { /* ignore */ }
            };
        } catch (e) {
            // Если DOM недоступен — ничего не делаем
            return function() {};
        }
    }

    const log = createLogger();

    // Глобальный обработчик ошибок (включая message script error)
    window.onerror = function (message, source, lineno, colno, error) {
        try {
            log('onerror: message=' + String(message), '#f44336');
            log('source: ' + String(source) + ' @' + String(lineno) + ':' + String(colno), '#f44336');
            if (error && error.stack) log('stack: ' + String(error.stack), '#f44336');
            else log('error object: ' + String(error), '#f44336');
        } catch (e) {}
        // не подавляем: возвращаем false чтобы стандартный обработчик тоже сработал если есть
        return false;
    };

    // Перехват необработанных Promise-ошибок
    window.addEventListener('unhandledrejection', function (ev) {
        try {
            log('unhandledrejection: ' + String(ev.reason), '#ff5722');
            if (ev.reason && ev.reason.stack) log('stack: ' + ev.reason.stack, '#ff5722');
        } catch (e) {}
    });

    // Маркер: файл загружен
    try { log('SAFE DBG: FILE LOADED', '#4caf50'); } catch (e) {}

    // Безопасно слушаем lampa-ready (если есть)
    try {
        document.addEventListener('lampa-ready', function () {
            try { log('SAFE DBG: lampa-ready event fired', '#2196f3'); } catch (e) {}
        });
    } catch (e) {}

    // Если Lampa уже в window — пометим
    try {
        if (window.Lampa) log('SAFE DBG: window.Lampa PRESENT', '#2196f3');
        else log('SAFE DBG: window.Lampa NOT present yet', '#ffeb3b');
    } catch (e) {}

    // Регистрируем listener на torrent в защищённом блоке
    try {
        if (window.Lampa && Lampa.Listener && Lampa.Listener.follow) {
            Lampa.Listener.follow('torrent', function (e) {
                try {
                    log('EVENT: torrent -> type=' + String(e && e.type), '#03a9f4');

                    let t = e && e.data ? e.data : null;
                    if (!t) {
                        log('EVENT: e.data is null or undefined', '#f44336');
                        return;
                    }

                    // безопасно достаём поля (без доступа к прототипам)
                    let title = t.title || t.name || t.caption || 'без названия';
                    let url = t.url || t.link || t.source || null;
                    log('torrent.title: ' + String(title), '#9c27b0');
                    log('torrent.url: ' + String(url), '#9c27b0');

                    // демонстрационный алерт (обёрнут в try)
                    try {
                        // alert может быть заблокирован, но пробуем
                        alert('DBG ALERT\n' + String(title));
                    } catch (aerr) {
                        log('alert blocked: ' + String(aerr), '#ff9800');
                    }

                    // попытка скачать (только если есть url и не magnet)
                    if (url && !String(url).startsWith('magnet:')) {
                        try {
                            Lampa.Utils.downloadFile(url);
                            log('Lampa.Utils.downloadFile called', '#4caf50');
                        } catch (dex) {
                            log('downloadFile error: ' + String(dex && dex.message || dex), '#f44336');
                        }
                    } else {
                        log('No downloadable url (maybe magnet) — skipping download', '#ff5722');
                    }

                } catch (inner) {
                    log('Error inside torrent handler: ' + String(inner && inner.message || inner), '#f44336');
                    if (inner && inner.stack) log('stack: ' + inner.stack, '#f44336');
                }
            });

            log("SAFE DBG: Lampa.Listener.follow('torrent') registered", '#03a9f4');
        } else {
            log('SAFE DBG: Lampa.Listener.follow not available', '#f44336');
        }
    } catch (e) {
        log('SAFE DBG: Error registering listener: ' + (e && e.message || e), '#f44336');
        if (e && e.stack) log('stack: ' + e.stack, '#f44336');
    }

})();
