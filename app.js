// --- 1. Login Handling ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = 'main.html';
    });
}

// --- 2. Candidate Data Generation ---
const candidates = [
    { 
        name: 'Laila', role: 'Lead AI Engineer', score: 98.5, 
        skills: ['Python', 'TensorFlow', 'PyTorch', 'System Architecture'],
        context: 'High relevance. Experience leading teams matches Aerodyne project demands.',
        retention: 92
    },
    { 
        name: 'Faris', role: 'Drone Data Scientist', score: 96.2, 
        skills: ['Data Analytics', 'Computer Vision', 'R', 'Tableau'],
        context: 'Strong technical background in visual data processing. Perfect fit for drone analytics.',
        retention: 88
    },
    { 
        name: 'Naeim', role: 'Computer Vision Specialist', score: 93.8, 
        skills: ['OpenCV', 'C++', 'Neural Networks', 'Object Detection'],
        context: 'Directly maps to AI inspection roles. Validated specialized certifications.',
        retention: 85
    },
    { 
        name: 'Adna', role: 'UI/UX Designer', score: 91.0, 
        skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping'],
        context: 'Excellent portfolio matching Aerodyne dashboard requirements.',
        retention: 94
    },
    { 
        name: 'Mun', role: 'Cybersecurity Analyst', score: 89.4, 
        skills: ['Network Security', 'Penetration Testing', 'Cloud Security'],
        context: 'Solid background, required certifications present (CompTIA, CEH).',
        retention: 81
    }
];

const candidateTable = document.querySelector('#candidateTable tbody');

if (candidateTable) {
    // Populate Table
    candidates.forEach((cand, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${cand.name}</strong></td>
            <td>${cand.role}</td>
            <td><span class="score-badge">${cand.score}%</span></td>
            <td><button class="btn-explain" data-index="${index}">Explain AI Score</button></td>
            <td><button class="btn-outline schedule-btn">Schedule Interview</button></td>
        `;
        candidateTable.appendChild(row);
    });

    // Handle "Schedule Interview" Toggle
    document.querySelectorAll('.schedule-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('btn-invited')) {
                this.classList.remove('btn-invited');
                this.innerText = 'Schedule Interview';
            } else {
                this.classList.add('btn-invited');
                this.innerText = '✓ Invited';
            }
        });
    });

    // Handle "Explain AI Score" Modal
    const xaiModal = document.getElementById('xaiModal');
    const closeXaiBtn = document.getElementById('closeXaiBtn');

    document.querySelectorAll('.btn-explain').forEach(btn => {
        btn.addEventListener('click', function() {
            const cand = candidates[this.getAttribute('data-index')];
            
            document.getElementById('xaiName').innerText = `${cand.name}'s Analysis`;
            document.getElementById('xaiScore').innerText = `${cand.score}%`;
            
            // Populate Tags
            const tagsHtml = cand.skills.map(skill => `<span class="tag">${skill}</span>`).join('');
            document.getElementById('xaiSkills').innerHTML = tagsHtml;
            
            // Populate Context & Retention
            document.getElementById('xaiContext').innerText = cand.context;
            
            const retentionBar = document.getElementById('xaiRetention');
            retentionBar.style.width = '0%'; // Reset for animation
            setTimeout(() => { retentionBar.style.width = `${cand.retention}%`; }, 50);
            
            document.getElementById('xaiRetentionText').innerText = `${cand.retention}% predicted 2-year retention probability.`;
            
            xaiModal.classList.remove('hidden');
        });
    });

    closeXaiBtn.addEventListener('click', () => xaiModal.classList.add('hidden'));
}

// --- 3. Upload Simulation Logic ---
const uploadBtn = document.getElementById('uploadBtn');
const uploadModal = document.getElementById('uploadModal');
const processTitle = document.getElementById('processTitle');
const processStatus = document.getElementById('processStatus');

if (uploadBtn) {
    uploadBtn.addEventListener('click', () => {
        uploadModal.classList.remove('hidden');
        
        // Sequence phases
        setTimeout(() => {
            processTitle.innerText = "Processing Data...";
            processStatus.innerText = "NLP Extracting Skills & Entities...";
        }, 1000);

        setTimeout(() => {
            processStatus.innerText = "LSTM Contextual Analysis in progress...";
        }, 2500);

        setTimeout(() => {
            processTitle.innerText = "Finalizing...";
            processStatus.innerText = "ML Candidate Ranking & Scoring...";
        }, 4000);

        setTimeout(() => {
            uploadModal.classList.add('hidden');
            // Reset for next click
            setTimeout(() => {
                processTitle.innerText = "Initializing Processing...";
                processStatus.innerText = "Connecting to Aerodyne Cloud...";
            }, 500);
        }, 5500);
    });
}

// --- 4. Logout ---
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'index.html';
    });
}