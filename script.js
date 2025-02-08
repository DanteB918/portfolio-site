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

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Project data
const projectData = {
    1: {
        title: "Web Application Dashboard",
        image: "https://picsum.photos/800/600?random=1",
        description: "A comprehensive web dashboard that provides real-time analytics and data visualization. Built with React and D3.js, this application helps businesses track key performance indicators and make data-driven decisions."
    },
    2: {
        title: "E-commerce Platform",
        image: "https://picsum.photos/800/600?random=2",
        description: "A full-featured e-commerce platform with secure payment processing, inventory management, and customer relationship management. Implemented using Node.js and MongoDB with a responsive front-end design."
    },
    3: {
        title: "Mobile App Design",
        image: "https://picsum.photos/800/600?random=3",
        description: "A modern mobile application designed for both iOS and Android platforms using Flutter. Features include user authentication, real-time notifications, and offline functionality."
    },
    4: {
        title: "AI Integration System",
        image: "https://picsum.photos/800/600?random=4",
        description: "An innovative AI system that integrates machine learning models into existing business processes. Built using Python and TensorFlow, it provides predictive analytics and automated decision-making capabilities."
    },
    5: {
        title: "IoT Smart Home",
        image: "https://picsum.photos/800/600?random=5",
        description: "A comprehensive smart home solution that connects and controls various IoT devices. Features include automated scheduling, energy monitoring, and remote control through a mobile app."
    },
    6: {
        title: "Blockchain Solution",
        image: "https://picsum.photos/800/600?random=6",
        description: "A blockchain-based solution for secure and transparent record-keeping. Implemented using Ethereum smart contracts and Web3.js for seamless integration with existing web applications."
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
        modalDescription.textContent = project.description;
        
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
    let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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
