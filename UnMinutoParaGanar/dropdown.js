// Funcionalidad para menús desplegables
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM cargado - Dropdown.js");
    
    // Funcionalidad para menús desplegables
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    console.log("Dropdown toggles encontrados:", dropdownToggles.length);
    
    // Función para cerrar todos los menús
    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
            const arrow = menu.closest('.dropdown').querySelector('.dropdown-arrow i');
            if (arrow) {
                arrow.classList.remove('rotate');
            }
        });
    }
    
    dropdownToggles.forEach((toggle, index) => {
        console.log(`Configurando dropdown ${index + 1}`);
        
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("Clic en dropdown toggle");
            
            const dropdown = this.closest('.dropdown');
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            const arrow = this.querySelector('.dropdown-arrow i');
            
            console.log("Dropdown menu:", dropdownMenu);
            console.log("Arrow:", arrow);
            
            // Verificar si el menú actual está abierto
            const isCurrentlyOpen = dropdownMenu.classList.contains('show');
            
            // Cerrar todos los menús primero
            closeAllDropdowns();
            
            // Si el menú actual no estaba abierto, abrirlo
            if (!isCurrentlyOpen) {
                dropdownMenu.classList.add('show');
                if (arrow) {
                    arrow.classList.add('rotate');
                }
                console.log("Menú abierto");
            } else {
                console.log("Menú cerrado");
            }
        });
    });
    
    // Cerrar menús al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });
    
    // Cerrar menús al hacer scroll
    window.addEventListener('scroll', function() {
        closeAllDropdowns();
    });
    
    // Agregar efecto hover para mejor feedback visual
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        toggle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Agregar tecla Escape para cerrar menús
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllDropdowns();
        }
    });
}); 