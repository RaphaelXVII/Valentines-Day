// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to nav links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all skill cards and project cards
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add random movement to floating stickers
function animateStickers() {
    const stickers = document.querySelectorAll('.floating-stickers .sticker');
    
    stickers.forEach((sticker, index) => {
        const randomX = Math.random() * 30 - 15;
        const randomY = Math.random() * 30 - 15;
        const randomRotation = Math.random() * 15 - 7.5;
        
        setInterval(() => {
            sticker.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
        }, 3000 + index * 500);
    });
}

animateStickers();

// Heart cursor (replaces glow)
const cursor = document.createElement('div');
cursor.className = 'cursor-heart';
cursor.setAttribute('aria-hidden', 'true');
cursor.textContent = '❤';
document.body.appendChild(cursor);

const style = document.createElement('style');
style.textContent = `
    .cursor-heart {
        position: fixed;
        width: 44px;
        height: 44px;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.08s ease, opacity 0.12s ease;
        font-size: 34px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translate(-50%, -50%) scale(1);
        text-shadow: 0 0 12px rgba(255,255,255,0.9), 0 0 24px rgba(255,0,128,0.6);
        mix-blend-mode: screen;
    }
    .cursor-heart.small { transform: translate(-50%, -50%) scale(0.88); opacity: 0.95; }
    /* Hide the default cursor so the heart is visible */
    body, a, button { cursor: none !important; }
`;
document.head.appendChild(style);

let lastMove = 0;
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    // subtle pop animation on movement
    const now = Date.now();
    if (now - lastMove > 80) {
        cursor.classList.remove('small');
        void cursor.offsetWidth; // force reflow
        cursor.classList.add('small');
        lastMove = now;
    }
});

// Add click ripple effect
document.querySelectorAll('.skill-card, .project-card, .social-btn, .nav-link').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .skill-card, .project-card, .social-btn, .nav-link {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 255, 249, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Typing effect for subtitle (optional enhancement)
const subtitle = document.querySelector('.subtitle');
const originalText = subtitle.textContent;
subtitle.textContent = '';

let charIndex = 0;
function typeWriter() {
    if (charIndex < originalText.length) {
        subtitle.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect after page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Add glitch effect on hover to project cards
document.querySelectorAll('.project-card h3').forEach(title => {
    title.addEventListener('mouseenter', function() {
        this.style.animation = 'glitch 0.3s ease';
    });
    
    title.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Console easter egg
console.log('%c RAPHAEL TALON', 'color: #fff; background: #000; font-size: 30px; font-weight: bold; padding: 10px; font-family: Arial Black;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #ff006e; font-size: 14px; font-weight: bold;');
console.log('%cStussy-inspired streetwear aesthetic', 'color: #00fff9; font-size: 14px; font-weight: bold;');

// Valentine button handlers (robust init)
function initValentineHandlers() {
  const yesBtn = document.getElementById('btn-yes');
  const noBtn = document.getElementById('btn-no');
  const response = document.querySelector('.valentine-box .response');
  const box = document.querySelector('.valentine-box');

  if (!box) return;

  if (yesBtn) {
    yesBtn.addEventListener('click', (e) => {
      e.preventDefault(); // prevent immediate navigation so we can animate
      const target = yesBtn.getAttribute('href') || 'itinerary.html';
      console.log('Yes clicked — redirecting to', target);
      response.textContent = 'Yes! 💖';
      response.classList.remove('shake');
      box.classList.add('celebrate');
      // let animation play then redirect
      setTimeout(() => {
        box.classList.remove('celebrate');
        window.location.href = target;
      }, 900);
    });
  }

  if (noBtn) {
    noBtn.addEventListener('click', () => {
      console.log('No clicked');
      response.textContent = "Oh no... 😢";
      response.classList.remove('celebrate');
      box.classList.add('shake');
      setTimeout(() => box.classList.remove('shake'), 700);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initValentineHandlers);
} else {
  initValentineHandlers();
}
