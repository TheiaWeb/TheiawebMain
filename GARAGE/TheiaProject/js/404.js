function isLocalStorageAvailable() {
    try {
        const testKey = "__test__";
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}

// Display a message about localStorage availability
const localStorageInfo = document.getElementById("local-storage-info");
if (isLocalStorageAvailable()) {
    localStorageInfo.textContent = "localStorage is available in this browser.";
} else {
    localStorageInfo.textContent = "localStorage is not available in this browser. The random quotes will not be saved between page reloads.";
}

// Array of quotes and authors
const quotes = [
    {
        text: "The only limit to our realization of tomorrow will be our doubts of today.",
        author: "Franklin D. Roosevelt"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney"
    },
    // Add more quotes here
];

// Function to get a random quote index
function getRandomQuoteIndex() {
    return Math.floor(Math.random() * quotes.length);
}

// Function to display a random quote
function displayQuote() {
    const randomQuoteIndex = getRandomQuoteIndex();
    document.getElementById("quote").textContent = quotes[randomQuoteIndex].text;
    document.getElementById("author").textContent = "- " + quotes[randomQuoteIndex].author;
}

// Display a random quote on page load
document.addEventListener("DOMContentLoaded", displayQuote);