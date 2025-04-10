// Global array to store Pokémon names and URLs
let allPokemon = [];

// Function to fetch the list of all Pokémon names and URLs
function fetchPokemonList() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')  // Fetching the first 1000 Pokémon
        .then(response => response.json())
        .then(data => {
            allPokemon = data.results;  // Store the results in the allPokemon array
            console.log('Fetched all Pokémon:', allPokemon); // Log to verify the fetched data
        })
        .catch(error => console.log('Error fetching Pokémon list:', error));
}

// Function to get random Pokémon (ensures uniqueness)
function getRandomPokemon() {
    const randomPokemon = [];
    while (randomPokemon.length < 3) {
        const randomIndex = Math.floor(Math.random() * allPokemon.length);
        const selectedPokemon = allPokemon[randomIndex];
        // Ensure uniqueness by checking the URL
        if (!randomPokemon.some(p => p.url === selectedPokemon.url)) {
            randomPokemon.push(selectedPokemon);
        }
    }
    return randomPokemon;
}

// Function to fetch species data for each Pokémon and display a description
function fetchSpeciesData(pokemonUrl, pokemonDescription) {
    fetch(pokemonUrl)
        .then(response => response.json())
        .then(data => {
            const speciesUrl = data.species.url;  // Get species URL from Pokémon data
            return fetch(speciesUrl);
        })
        .then(response => response.json())
        .then(speciesData => {
            const flavorText = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
            if (flavorText) {
                pokemonDescription.textContent = flavorText.flavor_text; // Display description
            }
        })
        .catch(error => console.log('Error fetching species data:', error));
}

// Function to display random Pokémon data on the page
function displayRandomPokemon() {
    const pokemonContainer = document.getElementById('pokemon-container');
    pokemonContainer.innerHTML = ''; // Clear previous Pokémon

    const randomPokemon = getRandomPokemon();
    randomPokemon.forEach(pokemon => {
        const pokemonUrl = pokemon.url;
        fetch(pokemonUrl)
            .then(response => response.json())
            .then(data => {
                const pokemonDiv = document.createElement('div');
                pokemonDiv.classList.add('pokemon');

                const pokemonImage = `<img src="${data.sprites.front_default}" alt="${data.name}">`;
                const pokemonName = `<h2>${data.name}</h2>`;
                const pokemonDescription = document.createElement('p');
                pokemonDescription.textContent = 'Loading description...';

                // Fetch species description and update the UI
                fetchSpeciesData(pokemonUrl, pokemonDescription);

                pokemonDiv.innerHTML = pokemonImage + pokemonName;
                pokemonDiv.appendChild(pokemonDescription);
                pokemonContainer.appendChild(pokemonDiv);
            })
            .catch(error => console.log('Error fetching Pokémon data:', error));
    });
}

// Event listener for the button to fetch random Pokémon data
document.getElementById('fetch-pokemon').addEventListener('click', displayRandomPokemon);

// Start by fetching the Pokémon list when the page loads
window.onload = fetchPokemonList;
