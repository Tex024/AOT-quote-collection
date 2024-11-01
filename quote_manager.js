// Fetch quotes from JSON and initialize the page
fetch('quotes.json')
    .then(response => response.json())
    .then(quotes => {
        displayFeaturedQuote(quotes);
        displayAllQuotes(quotes);

        // Event listener to refresh the featured quote
        document.getElementById('refresh-button').addEventListener('click', () => {
            displayFeaturedQuote(quotes);
        });
    })
    .catch(error => console.error('Error loading quotes:', error));

// Display a random featured quote
function displayFeaturedQuote(quotes) {
    const container = document.getElementById('featured-quote-container');
    container.innerHTML = ''; // Clear the current featured quote

    // Get a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteDiv = createQuoteElement(randomQuote);
    quoteDiv.classList.add('featured-quote'); // Add a class for styling the featured quote

    container.appendChild(quoteDiv);
}

// Display all quotes below the featured quote
function displayAllQuotes(quotes) {
    const container = document.getElementById('all-quotes-container');
    container.innerHTML = ''; // Clear existing quotes

    quotes.forEach(quote => {
        const quoteDiv = createQuoteElement(quote);
        quoteDiv.classList.add('all-quote'); // Add a class for styling individual quotes
        container.appendChild(quoteDiv);
    });
}

// Function to create and return a quote element
function createQuoteElement(quote) {
    const quoteDiv = document.createElement('div');
    quoteDiv.classList.add('quote-box'); // Add a general class for styling

    const img = document.createElement('img');
    img.src = `characters/${quote.character.toLowerCase().replace(/ /g, '_')}.png`;
    img.alt = quote.character;
    img.style.width = '50px';
    img.style.marginRight = '10px';

    const quoteText = document.createElement('p');
    quoteText.textContent = `"${quote.quote}"`;
    quoteText.style.fontStyle = 'italic';

    const detailsDiv = document.createElement('p');
    detailsDiv.textContent = `${quote.character} - Season ${quote.season}, Episode ${quote.episode}`;
    detailsDiv.style.fontSize = '0.8em';

    const textContainer = document.createElement('div');
    textContainer.appendChild(quoteText);
    textContainer.appendChild(detailsDiv);

    quoteDiv.appendChild(img);
    quoteDiv.appendChild(textContainer);

    return quoteDiv;
}