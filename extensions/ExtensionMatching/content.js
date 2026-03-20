(async () => {
  const dom = document.documentElement.innerHTML;

  const response = await chrome.runtime.sendMessage({ dom });
  console.log('Matches:', response);
})();