//#region TOGGLE MENU
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  const burgerIconSrc = 'img/navbar-burger.png';
  const closeIconSrc = 'img/navbar-close.png';

  if (menu.classList.contains('menu-open')) {
    menu.classList.remove('menu-open');
    menuIcon.src = burgerIconSrc;
  } else {
    menu.classList.add('menu-open');
    menuIcon.src = closeIconSrc;
  }
}
//#endregion

//#region GO TOP BTN 
const mybutton = document.getElementById('myBtn');

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = 'block';
  } else {
    mybutton.style.display = 'none';
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
//#endregion

//#region PopUp RGPD
const popup = document.getElementById("popupRGPD");
const acceptButton = document.getElementById("acceptButton");
const refuseButton = document.getElementById("refuseButton");
const preferencieslink = document.getElementById("popupRGPD__content-link");
const preferencies = document.getElementById("pref-rgpd");
const preferenciesBackBtn = document.getElementById("pref__content-btn-return");
const cookieModal = document.getElementById("cookieModal");
const modalAcceptButton = document.getElementById("modalAcceptButton");

// Check if user has already accepted or refused cookies before
const cookieConsent = localStorage.getItem("cookieConsent");

// Function to handle cookie consent
function handleCookieConsent(consent) {
  localStorage.setItem("cookieConsent", consent);
  cookieModal.style.display = "none";
}

// Event listener for accepting cookies from the modal
modalAcceptButton.addEventListener("click", () => {
  handleCookieConsent("accepted");
  cookieModal.style.display = "none";
});

// Event listener for refusing cookies
refuseButton.addEventListener("click", () => {
  cookieModal.style.display = "block";
});

acceptButton.addEventListener("click", async () => {
  const necessaryState = true;
  const statisticState = true;
  const preferencesState = true;
  const marketingState = true;

  const now = new Date();
  const timestamp = now.toString();

  const docName = "Date:" + timestamp;
  
  // try {
  //   await firestore.collection("CGU_Acceptation").doc(docName).set({
  //     necessary: necessaryState,
  //     statistic: statisticState,
  //     preferences: preferencesState,
  //     marketing: marketingState,
  //     timestamp: timestamp,
  //   });
  //   console.log("Document successfully written!");
  //   console.log("Preferences saved to Firestore!");
  // } catch (error) {
  //   console.error("Error writing document: ", error);
  //   console.log("An error occurred while saving preferences.");
  // }

  handleCookieConsent("accepted");
  console.log(handleCookieConsent());
  popup.style.display = "none";
});

// Event listener for showing the preferences
preferencieslink.addEventListener("click", () => {
  preferencies.style.display = "flex";
});

preferenciesBackBtn.addEventListener("click", () => {
  preferencies.style.display = "none";
});

// Get references to the switch elements
const necessarySwitch = document.querySelector('#necessary-switch');
const statisticSwitch = document.querySelector('#statistic-switch');
const preferencesSwitch = document.querySelector('#preferences-switch');
const marketingSwitch = document.querySelector('#marketing-switch');
const acceptButtonMultiple = document.querySelector('.pref__content-btn-accept');

acceptButtonMultiple.addEventListener('click', async () => {
  const necessaryState = necessarySwitch.checked;
  const statisticState = statisticSwitch.checked;
  const preferencesState = preferencesSwitch.checked;
  const marketingState = marketingSwitch.checked;

  const now = new Date();
  const timestamp = now.toString();
  const docName = "Date: " + timestamp;

  // try {
  //   await firestore.collection("CGU_Acceptation").doc(docName).set({
  //     necessary: necessaryState,
  //     statistic: statisticState,
  //     preferences: preferencesState,
  //     marketing: marketingState,
  //     timestamp: timestamp
  //   });
  //   console.log("Document successfully written!");
  //   console.log('Preferences saved to Firestore!');
  // } catch (error) {
  //   console.error("Error writing document: ", error);
  //   console.log('An error occurred while saving preferences.');
  // }

  preferencies.style.display = "none";
  popup.style.display = "none";
});
//#endregion

