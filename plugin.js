(function () {
    if (!window.Lampa) return;

    let div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '10px';
    div.style.right = '10px';
    div.style.background = 'red';
    div.style.padding = '10px';
    div.innerText = 'PLUGIN OK';

    document.body.appendChild(div);
})();
