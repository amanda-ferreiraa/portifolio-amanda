// Função para navegar para projetos
function goToProject(projectId) {
    // Esta função será implementada depois para navegar para as páginas dos projetos
    console.log('Navegando para o projeto:', projectId);
    alert('Página do projeto ' + projectId + ' será implementada em breve!');
}

// Formulário de contato interativo
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = form.querySelector('.send-btn');
            const btnText = btn.querySelector('.btn-text');
            const btnIcon = btn.querySelector('.btn-icon');
            
            // Animação de envio
            btnText.textContent = 'Enviando...';
            btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
            
            // Simular envio (substitua por integração real)
            setTimeout(() => {
                btnText.textContent = 'Mensagem Enviada!';
                btnIcon.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
                
                // Reset após 3 segundos
                setTimeout(() => {
                    btnText.textContent = 'Enviar Mensagem';
                    btn.style.background = 'linear-gradient(135deg, #4ecdc4, #45b7d1)';
                    btnIcon.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" stroke-width="2"/>
                            <polygon points="22,2 15,22 11,13 2,9 22,2" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    `;
                    form.reset();
                }, 3000);
            }, 2000);
        });
    }

    // Smooth scroll para navegação
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efeito parallax nas animações
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax nas ondas decorativas
        const waves = document.querySelector('.wave-decoration');
        if (waves) {
            waves.style.transform = `translateY(${rate}px)`;
        }
        
        // Parallax nos elementos de fundo
        const githubBg = document.querySelector('.github-bg-animation');
        if (githubBg) {
            githubBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        const contactBubbles = document.querySelectorAll('.bubble');
        contactBubbles.forEach((bubble, index) => {
            const speed = 0.1 + (index * 0.05);
            bubble.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Animação de entrada dos elementos quando aparecem na tela
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação de entrada
    const animatedElements = document.querySelectorAll('.project-card, .contact-card, .metric-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efeito de digitação no terminal GitHub
    const terminalLines = document.querySelectorAll('.terminal-line .command');
    terminalLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typeWriter = setInterval(() => {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeWriter);
                }
            }, 100);
        }, index * 2000);
    });
});