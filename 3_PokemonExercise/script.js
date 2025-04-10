// Global array to store Pokémon names and URLs
let allPokemon = [];

// Step 1: Function to fetch the list of all Pokémon names and URLs
function fetchPokemonList() {
    // Fetch the list of Pokémon (1000 by default in this example)
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
        .then(response => response.json())
        .then(data => {
            // Store the Pokémon names and URLs in the allPokemon array
            allPokemon = data.results;
            console.log('Fetched all Pokémon:', allPokemon); // Log the list for debugging
        })
        .catch(error => console.log('Error fetching Pokémon list:', error)); // Handle errors
}

// Step 2: Function to pick three random Pokémon from the list
function getRandomPokemon() {
    const randomPokemon = [];  // Initialize an empty array to store random Pokémon
    while (randomPokemon.length < 3) { // Keep adding until we have 3 unique Pokémon
        const randomIndex = Math.floor(Math.random() * allPokemon.length); // Pick a random index
        if (!randomPokemon.includes(allPokemon[randomIndex])) { // Ensure no duplicates
            randomPokemon.push(allPokemon[randomIndex]); // Add to the list
        }
    }
    return randomPokemon; // Return the array of 3 random Pokémon
}

// Step 3: Function to fetch species data for each Pokémon
function fetchSpeciesData(pokemonUrl, pokemonDescriptionElement) {
    // Fetch the species data for the selected Pokémon
    fetch(pokemonUrl)
        .then(response => response.json())
        .then(data => {
            const speciesUrl = data.species.url;  // Get the species URL from the Pokémon data
            return fetch(speciesUrl); // Fetch the species data
        })
        .then(response => response.json())
        .then(speciesData => {
            // Search for the English description in the flavor_text_entries
            const flavorText = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
            if (flavorText) {
                // If an English description is found, update the description on the UI
                pokemonDescriptionElement.textContent = flavorText.flavor_text;
                console.log(`${data.name}: ${flavorText.flavor_text}`); // Log the name and description
            } else {
                // If no English description is found, provide a fallback message
                pokemonDescriptionElement.textContent = 'Description not available.';
            }
        })
        .catch(error => console.log('Error fetching species data:', error)); // Handle errors
}

// Step 4: Function to display random Pokémon data on the page
function displayRandomPokemon() {
    const randomPokemon = getRandomPokemon(); // Get three random Pokémon

    // Loop through each random Pokémon
    randomPokemon.forEach(pokemon => {
        const pokemonUrl = pokemon.url; // Get the URL of the Pokémon

        // Fetch the data for each Pokémon
        fetch(pokemonUrl)
            .then(response => response.json())
            .then(data => {
                // Create a new div element to hold the Pokémon data
                const pokemonDiv = document.createElement('div');
                pokemonDiv.classList.add('pokemon'); // Add a class for styling

                // Create the image and name of the Pokémon
                const pokemonImage = `<img src="${data.sprites.front_default}" alt="${data.name}">`;
                const pokemonName = `<h2>${data.name}</h2>`;

                // Create a paragraph element to display the description
                const pokemonDescription = document.createElement('p');
                pokemonDescription.textContent = 'Loading description...'; // Set initial text while loading the description

                // Fetch the species data and update the description
                fetchSpeciesData(pokemonUrl, pokemonDescription);

                // Append the Pokémon image, name, and description to the div
                pokemonDiv.innerHTML = pokemonImage + pokemonName;
                pokemonDiv.appendChild(pokemonDescription);

                // Append the Pokémon div to the document body (to display it on the page)
                document.body.appendChild(pokemonDiv);
            })
            .catch(error => console.log('Error fetching Pokémon data:', error)); // Handle errors
    });
}

// Event listener for the button to fetch random Pokémon data
document.getElementById('fetchButton').addEventListener('click', displayRandomPokemon);

// Step 5: Initialize the Pokémon list fetching when the page loads
window.onload = fetchPokemonList; // Fetch the list of all Pokémon when the page loads
