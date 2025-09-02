// Only run extension logic if on a local file (file:// scheme)
const isLocalFile = location.protocol === 'file:';
const isDirectFile =
  location.protocol.startsWith('http') &&
  document.contentType &&
  document.contentType !== 'text/html';

if (isLocalFile || isDirectFile) {
  // Function to save data to Chrome storage
  function saveToChromeStorage(key, value) {
      chrome.storage.sync.set({[key]: value});
  }

  // Function to get data from Chrome storage
  function getFromChromeStorage(key, callback) {
      chrome.storage.sync.get([key], function(result) {
          callback(result[key]);
      });
  }

  // Function to clear all data from Chrome storage
  function clearChromeStorage() {
      chrome.storage.sync.clear();
  }

  // Checks if a chrome storage value is set
  function checkIfAValueIsAColor(value, defaultValue){
      if(CSS.supports("color", value)){
          return value;
      }
      else{
          return defaultValue;
      }
  }

  // Get the main element to change the background color, if it's a SVG then there will be no body and html etc
  const mainElement = document.body || document.querySelector("svg");
  let currentColor = "#000000";

  // Initialize the background color
  getFromChromeStorage("backgroundColor", (color) => {
      currentColor = checkIfAValueIsAColor(color, "#000000");
      mainElement.style.backgroundColor = currentColor;
  });

  // Listen for changes to the Chrome storage
  chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === "sync" && changes.backgroundColor) {
        if (changes.backgroundColor.newValue !== currentColor) {
          currentColor = checkIfAValueIsAColor(changes.backgroundColor.newValue, "#000000");
          mainElement.style.backgroundColor = currentColor;
        }
      }
  });
}