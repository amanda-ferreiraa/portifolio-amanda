// Smooth scrolling para navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efeito de parallax sutil no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Animação das setas de navegação
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const profileImg = document.querySelector('.profile-img');

if (leftArrow && rightArrow && profileImg) {
    leftArrow.addEventListener('click', () => {
        profileImg.style.transform = 'scale(0.95)';
        setTimeout(() => {
            profileImg.style.transform = 'scale(1)';
        }, 200);
    });
    
    rightArrow.addEventListener('click', () => {
        profileImg.style.transform = 'scale(1.05)';
        setTimeout(() => {
            profileImg.style.transform = 'scale(1)';
        }, 200);
    });
}

// Efeito de hover nos botões
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Animação dos números das estatísticas
const animateNumbers = () => {
    const statsNumbers = document.querySelectorAll('.stat-number');
    
    statsNumbers.forEach(stat => {
        const finalNumber = parseInt(stat.textContent);
        let currentNumber = 0;
        const increment = finalNumber / 50;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(timer);
            }
            
            // Preserva o símbolo (+ ou %)
            if (stat.querySelector('.stat-plus')) {
                stat.innerHTML = `${Math.floor(currentNumber)}<span class="stat-plus">+</span>`;
            } else if (stat.querySelector('.stat-percent')) {
                stat.innerHTML = `${Math.floor(currentNumber)}<span class="stat-percent">%</span>`;
            } else {
                stat.textContent = Math.floor(currentNumber);
            }
        }, 50);
    });
};

// Observador de interseção para animar números quando visíveis
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
});

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    observer.observe(statsContainer);
}

// Mudança de cor do header ao fazer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(26, 29, 35, 0.98)';
    } else {
        header.style.backgroundColor = 'rgba(26, 29, 35, 0.95)';
    }
});

console.log('Portfólio da Amanda Ferreira carregado com sucesso!');
