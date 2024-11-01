// All quotes data 
let allQuotes = [];

// Fetch quotes from JSON and initialize the page
fetch('quotes.json')
    .then(response => response.json())
    .then(quotes => {
        allQuotes = quotes;
        populateCharacterFilter(quotes);
        populateSeasonFilter(quotes);
        displayFeaturedQuote(getFilteredQuotes());
        displayAllQuotes(getFilteredQuotes());

        document.getElementById('refresh-button').addEventListener('click', () => {
            displayFeaturedQuote(getFilteredQuotes());
        });

        // Event listeners for filtering
        document.getElementById('character-select').addEventListener('change', handleFilterChange);
        document.getElementById('season-select').addEventListener('change', handleFilterChange);
    })
    .catch(error => console.error('Error loading quotes:', error));

// Populate character filter
function populateCharacterFilter(quotes) {
    const characters = Array.from(new Set(quotes.map(quote => quote.character))).sort();
    const characterSelect = document.getElementById('character-select');
    characters.forEach(character => {
        const option = document.createElement('option');
        option.value = character;
        option.textContent = character;
        characterSelect.appendChild(option);
    });
}

// Populate season filter
function populateSeasonFilter(quotes) {
    const seasons = Array.from(new Set(quotes.map(quote => quote.season))).sort((a, b) => a - b);
    const seasonSelect = document.getElementById('season-select');
    seasons.forEach(season => {
        const option = document.createElement('option');
        option.value = season;
        option.textContent = `Season ${season}`;
        seasonSelect.appendChild(option);
    });
}

// Handle filter changes
function handleFilterChange() {
    displayFeaturedQuote(getFilteredQuotes());
    displayAllQuotes(getFilteredQuotes());
}

// Get filtered quotes based on character, season
function getFilteredQuotes() {
    const character = document.getElementById('character-select').value;
    const season = document.getElementById('season-select').value;

    return allQuotes.filter(quote => {
        return (!character || quote.character === character) &&
               (!season || quote.season == season);
    });
}

// Display a random featured quote
function displayFeaturedQuote(filteredQuotes) {
    const container = document.getElementById('featured-quote-container');
    container.innerHTML = '';

    if (filteredQuotes.length > 0) {
        const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
        const quoteDiv = createQuoteElement(randomQuote);
        quoteDiv.classList.add('featured-quote');
        container.appendChild(quoteDiv);
    }
}

// Display all quotes below the featured quote
function displayAllQuotes(filteredQuotes) {
    const container = document.getElementById('all-quotes-container');
    container.innerHTML = '';

    // Sort quotes by season and episode before displaying
    const sortedQuotes = filteredQuotes.sort((a, b) => {
        if (a.season !== b.season) {
            return a.season - b.season; // Sort by season first
        } else {
            return a.episode - b.episode; // Sort by episode if seasons are the same
        }
    });

    sortedQuotes.forEach(quote => {
        const quoteDiv = createQuoteElement(quote);
        quoteDiv.classList.add('all-quote');
        container.appendChild(quoteDiv);
    });
}

// Create and return a quote element
function createQuoteElement(quote) {
    const quoteDiv = document.createElement('div');
    quoteDiv.classList.add('quote-box');

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