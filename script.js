// script.js
document.addEventListener('DOMContentLoaded', () => {
    // --- SELETORES ---
    const allTabButtons = document.querySelectorAll('[data-tab]');
    const contentSections = document.querySelectorAll('.content-section');
    const navUnderline = document.querySelector('.nav-underline');
    const mainNav = document.getElementById('main-nav');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const flipCards = document.querySelectorAll('.flip-card'); // Para Mitos e Verdades
    const faqItems = document.querySelectorAll('.faq-item');   // Para FAQ

    // --- FUNÇÕES DE NAVEGAÇÃO E ABAS ---
    const updateUnderline = (activeButton) => {
        if (activeButton && window.innerWidth >= 993) {
            navUnderline.style.width = `${activeButton.offsetWidth}px`;
            navUnderline.style.left = `${activeButton.offsetLeft}px`;
            navUnderline.style.opacity = '1';
        } else {
            navUnderline.style.opacity = '0';
        }
    };

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

    // --- LÓGICA DO CARROSSEL ---
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
            let slideInterval;

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

            const startSlideShow = () => {
                slideInterval = setInterval(moveToNextSlide, 5000);
            };

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

            nextBtn.addEventListener('click', () => {
                moveToNextSlide();
                stopSlideShow();
                startSlideShow();
            });

            prevBtn.addEventListener('click', () => {
                moveToPrevSlide();
                stopSlideShow();
                startSlideShow();
            });

            carousel.addEventListener('mouseenter', stopSlideShow);
            carousel.addEventListener('mouseleave', startSlideShow);

            startSlideShow();
        });
    };

    // --- LÓGICA PARA MITOS E VERDADES ---
    const initializeFlipCards = () => {
        flipCards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('active');
            });
        });
    };

    // --- LÓGICA PARA FAQ INTELIGENTE ---
    const initializeFaq = () => {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const icon = item.querySelector('.faq-icon');

            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-icon').setAttribute('data-lucide', 'plus');
                    }
                });
                if (!isActive) {
                    item.classList.add('active');
                    icon.setAttribute('data-lucide', 'minus');
                } else {
                    item.classList.remove('active');
                    icon.setAttribute('data-lucide', 'plus');
                }
                lucide.createIcons();
            });
        });
    };

    // --- EVENT LISTENERS GERAIS ---
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

    // --- INICIALIZAÇÃO DE TODAS AS FUNÇÕES ---
    setActiveTab('about', true);
    initializeCarousel();
    initializeFlipCards();
    initializeFaq();
    lucide.createIcons();
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
