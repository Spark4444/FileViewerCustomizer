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
  const pre = document.querySelector("pre");
  const img = document.querySelector("img");
  let currentColor = "#000000";
  let currentTextColor = "#ffffff";
  let currentImageBackgroundColor = "#ffffff";

  if (mainElement) {
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

  if (pre) {
    // Get the text color
    getFromChromeStorage("textColor", (color) => {
        currentTextColor = checkIfAValueIsAColor(color, "#ffffff");
        pre.style.color = currentTextColor;
    });

    // Listen for changes to the Chrome storage
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === "sync" && changes.textColor) {
            if (changes.textColor.newValue !== currentTextColor) {
                currentTextColor = checkIfAValueIsAColor(changes.textColor.newValue, "#ffffff");
                pre.style.color = currentTextColor;
            }
        }
    });
  }

  if (img) {
    // Get the image background color
    getFromChromeStorage("imageBackgroundColor", (color) => {
        currentImageBackgroundColor = checkIfAValueIsAColor(color, "#ffffff");
        img.style.backgroundColor = currentImageBackgroundColor;
    });

    // Listen for changes to the Chrome storage
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === "sync" && changes.imageBackgroundColor) {
            if (changes.imageBackgroundColor.newValue !== currentImageBackgroundColor) {
                currentImageBackgroundColor = checkIfAValueIsAColor(changes.imageBackgroundColor.newValue, "#ffffff");
                img.style.backgroundColor = currentImageBackgroundColor;
            }
        }
    });
  }
}