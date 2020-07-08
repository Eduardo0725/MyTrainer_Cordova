//Função para diminuir o código em relação a criação de elementos.
function create(num, tag) {
    let arr = [];
    for (i = 1; i <= num; i++)
        arr.push(document.createElement(tag));

    return arr;
}

var personal, client;

async function meus_treinos(type, functionClick) {
    var user = (type === 'client') ? new Client : new Personal;
    await user.validate();

    try {
        let meus_treinos = user.box.doc.meus_treinos;
        console.log(meus_treinos);

        lista = document.createElement('div');
        lista.setAttribute('id', 'lista');

        //Existe nenhum treino
        if (meus_treinos.length === 0) {
            let div = document.createElement('div');
            div.setAttribute('class', 'empty');

            let h1 = document.createElement('h1');
            h1.innerText = 'Você ainda não agendou nenhum treino!';

            div.appendChild(h1);

            return lista.appendChild(div);
        }

        //Ordenar por data.
        meus_treinos.sort((a, b) => {
            if (a.body.data > b.body.data) return 1;

            if (a.body.data < b.body.data) return -1;

            if (a.body.data === b.body.data) {
                if (a.body.horario > b.body.horario) return 1;

                if (a.body.horario < b.body.horario) return -1;
            }

            return 0;
        });

        let [pendente, confirmado, historico] = create(3, 'div');

        pendente.setAttribute('id', 'pendente');
        pendente.innerHTML = '<p class="p">pendente</p>';

        confirmado.setAttribute('id', 'confirmado');
        confirmado.innerHTML = '<p class="p">confirmado</p>';

        historico.setAttribute('id', 'historico');
        historico.innerHTML = '<p class="p">histórico</p>';

        let dataHoje = new Date();
        dataHoje = new Date(`${dataHoje.getMonth() + 1}-${dataHoje.getDate()}-${dataHoje.getFullYear()}`);

        meus_treinos.forEach(treino => {
            user.myTrainings[treino.id] = treino;

            let li = document.createElement('li');
            let [div, div2] = create(2, 'div');
            let [p1, p2, p3, p4] = create(4, 'p');

            p1.innerText = `Musculação`;
            p2.innerText = `${treino.body.data} - ${treino.body.horario}`;
            p3.innerText = `Local: ${treino.body.local}`;
            p4.innerText = `Por: ${(type === 'client') ? treino.namePersonal : treino.nameClient}.`;

            div2.appendChild(p1);
            div2.appendChild(p2);

            div.setAttribute('class', 'treino');
            div.appendChild(div2);
            div.appendChild(p3);
            div.appendChild(p4);

            li.appendChild(div);

            //////////////////////////////////
            //transforma data do Brasil em América (dd/mm/YYYY para mm-dd-YYYY).
            let dataTreino = treino.body.data;
            let format = dataTreino.indexOf('/');
            format = dataTreino.slice(format + 1, format + 3) + '-' + (dataTreino.slice(0, format) + '-' + dataTreino.slice(format + 4));
            dataTreino = new Date(format);
            //////////////////////////////////

            if (dataTreino <= dataHoje) {
                historico.appendChild(li);
                typeLi = 'historic';
            } else if (treino.status === 'pending') {
                typeLi = 'pending';
                pendente.appendChild(li);
            } else {
                typeLi = 'resolved';
                confirmado.appendChild(li);
            }

            li.setAttribute('onclick', `${functionClick}('${treino.id}', '${typeLi}')`);
        });

        lista.appendChild(confirmado);
        lista.appendChild(pendente);
        lista.appendChild(historico);

    } finally {
        document.getElementById('lista').remove();
        document.body.appendChild(lista);

        (type === 'client') ? client = user : personal = user;

        console.log('pronto!');
    }
}
