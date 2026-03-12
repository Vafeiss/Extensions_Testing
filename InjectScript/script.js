//Create a function that will do lower -> upper case in the body of the 
// website that is loaded.

function uppercaseconvertion(node){
    if(node.nodeType === Node.TEXT_NODE){
        node.nodeValue = node.nodeValue.toUpperCase();
    }
    node.childNodes.forEach(uppercaseconvertion);
}

uppercaseconvertion(document.body);


