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

// Sistema de alternância de imagens do perfil
const profileImages = [
    'img/Amanda.jpeg',
    'img/Amanda1.jpeg',
    'img/Amanda2.jpeg'
];

let currentImageIndex = 0;

// Animação das setas de navegação com alternância de imagens
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');
const profileImg = document.querySelector('.profile-img');

function changeProfileImage(direction) {
    if (!profileImg) return;
    
    // Animação de saída
    profileImg.style.transform = 'scale(0.8)';
    profileImg.style.opacity = '0.3';
    
    setTimeout(() => {
        // Alterar índice da imagem
        if (direction === 'next') {
            currentImageIndex = (currentImageIndex + 1) % profileImages.length;
        } else {
            currentImageIndex = (currentImageIndex - 1 + profileImages.length) % profileImages.length;
        }
        
        // Trocar a imagem
        profileImg.src = profileImages[currentImageIndex];
        
        // Atualizar indicadores
        updateIndicators();
        
        // Animação de entrada
        setTimeout(() => {
            profileImg.style.transform = 'scale(1)';
            profileImg.style.opacity = '1';
        }, 100);
        
    }, 200);
}

if (leftArrow && rightArrow && profileImg) {
    // Seta esquerda - imagem anterior
    leftArrow.addEventListener('click', (e) => {
        e.preventDefault();
        changeProfileImage('prev');
        
        // Efeito visual no botão
        leftArrow.style.transform = 'translateY(-50%) scale(0.9)';
        setTimeout(() => {
            leftArrow.style.transform = 'translateY(-50%) scale(1)';
        }, 150);
    });
    
    // Seta direita - próxima imagem
    rightArrow.addEventListener('click', (e) => {
        e.preventDefault();
        changeProfileImage('next');
        
        // Efeito visual no botão
        rightArrow.style.transform = 'translateY(-50%) scale(0.9)';
        setTimeout(() => {
            rightArrow.style.transform = 'translateY(-50%) scale(1)';
        }, 150);
    });
    
    // Adicionar transições suaves à imagem
    profileImg.style.transition = 'all 0.3s ease';
}

// Funcionalidade dos indicadores de imagem
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentImageIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function goToImage(index) {
    if (!profileImg || index === currentImageIndex) return;
    
    // Animação de saída
    profileImg.style.transform = 'scale(0.8)';
    profileImg.style.opacity = '0.3';
    
    setTimeout(() => {
        // Alterar índice da imagem
        currentImageIndex = index;
        
        // Trocar a imagem
        profileImg.src = profileImages[currentImageIndex];
        
        // Atualizar indicadores
        updateIndicators();
        
        // Animação de entrada
        setTimeout(() => {
            profileImg.style.transform = 'scale(1)';
            profileImg.style.opacity = '1';
        }, 100);
        
    }, 200);
}

// Adicionar event listeners aos indicadores
document.addEventListener('DOMContentLoaded', () => {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToImage(index);
            
            // Efeito visual no indicador
            indicator.style.transform = 'scale(1.1)';
            setTimeout(() => {
                indicator.style.transform = indicator.classList.contains('active') ? 'scale(1.3)' : 'scale(1)';
            }, 150);
        });
    });
    
    // Inicializar indicadores
    updateIndicators();
});

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

// Função para abrir projetos
function openProject(projectId) {
    // Por enquanto, mostra um alert. Depois será implementada a navegação
    const projectNames = {
        'project1': 'E-Commerce Platform',
        'project2': 'Task Management App',
        'project3': 'Data Analytics Dashboard'
    };
    
    const projectName = projectNames[projectId];
    alert(`Redirecionando para: ${projectName}\n\nEsta funcionalidade será implementada em breve!`);
    
    // Futura implementação:
    // window.location.href = `project.html?id=${projectId}`;
    // ou
    // window.open(`projects/${projectId}.html`, '_blank');
}

// Efeito adicional nos cards de projeto
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Geração do gráfico de contribuições do GitHub
function generateContributionGraph() {
    const grid = document.getElementById('contributionGrid');
    if (!grid) return;
    
    // Gerar 371 dias (53 semanas x 7 dias)
    for (let i = 0; i < 371; i++) {
        const day = document.createElement('div');
        day.className = 'contribution-day';
        
        // Gerar níveis de contribuição aleatórios (mais realistas)
        const random = Math.random();
        let level;
        
        if (random < 0.3) level = 0;
        else if (random < 0.6) level = 1;
        else if (random < 0.8) level = 2;
        else if (random < 0.95) level = 3;
        else level = 4;
        
        day.classList.add(`level-${level}`);
        
        // Adicionar tooltip com data
        const date = new Date();
        date.setDate(date.getDate() - (371 - i));
        const dateString = date.toLocaleDateString('pt-BR');
        const contributions = level === 0 ? 0 : Math.floor(Math.random() * 10) + 1;
        
        day.title = `${dateString}: ${contributions} contribution${contributions !== 1 ? 's' : ''}`;
        
        grid.appendChild(day);
    }
}

// Animação dos números das métricas do GitHub
function animateGitHubMetrics() {
    const metrics = [
        { element: '.github-metrics .metric-number', values: ['2.5K', '47', '1.2K', '156'] }
    ];
    
    const metricElements = document.querySelectorAll('.github-metrics .metric-number');
    const targetValues = ['2.5K', '47', '1.2K', '156'];
    
    metricElements.forEach((element, index) => {
        const targetValue = targetValues[index];
        let currentValue = 0;
        const isKValue = targetValue.includes('K');
        const numericTarget = isKValue ? 
            parseFloat(targetValue.replace('K', '')) * 1000 : 
            parseInt(targetValue);
        
        const increment = numericTarget / 60;
        
        const timer = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= numericTarget) {
                element.textContent = targetValue;
                clearInterval(timer);
            } else {
                if (isKValue) {
                    element.textContent = (currentValue / 1000).toFixed(1) + 'K';
                } else {
                    element.textContent = Math.floor(currentValue);
                }
            }
        }, 50);
    });
}

// Observer para animar quando a seção GitHub ficar visível
const githubObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            generateContributionGraph();
            setTimeout(animateGitHubMetrics, 500);
            githubObserver.unobserve(entry.target);
        }
    });
});

// Observar a seção GitHub
document.addEventListener('DOMContentLoaded', () => {
    const githubSection = document.querySelector('.github-section');
    if (githubSection) {
        githubObserver.observe(githubSection);
    }
});

// Formulário de contato
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const btnLoader = document.getElementById('btnLoader');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = contactForm?.querySelector('.submit-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Mostrar loading
            btnLoader.classList.add('active');
            submitBtn.disabled = true;
            formStatus.style.display = 'none';
            
            // Simular envio do formulário (aqui você integraria com um serviço real)
            try {
                // Simular delay de envio
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Coletar dados do formulário
                const formData = new FormData(contactForm);
                const data = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    subject: formData.get('subject'),
                    message: formData.get('message')
                };
                
                console.log('Dados do formulário:', data);
                
                // Simular sucesso (aqui você faria a requisição real)
                showFormStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
                contactForm.reset();
                
                // Aqui você integraria com um serviço como:
                // - EmailJS
                // - Netlify Forms
                // - Seu próprio backend
                // - Serviço de email como SendGrid
                
            } catch (error) {
                console.error('Erro ao enviar formulário:', error);
                showFormStatus('error', 'Something went wrong. Please try again or contact me directly via email.');
            } finally {
                // Esconder loading
                btnLoader.classList.remove('active');
                submitBtn.disabled = false;
            }
        });
    }
    
    function showFormStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
    
    // Efeito nos inputs do formulário
    const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});

// Smooth scroll para "Back to Top"
document.addEventListener('DOMContentLoaded', () => {
    const backToTopLink = document.querySelector('a[href="#home"]');
    if (backToTopLink) {
        backToTopLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Animação dos ícones sociais
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.classList.add('animate-in');
    });
});

// Observer para animar a seção de contato
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const contactMethods = entry.target.querySelectorAll('.contact-method');
            contactMethods.forEach((method, index) => {
                setTimeout(() => {
                    method.style.opacity = '1';
                    method.style.transform = 'translateX(0)';
                }, index * 200);
            });
            
            const socialLinks = entry.target.querySelectorAll('.social-link');
            socialLinks.forEach((link, index) => {
                setTimeout(() => {
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, 600 + (index * 100));
            });
            
            contactObserver.unobserve(entry.target);
        }
    });
});

// Observar a seção de contato para animações
document.addEventListener('DOMContentLoaded', () => {
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        // Preparar elementos para animação
        const contactMethods = contactSection.querySelectorAll('.contact-method');
        const socialLinks = contactSection.querySelectorAll('.social-link');
        
        contactMethods.forEach(method => {
            method.style.opacity = '0';
            method.style.transform = 'translateX(-20px)';
            method.style.transition = 'all 0.6s ease';
        });
        
        socialLinks.forEach(link => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
            link.style.transition = 'all 0.6s ease';
        });
        
        contactObserver.observe(contactSection);
    }
});

// Sistema de tradução
let currentLanguage = 'en';

// Traduções adicionais não cobertas pelos data attributes
const translations = {
    en: {
        // Skills Bar
        skillsTitle: 'Skills & Technologies',
        // About Section
        aboutTitle: 'About me',
        aboutDescription: 'I started my software journey from photography. Through that, I learned to love the process of creating from scratch. Since then, this has led me to software development as it fulfills my love for learning and building things.',
        completedProjects: 'Completed<br>Projects',
        clientSatisfaction: 'Client<br>satisfaction',
        yearsExperience: 'Years of<br>experience',
        // Projects
        projectsTitle: 'Projects',
        projectsSubtitle: 'Explore my latest work and creative solutions',
        // GitHub
        githubTitle: 'GitHub Activity',
        githubSubtitle: 'Code, commits, and continuous learning',
        // Contact
        contactTitle: 'Get In Touch',
        contactSubtitle: 'Let\'s build something amazing together'
    },
    pt: {
        // Skills Bar
        skillsTitle: 'Habilidades & Tecnologias',
        // About Section
        aboutTitle: 'Sobre mim',
        aboutDescription: 'Comecei minha jornada no desenvolvimento de software através da fotografia. Com isso, aprendi a amar o processo de criar do zero. Desde então, isso me levou ao desenvolvimento de software, pois satisfaz meu amor por aprender e construir coisas.',
        completedProjects: 'Projetos<br>Concluídos',
        clientSatisfaction: 'Satisfação do<br>Cliente',
        yearsExperience: 'Anos de<br>Experiência',
        // Projects
        projectsTitle: 'Projetos',
        projectsSubtitle: 'Explore meus trabalhos mais recentes e soluções criativas',
        // GitHub
        githubTitle: 'Atividade GitHub',
        githubSubtitle: 'Código, commits e aprendizado contínuo',
        // Contact
        contactTitle: 'Entre em Contato',
        contactSubtitle: 'Vamos construir algo incrível juntos'
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
            // Preservar HTML interno como <span class="dot">
            if (element.innerHTML.includes('<span')) {
                const spanContent = element.querySelector('span');
                element.textContent = newText;
                if (spanContent) {
                    element.appendChild(spanContent);
                }
            } else {
                element.textContent = newText;
            }
        }
    });
    
    // Traduzir placeholders dos inputs
    const inputsWithPlaceholder = document.querySelectorAll('input[data-en-placeholder], textarea[data-en-placeholder]');
    inputsWithPlaceholder.forEach(input => {
        const placeholder = input.getAttribute(`data-${currentLanguage}-placeholder`);
        if (placeholder) {
            input.placeholder = placeholder;
        }
    });
    
    // Traduzir options do select
    const selectOptions = document.querySelectorAll('option[data-en][data-pt]');
    selectOptions.forEach(option => {
        const newText = option.getAttribute(`data-${currentLanguage}`);
        if (newText) {
            option.textContent = newText;
        }
    });
    
    // Traduzir elementos específicos sem data attributes
    translateSpecificElements();
    
    // Salvar preferência no localStorage
    localStorage.setItem('preferredLanguage', currentLanguage);
    
    console.log(`Idioma alterado para: ${currentLanguage === 'en' ? 'Inglês' : 'Português'}`);
}

function translateSpecificElements() {
    const lang = translations[currentLanguage];
    
    // Traduzir títulos de seções
    const aboutTitle = document.querySelector('.about-title');
    if (aboutTitle) aboutTitle.textContent = lang.aboutTitle;
    
    const aboutDesc = document.querySelector('.about-description');
    if (aboutDesc) aboutDesc.textContent = lang.aboutDescription;
    
    const projectsTitle = document.querySelector('.projects-title');
    if (projectsTitle) projectsTitle.textContent = lang.projectsTitle;
    
    const projectsSubtitle = document.querySelector('.projects-subtitle');
    if (projectsSubtitle) projectsSubtitle.textContent = lang.projectsSubtitle;
    
    const githubTitle = document.querySelector('.github-title');
    if (githubTitle) githubTitle.textContent = lang.githubTitle;
    
    const githubSubtitle = document.querySelector('.github-subtitle');
    if (githubSubtitle) githubSubtitle.textContent = lang.githubSubtitle;
    
    const contactTitle = document.querySelector('.contact-title');
    if (contactTitle) contactTitle.textContent = lang.contactTitle;
    
    const contactSubtitle = document.querySelector('.contact-subtitle');
    if (contactSubtitle) contactSubtitle.textContent = lang.contactSubtitle;
    
    // Traduzir labels das estatísticas
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels.length >= 3) {
        statLabels[0].innerHTML = lang.completedProjects;
        statLabels[1].innerHTML = lang.clientSatisfaction;
        statLabels[2].innerHTML = lang.yearsExperience;
    }
}

// Carregar idioma preferido do localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && savedLanguage !== currentLanguage) {
        toggleLanguage();
    }
});

console.log('Portfólio da Amanda Ferreira carregado com sucesso!');
