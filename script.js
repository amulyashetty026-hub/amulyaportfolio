
// ========================================
// LOAD PORTFOLIO DATA USING FETCH API
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    fetch("data.json")

        .then(function (response) {

            if (!response.ok) {
                throw new Error("Unable to load JSON data");
            }

            return response.json();

        })

        .then(function (data) {

            displayPersonalInfo(data.personalInfo);
            displayAbout(data.about, data.personalInfo);
            displaySkills(data.skills);
            displayProjects(data.projects);
            displayEducation(data.education);
            displaySocialLinks(data.socialLinks);

        })

        .catch(function (error) {

            console.error("Error:", error);

            document.querySelectorAll(
                "#skillsContainer, #projectsContainer, #educationContainer"
            ).forEach(function (container) {
                container.innerHTML =
                    "<p class='text-danger text-center'>Unable to load portfolio data. Please run the project using Live Server.</p>";
            });

        });

});


// ========================================
// DISPLAY PERSONAL INFORMATION
// ========================================

function displayPersonalInfo(person) {

    document.getElementById("heroName").textContent =
        person.name;

    document.getElementById("heroTitle").textContent =
        person.title;

    document.getElementById("heroDescription").textContent =
        person.description;

    document.getElementById("profileImage").src =
        person.profileImage;

    document.getElementById("aboutImage").src =
        person.aboutImage;

    document.getElementById("contactEmail").textContent =
        person.email;

    document.getElementById("contactPhone").textContent =
        person.phone;

    document.getElementById("contactLocation").textContent =
        person.location;

    document.getElementById("footerName").textContent =
        person.name;

    document.querySelector(".hero-buttons a.btn-outline-custom").href =
        person.resumeUrl;

    document.getElementById("currentYear").textContent =
        new Date().getFullYear();

}


// ========================================
// DISPLAY ABOUT INFORMATION
// ========================================

function displayAbout(about, person) {

    document.getElementById("aboutName").textContent =
        "Hello! I'm " + person.name;

    document.getElementById("aboutDescription").textContent =
        about.description;

    const details = document.getElementById("aboutDetails");

    details.innerHTML = `

        <div class="about-detail">
            <strong>Degree:</strong> ${person.degree}
        </div>

        <div class="about-detail">
            <strong>College:</strong> ${person.college}
        </div>

        <div class="about-detail">
            <strong>Date of Birth:</strong> ${person.birthDate}
        </div>

        <div class="about-detail">
            <strong>Skills:</strong> ${about.skills}
        </div>

        <div class="about-detail">
            <strong>Interests:</strong> ${about.interests}
        </div>

    `;

}


// ========================================
// DISPLAY SKILLS DYNAMICALLY
// ========================================

function displaySkills(skills) {

    const container =
        document.getElementById("skillsContainer");

    container.innerHTML = "";

    skills.forEach(function (skill) {

        const card = `

            <div class="col-md-6 col-lg-4">

                <div class="skill-card">

                    <div class="skill-icon">
                        <i class="bi ${skill.icon}"></i>
                    </div>

                    <h5>${skill.name}</h5>

                    <div class="progress">

                        <div
                            class="progress-bar"
                            role="progressbar"
                            style="width: ${skill.level}%"
                            aria-valuenow="${skill.level}"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>

                    </div>

                    <p class="mt-2 mb-0">
                        ${skill.level}%
                    </p>

                </div>

            </div>

        `;

        container.innerHTML += card;

    });

}


// ========================================
// DISPLAY PROJECTS DYNAMICALLY
// ========================================

function displayProjects(projects) {

    const container =
        document.getElementById("projectsContainer");

    container.innerHTML = "";

    projects.forEach(function (project) {

        const technologies = project.technologies.map(
            function (technology) {
                return `<span class="tech-badge">${technology}</span>`;
            }
        ).join("");

        const card = `

            <div class="col-md-6 col-lg-4">

                <div class="project-card">

                    <img
                        src="${project.image}"
                        class="project-image"
                        alt="${project.title}"
                        loading="lazy"
                    >

                    <div class="project-content">

                        <h4>${project.title}</h4>

                        <p>${project.description}</p>

                        <div class="project-tech">
                            ${technologies}
                        </div>

                        <a
                            href="${project.link}"
                            class="project-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Project
                            <i class="bi bi-arrow-right"></i>
                        </a>

                    </div>

                </div>

            </div>

        `;

        container.innerHTML += card;

    });

}


// ========================================
// DISPLAY EDUCATION DYNAMICALLY
// ========================================

function displayEducation(education) {

    const container =
        document.getElementById("educationContainer");

    container.innerHTML = "";

    education.forEach(function (item) {

        const card = `

            <div class="timeline-item">

                <span class="education-year">
                    ${item.year}
                </span>

                <h4 class="mt-2">
                    ${item.degree}
                </h4>

                <h6>
                    ${item.institution}
                </h6>

                <p>
                    ${item.description}
                </p>

            </div>

        `;

        container.innerHTML += card;

    });

}


// ========================================
// DISPLAY SOCIAL MEDIA LINKS
// ========================================

function displaySocialLinks(links) {

    const container =
        document.getElementById("socialLinks");

    container.innerHTML = "";

    links.forEach(function (social) {

        const link = `

            <a
                href="${social.url}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="${social.platform}"
                title="${social.platform}"
            >

                <i class="bi ${social.icon}"></i>

            </a>

        `;

        container.innerHTML += link;

    });

}


// ========================================
// CONTACT FORM VALIDATION
// ========================================

document.getElementById("contactForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("contactName").value.trim();

        const email =
            document.getElementById("contactUserEmail").value.trim();

        const subject =
            document.getElementById("contactSubject").value.trim();

        const message =
            document.getElementById("contactMessage").value.trim();

        const formMessage =
            document.getElementById("formMessage");

        // Check empty fields

        if (!name || !email || !subject || !message) {

            showFormMessage(
                "Please fill in all fields.",
                "red"
            );

            return;

        }

        // Validate email

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            showFormMessage(
                "Please enter a valid email address.",
                "red"
            );

            return;

        }

        // Get portfolio email from loaded JSON

        fetch("data.json")

            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Could not load contact email");
                }
                return response.json();
            })

            .then(function (data) {

                const receiver =
                    data.personalInfo.email;

                if (
                    !receiver ||
                    receiver === "yourname@gmail.com"
                ) {

                    showFormMessage(
                        "Please update your email address in data.json.",
                        "red"
                    );

                    return;

                }

                const mailSubject =
                    encodeURIComponent(subject);

                const mailBody =
                    encodeURIComponent(
                        "Name: " + name +
                        "\nEmail: " + email +
                        "\n\nMessage:\n" + message
                    );

                const mailLink =
                    "mailto:" + receiver +
                    "?subject=" + mailSubject +
                    "&body=" + mailBody;

                showFormMessage(
                    "Your message is ready. Your email application will open.",
                    "green"
                );

                window.location.href = mailLink;

            })

            .catch(function () {

                showFormMessage(
                    "Unable to process your message. Please try again.",
                    "red"
                );

            });

    });


// ========================================
// SHOW FORM MESSAGE
// ========================================

function showFormMessage(message, color) {

    const formMessage =
        document.getElementById("formMessage");

    formMessage.textContent = message;
    formMessage.style.color = color;
    formMessage.style.fontWeight = "600";

}


// ========================================
// CLOSE MOBILE NAVBAR AFTER CLICK
// ========================================

document.querySelectorAll(".navbar-nav .nav-link")
    .forEach(function (link) {

        link.addEventListener("click", function () {

            const navbar =
                document.getElementById("navbarNav");

            if (navbar.classList.contains("show")) {

                bootstrap.Collapse
                    .getOrCreateInstance(navbar)
                    .hide();

            }

        });

    });
