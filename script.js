// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active navigation highlight
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});


// Project data
const projectData = {
    1: {
        title: "Wallos",
        image: "assets/projects/wallos-dashboard-dark.png",
        description: "Wallos is a powerful, open-source, and self-hostable web application designed to empower you in managing your finances with ease. Say goodbye to complicated spreadsheets and expensive financial software – Wallos simplifies the process of tracking expenses and helps you gain better control over your financial life. I had the privilege of contributing to the development of this open-source application."
    },
    2: {
        title: "Customer Tracking System",
        image: "assets/projects/customer-track.png",
        description: "Customer Track is a cloud-based customer tracking system designed to streamline sales processes and enhance customer relationships. This web-based application provides businesses with a centralized platform to manage contacts, track leads, store customer information, and analyze sales performance. With easy-to-use tools and real-time data, Customer Track helps businesses drive growth, increase revenue, and stay ahead of the competition."
    },
    3: {
        title: "Phaser Game",
        image: "assets/projects/phaser-game.png",
        description: "This is a game built with Phaser.js. Phaser is an open-source HTML5 game engine that makes it easy to build cross-platform games. The game is a simple platformer where you control a character and navigate through a level. The game features a scoring system, collision detection, and a simple AI that allows the character to move around."
    },
    4: {
        title: "PokeDex Extension",
        image: "assets/projects/pokedex-img.png",
        description: `Chrome extension for looking up pokemon from the browser, using the <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">Pokemon API</a>, we can take the user's input of the pokemon name and look it up using HTTP requests. I also made this same application for mobile, using React Native!`
    },
    5: {
        title: "SneezeIO",
        image: "assets/projects/sneezeio-pic.png",
        description: "This was more of a joke at the time but I decided to really build it. It's a desktop application that you would use to record sneezes! This was my first time building a desktop application. If you'd like to download it and give it a shot, you can do so by clicking the button below (only currently for Windows!)."
    },
    6: {
        title: "MTG GatherHub",
        image: "assets/projects/mtg-gatherhub.png",
        description: "MTG GatherHub is a web application built with Laravel 10 that allows users to find games of Magic: The Gathering in their local area. Users can search for games by location, format, and date, and can also create and manage their own games. The application uses a combination of Google Maps and a custom-built algorithm to match players with games that fit their preferences. I built this application to help the Magic: The Gathering community find and connect with each other, and to provide a valuable service to players looking for games."
    }
};

// Modal elements
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeButton = document.querySelector('.close-button');

// Add click event listeners to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.dataset.project;
        const project = projectData[projectId];
        
        // Update modal content
        modalImage.src = project.image;
        modalTitle.textContent = project.title;
        modalDescription.innerHTML = project.description;
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
});

// Close modal when clicking the close button
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Scroll Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Once the animation is done, we can unobserve the element
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Observe skill items for animation
document.querySelectorAll('.skill-item').forEach(item => {
    observer.observe(item);
});

// Initialize project cards that are already in view
function animateInitialCards() {
    document.querySelectorAll('.project-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            card.classList.add('animate');
            observer.unobserve(card);
        }
    });
}

// Initialize skill items that are already in view
function animateInitialSkills() {
    document.querySelectorAll('.skill-item').forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            item.classList.add('animate');
            observer.unobserve(item);
        }
    });
}

// Run on page load
window.addEventListener('load', () => {
    animateInitialCards();
    animateInitialSkills();
});

// Set the current year dynamically
const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;

// Toggle sidebar
const toggleButton = document.querySelector('.toggle-sidebar');
const sidebar = document.querySelector('.sidebar');
const sidebarLinks = document.querySelectorAll('.sidebar-menu a');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('closed');
    document.querySelector('.main-content').classList.toggle('collapsed'); // Toggle class for main content
});

if (window.innerWidth < 1000) {
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.toggle('closed');
            document.querySelector('.main-content').classList.toggle('collapsed'); // Toggle class for main content
        });
    });

}

// Highlight active section on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// See more skills
const seeMore = document.getElementById('see-more');
const moreSkills = document.querySelectorAll('.more-skills');

seeMore.addEventListener('click', () => {
    moreSkills.forEach(skill => {
        skill.classList.toggle('more-skills');
    });

    seeMore.innerHTML = seeMore.innerHTML == 'See More' ? 'See Less' : 'See More';
});


if (window.innerWidth < 1000) { // @todo: find a better way to do this
    document.querySelector('.sidebar').classList.add('closed');
}
