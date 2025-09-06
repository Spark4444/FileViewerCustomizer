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
  const currentMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  let defaultValues = [
    ["#0e0e0e", "#e6e6e6"], // backgroundColor
    ["#ffffff", "#000000"], // textColor
    ["#e6e6e6", "#0e0e0e"]  // imageBackgroundColor
  ];

  function parseDefaultValue(defaultValues) {
    return defaultValues.map(value => {
        return currentMode === "dark" ? value[0] : value[1];
    });
  }

  defaultValues = parseDefaultValue(defaultValues);

  // Initialize color for the image
  function initializeColor(element, storageKey, styleProperty, defaultColor) {
    // Check if element exists
    if (element) {
        // Get the initial color from storage
      getFromChromeStorage(storageKey, (color) => {
          element.style[styleProperty] = checkIfAValueIsAColor(color, defaultColor);
      });

      // Listen for changes to the Chrome storage
      chrome.storage.onChanged.addListener((changes, namespace) => {
          if (namespace === "sync" && changes[storageKey]) {
              if (changes[storageKey].newValue !== element.style[styleProperty]) {
                  element.style[styleProperty] = checkIfAValueIsAColor(changes[storageKey].newValue, defaultColor);
              }
          }
      });
    }
  }

  // Initialize color for the main element
  initializeColor(mainElement, "backgroundColor", "backgroundColor", defaultValues[0]);

  // Initialize color for the preformatted text
  initializeColor(pre, "textColor", "color", defaultValues[1]);

  // Initialize color for the image
  initializeColor(img, "imageBackgroundColor", "backgroundColor", defaultValues[2]);
}