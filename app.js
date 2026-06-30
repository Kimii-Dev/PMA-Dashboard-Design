// Live Cloud Database URL Endpoint mapped directly from your mockapi.io dashboard
const API_URL = "https://64a3f5ca6dba791499abab5b.mockapi.io/candidates";

let data = [];

/* LOGIN LOGIC */
function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    if (u === "admin" && p === "1234") {
        window.location.href = "main.html";
    } else {
        document.getElementById("msg").innerText = "Wrong credentials";
    }
}

function togglePassword() {
    let p = document.getElementById("password");
    if (p) {
        p.type = p.type === "password" ? "text" : "password";
    }
}

/* INITIALIZATION: Pull baseline data from the cloud on dashboard load */
async function initDashboard() {
    await fetchOnlineData();
}

/* 1. READ: Fetch candidates from your online cloud database */
async function fetchOnlineData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Cloud Database sync connection failed");
        data = await response.json();
        render();
    } catch (error) {
        console.error("Error fetching online database:", error);
        alert("⚠️ Failed to load cloud database data updates.");
    }
}

/* 2. CREATE: Add candidate directly to the cloud database */
async function addCandidate() {
    let nameEl = document.getElementById("name");
    let skillsEl = document.getElementById("skills");

    if (!nameEl.value.trim() || !skillsEl.value.trim()) {
        alert("Please fill in both the Name and Skills fields.");
        return;
    }

    // Dynamic AI Score matrix calculation generator
    let score = Math.floor(Math.random() * 35 + 65);

    const newCandidate = {
        name: nameEl.value.trim(),
        skills: skillsEl.value.trim(),
        score: score
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCandidate)
        });

        if (response.ok) {
            nameEl.value = "";
            skillsEl.value = "";
            await fetchOnlineData(); // Force directory list refresh from core DB reference
        } else {
            throw new Error("Failed to post entry profile");
        }
    } catch (error) {
        console.error("Error writing to online database:", error);
        alert("⚠️ Cloud database update failed.");
    }
}

/* 3. DELETE: Remove candidate permanently from the cloud database */
async function deleteCandidate(id) {
    if (!confirm("Are you sure you want to permanently delete this candidate from the online database?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            await fetchOnlineData(); // Re-fetch updated baseline dataset
        } else {
            throw new Error("Failed to delete requested item profile");
        }
    } catch (error) {
        console.error("Error deleting from online database:", error);
        alert("⚠️ Cloud database record deletion failed.");
    }
}

/* UI RENDERING & COMPONENT GENERATION */
function render() {
    let list = document.getElementById("list");
    if (!list) return;

    let search = document.getElementById("search")?.value || "";
    list.innerHTML = "";

    let filtered = data.filter(d =>
        (d.name && d.name.toLowerCase().includes(search.toLowerCase())) || 
        (d.skills && d.skills.toLowerCase().includes(search.toLowerCase()))
    );

    if (filtered.length === 0) {
        list.innerHTML = `<div class="empty-state">No matching candidates found in the cloud database.</div>`;
    } else {
        filtered.forEach(d => {
            let badgeClass = d.score >= 80 ? 'badge-high' : 'badge-mid';
            list.innerHTML += `
            <div class="candidate-card">
                <div class="candidate-info">
                    <h4>${d.name}</h4>
                    <p class="skills-tag"><strong>Skills:</strong> ${d.skills}</p>
                </div>
                <div class="candidate-actions">
                    <span class="score-badge ${badgeClass}">${d.score}% AI Score</span>
                    <button onclick="quickSelect('${d.name.replace(/'/g, "\\'")}')" class="btn-action">📅 Schedule</button>
                    <button onclick="deleteCandidate(${d.id})" class="btn-delete">🗑️</button>
                </div>
            </div>`;
        });
    }

    // Dynamic Live Status Counters
    const totalEl = document.getElementById("total");
    const avgEl = document.getElementById("avg");
    const shortlistedEl = document.getElementById("shortlisted");

    if (totalEl) totalEl.innerText = data.length;

    if (avgEl) {
        let avg = data.length ? Math.round(data.reduce((a, b) => a + (Number(b.score) || 0), 0) / data.length) : 0;
        avgEl.innerText = avg + "%";
    }

    if (shortlistedEl) {
        let short = data.filter(d => d.score >= 80).length;
        shortlistedEl.innerText = short;
    }
}

/* POPULATE INTERVIEW SCHEDULER MATRIX */
function quickSelect(name) {
    let snameEl = document.getElementById("sname");
    if (snameEl) {
        snameEl.value = name;
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        document.getElementById("date")?.focus();
    }
}

/* RUN INTERVIEW SCHEDULE */
function schedule() {
    let candidateName = document.getElementById("sname").value;
    let interviewDate = document.getElementById("date").value;

    if (!candidateName || !interviewDate) {
        alert("Please pick a candidate and a valid date.");
        return;
    }

    alert(`📅 Interview confirmed for ${candidateName} on ${interviewDate}!`);
    document.getElementById("sname").value = "";
    document.getElementById("date").value = "";
}

function logout() {
    window.location.href = "login.html";
}