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

console.log('Portfólio da Amanda Ferreira carregado com sucesso!');
