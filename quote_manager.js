function loadRandomQuotes() {
    fetch('quotes.json')
        .then(response => response.json())
        .then(quotes => {
            const container = document.getElementById('quote-container');
            container.innerHTML = ''; // Clear existing quotes

            // Randomly shuffle the array of quotes
            const shuffledQuotes = quotes.sort(() => 0.5 - Math.random());

            // Get up to 10 quotes from the shuffled list
            const randomQuotes = shuffledQuotes.slice(0, 10);

            // Display each quote
            randomQuotes.forEach(quote => {
                const quoteDiv = document.createElement('div');
                quoteDiv.style.display = 'flex'; // Use flexbox for layout
                quoteDiv.style.alignItems = 'flex-start'; // Align items at the top
                quoteDiv.style.marginBottom = '20px';
                quoteDiv.style.borderLeft = '4px solid #ff5733'; // Same color as before
                quoteDiv.style.paddingLeft = '10px';

                // Create an image element for the character picture
                const img = document.createElement('img');
                img.src = `characters/${quote.character.toLowerCase().replace(/ /g, '_')}.png`; // Assuming images are named in lowercase and with underscores
                img.alt = quote.character;
                img.style.width = '50px'; // Set a fixed size for character image
                img.style.height = 'auto'; // Maintain aspect ratio
                img.style.marginRight = '10px'; // Spacing between image and quote

                // Quote text
                const quoteText = document.createElement('p');
                quoteText.textContent = quote.quote;
                quoteText.style.fontSize = '1.5em'; // Increase font size for the quote
                quoteText.style.margin = '0'; // Remove default margin

                // Quote details (author, season, episode)
                const detailsText = document.createElement('p');
                detailsText.textContent = `${quote.character} - Season ${quote.season}, Episode ${quote.episode}`;
                detailsText.style.fontSize = '0.8em'; // Smaller font size
                detailsText.style.fontStyle = 'italic'; // Italicize the details
                detailsText.style.margin = '5px 0 0 0'; // Adjust margins

                // Append elements to the quoteDiv
                quoteDiv.appendChild(img);
                quoteDiv.appendChild(quoteText);
                quoteDiv.appendChild(detailsText);

                // Append the quoteDiv to the container
                container.appendChild(quoteDiv);
            });
        })
        .catch(error => {
            console.error('Error loading quotes:', error);
        });
}

// Initial load of random quotes
loadRandomQuotes();

// Event listener for the refresh button
document.getElementById('refresh-button').addEventListener('click', loadRandomQuotes);