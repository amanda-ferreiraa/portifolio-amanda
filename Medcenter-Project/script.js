// Configuração inicial
let currentLanguage = 'en';

// Smooth scrolling para links de âncora
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

// Efeitos de parallax no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
    
    // Atualizar header ao fazer scroll
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(26, 29, 35, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(26, 29, 35, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animações de entrada baseadas em scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animar elementos filhos com delay
            const children = entry.target.querySelectorAll('.overview-card, .feature-item, .tech-item, .highlight-card');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }
    });
}, observerOptions);

// Observar seções para animações
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.overview-section, .features-section, .tech-section, .highlights-section');
    sections.forEach(section => {
        observer.observe(section);
        
        // Preparar elementos para animação
        const animatableElements = section.querySelectorAll('.overview-card, .feature-item, .tech-item, .highlight-card');
        animatableElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
        });
    });
});

// Efeitos nos botões
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Efeitos nos cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.overview-card, .feature-item, .tech-item, .highlight-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Sistema de tradução
const translations = {
    en: {
        // Títulos específicos não cobertos pelos data attributes
        pageTitle: 'MedCenter Platform - Amanda Ferreira',
        // Mensagens do sistema
        loading: 'Loading...',
        error: 'An error occurred. Please try again.'
    },
    pt: {
        // Títulos específicos não cobertos pelos data attributes  
        pageTitle: 'Plataforma MedCenter - Amanda Ferreira',
        // Mensagens do sistema
        loading: 'Carregando...',
        error: 'Ocorreu um erro. Tente novamente.'
    }
};

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'pt' : 'en';
    
    // Atualizar o botão de idioma
    const langBtn = document.getElementById('languageBtn');
    const langFlag = langBtn.querySelector('.lang-flag');
    const langText = langBtn.querySelector('.lang-text');
    
    if (currentLanguage === 'pt') {
        langFlag.textContent = '🇧🇷';
        langText.textContent = 'PT';
    } else {
        langFlag.textContent = '🇺🇸';
        langText.textContent = 'EN';
    }
    
    // Traduzir elementos com data attributes
    const elementsToTranslate = document.querySelectorAll('[data-en][data-pt]');
    elementsToTranslate.forEach(element => {
        const newText = element.getAttribute(`data-${currentLanguage}`);
        if (newText) {
            // Preservar HTML interno se necessário
            if (element.innerHTML.includes('<') && !element.innerHTML.includes('&')) {
                // Elemento tem HTML, preservar estrutura
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = newText;
                element.textContent = tempDiv.textContent;
            } else {
                element.innerHTML = newText;
            }
        }
    });
    
    // Atualizar título da página
    document.title = translations[currentLanguage].pageTitle;
    
    // Salvar preferência no localStorage
    localStorage.setItem('preferredLanguage', currentLanguage);
    
    console.log(`Idioma alterado para: ${currentLanguage === 'en' ? 'Inglês' : 'Português'}`);
}

// Carregar idioma preferido do localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && savedLanguage !== currentLanguage) {
        toggleLanguage();
    }
});

// Animação dos números das métricas
function animateMetrics() {
    const metricNumbers = document.querySelectorAll('.metric-number');
    
    metricNumbers.forEach((metric, index) => {
        const text = metric.textContent;
        
        // Para métricas com números
        if (text.includes('%')) {
            const number = parseInt(text);
            animateNumber(metric, 0, number, '%', 2000);
        }
        // Para outras métricas, apenas fazer aparecer com delay
        else {
            setTimeout(() => {
                metric.style.opacity = '1';
                metric.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    metric.style.transform = 'scale(1)';
                }, 200);
            }, index * 300);
        }
    });
}

function animateNumber(element, start, end, suffix = '', duration = 1500) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Observar seção de highlights para animar métricas
const highlightsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateMetrics, 500);
            highlightsObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const highlightsSection = document.querySelector('.highlights-section');
    if (highlightsSection) {
        highlightsObserver.observe(highlightsSection);
    }
});

// Adicionar efeitos de cursor personalizado
document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll('a, button, .card, .tech-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'default';
        });
    });
});

// Animação suave para o mockup do hero
document.addEventListener('DOMContentLoaded', () => {
    const mockup = document.querySelector('.project-mockup');
    if (mockup) {
        // Animação de flutuação suave
        let floatDirection = 1;
        setInterval(() => {
            mockup.style.transform += ` translateY(${floatDirection * 2}px)`;
            floatDirection *= -1;
        }, 3000);
    }
});

// Lazy loading para otimização
document.addEventListener('DOMContentLoaded', () => {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const lazySrc = element.dataset.lazy;
                
                if (lazySrc) {
                    element.src = lazySrc;
                    element.removeAttribute('data-lazy');
                }
                
                lazyObserver.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });
});

// Feedback visual para interações
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(139, 92, 246, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = (e.clientX - 10) + 'px';
    ripple.style.top = (e.clientY - 10) + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9999';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// CSS para animação do ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Página carregada em:', Math.round(perfData.loadEventEnd - perfData.loadEventStart), 'ms');
        }, 0);
    });
}

console.log('MedCenter Project Page carregada com sucesso! 🏥✨');