//create script element then convert it into a url so the browser can use it
//then append the script into the dom

const script = document.createElement("script");
script.src = chrome.runtime.getURL("script.js");
(document.head || document.documentElement).appendChild(script);
