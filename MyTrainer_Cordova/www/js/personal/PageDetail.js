class PageDetail {
    start(lngLat, training, type, clickRemove) {
        // let training = myTrainings[id];
        console.log(training);

        document.querySelector('div#lista').setAttribute('class', 'hide');

        let [divMap, pageDetail, detail, divInfo, divButtons] = create(5, 'div');
        let [pData, pLocal, pClient] = create(3, 'p');
        let [buttonConfirmar, buttonCancelar] = create(2, 'button');
        let detailH1 = document.createElement('h1');

        pageDetail.setAttribute('id', 'pageDetail');
        divMap.setAttribute('id', 'map');
        detail.setAttribute('id', 'detail');
        divInfo.setAttribute('class', 'info');
        divButtons.setAttribute('class', 'buttons');
        buttonConfirmar.setAttribute('onclick',
            `personal.confirmation('${training.id}', '${training.idClient}', '${training.idPersonal}', 'resolved')`
        );
        buttonCancelar.setAttribute('onclick',
            `personal.confirmation('${training.id}', '${training.idClient}', '${training.idPersonal}', 'denied')`
        );

        detailH1.innerText = `Musculação`;
        pData.innerText = `Data: ${training.body.data} ás ${training.body.horario}.`;
        pLocal.innerText = `Local: ${training.body.local}`;
        pClient.innerText = `Cliente: ${training.nameClient}`;
        buttonConfirmar.innerText = 'Confirmar';
        buttonCancelar.innerText = 'Cancelar';

        divInfo.appendChild(pData);
        divInfo.appendChild(pLocal);
        divInfo.appendChild(pClient);
        divButtons.appendChild(buttonConfirmar);
        divButtons.appendChild(buttonCancelar);
        detail.appendChild(detailH1);
        detail.appendChild(divInfo);

        //Se o tipo do treinamento não for 'pending' os botões não vão ser colocados. 
        if (type === 'pending') detail.appendChild(divButtons);

        pageDetail.appendChild(divMap);
        pageDetail.appendChild(detail);

        document.body.appendChild(pageDetail);

        //Colocando o mapa para funcionar.
        let map = new MapBox('map', lngLat);
        let marker = new mapboxgl.Marker();
        marker.setLngLat(lngLat).addTo(map.map);

        let bar = document.querySelector("div.bar a");
        bar.removeAttribute("onclick");
        bar.innerHTML = "";
        bar.setAttribute("onclick", `${clickRemove}`);
        bar.innerHTML = '<img src="img/voltar.png" alt="close">';
    }

    remove() {
        let bar = document.querySelector("div.bar a");

        bar.removeAttribute("onclick");
        bar.innerHTML = "";

        bar.setAttribute("onclick", "openBox()");
        bar.innerHTML =
            '<img src="img/nav.png" width="30px" height="30px" alt="icone">';

        document.querySelector('div#pageDetail').remove();
        document.querySelector('div#lista').removeAttribute('class');
        return true;
    }
}