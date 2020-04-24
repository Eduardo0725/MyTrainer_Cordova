async function findData(collection, id) {
    var httpHeaders = { 'Content-Type': 'application/json', 'Accept-Charset': 'utf-8' };
    var myHeaders = new Headers(httpHeaders);
    return fetch('https://us-central1-pw3-pam2-bd3-01.cloudfunctions.net/find_data',
        {
            method: 'POST',
            body: JSON.stringify({
                "id": id,
                "collection": collection
            }),
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',

        }).then(response => {

            if (!response.ok) {
                throw new Error("HTTP error, status: " + response.status);
            }

            return response.json();
        }).then(response => {
            console.log(response);

            if (response.erro) {
                alert("Erro no banco de dados.")
                return false
            }

            return response;
        })
        .catch(erro => {
            alert("Erro na requisição.");
            console.error(erro);
            return false;
        });
}

async function validate(collection, email, senha) {
    var httpHeaders = { 'Content-Type': 'application/json', 'Accept-Charset': 'utf-8' };
    var myHeaders = new Headers(httpHeaders);
    return fetch('https://us-central1-pw3-pam2-bd3-01.cloudfunctions.net/validate_usuario',
        {
            method: 'POST',
            body: JSON.stringify({
                "email": email,
                "collection": collection,
                "senha": senha
            }),
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',

        }).then(response => {
            if (!response.ok) {
                throw new Error("HTTP error, status: " + response.status);
            }
            return response.json();
        }).then(response => {
            console.log(response);

            if (response.erro == "Esse email não existe.") {
                return false
            }

            if (response.erro == "Erro na conexão.") {
                return "erro";
            }

            return response;
        })
        .catch(erro => {
            alert("Erro na requisição");
            console.error(erro);
            return "erro";
        });
}


async function Personals() {
    let httpHeaders = { 'Content-Type': 'application/json', 'Accept-Charset': 'utf-8' };
    let myHeaders = new Headers(httpHeaders);

    data = new Date;
    let visto_por_ultimo = [
        {
            dia: data.getDate(),
            mes: data.getMonth() + 1,
            ano: data.getFullYear()
        },
        {
            hora: data.getHours(),
            min: data.getMinutes(),
        }
    ];

    let personals = await fetch('https://us-central1-pw3-pam2-bd3-01.cloudfunctions.net/fetch_personals', {
        method: 'POST',
        body: JSON.stringify({
            id: cliente[0],
            ultimo_acesso: visto_por_ultimo
        }),
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    }).then(response => {
        return response.json();
    }).then(response => {
        console.log(response);
        if (response.vazio) {
            return [];
        }
        return response;
    })

    return personals;
}

