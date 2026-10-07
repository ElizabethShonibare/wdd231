// ======================
// Auto last modified date
// ======================
// Auto last modified date
const lastModifiedEl = document.getElementById("lastModified");
if (lastModifiedEl) {
    lastModifiedEl.textContent = document.lastModified;
}

// ======================
// Toggle between grid and list views
// ======================
const directory = document.getElementById("directory");
const gridBtn = document.getElementById("grid");
const listBtn = document.getElementById("list");

if (gridBtn && listBtn && directory) {
    gridBtn.addEventListener("click", () => {
        directory.classList.add("grid");
        directory.classList.remove("list");
    });

    listBtn.addEventListener("click", () => {
        directory.classList.add("list");
        directory.classList.remove("grid");
    });
}

// ======================
// thankyou.html output
// ======================
const output = document.getElementById("output");
if (output) {
    const params = new URLSearchParams(window.location.search);
    const fields = ["firstName", "lastName", "email", "mobile", "organization", "timestamp"];
    fields.forEach(field => {
        const value = params.get(field);
        if (value) {
            const p = document.createElement("p");
            p.textContent = `${field}: ${value}`;
            output.appendChild(p);
        }
    });
}

// ======================
// Set timestamp when form loads
// ======================
const timestampEl = document.getElementById("timestamp");
if (timestampEl) {
    timestampEl.value = new Date().toISOString();
}

// ======================
// Modal functions
// ======================
function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.style.display = "block";
    const content = modal.querySelector(".modal-content");
    if (content) content.focus();

    function trapFocus(e) {
        if (e.key === "Tab") {
            const focusable = modal.querySelectorAll("button, a, input, textarea");
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
        if (e.key === "Escape") {
            closeModal(id);
            document.removeEventListener("keydown", trapFocus);
        }
    }

    document.addEventListener("keydown", trapFocus);
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "none";
}

// Close buttons
document.querySelectorAll(".close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const modalId = btn.getAttribute("data-modal");
        closeModal(modalId);
    });
});

// Card links open modals
document.querySelectorAll(".card a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const modalId = link.getAttribute("href").substring(1);
        openModal(modalId);
    });
});


// ======================
// Fetch and display members
// ======================
async function loadMembers() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();

        if (!directory) return;
        directory.innerHTML = "";

        members.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("member-card");

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

// ======================
// Weather
// ======================
const apiKey = "YOUR_API_KEY";
const city = "Port Harcourt";
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const current = data.list[0];
        const forecast = data.list.slice(1, 4);

        const weatherEl = document.getElementById("weather-data");
        if (weatherEl) {
            weatherEl.innerHTML = `
        <p>Current: ${current.main.temp}°C, ${current.weather[0].description}</p>
        <p>Tomorrow: ${forecast[0].main.temp}°C</p>
        <p>Day 2: ${forecast[1].main.temp}°C</p>
        <p>Day 3: ${forecast[2].main.temp}°C</p>
      `;
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

// ======================
// Spotlights
// ======================
async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();

        const goldSilver = members.filter(m => m.membership === 2 || m.membership === 3);
        const randomSpotlights = goldSilver.sort(() => 0.5 - Math.random()).slice(0, 3);

        const container = document.getElementById("spotlight-container");
        if (container) {
            container.innerHTML = "";
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
    } catch (error) {
        console.error("Error loading spotlights:", error);
    }
}

// ======================
// Discover page cards
// ======================
import { items } from "../data/discover.mjs";

// Build discover cards dynamically
const container = document.getElementById("discover-container");
if (container) {
    items.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
      <h2>${item.title}</h2>
      <figure>
        <img src="images/${item.image}" alt="${item.title}">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button>Learn More</button>
    `;
        container.appendChild(card);
    });
}    

// ======================
// Visitor message logic
// ======================
const messageArea = document.getElementById("visit-message");
if (messageArea) {
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        messageArea.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (days < 1) {
            messageArea.textContent = "Back so soon! Awesome!";
        } else if (days === 1) {
            messageArea.textContent = "You last visited 1 day ago.";
        } else {
            messageArea.textContent = `You last visited ${days} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", now);
}

// ======================
// Initial calls
// ======================
loadMembers();
getWeather();
loadSpotlights();
