// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.querySelector('.nav-links');
const downloadCVBtn = document.getElementById('downloadCV');
const contactForm = document.getElementById('contactForm');
const projectsContainer = document.getElementById('projects-container');

// Social Media Links Configuration
const socialLinks = {
    facebook: 'https://www.facebook.com/reinespnsp',
    instagram: 'https://www.instagram.com/rein_espns/',
    linkedin: 'https://www.linkedin.com/in/loreine-parao-b02280389/',
    github: 'https://github.com/reinespiparao'
};

// Projects Data
const projects = [
    {
        title: "Landing Page",
        description: "Explore world-class diving, serene beach coves, and stunning island views.",
        image: "mabini.png",
        tags: ["HTML", "CSS", "JavaScript"],
        liveUrl: "https://mabini-tourism.vercel.app/",
        codeUrl: "https://github.com/reinespiparao/Mabini_Tourism.git"
    },
    {
        title: "E-commerce",
        description: "A fully responsive e-commerce platform with shopping cart functionality.",
        image: "e-commerce.png",
        tags: ["HTML", "CSS", "JavaScript"],
        liveUrl: "https://e-commerce-yq8m.vercel.app/",
        codeUrl: "https://github.com/reinespiparao/E-commerce.git"
    },
    {
        title: "Portfolio Template",
        description: "Modern and responsive portfolio template for developers and designers.",
        image: "portfolio.png",
        tags: ["HTML", "CSS", "JavaScript"],
        liveUrl: "https://portfolio-five-beta-0pumuao1yc.vercel.app/",
        codeUrl: "https://github.com/reinespiparao/Portfolio_.git"
    }
];

// Initialize Social Media Links
function initializeSocialLinks() {
    // Home section links
    document.getElementById('facebook-link').href = socialLinks.facebook;
    document.getElementById('instagram-link').href = socialLinks.instagram;
    document.getElementById('linkedin-link').href = socialLinks.linkedin;
    document.getElementById('github-link').href = socialLinks.github;
    
    // Contact section links
    document.getElementById('contact-facebook').href = socialLinks.facebook;
    document.getElementById('contact-instagram').href = socialLinks.instagram;
    document.getElementById('contact-linkedin').href = socialLinks.linkedin;
    document.getElementById('contact-github').href = socialLinks.github;
}

// Load Projects
function loadProjects() {
    projectsContainer.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        // Create tags HTML
        const tagsHTML = project.tags.map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('');
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/400x250/3498db/ffffff?text=Project+Image'">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${tagsHTML}
                </div>
                <div class="project-links">
                    <a href="${project.liveUrl}" class="project-link" target="_blank">Live Demo</a>
                    <a href="${project.codeUrl}" class="project-link" target="_blank">View Code</a>
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}

// Smooth Navigation
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get target section id
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => section.classList.remove('active'));
            
            // Show target section
            targetSection.classList.add('active');
            
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
            
            // Scroll to top for mobile
            if (window.innerWidth <= 768) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

// Mobile Menu Toggle
function setupMobileMenu() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navLinksContainer.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !hamburger.contains(e.target) && 
            !navLinksContainer.contains(e.target) &&
            navLinksContainer.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Download CV Functionality
function setupDownloadCV() {
    downloadCVBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create a mock CV download
        const cvContent = `
            LOREINE PARAO
            Frontend Developer
            
            CONTACT INFORMATION
            Email: reineparao19@gmail.com
            Phone: +63 961 896 8588
            Location: Mabini, Batangas, Philippines
            
            SKILLS
            • HTML5 (95%)
            • CSS3 (90%)
            • JavaScript (85%)
            • React.js
            • Responsive Design
            • Git & GitHub
            
            EXPERIENCE
            Frontend Developer | 2022 - Present
            • Developed responsive web applications
            • Implemented modern UI/UX designs
            • Collaborated with design and backend teams
            
            EDUCATION
            Bachelor of Science in Information Technology
            
            Note: This is a sample CV. Replace with your actual CV file.
        `;
        
        const blob = new Blob([cvContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Loreine_Parao_CV.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('CV download started! Replace with your actual CV file.');
    });
}

// Contact Form Submission
function setupContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // In a real application, you would send this data to a server
        // For demonstration, we'll just show a success message
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // Send to Formspree or similar service in production
        /*
        fetch('https://formspree.io/f/your-form-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                alert('Failed to send message. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
        */
    });
}

// Animate Skill Bars on Scroll
function animateSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevels = entry.target.querySelectorAll('.skill-level');
                skillLevels.forEach(level => {
                    const width = level.style.width;
                    level.style.width = '0';
                    setTimeout(() => {
                        level.style.width = width;
                    }, 100);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}

// Handle Window Resize
function handleResize() {
    if (window.innerWidth > 768) {
        // Close mobile menu on resize to desktop
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Set Active Nav Link Based on Scroll
function setActiveNavOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

// Image Error Handling
function setupImageErrorHandling() {
    document.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            e.target.src = 'https://via.placeholder.com/400x400/3498db/ffffff?text=Profile+Image';
            e.target.onerror = null;
        }
    }, true);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeSocialLinks();
    loadProjects();
    setupNavigation();
    setupMobileMenu();
    setupDownloadCV();
    setupContactForm();
    animateSkillBars();
    setActiveNavOnScroll();
    setupImageErrorHandling();
    
    // Add resize handler
    window.addEventListener('resize', handleResize);
    
    // Initialize first section as active
    if (sections.length > 0) {
        sections[0].classList.add('active');
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .skill-level {
        transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    @media (max-width: 768px) {
        .nav-links {
            transition: all 0.3s ease;
        }
    }
`;

document.head.appendChild(style);

