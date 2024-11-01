// Fetch quotes and characters from JSON
fetch('quotes.json')
    .then(response => response.json())
    .then(quotes => {
        populateCharacterDropdown(quotes);
        loadRandomQuotes(quotes);
        
        // Check for a character query in the URL
        const params = new URLSearchParams(window.location.search);
        const character = params.get('character');
        if (character) {
            loadCharacterQuotes(character, quotes);
        }
    })
    .catch(error => console.error('Error loading quotes:', error));

// Populate character dropdown
function populateCharacterDropdown(quotes) {
    const characterSelect = document.getElementById('character-select');
    const uniqueCharacters = [...new Set(quotes.map(q => q.character))];
    
    uniqueCharacters.forEach(character => {
        const option = document.createElement('option');
        option.value = character;
        option.textContent = character;
        characterSelect.appendChild(option);
    });

    characterSelect.addEventListener('change', (e) => {
        const selectedCharacter = e.target.value;
        if (selectedCharacter) {
            window.location.href = `?character=${encodeURIComponent(selectedCharacter)}`;
        }
    });
}

// Load random quotes on the main page
function loadRandomQuotes(quotes) {
    const container = document.getElementById('quote-container');
    container.innerHTML = ''; // Clear existing quotes

    const shuffledQuotes = quotes.sort(() => 0.5 - Math.random()).slice(0, 3);
    shuffledQuotes.forEach(displayQuote);
}

// Load quotes by character and sort by season and episode
function loadCharacterQuotes(character, quotes) {
    const container = document.getElementById('quote-container');
    container.innerHTML = `<h2>Quotes by ${character}</h2>`;

    const characterQuotes = quotes
        .filter(q => q.character === character)
        .sort((a, b) => a.season - b.season || a.episode - b.episode);

    characterQuotes.forEach(displayQuote);
}

// Display a quote
function displayQuote(quote) {
    const container = document.getElementById('quote-container');
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
    container.appendChild(quoteDiv);
}

// Initial load of random quotes
loadRandomQuotes();

// Event listener for the refresh button
document.getElementById('refresh-button').addEventListener('click', loadRandomQuotes);