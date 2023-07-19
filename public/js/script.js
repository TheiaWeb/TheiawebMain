//#region TOGGLE MENU
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
//#endregion
//#region TOGGLE TABS
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
//#endregion
//#region TOGGLE TABS PRICE
const tabsPrice = document.querySelectorAll('.freehand__price__toggle');
const package = document.querySelectorAll('.freehand__price__content');

tabsPrice.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    package.forEach((content) => {
      content.classList.remove('is-active');
    });
    tabsPrice.forEach((tab) => {
      tab.classList.remove('is-active');
      tab.classList.remove('price__banner-active');
    });
    package[index].classList.add('is-active');
    tabsPrice[index].classList.add('is-active');
    tabsPrice[index].classList.add('price__banner-active');
  });
});
//#endregion
//#region TOGGLE TABS PRICE
const freehandTabsPrice = document.querySelectorAll('.price__toggle');
const freehandPackage = document.querySelectorAll('.price__content');

freehandTabsPrice.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    freehandPackage.forEach((content) => {
      content.classList.remove('is-active');
    });
    freehandTabsPrice.forEach((tab) => {
      tab.classList.remove('is-active');
      tab.classList.remove('price__banner-active');
    });
    freehandPackage[index].classList.add('is-active');
    freehandTabsPrice[index].classList.add('is-active');
    freehandTabsPrice[index].classList.add('price__banner-active');
  });
});
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
//#region PopUp CONTACT FORM
var form = document.getElementById('contactForm');

    // Add a submit event listener to the form
    form.addEventListener('submit', function(event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Perform your form submission logic here, such as sending the data to the server

      // Display the popup
      showPopup();
    });

    // Function to display the popup
    function showPopup() {
      // Get the popup element
      var popup = document.getElementById('popupFORM');

      // Add a class to make the popup visible
      popup.classList.add('modal-active');
    }

    // Get the close button element
    var closeButton = document.getElementById('closeButton');

    // Add a click event listener to the close button
    closeButton.addEventListener('click', function() {
      // Hide the popup
      hidePopup();
    });

    // Function to hide the popup
    function hidePopup() {
      // Get the popup element
      var popup = document.getElementById('popupFORM');

      // Remove the class to hide the popup
      popup.classList.remove('modal-active');
    }
//#endregion
//#region PopUp RGPD
document.addEventListener('DOMContentLoaded', function() {
  const rgpdPopup = document.getElementById('popupRGPD');
  const acceptButton = document.getElementById('acceptButton');

  acceptButton.addEventListener('click', function() {
    hidePopup(rgpdPopup);
    localStorage.setItem('consentGiven', true);
  });

  const consentGiven = localStorage.getItem('consentGiven');

  if (consentGiven) {
    hidePopup(rgpdPopup);
  } else {
    showPopup(rgpdPopup);
    centerPopup(rgpdPopup);
  }
  
  function showPopup(popup) {
    popup.style.display = 'block';
  }

  function hidePopup(popup) {
    popup.style.display = 'none';
  }

});
//#endregion
//#region Player Twitch
const clientId = 'o5x6ltrt4jwhb6ybxm0kkpjcip5mk4';
const accessToken = '8rg8hftxr0k1y6pnk1zjf3vznd8f3d';
const channelId = 'theiaweb';

var playerWidth = 1472;
var playerHeight = 545; // Adjusted height to maintain 16:9 aspect ratio (16/9 = 1.7778)
var twitchPlayer = null; // Variable to store the Twitch player instance
const nextScheduledStreamChannelId = 'next_channel_id'; // Replace with the channel ID of the channel with the next scheduled stream
let nextStreamDateValue = "Date: Not available";

function initializePlayer() {
  if (twitchPlayer) {
    // If a player instance exists, destroy it first
    twitchPlayer.destroy();
  }

  var containerWidth = document.getElementById('twitch-embed').offsetWidth;
  var newHeight = (playerHeight / playerWidth) * containerWidth;

  // Fetch next scheduled stream information from the Twitch API
  fetchNextScheduledStream();

  // Create a new Twitch player instance
  twitchPlayer = new Twitch.Embed("twitch-embed", {
    width: containerWidth,
    height: newHeight,
    channel: "theiaweb",
  });

  // Fetch live stream information from the Twitch API
  fetchLiveStreamInfo();
}


function fetchNextScheduledStream() {
  fetch(`https://api.twitch.tv/helix/schedule?broadcaster_id=${nextScheduledStreamChannelId}`, {
    method: 'GET',
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.data && data.data.length > 0) {
      // Next scheduled stream is available, update the information
      var nextStreamTitle = data.data[0].title;
      nextStreamDateValue = data.data[0].scheduled_start_time; // Update the global variable

      document.getElementById('nextStreamTitle').textContent = nextStreamTitle;
      document.getElementById('nextStreamDate').textContent = `Aucun stream de prevu donc la Date: ${nextStreamDateValue}`;
      document.getElementById('nextStreamInfo').style.display = 'block';
    } else {
      // No next scheduled stream, hide the information
      document.getElementById('nextStreamInfo').style.display = 'block'; //A modifier une fois les streams lancer
    }
  })
  .catch(error => {
    console.error('Error fetching next scheduled stream information:', error);
  });
}

function fetchLiveStreamInfo() {
  fetch(`https://api.twitch.tv/helix/streams?user_login=${channelId}`, {
    method: 'GET',
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.data && data.data.length > 0) {
      // Stream is live, update the live information
      var streamTitle = data.data[0].title;
      var viewersCount = data.data[0].viewer_count;

      document.getElementById('streamTitle').textContent = streamTitle;
      document.getElementById('viewersCount').textContent = `Viewers: ${viewersCount}`;

      // Hide the offline status icon and message
      document.getElementById('liveStatus').style.display = 'none';
    } else {
      // Stream is offline, display default information
      document.getElementById('streamTitle').textContent = 'Offline Stream Title';
      document.getElementById('viewersCount').textContent = 'Stream is currently offline so no viewers counted';

      // Show the offline status icon and message
      document.getElementById('liveStatus').style.display = 'block';
    }
  })
  .catch(error => {
    console.error('Error fetching live stream information:', error);
  });
}

// Call the function on page load
window.onload = function () {
  initializePlayer();
  fetch(`https://api.twitch.tv/helix/subscriptions?broadcaster_id=${channelId}`, {
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      const subscriberCount = data.total;
      document.getElementById('subscriberCount').innerText = subscriberCount + " : Rip aucun abonnés ";
    })
    .catch(error => {
      console.error('Error fetching subscriber count:', error);
    });
};

// Call the function whenever the window is resized
window.addEventListener('resize', initializePlayer);


//#endregion
// //#region GET CLIENT DATA FORM
// var db = firebase.firestore();

// document.getElementById('contactForm').addEventListener('submit', function(event) {
//   event.preventDefault();
//   var surname = document.getElementById('surname').value;
//   var name = document.getElementById('name').value;
//   var email = document.getElementById('email').value;
//   var phone = document.getElementById('phone').value;
//   var company = document.getElementById('company').value;
//   var subject = document.getElementById('subject').value;
//   var message = document.getElementById('message').value;

//   db.collection('contacts').add({
//     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//     CompagnyInfos: {
//       surname: surname,
//       name: name,
//       email: email,
//       phone: phone,
//       company: company,
//       subject: subject,
//       message: message,
//     },
    
//   })
//   .then(function(docRef) {
//     document.getElementById('surname').value = '';
//     document.getElementById('name').value = '';
//     document.getElementById('email').value = '';
//     document.getElementById('phone').value = '';
//     document.getElementById('company').value = '';
//     document.getElementById('subject').value = '';
//     document.getElementById('message').value = '';

//     firebase.firestore().collection('contacts').doc(docRef.id).onSnapshot(function(snapshot) {
//       const formData = snapshot.data();
//       if (formData && formData.saved) {
//         console.log("Data Saved !!")
//       }
//     });
//   })
//   .catch(function(error) {
//     console.error('Error submitting form:', error);
//   });
// });
// //#endregion
//#region TEST FEATURES 

/*
const svgContainer = document.getElementById('animated-svg');
const svgImage = new Image();
svgImage.src = 'img/17.svg';
svgContainer.appendChild(svgImage);

svgContainer.addEventListener('mousemove', handleMouseMove);

function handleMouseMove(event) {
  const containerRect = svgContainer.getBoundingClientRect();
  const containerCenterX = containerRect.left + containerRect.width / 2;
  const containerCenterY = containerRect.top + containerRect.height / 2;
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const angle = Math.atan2(mouseY - containerCenterY, mouseX - containerCenterX);
  const distance = Math.sqrt(Math.pow(mouseX - containerCenterX, 2) + Math.pow(mouseY - containerCenterY, 2));

  svgImage.style.transformOrigin = 'center';
  svgImage.style.transformBox = 'fill-box';
  svgImage.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
}*/

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
//   citationElement.textContent = randomCitation;
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

//#endregion
