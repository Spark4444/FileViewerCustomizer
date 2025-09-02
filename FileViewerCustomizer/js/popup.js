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

// Initialize color picker for the main element
function initColorPicker(inputId, valueId, defaultColor) {
    getFromChromeStorage(inputId, (color) => {
        const input = document.querySelector(`#${inputId}`);
        const valueDiv = document.querySelector(`#${valueId}`);

        input.value = checkIfAValueIsAColor(color, defaultColor);
        valueDiv.textContent = input.value;

        // Debounce to not exceed the chrome storage API call limit
        let timeOut;
        let debounce = 100;

        // Listen for changes to the color input
        input.addEventListener("input", (event) => {
            const color = event.target.value;
            valueDiv.innerHTML = color;
            clearTimeout(timeOut);
            timeOut = setTimeout(() => {
                saveToChromeStorage(inputId, color);
            }, debounce);
        });
    });
}

// Initialize the background color input
initColorPicker("backgroundColor", "value1", "#000000");

// Initialize the text color input
initColorPicker("textColor", "value2", "#ffffff");

// Initialize the image background color input
initColorPicker("imageBackgroundColor", "value3", "#ffffff");