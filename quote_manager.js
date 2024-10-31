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
                quoteDiv.innerHTML = `
                    <p><strong>Quote:</strong> "${quote.quote}"</p>
                    <p><strong>Character:</strong> ${quote.character}</p>
                    <p><strong>Season:</strong> ${quote.season}</p>
                    <p><strong>Episode:</strong> ${quote.episode}</p>
                    <hr>
                `;
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