const courses = [
    { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true },
    { code: "WDD231", name: "Frontend Development", credits: 3, completed: false },
    { code: "CSE110", name: "Programming Basics", credits: 3, completed: true },
    // add more...
];

const container = document.getElementById("courseContainer");
const totalCredits = document.getElementById("totalCredits");

function displayCourses(list) {
    container.innerHTML = "";
    let credits = 0;
    list.forEach(course => {
        const card = document.createElement("div");
        card.textContent = `${course.code} - ${course.name}` ;
        card.className = course.completed ? "completed" : "not-completed";
        container.appendChild(card);
        credits += course.credits;
    });
    totalCredits.textContent = credits;
}

document.getElementById("allBtn").addEventListener("click", () => displayCourses(courses));
document.getElementById("wddBtn").addEventListener("click", () => displayCourses(courses.filter(c => c.code.startsWith("WDD"))));
document.getElementById("cseBtn").addEventListener("click", () => displayCourses(courses.filter(c => c.code.startsWith("CSE"))));

displayCourses(courses);


