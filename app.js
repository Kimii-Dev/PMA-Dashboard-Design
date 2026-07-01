// --- Global Toast Notification ---
function showToast(message) {
    const toast = document.getElementById('toast');
    if(toast) {
        toast.innerText = message;
        toast.classList.add('show');
        setTimeout(() => { toast.classList.remove('show'); }, 3000);
    }
}

// --- Login Handling ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = loginForm.querySelector('.btn-primary');
        btn.innerHTML = 'Authenticating...';
        btn.style.opacity = '0.8';
        setTimeout(() => { window.location.href = 'main.html'; }, 800);
    });
}

// --- Dashboard Data & Interaction ---
const candidates = [
    { name: 'Laila', role: 'Lead AI Engineer', score: 98.5, skills: ['Python', 'TensorFlow', 'PyTorch', 'System Arch'], context: 'High relevance. Experience leading teams matches Aerodyne project demands perfectly.', retention: 92 },
    { name: 'Faris', role: 'Drone Data Scientist', score: 96.2, skills: ['Data Analytics', 'Computer Vision', 'R', 'Tableau'], context: 'Strong technical background in visual data processing. Perfect fit for drone analytics.', retention: 88 },
    { name: 'Naeim', role: 'CV Specialist', score: 93.8, skills: ['OpenCV', 'C++', 'Neural Networks', 'YOLOv8'], context: 'Directly maps to AI inspection roles. Validated specialized drone certifications.', retention: 85 },
    { name: 'Adna', role: 'UI/UX Designer', score: 91.0, skills: ['Figma', 'User Research', 'Prototyping'], context: 'Excellent portfolio matching Aerodyne enterprise dashboard requirements.', retention: 94 },
    { name: 'Mun', role: 'Cybersecurity Analyst', score: 89.4, skills: ['Network Sec', 'Pen Testing', 'Cloud Sec'], context: 'Solid background, required certifications present (CompTIA, CEH).', retention: 81 }
];

const candidateTable = document.querySelector('#candidateTable tbody');

if (candidateTable) {
    // Render Table
    candidates.forEach((cand, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <span class="cand-name">${cand.name}</span>
            </td>
            <td>${cand.role}</td>
            <td><span class="score-pill">${cand.score}% Match</span></td>
            <td><button class="btn-xai" data-index="${index}">View Logic</button></td>
            <td><button class="btn-action schedule-btn">Schedule</button></td>
        `;
        candidateTable.appendChild(row);
    });

    // Schedule Buttons Toggle
    document.querySelectorAll('.schedule-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('invited')) {
                this.classList.remove('invited');
                this.innerText = 'Schedule';
                showToast("Interview cancelled.");
            } else {
                this.classList.add('invited');
                this.innerText = '✓ Invited';
                showToast("Automated calendar invite sent!");
            }
        });
    });

    // XAI Modal Logic
    const xaiModal = document.getElementById('xaiModal');
    const closeXaiBtn = document.getElementById('closeXaiBtn');
    
    document.querySelectorAll('.btn-xai').forEach(btn => {
        btn.addEventListener('click', function() {
            const cand = candidates[this.getAttribute('data-index')];
            
            document.getElementById('xaiName').innerText = `AI Analysis: ${cand.name}`;
            document.getElementById('xaiScoreText').innerText = `${cand.score}%`;
            
            // Animate SVG Circle
            setTimeout(() => {
                document.getElementById('xaiSvgScore').setAttribute('stroke-dasharray', `${cand.score}, 100`);
            }, 100);

            // Populate Tags
            document.getElementById('xaiSkills').innerHTML = cand.skills.map(skill => `<span class="tag">${skill}</span>`).join('');
            
            // Populate Context
            document.getElementById('xaiContext').innerText = cand.context;
            
            // Animate Retention Bar
            const retentionBar = document.getElementById('xaiRetention');
            retentionBar.style.width = '0%'; 
            setTimeout(() => { retentionBar.style.width = `${cand.retention}%`; }, 300);
            
            xaiModal.classList.remove('hidden');
        });
    });

    closeXaiBtn.addEventListener('click', () => {
        xaiModal.classList.add('hidden');
        document.getElementById('xaiSvgScore').setAttribute('stroke-dasharray', `0, 100`); // Reset circle
    });
}

// --- Upload Simulation ---
const uploadBtn = document.getElementById('uploadBtn');
if (uploadBtn) {
    uploadBtn.addEventListener('click', () => {
        uploadBtn.innerText = 'Processing...';
        uploadBtn.style.opacity = '0.7';
        
        setTimeout(() => { showToast("NLP Extracting Resumes..."); }, 500);
        setTimeout(() => { showToast("LSTM Analyzing Context..."); }, 2000);
        setTimeout(() => { 
            showToast("Success: Database Updated!");
            uploadBtn.innerHTML = '+ Upload Resumes';
            uploadBtn.style.opacity = '1';
        }, 3500);
    });
}

// --- Logout ---
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'index.html';
    });
}