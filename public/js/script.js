// -----------------TOGGLE MENU------------------- //

let menuOpen = false;

function toggleMenu() {
  const menu = document.getElementById('menu');
  const icon = document.getElementById('iconImage');

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
const tabsPortfolio = document.querySelectorAll('.tabs__toggle');
const contents = document.querySelectorAll('.tabs__content');

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
// Go Top Button
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

/*==================== CONTACT FORM====================*/
/*==================== PopUp CONTACT FORM====================*/

function closePopup() {
  const popup = document.getElementById('popupFORM');
  popup.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
  const submitBtn = document.querySelector('.green_btn');

  submitBtn.addEventListener('click', function (event) {
    const popup = document.getElementById('popupFORM');
    popup.style.display = 'block';
  });

  const closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', function () {
    closePopup();
  });
});

/*==================== PopUp RGPD====================*/
document.addEventListener('DOMContentLoaded', function() {
  const popup = document.getElementById('popupRGPD');
  const acceptButton = document.getElementById('acceptButton');

  acceptButton.addEventListener('click', function() {
    popup.style.display = 'none';
    localStorage.setItem('consentGiven', true);
  });

  const consentGiven = localStorage.getItem('consentGiven');

  if (!consentGiven) {
    centerPopup();
  } else {
    popup.style.display = 'none';
  }

  function centerPopup() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const popupHeight = popup.offsetHeight;
    const popupWidth = popup.offsetWidth;

    const topOffset = (windowHeight - popupHeight) / 2;
    const leftOffset = (windowWidth - popupWidth) / 2;

    popup.style.top = topOffset + 'px';
    popup.style.left = leftOffset + 'px';
  }

  window.addEventListener('resize', centerPopup);
});


//===========Generateur de Citations (PAGE 404)==========//
// const pcCitations = [
//   "Les ordinateurs sont comme des dieux de l'Ancien Testament ; plein de règles et sans pitié.",
//   "L'ordinateur est né pour résoudre des problèmes qui n'existaient pas auparavant.",
//   "N'importe quel idiot peut utiliser un ordinateur. Et beaucoup le font.",
//   "La meilleure chose à propos d'un ordinateur, c'est qu'il est prévisible ; il ne blâme jamais ses erreurs sur vous.",
//   "L'ordinateur est un crétin.",
// ];

// const iaCitations = [
//   "L'intelligence artificielle ne fait pas le poids face à la stupidité naturelle.",
//   "L'IA est comme une rock star qui joue une musique sans faute, mais qui détruit des chambres d'hôtel.",
//   "L'IA est le nouvel électricité.",
//   "La question n'est pas de savoir si l'IA dépassera l'intelligence humaine, mais quand et comment.",
//   "L'IA n'est pas une baguette magique ; c'est un outil pour augmenter les capacités humaines.",
// ];

// const webCitations = [
//   "Le web tel que je l'ai envisagé, nous ne l'avons pas encore vu. L'avenir est encore bien plus grand que le passé.",
//   "La bonne nouvelle à propos des ordinateurs, c'est qu'ils font ce que vous leur dites de faire. La mauvaise nouvelle, c'est qu'ils font ce que vous leur dites de faire.",
//   "Le web est davantage une création sociale qu'une création technique. Je l'ai conçu pour un effet social, pour aider les gens à travailler ensemble, et non comme un jouet technique.",
//   "Internet pourrait être une étape très positive vers l'éducation, l'organisation et la participation à une société significative.",
//   "Internet devient la place du village global de demain.",
// ];

// function getRandomCitation(citations) {
//   const randomIndex = Math.floor(Math.random() * citations.length);
//   return citations[randomIndex];
// }

// function displayRandomCitation() {
//   const citationElement = document.getElementById("citation");
//   const randomCitation = getRandomCitation([...pcCitations, ...iaCitations, ...webCitations]);
//   citationElement = randomCitation;
// }

// // Affiche une citation aléatoire lorsque la page se charge ou se rafraîchit
// displayRandomCitation();


// //===========NEWSLETTER SUBSCRIPTION==========//
//   // Handle newsletter subscription
//   document.getElementById('newsletterForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent form from submitting and page refresh

//     // Get the email input value
//     var email = document.getElementById('newsletterEmail').value;

//     // Save the email to the Firestore database
//     db.collection('subscribers').add({
//       email: email,
//       timestamp: firebase.firestore.FieldValue.serverTimestamp()
//     })
//     .then(function(docRef) {
//       console.log('Newsletter subscription added successfully!');
//       // Reset email input field
//       document.getElementById('newsletterEmail').value = '';
//     })
//     .catch(function(error) {
//       console.error('Error adding newsletter subscription:', error);
//     });
//   });


//===========TWITCH API==========//

// function fetchAndDisplayVideos() {
//   //YOUR_USER_ID == l'id du compte twitch 
//   fetch('https://api.twitch.tv/helix/videos?user_id=YOUR_USER_ID', {
//     headers: {
//       // Client ID == Id a recupere via le portail de developpeur de twitch
//       'Client-ID': 'YOUR_CLIENT_ID',
//       // Access token == required for authentification 
//       // Pas nescessaire dans tout les cas 
//       'Authorization': 'Bearer YOUR_ACCESS_TOKEN' 
//     }
//   })
//     .then(response => response.json())
//     .then(data => {
//       const videos = data.data; // Array of video objects
//       const embedCodes = videos.map(video => `
//         <iframe
//           src="https://player.twitch.tv/?video=${video.id}"
//           height="480"
//           width="720"
//           allowfullscreen="true">
//         </iframe>
//       `);
//       const videoContainer = document.getElementById('video-container');
//       videoContainer.innerHTML = embedCodes.join('');
//     })
//     .catch(error => {
//       console.error('Error retrieving video data:', error);
//     });
// }

// fetchAndDisplayVideos();
