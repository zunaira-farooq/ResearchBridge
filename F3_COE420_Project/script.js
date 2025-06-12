/*function filterProjects() {
    var searchInput = document.getElementById('search-bar').value.toLowerCase();
    var categoryFilter = document.getElementById('category-filter').value;
    var projects = document.querySelectorAll('.project-card');
    
    projects.forEach(function(project) {
        var projectTitle = project.querySelector('h3').textContent.toLowerCase();
        var projectCategory = project.getAttribute('data-category').toLowerCase();
        
        if (projectTitle.includes(searchInput) && 
            (categoryFilter === "" || projectCategory === categoryFilter.toLowerCase())) {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }
    });
}*/


//prof nav bar
document.addEventListener("DOMContentLoaded", function () {
    fetch("profNavbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-placeholder").innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));
});


//ra nav bar
document.addEventListener("DOMContentLoaded", function () {
    fetch("RANavbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("ra-navbar-placeholder").innerHTML = data;
        })
        .catch(error => console.error('Error loading RA navbar:', error));
});

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");
    if (query) {
        document.getElementById("search-bar").value = query;
        filterProjects();
    }
});

function filterProjects() {
    const searchInput = document.getElementById("search-bar").value.toLowerCase();
    const profileFilter = document.getElementById("profile-filter").value;
    const interestFilter = document.getElementById("interest-filter").value;
    const skillsFilter = document.getElementById("skills-filter").value;
    const paidFilter = document.getElementById("paid-filter").value;
    const grantFilter = document.getElementById("grant-filter").value;
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const category = card.getAttribute("data-profile");
        const interest = card.getAttribute("data-interest");
        const skills = card.getAttribute("data-skills");
        const paid = card.getAttribute("data-paid");
        const grant = card.getAttribute("data-grant");

        // Check if the card matches all selected filters
        const matchesSearch = title.includes(searchInput);
        const matchesCategory = !profileFilter || category === profileFilter;
        const matchesInterest = !interestFilter || interest === interestFilter;
        const matchesSkills = !skillsFilter || skills === skillsFilter;
        const matchesPaid = !paidFilter || paid === paidFilter;
        const matchesGrant = !grantFilter || grant === grantFilter;

        if (matchesSearch && matchesCategory && matchesInterest && matchesSkills && matchesPaid && matchesGrant) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Function to set the theme and save the preference
function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }
    // Save theme preference in localStorage
    localStorage.setItem('theme', theme);
}

// for viewing new projects
function showNewProjectDetails() {
    const modalContent = `
        <div class="modal fade" id="newprojectDetailsModal" tabindex="-1" aria-labelledby="projectDetailsModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="projectDetailsModalLabel">Project Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h6>Project Title:</h6>
                        <p id="projectTitle">Project Title</p>
                        <h6>Research Field:</h6>
                        <p>Research Field Information</p>
                        <h6>Short Description:</h6>
                        <p>Brief project description here.</p>
                        <h6>Required Skills:</h6>
                        <p>List of required skills.</p>
                        <h6>Deliverables:</h6>
                        <p>Deliverables information here.</p>
                        <h6>Expected Time Commitment:</h6>
                        <p>e.g., 10 hours/week</p>
                        <h6>Research Grant (Approximate Amount):</h6>
                        <p>Amount in AED</p>
                        <h6>Project Deadline:</h6>
                        <p>Project deadline date here.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-prim" onclick="window.location.href='RAapply.html'">Apply</button>
                    </div>
                </div>
            </div>
        </div>`;
    displayModal(modalContent);
}

// for viewing applied projects
function showAppliedProjectDetails() {
    const modalContent = `
        <div class="modal fade" id="appliedprojectDetailsModal" tabindex="-1" aria-labelledby="projectDetailsModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="projectDetailsModalLabel">Project Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h6>Project Title:</h6>
                        <p id="projectTitle">Project Title</p>
                        <h6>Research Field:</h6>
                        <p>Research Field Information</p>
                        <h6>Short Description:</h6>
                        <p>Brief project description here.</p>
                        <h6>Required Skills:</h6>
                        <p>List of required skills.</p>
                        <h6>Deliverables:</h6>
                        <p>Deliverables information here.</p>
                        <h6>Expected Time Commitment:</h6>
                        <p>e.g., 10 hours/week</p>
                        <h6>Research Grant (Approximate Amount):</h6>
                        <p>Amount in AED</p>
                        <h6>Project Deadline:</h6>
                        <p>Project deadline date here.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`;
    displayModal(modalContent);
}

// for displaying the modals
function displayModal(content) {
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = content;
    document.body.appendChild(modalContainer);

    // Initialize Bootstrap modal
    const modal = new bootstrap.Modal(modalContainer.querySelector('.modal'));
    modal.show();

    // Cleanup after modal is hidden
    modalContainer.addEventListener('hidden.bs.modal', () => {
        modalContainer.remove();
    });
}

/*
// Mock notifications data
const notifications = [
    // Notifications for RAs
    { id: 1, type: "RA", message: "Your application for 'AI Research' was accepted.", read: false },
    { id: 2, type: "RA", message: "Your application for 'Data Mining Project' was rejected.", read: false },

    // Notifications for Professors
    { id: 3, type: "Professor", message: "A new student applied for 'AI Research'.", read: false },
    { id: 4, type: "Professor", message: "A new student applied for 'Cybersecurity Project'.", read: false }
];

// Function to populate notifications
function displayNotifications(userType) {
    const container = document.getElementById("notifications-container");
    container.innerHTML = ""; // Clear previous notifications

    const filteredNotifications = notifications.filter(notification => notification.type === userType);

    if (filteredNotifications.length === 0) {
        container.innerHTML = "<p>No notifications at this time.</p>";
        return;
    }

    filteredNotifications.forEach(notification => {
        const card = document.createElement("div");
        card.className = "notification-card";
        card.innerHTML = `
            <div>
                <h3>Notification</h3>
                <p>${notification.message}</p>
            </div>
            <button class="mark-read" onclick="markAsRead(${notification.id})">Mark as Read</button>
        `;
        container.appendChild(card);
    });
}

// Function to mark notifications as read
function markAsRead(notificationId) {
    const notification = notifications.find(notif => notif.id === notificationId);
    if (notification) {
        notification.read = true;
        alert("Notification marked as read.");
        // Optionally, you can also remove the notification from the list or visually update it.
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Add click event listeners for status icons
    document.querySelectorAll(".notification-icon").forEach(icon => {
        icon.addEventListener("click", () => {
            icon.classList.toggle("checked");
        });
    });
});

// Simulating user type (RA or Professor)
// Change "RA" to "Professor" to test professor notifications
const userType = "RA"; // Assume this is dynamically determined (e.g., from login data)
document.addEventListener("DOMContentLoaded", function () {
    displayNotifications(userType);
}); */

/* Load the saved theme preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
});*/
