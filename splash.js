// splash.js
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const mainSiteContent = document.getElementById('main-site-content');
    const heroContent = document.querySelector('#splash-screen .hero-content');

    // Tempos das animações (em milissegundos)
    const animationInDuration = 1000; // Duração da animação de entrada do texto
    const transitionDelayBeforeOut = 1500; // Tempo de espera da splash screen após entrada
    const animationOutDuration = 600; // Duração da animação de saída do texto e da própria splash screen

    // Ocultar o conteúdo principal do site imediatamente
    if (mainSiteContent) {
        mainSiteContent.style.display = 'none';
    }

    // Tempo total para a transição completa
    const totalTransitionTime = animationInDuration + transitionDelayBeforeOut + animationOutDuration;

    // Iniciar animações de saída
    setTimeout(() => {
        if (heroContent) {
            heroContent.style.animation = `slideOutDown ${animationOutDuration / 1000}s ease-in forwards`;
        }
        if (splashScreen) {
            splashScreen.style.opacity = '0';
        }
    }, animationInDuration + transitionDelayBeforeOut);

    // Ocultar a splash screen e mostrar o conteúdo principal
    setTimeout(() => {
        if (splashScreen) {
            splashScreen.style.display = 'none';
        }
        if (mainSiteContent) {
            mainSiteContent.style.display = 'block';
        }
    }, totalTransitionTime);
});
