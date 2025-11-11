// ===== FUNCIONALIDADES RESPONSIVE PARA UN MINUTO PARA GANAR =====

class ResponsiveApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupScrollEffects();
        this.setupIntersectionObserver();
        this.setupTouchGestures();
        this.setupKeyboardNavigation();
        this.setupLoadingStates();
        this.setupPerformanceOptimizations();
        this.setupAccessibility();
    }

    // ===== MENÚ MÓVIL RESPONSIVE =====
    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const nav = document.getElementById('nav');
        const body = document.body;

        if (!mobileMenuToggle || !nav) return;

        // Toggle del menú móvil
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            const icon = mobileMenuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.className = 'fas fa-times';
                this.animateMenuItems();
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                body.classList.remove('menu-open');
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            });

            // Animación escalonada para los elementos del menú
            link.style.animationDelay = `${index * 0.1}s`;
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                nav.classList.remove('active');
                body.classList.remove('menu-open');
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    }

    // ===== ANIMACIÓN DE ELEMENTOS DEL MENÚ =====
    animateMenuItems() {
        const menuItems = document.querySelectorAll('.nav-link');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    // ===== DESPLAZAMIENTO SUAVE =====
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== EFECTOS DE SCROLL =====
    setupScrollEffects() {
        let lastScrollTop = 0;
        const header = document.querySelector('.header');
        const scrollThreshold = 100;

        if (!header) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Efecto de ocultar/mostrar header
            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            // Efecto de transparencia del header
            if (scrollTop > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.15)';
                header.style.backdropFilter = 'blur(25px)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.1)';
                header.style.backdropFilter = 'blur(20px)';
            }
            
            lastScrollTop = scrollTop;
        }, { passive: true });
    }

    // ===== OBSERVADOR DE INTERSECCIÓN =====
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animación adicional para las tarjetas
                    if (entry.target.classList.contains('card')) {
                        entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                    }
                }
            });
        }, observerOptions);

        // Observar elementos para animación
        document.querySelectorAll('.card, .fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ===== GESTOS TÁCTILES =====
    setupTouchGestures() {
        let touchStartY = 0;
        let touchStartX = 0;
        let touchEndY = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });

        // Gestos de swipe para navegación
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1) {
                const touch = e.touches[0];
                const deltaX = touch.clientX - touchStartX;
                const deltaY = touch.clientY - touchStartY;
                
                // Prevenir scroll horizontal en gestos de swipe
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                    e.preventDefault();
                }
            }
        }, { passive: false });
    }

    // ===== MANEJO DE SWIPES =====
    handleSwipe() {
        const swipeThreshold = 50;
        const diffY = touchStartY - touchEndY;
        const diffX = touchStartX - touchEndX;
        
        if (Math.abs(diffY) > swipeThreshold) {
            if (diffY > 0) {
                // Swipe hacia arriba
                this.handleSwipeUp();
            } else {
                // Swipe hacia abajo
                this.handleSwipeDown();
            }
        }
        
        if (Math.abs(diffX) > swipeThreshold) {
            if (diffX > 0) {
                // Swipe hacia la izquierda
                this.handleSwipeLeft();
            } else {
                // Swipe hacia la derecha
                this.handleSwipeRight();
            }
        }
    }

    handleSwipeUp() {
        const nav = document.getElementById('nav');
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
            const icon = document.querySelector('#mobile-menu-toggle i');
            if (icon) icon.className = 'fas fa-bars';
        }
    }

    handleSwipeDown() {
        // Implementar funcionalidad si es necesaria
    }

    handleSwipeLeft() {
        // Implementar funcionalidad si es necesaria
    }

    handleSwipeRight() {
        // Implementar funcionalidad si es necesaria
    }

    // ===== NAVEGACIÓN POR TECLADO =====
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC para cerrar menú móvil
            if (e.key === 'Escape') {
                const nav = document.getElementById('nav');
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    const icon = document.querySelector('#mobile-menu-toggle i');
                    if (icon) icon.className = 'fas fa-bars';
                }
            }

            // Navegación por tab
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });
    }

    // ===== MANEJO DE NAVEGACIÓN POR TAB =====
    handleTabNavigation(e) {
        const focusableElements = document.querySelectorAll(
            'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }

    // ===== ESTADOS DE CARGA =====
    setupLoadingStates() {
        // Simular estados de carga para las tarjetas
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                if (!card.classList.contains('loading')) {
                    card.classList.add('loading');
                    
                    // Simular tiempo de carga
                    setTimeout(() => {
                        card.classList.remove('loading');
                    }, 1000);
                }
            });
        });
    }

    // ===== OPTIMIZACIONES DE RENDIMIENTO =====
    setupPerformanceOptimizations() {
        // Lazy loading para imágenes
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Debounce para eventos de scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                // Ejecutar código después de que el scroll se detenga
                this.handleScrollEnd();
            }, 150);
        }, { passive: true });
    }

    // ===== MANEJO DEL FIN DEL SCROLL =====
    handleScrollEnd() {
        // Implementar funcionalidad cuando el scroll se detiene
        const cards = document.querySelectorAll('.card:not(.visible)');
        if (cards.length > 0) {
            cards.forEach(card => {
                if (this.isElementInViewport(card)) {
                    card.classList.add('visible');
                }
            });
        }
    }

    // ===== VERIFICAR SI UN ELEMENTO ESTÁ EN VIEWPORT =====
    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // ===== ACCESIBILIDAD =====
    setupAccessibility() {
        // Añadir atributos ARIA
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }

        // Actualizar aria-expanded cuando se abre/cierra el menú
        const nav = document.getElementById('nav');
        if (nav && mobileMenuToggle) {
            const observer = new MutationObserver(() => {
                const isExpanded = nav.classList.contains('active');
                mobileMenuToggle.setAttribute('aria-expanded', isExpanded.toString());
            });
            
            observer.observe(nav, { attributes: true, attributeFilter: ['class'] });
        }

        // Skip to content link
        this.createSkipLink();
    }

    // ===== CREAR ENLACE SKIP TO CONTENT =====
    createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Saltar al contenido principal';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1001;
            transition: top 0.3s;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // ===== MANEJO DE ORIENTACIÓN DEL DISPOSITIVO =====
    handleOrientationChange() {
        const isLandscape = window.innerHeight < window.innerWidth;
        
        if (isLandscape && window.innerHeight < 500) {
            document.body.classList.add('landscape-mode');
        } else {
            document.body.classList.remove('landscape-mode');
        }
    }

    // ===== MANEJO DE CAMBIOS DE TAMAÑO DE VENTANA =====
    handleResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.handleOrientationChange();
            
            // Recalcular posiciones si es necesario
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                if (this.isElementInViewport(card)) {
                    card.classList.add('visible');
                }
            });
        }, 250);
    }
}

// ===== INICIALIZACIÓN CUANDO EL DOM ESTÉ LISTO =====
document.addEventListener('DOMContentLoaded', () => {
    // Crear instancia de la aplicación responsive
    const app = new ResponsiveApp();
    
    // Manejar cambios de orientación y tamaño de ventana
    window.addEventListener('orientationchange', () => {
        setTimeout(() => app.handleOrientationChange(), 100);
    });
    
    window.addEventListener('resize', () => app.handleResize());
    
    // Añadir clase al body cuando la página esté completamente cargada
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// ===== FUNCIONES UTILITARIAS GLOBALES =====

// Función para detectar si el dispositivo es móvil
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Función para detectar si el dispositivo tiene pantalla táctil
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Función para obtener el tamaño de la pantalla
function getScreenSize() {
    const width = window.innerWidth;
    if (width < 480) return 'xs';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    if (width < 1200) return 'lg';
    return 'xl';
}

// Función para añadir clase CSS basada en el tamaño de pantalla
function addScreenSizeClass() {
    const screenSize = getScreenSize();
    document.body.className = document.body.className.replace(/screen-\w+/g, '');
    document.body.classList.add(`screen-${screenSize}`);
}

// Función para manejar la carga de imágenes
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Función para manejar el scroll infinito (si es necesario)
function setupInfiniteScroll() {
    let isLoading = false;
    let page = 1;
    
    window.addEventListener('scroll', () => {
        if (isLoading) return;
        
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            isLoading = true;
            // Aquí puedes implementar la carga de más contenido
            setTimeout(() => {
                isLoading = false;
                page++;
            }, 1000);
        }
    });
}

// Exportar funciones para uso global
window.ResponsiveApp = ResponsiveApp;
window.isMobile = isMobile;
window.isTouchDevice = isTouchDevice;
window.getScreenSize = getScreenSize;
