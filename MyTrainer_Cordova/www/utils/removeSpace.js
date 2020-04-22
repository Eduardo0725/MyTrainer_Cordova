function removeSpace(textos){
    array = [];
    textos.forEach(doc => {
        doc = doc.replace("+"," ");
        array = [...array, doc];
    });
    return array;
}