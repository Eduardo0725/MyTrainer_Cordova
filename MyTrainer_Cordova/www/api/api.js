//A função "createUsuario(objeto)" que vai criar a conta do usuario usado o objeto passado no parametro.
async function createUsuario(arquivo) {
    
    //A variável "httpHeaders" serve para montar o um objeto para ser colocado no "headers".
    //A variável "myHeaders" recebe uma classe "Headers()" para montar o "headers" usando o objeto "httpHeaders". 
    var httpHeaders = { 'Content-Type': 'application/json', 'Accept-Charset': 'utf-8' };
    var myHeaders = new Headers(httpHeaders);
    
    //Os valores que a função "fetch(url, obj)" obter vai ser retornado, mesmo se for um erro.
    //A função "fetch(url, obj)" vai mandar para a url do firecloud um body contendo o tipo de coleção que vai ser usado e as infomações do usuario.
    return fetch('https://us-central1-pw3-pam2-bd3-01.cloudfunctions.net/create_usuario',
        {
            method: 'POST', //será utilizado o método "POST" para poder usar a propriedade "body".
            body: JSON.stringify(arquivo),
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',

        }).then(response => {

            //O "response.ok" verifica o codigo da conexão HTTP, 
            //caso a conexão não for bem sucedida vai ser "false" e interromperá com o "throw" retornando uma mensagem em formato de erro para o ".catch()".
            if (!response.ok) {
                throw new Error("HTTP error, status: " + response.status);
            }

            //Se a conexão for bem sucedida vai retornar os valores em json para o proximo ".then()"
            return response.json();

        }).then(response => { //As informações serão passadas para a variavel "response".
            console.log(response);

            //Caso o "response" tenha uma propriedade "erro" vai mostrar um "alert()" para o erro especifico e retornará false.
            if (response.erro) {
                if (response.erro == "Esse email já existe.") {
                    alert(response.erro);
                    return false;
                }
                alert("Erro no banco de dados.");
                return false;
            }

            //Caso dê tudo certo dará um ".submit()" no form.
            return document.getElementById('form').submit();;

        }).catch(erro => { //Caso dê erro na conexão com o servidor, essa função vai se iniciar passando as informações de erro para a variável "erro".
            alert("Erro na requisição.");
            console.error(erro);
            return false;
        });
}

//A função "findData(collection, id)" busca informações do usuario no banco de dados.
async function findData(collection, id) {

    //A variável "httpHeaders" serve para montar o um objeto para ser colocado no "headers".
    //A variável "myHeaders" recebe uma classe "Headers()" para montar o "headers" usando o objeto "httpHeaders". 
    var httpHeaders = { 'Content-Type': 'application/json', 'Accept-Charset': 'utf-8' };
    var myHeaders = new Headers(httpHeaders);

    //Os valores que a função "fetch(url, obj)" obter vai ser retornado, mesmo se for um erro.
    //A função "fetch(url, obj)" vai mandar para a url do firecloud um body contendo o tipo de coleção que vai ser usado e o id do usuario.
    return fetch('https://us-central1-pw3-pam2-bd3-01.cloudfunctions.net/find_data',
        {
            method: 'POST',  //será utilizado o método "POST" para poder usar a propriedade "body".
            body: JSON.stringify({
                "id": id,
                "collection": collection
            }),
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',

        }).then(response => { //Esse primeiro ".then()" vai receber a resposta que o "fetch(url, obj)" conseguiu e passá-la para a variável "response".

            //O "response.ok" verifica o codigo da conexão HTTP, 
            //caso a conexão não for bem sucedida vai ser "false" e interromperá com o "throw" retornando uma mensagem em formato de erro para o ".catch()".
            if (!response.ok) {
                throw new Error("HTTP error, status: " + response.status);
            }

            //Se a conexão for bem sucedida vai retornar os valores em json para o proximo ".then()"
            return response.json();

        }).then(response => { //As informações serão passadas para a variavel "response".
            console.log(response);

            //Caso o "response" tenha uma propriedade "erro" quer dizer que ouve um erro na conexão do servidor (firecloud) com o banco de dados (firebase).
            if (response.erro) {
                alert("Erro no banco de dados.")
                return false
            }

            //Caso não ocorra nenhum erro, vai retorna as informações obtidas.
            return response;
        })
        .catch(erro => { //Caso dê erro na conexão com o servidor, essa função vai se iniciar passando as informações de erro para a variável "erro".
            alert("Erro na requisição.");
            console.error(erro);
            return false;
        });
}

//A função "validate(collection, email, senha)" serve para o validar se a conta existe e se a senha está correta.
//O parametro "collection" serve para saber qual coleção será utilizado.
async function validate(collection, email, senha) {

    //A variável "httpHeaders" serve para montar o um objeto para ser colocado no "headers".
    //A variável "myHeaders" recebe uma classe "Headers()" para montar o "headers" usando o objeto "httpHeaders". 
    var httpHeaders = { 'Content-Type': 'application/json', 'Accept-Charset': 'utf-8' };
    var myHeaders = new Headers(httpHeaders);

    //Os valores que a função "fetch(url, obj)" obter vai ser retornado, mesmo se for um erro.
    //A função "fetch(url, obj)" vai mandar para a url do firecloud um body contendo o email, senha e o tipo de coleção que vai ser usado.
    return fetch('https://us-central1-pw3-pam2-bd3-01.cloudfunctions.net/validate_usuario',
        {
            method: 'POST', //será utilizado o método "POST" para poder usar a propriedade "body".
            body: JSON.stringify({
                "email": email,
                "collection": collection,
                "senha": senha
            }),
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
        }).then(response => {  //Esse primeiro ".then()" vai receber a resposta que o "fetch(url, obj)" conseguiu e passá-la para a variável "response".

            //O "response.ok" verifica o codigo da conexão HTTP, 
            //caso a conexão não for bem sucedida vai ser "false" e interromperá com o "throw" retornando uma mensagem em formato de erro para o ".catch()".
            if (!response.ok) {
                throw new Error("HTTP error, status: " + response.status);
            }

            //Se a conexão for bem sucedida vai retornar os valores em json para o proximo ".then()"
            return response.json();

        }).then(response => { //As informações serão passadas para a variavel "response".
            console.log(response);

            //Caso o "response" tenha uma propriedade "erro" e com o valor "Esse email não existe." quer dizer que o email solicitado não foi encontrado.
            if (response.erro == "Esse email não existe.") {
                return false
            }

            //Caso o "response" tenha uma propriedade "erro" e com o valor "Erro na conexão." quer dizer que ouve um erro na conexão do servidor (firecloud) com o banco de dados (firebase).
            if (response.erro == "Erro na conexão.") {
                return "erro";
            }

            //Caso não ocorra nenhum erro, vai retorna as informações obtidas.
            return response;
        })
        .catch(erro => { //Caso dê erro na conexão com o servidor, essa função vai se iniciar passando as informações de erro para a variável "erro".
            alert("Erro na requisição");
            console.error(erro);
            return "erro";
        });
}

//A função "Personals()" pega todos os usuarios que tem o ultimo acesso no mínimo de 1 minuto antes da hora atual.
async function Personals() {
    let httpHeaders = { 'Content-Type': 'application/json', 'Accept-Charset': 'utf-8' };
    let myHeaders = new Headers(httpHeaders);

    //Faz a formatação da data atual
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

        //Caso não tenha nada, será retornado um array vazio.
        if (response.vazio) {
            return [];
        }

        return response;
    })

    return personals;
}

