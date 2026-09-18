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

// Call the function to load members
loadMembers();
