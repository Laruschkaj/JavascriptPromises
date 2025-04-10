// Define a favorite number
const favoriteNumber = 22;

// Function to get a fact about a number from the Numbers API
function getNumberFact(number) {
    // Returning a new Promise
    return new Promise((resolve, reject) => {
        // Fetch request to the Numbers API with the json query to get the data as JSON
        fetch(`http://numbersapi.com/${number}?json`)
            .then(response => response.json()) // Parse the response as JSON
            .then(data => resolve(data.text))   // Resolve with the fact text
            .catch(error => reject('Error fetching fact: ' + error)); // Catch any errors and reject
    });
}

// Function to get facts for multiple numbers at once
function getMultipleNumberFacts(numbers) {
    // Creating an array of promises, each promise fetching a fact for a number
    const promises = numbers.map(number => getNumberFact(number));

    // Using Promise.all to wait for all the promises to resolve
    Promise.all(promises)
        .then(facts => {
            // Once all promises resolve, we handle the facts here
            const factsContainer = document.getElementById('facts-container');

            // Loop through the facts array and create a new div for each fact
            facts.forEach(fact => {
                const factElement = document.createElement('div');
                factElement.classList.add('fact'); // Adding a class for styling
                factElement.textContent = fact;  // Setting the fact text as the content of the div
                factsContainer.appendChild(factElement); // Append the div to the facts container
            });
        })
        .catch(error => {
            // If there is an error fetching any of the facts, log it to the console
            console.error(error);
        });
}

// Fetch a single fact about the favorite number
getNumberFact(favoriteNumber)
    .then(fact => {
        // Once the fact is fetched, we display it on the page
        const factsContainer = document.getElementById('facts-container');

        // Create a new div to display the fact
        const factElement = document.createElement('div');
        factElement.classList.add('fact'); // Add the class for styling
        factElement.textContent = `Fact about ${favoriteNumber}: ${fact}`; // Set the fact text
        factsContainer.appendChild(factElement); // Append the div to the container
    })
    .catch(error => {
        // Log any errors that might happen during the fetch
        console.error(error);
    });

// Fetch facts for multiple numbers
const multipleNumbers = [7, 42, 100, 25];
getMultipleNumberFacts(multipleNumbers);

// Fetch 4 facts about the favorite number (possibly repeating)
const factPromises = [];
// Loop to fetch 4 facts about the favorite number
for (let i = 0; i < 4; i++) {
    // Push a new promise (each fetching a fact for the favorite number)
    factPromises.push(getNumberFact(favoriteNumber));
}

// Using Promise.all to wait for all 4 fact promises to resolve
Promise.all(factPromises)
    .then(facts => {
        // Once all promises resolve, display each fact
        const factsContainer = document.getElementById('facts-container');
        facts.forEach(fact => {
            // Create a new div for each fact
            const factElement = document.createElement('div');
            factElement.classList.add('fact'); // Add styling class
            factElement.textContent = `Fact about ${favoriteNumber}: ${fact}`; // Set the text for each fact
            factsContainer.appendChild(factElement); // Append the new div to the container
        });
    })
    .catch(error => {
        // If there's any error during fetching, log it
        console.error(error);
    });
