const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData(url) {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets);
    console.table(data.prophets); // note that you reference the prophets array of the JSON data object, not just the object

    displayProphets(data.prophets);
}

const displayProphets =(prophets) => {
    prophets.forEach((prophet) => {
        // Create card section
        const card = document.createElement('section');

        // Create full name heading
        const fullName = document.createElement('h2');
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Create portrait image
        const portrait = document.createElement('img');
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '200');
        portrait.setAttribute('height', '250');

        // Append elements to card
        card.appendChild(fullName);
        card.appendChild(portrait);

        // Append card to cards container
        cards.appendChild(card);
    });
};

// Call the function
getProphetData();
