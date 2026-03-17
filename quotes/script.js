const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const button = document.getElementById('newQuoteBtn');

// Function to fetch quote from a public API
async function getQuote() {
    // Show a loading state
    button.innerText = "Loading...";
    button.disabled = true;

    try {
        // We're using a free public API (Quotable is a popular one)
        const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/random'));
        
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const quoteData = JSON.parse(data.contents)[0];

        // Update the UI
        quoteText.innerText = `"${quoteData.q}"`;
        authorText.innerText = `- ${quoteData.a}`;

    } catch (error) {
        quoteText.innerText = "Oops! Something went wrong.";
        authorText.innerText = "- Error";
        console.error("Error fetching quote:", error);
    } finally {
        // Reset button state
        button.innerText = "New Quote";
        button.disabled = false;
    }
}

// Get a quote immediately when the page loads
getQuote();