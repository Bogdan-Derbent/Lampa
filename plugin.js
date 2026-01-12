(function () {

    function start() {
        // 🔥 ГАРАНТИРОВАННО выполнится
        Lampa.Noty.show('Плагин Lampa запущен');

        let div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.top = '20px';
        div.style.left = '20px';
        div.style.background = 'green';
        div.style.color = 'white';
        div.style.padding = '10px';
        div.style.zIndex = 9999;
        div.innerText = 'PLUGIN WORKS';

        document.body.appendChild(div);
    }

    // 👉 ждём инициализацию Lampa
    if (window.Lampa) {
        start();
    } else {
        document.addEventListener('lampa-ready', start);
    }

})();
