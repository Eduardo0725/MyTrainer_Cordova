//A função "formatting(url, array)" vai procurar na url as propriedades que estão no array "textos" e retorna seus valores.
//A variável "uri" receber a url e o "textos" recebe os nomes das propriedades que serão procurados na url.
function formatting(uri, textos) {

    //A variável "symbol" indica a posição do símbolo "&" na url.
    symbol = 0;

    //A variável "array" é onde que vai receber os valores da formatação.
    array = [];

    //Cada index do array "textos" vai ser passada para a variável "texto".
    textos.forEach((texto) => {

        //Vai ser criado a variável "value" que recebe o "texto" concatenando com "=", que é o formato da propriedade na url.
        value = texto + "=";

        //O ".indexOf(string, start)" vai procurar a posição do valor do "value" na "uri",
        //e somando com o tamanho do valor do "value" usando ".length".
        value = uri.indexOf(value) + value.length;

        //Caso o ".indexOf(string, start)" não encontrar a palavra vai ter o valor de "-1".
        if (uri.indexOf("&", symbol) >= 0) {

            //O symbol vai receber o valor do ".indexOf(string, start)" que vai procurar a posição do "&" depois da posição do último "&" procurado.
            symbol = uri.indexOf("&", symbol);

            //O ".slice(start, end)" vai pegar um pedaço da url a partir de uma posição inicial ("start") até a posição final ("end"). O "end" é opcional.
            value = uri.slice(value, symbol);

            //O "array" vai adicionar os valores do "value".
            array = [...array, value];

            //O "symbol" vai receber "+ 1" para ser usado com start para procurar o próximo símbolo na url.
            symbol = symbol + 1;

        } else {
            value = uri.slice(value);
            array = [...array, value]
        }
    });

    //Depois que acabar a formatação, será retornado um array com os valores achados.
    return array;
}
