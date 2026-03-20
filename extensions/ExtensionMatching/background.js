chrome.runtime.onMessage.addListener((message,sender ,sendResponse) => {
  //only process the message with the correct type you see below
  fetch('http://localhost:3000/match', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dom: message.dom })
  })
    //convert it to json to be able to send it to the server and use it
    .then(res => res.json())
    //if matching data is found log it in the service worker console 
    //(extensions page there is a hyperlink press it to see the logs )
    .then(data => {
      console.log('[Matches From Background]:', data);
      sendResponse(data);
    })
    .catch(err => {
      console.error('Error:', err);
      sendResponse({ error: err.message });
    });

  return true; 
});