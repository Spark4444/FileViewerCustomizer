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

const inputs = document.querySelectorAll("input[type='color']");

// Reset buttons
const resetButtons = document.querySelectorAll(".reset");

// Reset all color pickers button
const resetAllButton = document.querySelector(".resetAll");

// Detect if the user has a dark or light theme preference
let currentMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

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

// Initialize color pickers
inputs.forEach((input, index) => {
    const defaultValues = JSON.parse(resetButtons[index].getAttribute("defaultValue"));

    initColorPicker(input.id, `value${index + 1}`, defaultValues[currentMode === "dark" ? 0 : 1]);
});

// Reset individual color pickers
resetButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const defaultValues = JSON.parse(button.getAttribute("defaultValue"));
        const colorInput = document.querySelector(`#${button.getAttribute("for")}`);
        colorInput.value = defaultValues[currentMode === "dark" ? 0 : 1];
        colorInput.dispatchEvent(new Event("input"));
    });
});

// Reset all color pickers
resetAllButton.addEventListener("click", () => {
    document.querySelectorAll("input[type='color']").forEach((input , index) => {
        const defaultValues = JSON.parse(resetButtons[index].getAttribute("defaultValue"));
        input.value = defaultValues[currentMode === "dark" ? 0 : 1];
        input.dispatchEvent(new Event("input"));
    });
});