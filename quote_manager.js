function loadRandomQuotes() {
    fetch('quotes.json')
        .then(response => response.json())
        .then(quotes => {
            const container = document.getElementById('quote-container');
            container.innerHTML = ''; // Clear existing quotes

            // Randomly shuffle the array of quotes
            const shuffledQuotes = quotes.sort(() => 0.5 - Math.random());

            // Get up to 10 quotes from the shuffled list
            const randomQuotes = shuffledQuotes.slice(0, 3);

            // Display each quote
            randomQuotes.forEach(quote => {
                const quoteDiv = document.createElement('div');
                quoteDiv.style.marginBottom = '20px';
                quoteDiv.style.borderLeft = '4px solid #ff5733'; // Color for the border
                quoteDiv.style.paddingLeft = '10px';
                quoteDiv.style.display = 'flex'; // Use flexbox for layout
                quoteDiv.style.alignItems = 'flex-start'; // Align items at the top

                // Create an image element for the character picture
                const img = document.createElement('img');
                img.src = `characters/${quote.character.toLowerCase().replace(/ /g, '_')}.png`; // Assuming images are named in lowercase and with underscores
                img.alt = quote.character;
                img.style.width = '50px'; // Set a fixed size for character image
                img.style.height = 'auto'; // Maintain aspect ratio
                img.style.marginRight = '10px'; // Spacing between image and quote

                // Quote text
                const quoteText = document.createElement('p');
                quoteText.textContent = `"${quote.quote}"`;
                quoteText.style.fontSize = '1.5em'; // Increase font size for the quote
                quoteText.style.margin = '0'; // Remove default margin

                // Quote details (author, season, episode)
                const detailsDiv = document.createElement('div');
                detailsDiv.style.fontSize = '0.8em'; // Smaller font size
                detailsDiv.style.fontStyle = 'italic'; // Italicize the details
                detailsDiv.style.marginTop = '5px'; // Margin on top
                detailsDiv.textContent = `${quote.character} - Season ${quote.season}, Episode ${quote.episode}`;


                // Append elements to the quoteDiv
                quoteDiv.appendChild(img);
                quoteDiv.appendChild(quoteText);
                quoteDiv.appendChild(detailsDiv);

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