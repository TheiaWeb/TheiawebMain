document.addEventListener('DOMContentLoaded', function() {
    // Easter egg 1: Double-click on logo
    const logo = document.getElementById('logo');
    logo.addEventListener('dblclick', function() {
      logo.classList.add('animated', 'bounce');
    });
  
    // Easter egg 2: Click on page
    document.addEventListener('click', function() {
      document.body.classList.add('animated', 'pulse');
    });
  
    // Easter egg 3: GIF overlay
    const gifOverlay = document.createElement('div');
    gifOverlay.classList.add('gif-overlay');
    document.body.appendChild(gifOverlay);
  
    gifOverlay.addEventListener('click', function() {
      gifOverlay.classList.remove('active');
    });
  
    document.addEventListener('click', function() {
      gifOverlay.classList.add('active');
    });
  
    // Carousel functionality
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carouselPrevBtn = document.querySelector('.carousel-prev');
    const carouselNextBtn = document.querySelector('.carousel-next');
    let currentCarouselItem = 0;
    let carouselTimer;
  
    function showCarouselItem(itemIndex) {
      carouselItems.forEach(function(item, index) {
        if (index === itemIndex) {
          item.style.display = 'block';
          item.classList.remove('blur');
        } else {
          item.style.display = 'none';
          item.classList.add('blur');
        }
      });
    }
  
    function prevCarouselItem() {
      currentCarouselItem--;
      if (currentCarouselItem < 0) {
        currentCarouselItem = carouselItems.length - 1;
      }
      showCarouselItem(currentCarouselItem);
    }
  
    function nextCarouselItem() {
      currentCarouselItem++;
      if (currentCarouselItem >= carouselItems.length) {
        currentCarouselItem = 0;
      }
      showCarouselItem(currentCarouselItem);
    }
  
    carouselPrevBtn.addEventListener('click', prevCarouselItem);
    carouselNextBtn.addEventListener('click', nextCarouselItem);
  
    function startCarouselTimer() {
      carouselTimer = setInterval(function() {
        nextCarouselItem();
      }, 5000);
    }
  
    function stopCarouselTimer() {
      clearInterval(carouselTimer);
    }
  
    showCarouselItem(currentCarouselItem);
    startCarouselTimer();
  });
  