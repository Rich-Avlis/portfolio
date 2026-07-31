const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.edu-card, .skill-category, .achievement-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.09)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.05)';
    }
});

const bgVideo = document.getElementById('bgVideo');
const pageCanvas = document.getElementById('pageCanvas');
const ctx = pageCanvas ? pageCanvas.getContext('2d') : null;
let reverse = false;

function resizeCanvas() {
    if (!pageCanvas) return;
    const dpr = window.devicePixelRatio || 1;
    pageCanvas.width = window.innerWidth * dpr;
    pageCanvas.height = window.innerHeight * dpr;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawFrame() {
    if (!ctx) return;
    if (bgVideo.readyState >= 2 && bgVideo.videoWidth) {
        const w = pageCanvas.width;
        const h = pageCanvas.height;
        const vw = bgVideo.videoWidth;
        const vh = bgVideo.videoHeight;
        const scale = Math.max(w / vw, h / vh);
        const dw = vw * scale;
        const dh = vh * scale;
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(bgVideo, (w - dw) / 2, (h - dh) / 2, dw, dh);
    }
}

function startVideo() {
    bgVideo.muted = true;
    bgVideo.defaultMuted = true;
    const p = bgVideo.play();
    if (p) p.catch(() => {});
}

function tick() {
    if (bgVideo.readyState >= 2) {
        if (!reverse) {
            if (bgVideo.paused) {
                const p = bgVideo.play();
                if (p) p.catch(() => {});
            }
            if (bgVideo.duration && bgVideo.currentTime >= bgVideo.duration - 0.15) {
                reverse = true;
                bgVideo.pause();
            }
        } else {
            bgVideo.currentTime = Math.max(0, bgVideo.currentTime - 0.033);
            if (bgVideo.currentTime <= 0.03) {
                bgVideo.currentTime = 0.03;
                reverse = false;
            }
        }
    }
    drawFrame();
    requestAnimationFrame(tick);
}

bgVideo.addEventListener('loadedmetadata', () => {
    startVideo();
    drawFrame();
});

document.addEventListener('visibilitychange', () => {
    if (!document.hidden && bgVideo.paused) startVideo();
});

['touchstart', 'click'].forEach(evt => {
    document.addEventListener(evt, () => {
        if (bgVideo.paused) startVideo();
    }, { passive: true });
});

startVideo();
tick();
