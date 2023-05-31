
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




