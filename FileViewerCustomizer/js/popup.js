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
    const inputBackgroundColor = document.querySelector("#backgroundColor");
    const valueDiv = document.querySelectorAll("#value")[0];

    inputBackgroundColor.value = checkIfAValueIsAColor(color, "#000000");
    valueDiv.textContent = inputBackgroundColor.value;

    // Debounce to not exceed the chrome storage API call limit
    let timeOut;
    let debounce = 100;

    // Listen for changes to the background color input
    inputBackgroundColor.addEventListener("input", (event) => {
        const color = event.target.value;
        valueDiv.innerHTML = color;
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            saveToChromeStorage("backgroundColor", color);
        }, debounce);
    });
});

getFromChromeStorage("textColor", (color) => {
    const inputTextColor = document.querySelector("#textColor");
    const valueDiv = document.querySelectorAll("#value")[1];

    inputTextColor.value = checkIfAValueIsAColor(color, "#ffffff");
    valueDiv.textContent = inputTextColor.value;

    // Debounce to not exceed the chrome storage API call limit
    let timeOut;
    let debounce = 100;

    // Listen for changes to the text color input
    inputTextColor.addEventListener("input", (event) => {
        const color = event.target.value;
        valueDiv.innerHTML = color;
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            saveToChromeStorage("textColor", color);
        }, debounce);
    });
});

getFromChromeStorage("imageBackgroundColor", (color) => {
    const inputImageBackgroundColor = document.querySelector("#imageBackgroundColor");
    const valueDiv = document.querySelectorAll("#value")[2];

    inputImageBackgroundColor.value = checkIfAValueIsAColor(color, "#ffffff");
    valueDiv.textContent = inputImageBackgroundColor.value;

    // Debounce to not exceed the chrome storage API call limit
    let timeOut;
    let debounce = 100;

    // Listen for changes to the image background color input
    inputImageBackgroundColor.addEventListener("input", (event) => {
        const color = event.target.value;
        valueDiv.innerHTML = color;
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            saveToChromeStorage("imageBackgroundColor", color);
        }, debounce);
    });
});