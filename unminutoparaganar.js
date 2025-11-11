document.addEventListener("DOMContentLoaded", function() {
    var hamburger = document.getElementById("hamburger");
    var sidebar = document.getElementById("sidebar");
    var header = document.getElementById("header");
    var logo = document.getElementById("logo");
  
    // Verificación de la barra hamburguesa
    hamburger.addEventListener("click", function() {
      this.classList.toggle("change");
      sidebar.classList.toggle("active");
    });
  
    // Acción para el scroll
    window.addEventListener("scroll", function() {
      if (window.scrollY > 50) {
        header.classList.add("scroll");
        logo.style.width = "100px";
      } else {
        header.classList.remove("scroll");
        logo.style.width = "200px";
      }
    });
  });
  
