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

const pageVideo = document.querySelector('.page-video');
if (pageVideo) {
    pageVideo.muted = true;
    pageVideo.defaultMuted = true;
    const startPlay = pageVideo.play();
    if (startPlay) startPlay.catch(() => {});

    pageVideo.addEventListener('ended', () => {
        pageVideo.playbackRate = -1;
        const p = pageVideo.play();
        if (p) p.catch(() => {});
    });

    pageVideo.addEventListener('timeupdate', () => {
        if (pageVideo.currentTime <= 0.05 && pageVideo.playbackRate < 0) {
            pageVideo.playbackRate = 1;
            const p = pageVideo.play();
            if (p) p.catch(() => {});
        }
    });
}
