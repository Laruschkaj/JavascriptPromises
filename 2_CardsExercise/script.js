// Wait for the document to load completely before executing the code
document.addEventListener('DOMContentLoaded', function () {
    // This function initializes a new deck and attaches event listener to the button
    let deckId = '';

    // Create a new deck and shuffle it
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')  // API to get a shuffled deck
        .then(response => response.json())  // Parse the response to JSON format
        .then(data => {
            // Extract deck_id from the response
            deckId = data.deck_id;
            console.log('Deck initialized with ID:', deckId);
        })
        .catch(error => console.log('Error fetching deck:', error));  // Log errors if the fetch fails

    // Attach event listener to the draw card button
    document.getElementById('drawCardButton').addEventListener('click', function () {
        drawCardFromDeck(deckId);  // Call the function to draw a card when the button is clicked
    });

    // This function fetches a card from the deck and updates the page with the card details
    function drawCardFromDeck(deckId) {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)  // API call to draw one card
            .then(response => response.json())  // Parse the response to JSON
            .then(data => {
                // Check if a card was drawn successfully
                if (data.success) {
                    // Extract the card details (value, suit, image)
                    const card = data.cards[0];
                    const cardDetails = `${card.value} of ${card.suit}`;
                    const cardImage = card.image;  // Image URL of the card

                    // Display the card details and image on the page
                    document.getElementById('cardInfo').innerHTML = `
                        <p>Card drawn: ${cardDetails}</p>
                        <img src="${cardImage}" alt="${cardDetails}" />
                    `;
                    console.log('Card drawn:', cardDetails);
                } else {
                    console.log('No more cards left in the deck!');
                }
            })
            .catch(error => console.log('Error drawing card:', error));  // Log errors if the fetch fails
    }
});
