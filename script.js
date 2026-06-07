// Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Mobile Dropdown Support
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        dropbtn.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const content = dropdown.querySelector('.dropdown-content');
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active'); // Close menu on click
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lightweight Canvas Background
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    let animationFrameId;
    let isVisible = true;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 5 + 2;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = Math.random() > 0.5 ? '#FDE68A' : '#F97316';
            this.opacity = Math.random() * 0.3 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            if (this.y < 0) this.y = height;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < 30; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        if (!isVisible) return;
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        animationFrameId = requestAnimationFrame(animate);
    }

    function startAnimation() {
        if (!animationFrameId && isVisible) {
            animate();
        }
    }

    function stopAnimation() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    // Visibility API optimization
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            isVisible = false;
            stopAnimation();
        } else {
            isVisible = true;
            startAnimation();
        }
    });

    window.addEventListener('resize', () => {
        init();
        if(!animationFrameId) startAnimation();
    });
    
    init();
    startAnimation();

    // WeChat/QQ Anti-block Mask
    const ua = navigator.userAgent.toLowerCase();
    const isWechat = /micromessenger/.test(ua);
    const isQQ = /qq\//.test(ua);
    if (isWechat || isQQ) {
        const mask = document.getElementById('wechat-mask');
        if (mask) mask.style.display = 'block';
    }

    // Service Worker Registration (PWA)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch(err => {
                console.log('SW registration failed: ', err);
            });
        });
    }

    // Click to copy & redirect logic
    document.querySelectorAll('.copy-coupon').forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            const code = this.getAttribute('data-code');
            const link = this.getAttribute('data-link');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(code).then(() => {
                    alert('优惠码 [' + code + '] 已复制，即将为您跳转...');
                    if(link) window.open(link, '_blank');
                });
            } else {
                // fallback
                alert('优惠码: ' + code);
                if(link) window.open(link, '_blank');
            }
        });
    });

});
