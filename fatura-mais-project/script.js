// Configurações de idioma
let currentLanguage = 'en';

// Traduções específicas
const translations = {
    en: {
        // Títulos de seção não cobertos por data attributes
        heroTitle: 'Fatura+',
        demoTitle: 'Live Demo',
        featuresTitle: 'Key Features',
        resultsTitle: 'Project Impact'
    },
    pt: {
        // Traduções em português
        heroTitle: 'Fatura+',
        demoTitle: 'Demonstração ao Vivo', 
        featuresTitle: 'Principais Recursos',
        resultsTitle: 'Impacto do Projeto'
    }
};

// Sistema de tradução
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
            // Preservar HTML interno se existir
            if (element.innerHTML.includes('<')) {
                const innerHTML = element.innerHTML;
                element.innerHTML = innerHTML.replace(element.textContent, newText);
            } else {
                element.textContent = newText;
            }
        }
    });
    
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

// Smooth scrolling para seções
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Smooth scrolling para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Sistema de tabs do demo
document.addEventListener('DOMContentLoaded', () => {
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoScreens = document.querySelectorAll('.demo-screen');
    
    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and screens
            demoTabs.forEach(t => t.classList.remove('active'));
            demoScreens.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding screen
            const targetScreen = document.querySelector(`[data-screen="${targetTab}"]`);
            if (targetScreen) {
                targetScreen.classList.add('active');
            }
        });
    });
});

// Animação dos contadores na seção de resultados
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 60; // Animação de 1 segundo (60 frames)
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16); // ~60fps
    });
}

// Observer para animar contadores quando visíveis
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

// Observar a seção de resultados
document.addEventListener('DOMContentLoaded', () => {
    const resultsSection = document.querySelector('.results-section');
    if (resultsSection) {
        counterObserver.observe(resultsSection);
    }
});

// Efeito de parallax sutil no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Animação de entrada das feature cards
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Preparar cards para animação e observar
document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    const techItems = document.querySelectorAll('.tech-item');
    const resultItems = document.querySelectorAll('.result-item');
    
    [...featureCards, ...techItems, ...resultItems].forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        cardObserver.observe(card);
    });
});

// Efeito hover nos botões
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Mudança de cor do header ao fazer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(26, 29, 35, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.backgroundColor = 'rgba(26, 29, 35, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animação do showcase mockup
document.addEventListener('DOMContentLoaded', () => {
    const mockup = document.querySelector('.showcase-mockup');
    if (mockup) {
        // Efeito de floating
        let floatDirection = 1;
        setInterval(() => {
            if (mockup.style.transform) {
                const currentTransform = mockup.style.transform;
                const currentY = parseFloat(currentTransform.match(/translateY\(([^)]+)\)/)?.[1] || 0);
                
                if (currentY >= 10) floatDirection = -1;
                if (currentY <= -10) floatDirection = 1;
                
                mockup.style.transform = `translateY(${currentY + (floatDirection * 0.5)}px)`;
            } else {
                mockup.style.transform = 'translateY(0px)';
            }
        }, 50);
    }
});

// Funcionalidade de demonstração interativa
document.addEventListener('DOMContentLoaded', () => {
    const demoNavItems = document.querySelectorAll('.demo-nav-item');
    
    demoNavItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items
            demoNavItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Add click effect
            item.style.transform = 'scale(0.98)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 100);
        });
    });
});

// Preloader para demonstração
function showDemoLoading() {
    const demoContent = document.querySelector('.demo-content');
    if (demoContent) {
        demoContent.style.opacity = '0.5';
        demoContent.style.pointerEvents = 'none';
        
        setTimeout(() => {
            demoContent.style.opacity = '1';
            demoContent.style.pointerEvents = 'auto';
        }, 800);
    }
}

// Easter egg - clique triplo no logo
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo h1');
    let clickCount = 0;
    let clickTimer;
    
    if (logo) {
        logo.addEventListener('click', () => {
            clickCount++;
            
            if (clickCount === 3) {
                // Easter egg ativado
                document.body.style.filter = 'hue-rotate(180deg)';
                setTimeout(() => {
                    document.body.style.filter = 'none';
                }, 2000);
                
                console.log('🎉 Easter egg ativado! Cores invertidas por 2 segundos!');
                clickCount = 0;
            }
            
            // Reset click count após 1 segundo
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 1000);
        });
    }
});

// Log de inicialização
console.log('Página do Fatura+ carregada com sucesso!');
console.log('Features ativas:', {
    'Sistema de tradução': '✅',
    'Animações': '✅',
    'Demo interativo': '✅',
    'Contadores animados': '✅',
    'Efeitos de scroll': '✅'
});