// function formatting(uri, textos){
//     symbol = 0;
//     array = [];
//     textos.forEach((texto, index) => {
//         value = texto + "=";
//         value = uri.indexOf(value) + value.length;
        
//         if(index == textos.length -1){
//             value = uri.slice(value);
//             array = [...array, texto = value]
//         }else{
//             symbol = uri.indexOf("&", symbol);
//             value = uri.slice(value, symbol)
//             array = [...array, texto = value]
//             symbol = symbol + 1;
//         }
//     });
//     return array;
// }

function formatting(uri, textos){
    symbol = 0;
    array = [];
    textos.forEach((texto) => {
        value = texto + "=";
        value = uri.indexOf(value) + value.length;
        
        if(uri.indexOf("&", symbol) >= 0){
            symbol = uri.indexOf("&", symbol);
            value = uri.slice(value, symbol)
            array = [...array, value]
            symbol = symbol + 1;
        }else{
            value = uri.slice(value);
            array = [...array, value]
        }
    });
    return array;
}
