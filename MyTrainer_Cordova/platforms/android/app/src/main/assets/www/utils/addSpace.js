function addSpace(textos){
    array = [];
    textos.forEach(doc => {
        for(i=false;i==false;){
            doc = doc.replace("+"," ");
            if(doc.indexOf("+") == -1){
                i = true;
            }
        }
        array = [...array, doc];
    });
    return array;
}