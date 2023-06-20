// -----------------TOGGLE MENU------------------- //

var menuOpen = false;

function toggleMenu() {
  var menu = document.getElementById('menu');
  var icon = document.getElementById('iconImage');

  if (!menuOpen) {
    menu.classList.add('menu-open');
    icon.src = 'img/navbar-close.png';
    menuOpen = true;
  } else {
    menu.classList.remove('menu-open');
    icon.src = 'img/navbar-burger.png';
    menuOpen = false;
  }
}


/*==================== TOGGLE TABS ====================*/
let tabsPortfolio = document.querySelectorAll('.tabs__toggle'),
    contents = document.querySelectorAll('.tabs__content');

    tabsPortfolio.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        contents.forEach((content) => {
            content.classList.remove('is-active');
        });
        tabsPortfolio.forEach((tab) => {
            tab.classList.remove('is-active');
        });
        contents[index].classList.add('is-active');
        tabsPortfolio[index].classList.add('is-active');
    });
});

/*==================== GO TOP BTN ====================*/
//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/*==================== TEST ANIMATION ====================*/

// wow = new WOW(
//   {
//   boxClass:     'wow',      // Class name that reveals the hidden box when user scrolls.
//   animateClass: 'animated', // Class name that triggers the CSS animations (’animated’ by default for the animate.css library)
//   offset:       0,          // Define the distance between the bottom of browser viewport and the top of hidden box.
//                             // When the user scrolls and reach this distance the hidden box is revealed.
//   mobile:       true,       // Turn on/off wow.js on mobile devices.
//   live:         true        // consatantly check for new WOW elements on the page.
// }
// )
// wow.init();


 /*==================== PopUp CONTACT FORM====================*/       

function closePopup() {
  var popup = document.getElementById('popupFORM');
  popup.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
  var submitBtn = document.querySelector('.green_btn');

  submitBtn.addEventListener('click', function(event) {
    event.preventDefault();
    console.log("Form submitted successfully!");
    var popup = document.getElementById('popupFORM');
    popup.style.display = 'block';
  });

  var closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', function() {
    closePopup();
  });
});

          /*==================== PopUp RGPD====================*/
          document.addEventListener("DOMContentLoaded", function() {
            var popup = document.getElementById("popupRGPD");
            var acceptButton = document.getElementById("acceptButton");
          
            acceptButton.addEventListener("click", function() {
              popup.style.display = "none";
              // Enregistre le consentement donné
              localStorage.setItem("consentGiven", true);
            });
          
            // Vérifie si le consentement a déjà été donné
            var consentGiven = localStorage.getItem("consentGiven");
          
            if (!consentGiven) {
              centerPopup();
              popup.style.display = "block";
            }
          
            function centerPopup() {
              var windowHeight = window.innerHeight;
              var popupHeight = popup.offsetHeight;
          
              if (popupHeight < windowHeight) {
                var topOffset = (windowHeight - popupHeight) / 2;
                popup.style.top = topOffset + "px";
              } else {
                popup.style.top = "20px"; // Ajoutez une marge supérieure fixe si la fenêtre pop-up est plus haute que la fenêtre.
              }
            }
          
            window.addEventListener("resize", centerPopup);
          });
          
          