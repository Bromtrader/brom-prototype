// ========================================
// BROM — Developer Portfolio
// Interactive JavaScript
// ========================================

gsap.registerPlugin(ScrollTrigger);

// ─── Loading Screen ───
const loader = document.getElementById('loader');
const loaderFill = document.getElementById('loader-fill');
let loadProgress = 0;

const loadInterval = setInterval(() => {
    loadProgress += Math.random() * 20 + 10;
    if (loadProgress >= 100) {
        loadProgress = 100;
        clearInterval(loadInterval);
        setTimeout(() => {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.inOut',
                onComplete: () => {
                    loader.style.display = 'none';
                    initEntranceAnimations();
                }
            });
        }, 400);
    }
    loaderFill.style.width = loadProgress + '%';
}, 120);

// ─── Custom Cursor ───
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effects
    const hoverTargets = document.querySelectorAll('a, button, .info-card, .skill-item, .project-item, .connect-card, .interest-card, .goal-tag');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
}

// ─── Navigation Scroll Effect ───
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ─── Mobile Menu ───
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ─── Smooth Scroll ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: { y: target, offsetY: 80 },
                ease: 'power3.inOut'
            });
        }
    });
});

// ─── Entrance Animations ───
function initEntranceAnimations() {
    // Hero elements
    gsap.to('.hero-tag', { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });
    gsap.to('.title-line', { opacity: 1, y: 0, duration: 1, stagger: 0.15, delay: 0.4, ease: 'power3.out' });
    gsap.to('.hero-desc', { opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: 'power3.out' });
    gsap.to('.hero-actions', { opacity: 1, y: 0, duration: 0.8, delay: 1.1, ease: 'power3.out' });
    gsap.to('.hero-stats', { opacity: 1, y: 0, duration: 0.8, delay: 1.3, ease: 'power3.out' });
    gsap.to('.scroll-hint', { opacity: 1, duration: 1, delay: 1.8, ease: 'power2.out' });

    // Set initial states
    gsap.set('.hero-tag, .title-line, .hero-desc, .hero-actions, .hero-stats', { opacity: 0, y: 30 });
    gsap.set('.scroll-hint', { opacity: 0 });
}

// ─── Stat Counter Animation ───
const statNumbers = document.querySelectorAll('.stat-num[data-count]');
statNumbers.forEach(stat => {
    const target = parseInt(stat.dataset.count);

    ScrollTrigger.create({
        trigger: stat,
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.to(stat, {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: 'power2.out'
            });
        }
    });
});

// ─── Section Reveal Animations ───
const revealElements = document.querySelectorAll('.section-header, .about-title, .about-body, .info-card, .skills-title, .skills-desc, .skill-group, .interests-header, .interest-card, .project-item, .goal-content, .connect-title, .connect-desc, .connect-card');

revealElements.forEach((el, i) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.05,
        ease: 'power3.out'
    });
});

// ─── 3D Tilt Effect on Cards ───
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${-rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ─── Parallax for Ambient Orbs ───
gsap.to('.orb-1', {
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
    },
    y: -200,
    ease: 'none'
});

gsap.to('.orb-2', {
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
    },
    y: 150,
    ease: 'none'
});

// ─── Project Item Hover Glow ───
document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, { backgroundColor: 'rgba(17, 17, 24, 1)', duration: 0.3 });
    });
    item.addEventListener('mouseleave', () => {
        gsap.to(item, { backgroundColor: 'rgba(22, 22, 31, 1)', duration: 0.3 });
    });
});

// ─── Magnetic Button Effect ───
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ─── Skill Item Level Bar on Hover ───
document.querySelectorAll('.skill-item').forEach(item => {
    const level = item.dataset.level;
    if (level) {
        const bar = document.createElement('div');
        bar.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            width: 0%;
            background: linear-gradient(90deg, var(--accent), var(--gradient-end));
            border-radius: 0 0 6px 6px;
            transition: width 0.4s ease;
        `;
        item.style.position = 'relative';
        item.style.overflow = 'hidden';
        item.appendChild(bar);

        item.addEventListener('mouseenter', () => {
            bar.style.width = level + '%';
        });
        item.addEventListener('mouseleave', () => {
            bar.style.width = '0%';
        });
    }
});

// ─── Scroll Hint Fade ───
ScrollTrigger.create({
    trigger: '#about',
    start: 'top 80%',
    onEnter: () => {
        gsap.to('.scroll-hint', { opacity: 0, duration: 0.5 });
    },
    onLeaveBack: () => {
        gsap.to('.scroll-hint', { opacity: 1, duration: 0.5 });
    }
});

// ─── Name Character Stagger on Load ───
gsap.from('.name-char', {
    opacity: 0,
    y: 50,
    rotateX: -90,
    duration: 1,
    stagger: 0.1,
    delay: 0.6,
    ease: 'back.out(1.7)'
});

// ─── Ambient Grid Mouse Follow ───
const ambientGrid = document.querySelector('.ambient-grid');
if (ambientGrid && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        ambientGrid.style.transform = `translate(${x}px, ${y}px)`;
    });
}
