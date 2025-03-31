document.addEventListener('DOMContentLoaded', async () => {
    const profileSection = document.getElementById('profileSection');

    // Retrieve stored authentication details
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (userId && token) {
        try {
            // Fetch user profile from backend
            const response = await fetch(`https://storygeneratorbackend-ytdf.onrender.com/api/users/profile/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error('Failed to fetch profile data!');

            const { profilePicture, name } = await response.json();

            // Populate profile section
            profileSection.innerHTML = `
                <div id="profile-section">
                    <img src="${profilePicture || 'default-profile.png'}" alt="Profile Picture" class="profile-pic">
                    <span>${name || 'User'}</span>
                    <button class="cta-button logoutBtn">Logout</button>
                </div>
            `;

            // Logout function
            document.querySelector('.logoutBtn').addEventListener('click', () => {
                localStorage.removeItem('userId');
                localStorage.removeItem('token');
                location.reload(); // Refresh page
            });

        } catch (error) {
            console.error('Profile Fetch Error:', error);
            profileSection.innerHTML = `<a href="login.html" class="loginBtn cta-button">Login</a>`;
        }
    } else {
        profileSection.innerHTML = `<a href="login.html" class="loginBtn cta-button">Login</a>`;
    }
});
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-item');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach((item, i) => {
        item.style.display = i === index ? 'block' : 'none';
    });
}

function changeTestimonial(direction) {
    currentTestimonial += direction;
    if (currentTestimonial >= totalTestimonials) {
        currentTestimonial = 0;
    } else if (currentTestimonial < 0) {
        currentTestimonial = totalTestimonials - 1;
    }
    showTestimonial(currentTestimonial);
}

// Initialize by showing the first testimonial
showTestimonial(currentTestimonial);

//profile picture 
document.addEventListener("DOMContentLoaded", function() {
    let profilePic = document.getElementById("profilePic");
    let fileInput = document.getElementById("fileInput");

    // Load saved profile picture from local storage
    if (localStorage.getItem("profilePic")) {
        profilePic.src = localStorage.getItem("profilePic");
    }

    fileInput.addEventListener("change", function(event) {
        let file = event.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function(e) {
                profilePic.src = e.target.result;
                localStorage.setItem("profilePic", e.target.result); // Save in local storage
            };
            reader.readAsDataURL(file);
        }
    });
});