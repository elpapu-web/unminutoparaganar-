// Funcionalidad para menú colapsable
document.addEventListener("DOMContentLoaded", function() {
    console.log("Menú colapsable cargado");
    
    // Obtener todos los botones de toggle
    const menuToggles = document.querySelectorAll('.menu-toggle');
    
    // Función para cerrar todos los submenús
    function closeAllSubmenus() {
        document.querySelectorAll('.submenu').forEach(submenu => {
            submenu.classList.remove('active');
        });
        
        document.querySelectorAll('.menu-toggle').forEach(toggle => {
            toggle.classList.remove('active');
        });
    }
    
    // Función para abrir/cerrar un submenú específico
    function toggleSubmenu(targetId) {
        const submenu = document.getElementById(targetId);
        const toggle = document.querySelector(`[data-target="${targetId}"]`);
        
        if (submenu.classList.contains('active')) {
            // Cerrar el submenú
            submenu.classList.remove('active');
            toggle.classList.remove('active');
            console.log(`Submenú ${targetId} cerrado`);
        } else {
            // Cerrar otros submenús primero
            closeAllSubmenus();
            
            // Abrir el submenú actual
            submenu.classList.add('active');
            toggle.classList.add('active');
            console.log(`Submenú ${targetId} abierto`);
        }
    }
    
    // Agregar event listeners a todos los botones
    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('data-target');
            toggleSubmenu(targetId);
        });
        
        // Agregar soporte para teclado
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const targetId = this.getAttribute('data-target');
                toggleSubmenu(targetId);
            }
        });
    });
    
    // Cerrar submenús al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.menu-item')) {
            closeAllSubmenus();
        }
    });
    
    // Cerrar submenús al hacer scroll
    window.addEventListener('scroll', function() {
        closeAllSubmenus();
    });
    
    // Cerrar submenús con Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllSubmenus();
        }
    });
    
    // Agregar efectos de hover mejorados
    menuToggles.forEach(toggle => {
        toggle.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        toggle.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Agregar efectos a los elementos del submenú
    document.querySelectorAll('.submenu-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Función para animar la apertura del submenú
    function animateSubmenu(submenu) {
        const items = submenu.querySelectorAll('.submenu-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Observar cambios en los submenús para animar
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const submenu = mutation.target;
                if (submenu.classList.contains('active')) {
                    animateSubmenu(submenu);
                }
            }
        });
    });
    
    // Observar todos los submenús
    document.querySelectorAll('.submenu').forEach(submenu => {
        observer.observe(submenu, {
            attributes: true,
            attributeFilter: ['class']
        });
    });
    
    // Función para hacer el menú accesible
    function enhanceAccessibility() {
        menuToggles.forEach(toggle => {
            const targetId = toggle.getAttribute('data-target');
            const submenu = document.getElementById(targetId);
            
            // Agregar atributos ARIA
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-controls', targetId);
            submenu.setAttribute('aria-labelledby', toggle.id || 'menu-toggle');
            
            // Agregar IDs únicos si no existen
            if (!toggle.id) {
                toggle.id = `toggle-${targetId}`;
            }
        });
    }
    
    // Mejorar accesibilidad
    enhanceAccessibility();
    
    // Actualizar atributos ARIA cuando se abren/cierran submenús
    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded.toString());
        });
    });
    
    console.log("Menú colapsable configurado correctamente");
}); 