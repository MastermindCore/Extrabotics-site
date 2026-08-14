// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const binary = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = binary.charAt(Math.floor(Math.random() * binary.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 100);
}

// Scroll Reveal Animation
function scrollReveal() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            const delay = reveals[i].dataset.delay || '0s';
            setTimeout(() => {
                reveals[i].classList.add('revealed');
            }, parseFloat(delay) * 1000);
        }
    }
}

// Smooth scroll function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Parallax Effect for Floating Elements
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.tech-particle');
    const speed = 0.5;

    parallax.forEach(element => {
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
}

// 3D Tilt Effect for Cards
function addTiltEffect() {
    const cards = document.querySelectorAll('.service-card, .update-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Glitch Text Effect
function addGlitchEffect() {
    const logo = document.querySelector('.glitch-effect');
    logo.setAttribute('data-text', logo.textContent);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createMatrixRain();
    addTiltEffect();
    addGlitchEffect();
    
    // Scroll animations
    window.addEventListener('scroll', function() {
        scrollReveal();
        parallaxEffect();
        
        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#1a1a1a';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // Initial scroll reveal check
    scrollReveal();
});

// Add smooth scrolling for navigation links
document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);
        scrollToSection(sectionId);
        
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
    });
});

// Resize canvas when window resizes
window.addEventListener('resize', function() {
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// Add typing sound effect simulation (visual feedback)
document.querySelector('.typewriter').addEventListener('animationend', function() {
    this.style.borderRight = 'none';
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count");
  const speed = 200; // Lower = faster

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute("data-target");
        const updateCount = () => {
          const count = +counter.innerText;
          const increment = target / speed;

          if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = target.toLocaleString();
          }
        };
        updateCount();
        observer.unobserve(counter); // Run only once
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
});
