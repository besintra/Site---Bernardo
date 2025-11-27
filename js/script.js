// Adicione este código no arquivo js/script.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Efeito de digitação no título de boas-vindas
    const welcomeText = "Seja bem-vindo ao meu dossiê escolar!";
    const welcomeElement = document.querySelector('.hero-welcome');
    
    if (welcomeElement) {
        welcomeElement.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < welcomeText.length) {
                welcomeElement.textContent += welcomeText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        typeWriter();
    }

    // 2. Animação de contador nos stats
    const statNumbers = document.querySelectorAll('.stat-number-super');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
            }
        }, 30);
    });

    // 3. Efeito de rolagem suave para links internos
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

    // 4. Efeito de destaque nos cards ao passar o mouse
    const cards = document.querySelectorAll('.highlight-card-super');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 5. Botão "Voltar ao Topo"
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '20px';
    backToTopButton.style.right = '20px';
    backToTopButton.style.padding = '10px 15px';
    backToTopButton.style.backgroundColor = '#007bff';
    backToTopButton.style.color = 'white';
    backToTopButton.style.border = 'none';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.display = 'none';
    backToTopButton.style.zIndex = '1000';
    backToTopButton.style.fontSize = '18px';
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(backToTopButton);

    // Mostrar/ocultar botão baseado na rolagem
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // 6. Efeito de loading na página
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // 7. Contador de visitas (armazenado localmente)
    if (localStorage.getItem('visitas')) {
        let visitas = parseInt(localStorage.getItem('visitas')) + 1;
        localStorage.setItem('visitas', visitas);
    } else {
        localStorage.setItem('visitas', '1');
    }
    
    console.log('Número de visitas:', localStorage.getItem('visitas'));

    // 8. Modal para imagens
    const images = document.querySelectorAll('.profile-image-super, .gif-container-extra-large');
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '2000';
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.style.maxWidth = '90%';
            modalImg.style.maxHeight = '90%';
            modalImg.style.borderRadius = '10px';
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
    });
});

// 9. Função para mostrar data e hora atual
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return now.toLocaleDateString('pt-BR', options);
}

// Adicionar data/hora no footer
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('footer .container');
    if (footer) {
        const dateElement = document.createElement('p');
        dateElement.style.fontSize = '0.9em';
        dateElement.style.color = '#666';
        dateElement.textContent = 'Acessado em: ' + updateDateTime();
        footer.appendChild(dateElement);
    }
});