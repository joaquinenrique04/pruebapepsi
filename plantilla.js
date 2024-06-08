document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.getElementById("menu");
    const navLat = document.getElementById("nav-lat");
    menuButton.addEventListener("click", function(event) {
        event.stopPropagation();  
        navLat.classList.toggle("open");
    });
    document.addEventListener("click", function(event) {
        if (!navLat.contains(event.target) && !menuButton.contains(event.target)) {
            navLat.classList.remove("open");
        }
    });
    navLat.addEventListener("wheel", function(event) {
        event.stopPropagation();
    });
    document.addEventListener("wheel", function(event) {
        if (!navLat.contains(event.target) && navLat.classList.contains("open")) {
            navLat.classList.remove("open");
        }
    });

    // carrusel
    let currentSlide = 0;
  let isPaused = false;
  let slideInterval;

  function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');

    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
    });

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function togglePause() {
    const pauseIcon = document.getElementById('pause-icon');
    const playIcon = document.getElementById('play-icon');

    if (isPaused) {
      slideInterval = setInterval(nextSlide, 3000);
      pauseIcon.style.display = 'inline';
      playIcon.style.display = 'none';
    } else {
      clearInterval(slideInterval);
      pauseIcon.style.display = 'none';
      playIcon.style.display = 'inline';
    }
    isPaused = !isPaused;
  }

  document.querySelector('.carousel-control-next').addEventListener('click', nextSlide);
  document.querySelector('.carousel-control-prev').addEventListener('click', prevSlide);

  document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  slideInterval = setInterval(nextSlide, 3000); // Cambia de imagen cada 3 segundos

  showSlide(currentSlide); // Muestra la primera diapositiva

  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
  window.togglePause = togglePause;
});


