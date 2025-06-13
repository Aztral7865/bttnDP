// script.js
document.addEventListener('DOMContentLoaded', () => {
    const allTabButtons = document.querySelectorAll('[data-tab]');
    const contentSections = document.querySelectorAll('.content-section');
    const navUnderline = document.querySelector('.nav-underline');
    const mainNav = document.getElementById('main-nav');
    const mobileMenuButton = document.getElementById('mobile-menu-button');

    // Função para atualizar a posição do underline da navegação
    const updateUnderline = (activeButton) => {
        if (activeButton && window.innerWidth >= 993) {
            navUnderline.style.width = `${activeButton.offsetWidth}px`;
            navUnderline.style.left = `${activeButton.offsetLeft}px`;
            navUnderline.style.opacity = '1';
        } else {
            navUnderline.style.opacity = '0';
        }
    };

    // Função para definir a aba ativa
    const setActiveTab = (tabId, isInitialLoad = false) => {
        allTabButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.tab === tabId);
        });

        contentSections.forEach(section => {
            section.classList.toggle('active', section.id === `${tabId}-section`);
        });

        const activeButtonForUnderline = document.querySelector(`#main-nav .nav-button[data-tab="${tabId}"]`);
        updateUnderline(activeButtonForUnderline);

        if (!isInitialLoad && mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            mobileMenuButton.querySelector('i').setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    };

    // --- LÓGICA DO CARROSSEL ATUALIZADA ---
    const initializeCarousel = () => {
        const carousels = document.querySelectorAll('.carousel-container');
        carousels.forEach(carousel => {
            const slides = carousel.querySelector('.carousel-slides');
            const images = slides.querySelectorAll('.carousel-image');
            const prevBtn = carousel.querySelector('.carousel-arrow.prev');
            const nextBtn = carousel.querySelector('.carousel-arrow.next');
            if (images.length <= 1) return;

            let currentIndex = 0;
            const totalImages = images.length;
            let slideInterval; // Variável para o intervalo

            const firstClone = images[0].cloneNode(true);
            const lastClone = images[totalImages - 1].cloneNode(true);
            slides.appendChild(firstClone);
            slides.insertBefore(lastClone, images[0]);

            slides.style.transform = `translateX(-100%)`;

            const moveToNextSlide = () => {
                currentIndex++;
                slides.style.transition = 'transform 0.5s ease-in-out';
                slides.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
            };

            const moveToPrevSlide = () => {
                currentIndex--;
                slides.style.transition = 'transform 0.5s ease-in-out';
                slides.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
            };

            // Inicia o avanço automático
            const startSlideShow = () => {
                slideInterval = setInterval(moveToNextSlide, 5000); // 5000ms = 5 segundos
            };

            // Para o avanço automático
            const stopSlideShow = () => {
                clearInterval(slideInterval);
            };

            slides.addEventListener('transitionend', () => {
                if (currentIndex >= totalImages) {
                    slides.style.transition = 'none';
                    currentIndex = 0;
                    slides.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
                } else if (currentIndex < 0) {
                    slides.style.transition = 'none';
                    currentIndex = totalImages - 1;
                    slides.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
                }
            });

            nextBtn.addEventListener('click', moveToNextSlide);
            prevBtn.addEventListener('click', moveToPrevSlide);

            // Pausa ao passar o mouse e retoma ao tirar
            carousel.addEventListener('mouseenter', stopSlideShow);
            carousel.addEventListener('mouseleave', startSlideShow);

            startSlideShow(); // Inicia o carrossel
        });
    };

    // Event Listeners
    allTabButtons.forEach(button => {
        button.addEventListener('click', () => setActiveTab(button.dataset.tab));
    });

    mobileMenuButton.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        const icon = mobileMenuButton.querySelector('i');
        const isMenuOpen = mainNav.classList.contains('open');
        icon.setAttribute('data-lucide', isMenuOpen ? 'x' : 'menu');
        lucide.createIcons();
    });

    window.addEventListener('resize', () => {
        const activeNavButton = document.querySelector('#main-nav .nav-button.active');
        updateUnderline(activeNavButton);
    });

    // Inicialização
    setActiveTab('about', true);
    initializeCarousel();
    lucide.createIcons();
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
