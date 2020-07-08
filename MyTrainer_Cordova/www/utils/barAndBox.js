//Abre a caixa de opções.
function openBox() {
    let box = document.querySelector('div.box');
    box.removeAttribute('class');
    box.setAttribute('class', 'box');
}

//Fecha a caixa de opções.
function closeBox() {
    let box = document.querySelector('div.box');
    box.removeAttribute('class');
    box.setAttribute('class', 'box hide');
}
