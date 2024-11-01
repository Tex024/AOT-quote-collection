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
                img.src = `./characters/${quote.character.toLowerCase().replace(/ /g, '_')}.png`; // Assuming images are named in lowercase and with underscores
                img.alt = quote.character;
                img.style.width = '50px'; // Set a fixed size for character image
                img.style.height = 'auto'; // Maintain aspect ratio
                img.style.marginRight = '10px'; // Spacing between image and quote

                // Quote text with quotation marks
                const quoteText = document.createElement('p');
                quoteText.textContent = `"${quote.quote}"`; // Add quotation marks
                quoteText.style.fontSize = '1.5em'; // Increase font size for the quote
                quoteText.style.margin = '0'; // Remove default margin
                quoteText.style.fontStyle = 'italic'; // Italicize the quote

                // Quote details (author, season, episode) in a new div
                const detailsDiv = document.createElement('p');
                detailsDiv.style.fontSize = '0.8em'; // Smaller font size
                detailsDiv.style.margin = '5px 0 0 0'; // Margin on top
                detailsDiv.textContent = `${quote.character} - Season ${quote.season}, Episode ${quote.episode}`;

                // Create a container for quote text and details
                const textContainer = document.createElement('div');
                textContainer.style.flexGrow = '1'; // Allow this div to grow to fill the space
                textContainer.style.marginLeft = '10px'; // Space between the image and text
              
                // Append quote text and details to the textContainer
                textContainer.appendChild(quoteText);
                textContainer.appendChild(detailsDiv);

                // Append image and textContainer to the quoteDiv
                quoteDiv.appendChild(img);
                quoteDiv.appendChild(textContainer);

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