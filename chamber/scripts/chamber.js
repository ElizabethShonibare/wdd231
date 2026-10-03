// Auto last modified date
document.getElementById("lastModified").textContent = document.lastModified;

// Toggle between grid and list views
const directory = document.getElementById("directory");
document.getElementById("grid").addEventListener("click", () => {
    directory.classList.add("grid");
    directory.classList.remove("list");
});

document.getElementById("list").addEventListener("click", () => {
    directory.classList.add("list");
    directory.classList.remove("grid");
});


// thankyou.html 
const params = new URLSearchParams(window.location.search);
const output = document.getElementById("output");

const fields = ["firstName", "lastName", "email", "mobile", "organization", "timestamp"];
fields.forEach(field => {
    const value = params.get(field);
    if (value) {
        const p = document.createElement("p");
        p.textContent = `${field}: ${value}`;
        output.appendChild(p);
    }
});


// Set timestamp when form loads
document.getElementById("timestamp").value = new Date().toISOString();

// Modal functions
function closeModal(id) {
    document.getElementById(id).style.display = "none";
}
document.querySelectorAll(".card a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const modalId = link.getAttribute("href").substring(1);
        document.getElementById(modalId).style.display = "block";
    });
});


// Fetch and display members
async function loadMembers() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();

        directory.innerHTML = ""; // clear existing content

        members.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("member-card");

            // Add membership class
            if (member.membership === 1) card.classList.add("member");
            if (member.membership === 2) card.classList.add("silver");
            if (member.membership === 3) card.classList.add("gold");

            card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.website}" target="_blank">${member.website}</a></p>
        <p class="membership-label">Membership Level: ${member.membership}</p>
        <p>${member.info}</p>
      `;
            directory.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

// scripts/weather.js
const apiKey = "YOUR_API_KEY";
const city = "Port Harcourt";
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

async function getWeather() {
    const response = await fetch(url);
    const data = await response.json();

    const current = data.list[0];
    const forecast = data.list.slice(1, 4);

    document.getElementById("weather-data").innerHTML = `
    <p>Current: ${current.main.temp}°C, ${current.weather[0].description}</p>
    <p>Tomorrow: ${forecast[0].main.temp}°C</p>
    <p>Day 2: ${forecast[1].main.temp}°C</p>
    <p>Day 3: ${forecast[2].main.temp}°C</p>
  `;
}


// scripts/spotlights.js
async function loadSpotlights() {
    const response = await fetch("data/members.json");
    const members = await response.json();

    const goldSilver = members.filter(m => m.membership === 2 || m.membership === 3);
    const randomSpotlights = goldSilver.sort(() => 0.5 - Math.random()).slice(0, 3);

    const container = document.getElementById("spotlight-container");
    randomSpotlights.forEach(m => {
        container.innerHTML += `
      <div class="card">
        <img src="${m.logo}" alt="${m.name} logo">
        <h3>${m.name}</h3>
        <p>${m.address}</p>
        <p>${m.phone}</p>
        <a href="${m.website}" target="_blank">Visit Website</a>
        <p>Membership: ${m.membership}</p>
      </div>
    `;
    });
}
loadSpotlights();


// Call the function to load members
loadMembers();
getWeather();
