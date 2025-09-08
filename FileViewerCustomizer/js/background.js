// Listen for extension installation/update
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
     // Open welcome page on first install
        chrome.tabs.create({
            url: chrome.runtime.getURL("welcome/index.html")
        });
  }
});