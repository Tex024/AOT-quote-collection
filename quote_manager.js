// All quotes data
let allQuotes = [];

// Fetch quotes from JSON and initialize the page
fetch('quotes.json')
    .then(response => response.json())
    .then(quotes => {
        allQuotes = quotes;
        populateCharacterFilter(quotes);
        populateSeasonFilter(quotes);
        displayFeaturedQuote();
        displayAllQuotes();

        document.getElementById('refresh-button').addEventListener('click', displayFeaturedQuote);
        document.getElementById('character-select').addEventListener('change', updateQuotes);
        document.getElementById('season-select').addEventListener('change', updateQuotes);
        document.getElementById('episode-select').addEventListener('change', updateQuotes);
    })
    .catch(error => console.error('Error loading quotes:', error));

// Populate character filter
function populateCharacterFilter(quotes) {
    const characters = Array.from(new Set(quotes.map(quote => quote.character))).sort();
    const characterSelect = document.getElementById('character-select');
    characterSelect.innerHTML = '<option value="">None</option>'; // Add a "None" option
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
    seasonSelect.innerHTML = '<option value="">None</option>'; // Add a "None" option
    seasons.forEach(season => {
        const option = document.createElement('option');
        option.value = season;
        option.textContent = `Season ${season}`;
        seasonSelect.appendChild(option);
    });
}

// Update quotes based on current filters
function updateQuotes() {
    const filteredQuotes = getFilteredQuotes();
    displayFeaturedQuote(filteredQuotes);
    displayAllQuotes(filteredQuotes);
}

// Get filtered quotes based on character, season, and episode
function getFilteredQuotes() {
    const character = document.getElementById('character-select').value;
    const season = document.getElementById('season-select').value;
    const episode = document.getElementById('episode-select').value;

    return allQuotes.filter(quote => {
        return (!character || quote.character === character) &&
               (!season || quote.season == season) &&
               (!episode || quote.episode == episode);
    });
}

// Display a random featured quote
function displayFeaturedQuote(filteredQuotes = allQuotes) {
    const container = document.getElementById('featured-quote-container');
    container.innerHTML = '';

    const applicableQuotes = getFilteredQuotes();
    if (applicableQuotes.length > 0) {
        const randomQuote = applicableQuotes[Math.floor(Math.random() * applicableQuotes.length)];
        const quoteDiv = createQuoteElement(randomQuote);
        quoteDiv.classList.add('featured-quote');
        container.appendChild(quoteDiv);
    }
}

// Display all quotes below the featured quote
function displayAllQuotes(filteredQuotes = allQuotes) {
    const container = document.getElementById('all-quotes-container');
    container.innerHTML = '';

    const applicableQuotes = getFilteredQuotes();
    applicableQuotes.forEach(quote => {
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
