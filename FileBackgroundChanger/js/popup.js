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

// Initialize the background color input
getFromChromeStorage("backgroundColor", (color) => {
    const inputBackgroundColor = document.getElementById("backgroundColor");
    inputBackgroundColor.value = checkIfAValueIsAColor(color, "#000000");

    // Debounce to not exceed the chrome storage API call limit
    let timeOut;
    let debounce = 100;

    // Listen for changes to the background color input
    inputBackgroundColor.addEventListener("input", (event) => {
        const color = event.target.value;
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            saveToChromeStorage("backgroundColor", color);
        }, debounce);
    });
});