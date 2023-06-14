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

/*==================== TEST ANIMATION ====================*/

wow = new WOW(
  {
  boxClass:     'wow',      // Class name that reveals the hidden box when user scrolls.
  animateClass: 'animated', // Class name that triggers the CSS animations (’animated’ by default for the animate.css library)
  offset:       0,          // Define the distance between the bottom of browser viewport and the top of hidden box.
                            // When the user scrolls and reach this distance the hidden box is revealed.
  mobile:       true,       // Turn on/off wow.js on mobile devices.
  live:         true        // consatantly check for new WOW elements on the page.
}
)
wow.init();

/*==================== PopUp ====================*/
function closePopup() {
  var element = document.getElementById("popup");
  element.classList.remove("modal-active");
}