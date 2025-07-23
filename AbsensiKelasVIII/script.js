// Student data with placeholder images
const students = [
    {
        id: 1,
        name: "Immanuel",
        photo: "images/Nueljpg.jpg",
        present: null
    },
    {
        id: 2,
        name: "Christin",
        photo: "images/Christin.jpg",
        present: null
    },
    {
        id: 3,
        name: "Daniel",
        photo: "images/Daniel.jpg",
        present: null
    },
    {
        id: 4,
        name: "Evelin",
        photo: "images/Evelin.jpg",
        present: null
    },
    {
        id: 5,
        name: "Gavin",
        photo: "images/Gavin.jpg",
        present: null
    },
    {
        id: 6,
        name: "Gloria",
        photo: "images/Glory.jpg",
        present: null
    },
    {
        id: 7,
        name: "Kevin",
        photo : "images/Kevin.jpg",
        present : null
    },
    {
        id: 8,
        name: "Marvel",
        photo : "images/Marvel.jpg",
        present : null
    },
    {
        id: 9,
        name: "Nadya",
        photo : "images/Nadya.jpg",
        present : null
    },
    {
        id: 10,
        name: "Pierre",
        photo : "images/Pier.jpg",
        present : null
    },
    {
        id: 11,
        name: "Rachell",
        photo : "images/Rachell.jpg",
        present : null
    },
    {
        id: 12,
        name: "Samuel",
        photo : "images/Samuel.jpg",
        present : null
    },
    {
        id: 13,
        name: "Satria",
        photo : "images/Satria.jpg",
        present : null
    },
    {
        id: 14,
        name: "Travis",
        photo : "images/travis.jpg",
        present : null
    },
    {
        id: 15,
        name: "Yusup",
        photo : "images/Yusup.jpg",
        present : null
    },
];

// DOM elements
const studentsContainer = document.getElementById('studentsContainer');
const presentCountEl = document.getElementById('presentCount');
const absentCountEl = document.getElementById('absentCount');
const remainingCountEl = document.getElementById('remainingCount');
const currentDateEl = document.getElementById('currentDate');
const submitBtn = document.getElementById('submitBtn');
const exportBtn = document.getElementById('exportBtn');
const resetBtn = document.getElementById('resetBtn');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    updateDate();
    renderStudents();
    updateStats();
});

// Update current date
function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateEl.textContent = new Date().toLocaleDateString('en-US', options);
}

// Render student cards (optimized to prevent flickering)
function renderStudents() {
    // Create document fragment to prevent reflow
    const fragment = document.createDocumentFragment();
    
    students.forEach(student => {
        const card = document.createElement('div');
        card.className = 'student-card';
        
        let statusText = 'Pending';
        let statusClass = 'status-pending';
        
        if (student.present === true) {
            statusText = 'Present';
            statusClass = 'status-present';
        } else if (student.present === false) {
            statusText = 'Absent';
            statusClass = 'status-absent';
        }
        
        card.innerHTML = `
            <img src="${student.photo}" alt="${student.name}" class="student-photo">
            <div class="student-info">
                <h3 class="student-name">${student.name}</h3>
                <div class="attendance-status ${statusClass}">${statusText}</div>
                <div class="attendance-actions">
                    <button class="attendance-btn present-btn" data-id="${student.id}">
                        <i class="fas fa-check"></i> Present
                    </button>
                    <button class="attendance-btn absent-btn" data-id="${student.id}">
                        <i class="fas fa-times"></i> Absent
                    </button>
                </div>
            </div>
        `;
        
        fragment.appendChild(card);
    });
    
    // Clear container and append all cards at once
    studentsContainer.innerHTML = '';
    studentsContainer.appendChild(fragment);
    
    // Add event listeners after rendering
    addButtonListeners();
}

// Add event listeners to buttons
function addButtonListeners() {
    document.querySelectorAll('.present-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            markAttendance(id, true);
        });
    });
    
    document.querySelectorAll('.absent-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            markAttendance(id, false);
        });
    });
}

// Mark attendance
function markAttendance(id, isPresent) {
    const student = students.find(s => s.id === id);
    if (student) {
        student.present = isPresent;
        updateStats();
        
        // Update only the changed card instead of re-rendering all
        updateStudentCard(id);
    }
}

// Update single student card
function updateStudentCard(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;
    
    const card = document.querySelector(`.student-card [data-id="${id}"]`)?.closest('.student-card');
    if (!card) return;
    
    let statusText = 'Pending';
    let statusClass = 'status-pending';
    
    if (student.present === true) {
        statusText = 'Present';
        statusClass = 'status-present';
    } else if (student.present === false) {
        statusText = 'Absent';
        statusClass = 'status-absent';
    }
    
    const statusElement = card.querySelector('.attendance-status');
    if (statusElement) {
        statusElement.textContent = statusText;
        statusElement.className = `attendance-status ${statusClass}`;
    }
}

// Update statistics
function updateStats() {
    const presentCount = students.filter(s => s.present === true).length;
    const absentCount = students.filter(s => s.present === false).length;
    const remainingCount = students.filter(s => s.present === null).length;
    
    presentCountEl.textContent = presentCount;
    absentCountEl.textContent = absentCount;
    remainingCountEl.textContent = remainingCount;
}

// Submit attendance
submitBtn.addEventListener('click', () => {
    const remaining = students.filter(s => s.present === null).length;
    
    if (remaining > 0) {
        alert(`Please mark attendance for ${remaining} remaining student(s)`);
    } else {
        alert('Attendance submitted successfully!');
        console.log('Attendance data:', students);
    }
});

// Export to TXT
exportBtn.addEventListener('click', () => {
    const date = new Date();
    const filename = `attendance_${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}.txt`;
    
    let content = `SCHOOL ATTENDANCE REPORT\n`;
    content += `Date: ${date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n`;
    content += '===================================\n\n';
    
    // Sort students alphabetically
    const sortedStudents = [...students].sort((a, b) => a.name.localeCompare(b.name));
    
    sortedStudents.forEach(student => {
        const status = student.present ? 'Present' : 'Absent';
        content += `${student.name.padEnd(20)}: ${status}\n`;
    });
    
    const presentCount = students.filter(s => s.present === true).length;
    content += `\nSUMMARY:\n`;
    content += `Present: ${presentCount}\n`;
    content += `Absent: ${students.length - presentCount}\n`;
    content += `Total: ${students.length} students\n`;
    
    // Create and download the file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Reset all attendance
resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all attendance records?')) {
        students.forEach(student => {
            student.present = null;
        });
        renderStudents();
        updateStats();
    }
});