class PageDetail {
    start(prop, clickRemove, startPageTwo) {
        const [id, avatar, nome, idade, tipo_de_treino, celular, bio]
            = [prop.id, prop.avatar, prop.nome, prop.idade, prop.tipo_de_treino, prop.celular, prop.bio];

        let principal = document.querySelector("#principal");
        principal.removeAttribute("class");

       principal.innerHTML = `
                <div id='pagina'>
                    <div id="content">
                        <div id="info">
                            <img id=avatar src='${avatar}' />
                            <div id=user-info>
                                <strong>${nome}</strong>
                                <span>${tipo_de_treino}</span>
                                <span>${idade} anos - ${celular}</span>
                            </div>
                        </div>
                        <p>Biografia:</p>
                        <p>${bio}</p>
                    </div>
    
                    <div id="buttons">
                        <button type='button' onclick='${startPageTwo}("${id}", "${clickRemove}")'>Agendar Aula</button>
                        <button type='button'>Chat</button>
                    </div>
                </div>
            `;

        let bar = document.querySelector('div.bar a');
        bar.removeAttribute('onclick');
        bar.innerHTML = '';

        bar.setAttribute('onclick', clickRemove);
        bar.innerHTML = '<img src="img/voltar.png" alt="close">';
    }

    remove() {
        if (document.getElementById('pagina')) {
            var pagina = document.getElementById('pagina');
            let principal = document.getElementById('principal');
            principal.removeChild(pagina);
        }

        let bar = document.querySelector('div.bar a');

        bar.removeAttribute('onclick');
        bar.innerHTML = '';

        bar.setAttribute('onclick', 'openBox()');
        bar.innerHTML =
            '<img src="img/nav.png" width="30px" height="30px" alt="icone">';

        document.querySelector('#principal').setAttribute('class', 'hide');
    }

    startPageTwo(container, clickRemove, clickCreating, idPersonal) {
        let divPagina = document.querySelector('div#pagina');
        divPagina.setAttribute('class', 'hide');
        divPagina.removeAttribute('id');

        document.querySelector('div#principal').innerHTML += `
            <div style="height: 90vh;">
                <div id="${container}"></div>
        
                <div class="teste">
                    <div class="teste1">
                        <h3>^ Definir data e horário ^</h3>
        
                        <div>
                            <div>
                                <label for="data">Data: </label>
                                <input type="text" name="data" id="data" maxlength="10" placeholder="dd/mm/YYYY" />
                            </div>
        
                            <div>
                                <label for="horario">Horário: </label>
                                <input type="text" name="horario" id="horario" maxlength="5" placeholder="HH:mm" />
                            </div>
                        </div>
        
                        <div id="buttonsMarkLocation">
                            <button onClick='${clickCreating}("${idPersonal}")'>Definir</button>
                            <button onClick="${clickRemove}">Cancelar</button>
                        </div>
                        <input type='hidden' id='hidden' />
                    </div>
                </div>
            </div>
        `;

        let bar = document.querySelector('div.bar a');
        bar.removeAttribute('onclick');
        bar.setAttribute('onclick', clickRemove);
    }

    removePageTwo(container, clickRestore) {
        let mapMarkLocation = document.getElementById(container).parentNode;
        let principal = document.getElementById('principal');
        principal.removeChild(mapMarkLocation);

        let divPagina = document.querySelector('div#principal div.hide');
        divPagina.setAttribute('id', 'pagina');
        divPagina.removeAttribute('class');

        let bar = document.querySelector('div.bar a');
        bar.removeAttribute('onclick');
        bar.setAttribute('onclick', clickRestore);
    }
}