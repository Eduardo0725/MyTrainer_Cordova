//O "addSpace" troca o sinal de soma ("+") por um espaço (" ").
//O parametro "textos" é um array
function addSpace(textos) {

    //A variável "array" pegará os valores depois de formatados.
    array = [];

    //Cada index do array "textos" serão passados para a variável "doc".
    textos.forEach(doc => {
        //O "for" fará a repetição caso exista mais de um sinal de soma ("+") na string.
        for (i = false; i == false;) {

            //O ".replace(string, subs)" substituirá o primeiro caracter do valor do "doc" que for igual a string do primeiro parametro pela string do segundo parametro.
            doc = doc.replace("+", " ");

            //Se não encontrar o sinal de soma ("+") vai parar o ciclo, senão o ciclo se repetirá.
            if (doc.indexOf("+") == -1) {
                i = true;
            }
        }

        //Se o ciclo terminar será adicionado o valor no array "array".
        array = [...array, doc];
    });

    //Quando acabar de formatar todos os index, o array "array" será retornado.
    return array;
}