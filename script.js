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
const projectData = fetch('./data/projects.json');

// Modal elements
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeButton = document.querySelector('.close-button');
const sourceCodeLink = document.getElementById('sourceCodeLink');
const actionLink = document.getElementById('actionLink');

// Add click event listeners to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.dataset.project;
        const project = projectData[projectId];

        // Update modal content
        modalImage.src = project.image;
        modalTitle.textContent = project.title;
        modalDescription.innerHTML = project.description;

        // Handle source code link
        if (project.sourceCode) {
            sourceCodeLink.href = project.sourceCode;
            sourceCodeLink.style.display = 'inline-block';
        } else {
            sourceCodeLink.style.display = 'none';
        }

        // Handle action link (website/download)
        if (project.actionLink) {
            actionLink.href = project.actionLink;
            actionLink.textContent = project.actionText || 'Visit Project';
            actionLink.style.display = 'inline-block';
        } else {
            actionLink.style.display = 'none';
        }

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
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                e.preventDefault();

                sidebar.classList.add('closed');
                document.querySelector('.main-content').classList.add('collapsed');
                document.querySelector('#hamburger').classList.toggle('is-active');

                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
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
    document.querySelector('#hamburger').classList.remove('is-active');
    document.querySelector('.main-content').classList.add('collapsed');
}
