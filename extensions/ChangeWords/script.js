//Look inside the Dom and if you find the word domain change it to N
function wordchange(node){
    let N = "Xristos Loizou";
    if(node.nodeType === Node.TEXT_NODE){
        node.nodeValue = node.nodeValue.replace(/domain/gi , N);
    }
    node.childNodes.forEach(wordchange);
}

wordchange(document.body);