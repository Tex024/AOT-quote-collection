// Fetch the quotes data from the JSON file
fetch('../quotes.json')
    .then(response => response.json())
    .then(quotes => {
        const container = document.getElementById('quote-container');

        // Loop through each quote and create HTML elements to display them
        quotes.forEach(quote => {
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