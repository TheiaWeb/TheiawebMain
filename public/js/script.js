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

//#region Expertise Card popup
 // Lorsque la page est chargée
document.addEventListener("DOMContentLoaded", () => {
  const cardButtons = document.querySelectorAll(".expertise__card-panel-btn");
  const popups = document.querySelectorAll(".popup-expertise");

  // Fonction pour afficher la pop-up avec un contenu spécifique
  function showPopup(index) {
    popups[index].style.display = "block";
  }

  // Fonction pour fermer la pop-up
  function closePopup(index) {
    popups[index].style.display = "none";
  }

  // Ajouter un gestionnaire d'événements pour chaque bouton "En savoir plus"
  cardButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      showPopup(index);
    });
  });

  // Ajouter un gestionnaire d'événements pour chaque bouton de fermeture de la pop-up
  const popupCloseButtons = document.querySelectorAll(".popup-expertise-close");
  popupCloseButtons.forEach((closeButton, index) => {
    closeButton.addEventListener("click", () => {
      closePopup(index);
    });
  });

  // Ajouter un gestionnaire d'événements pour écouter les clics en dehors de la pop-up
  window.addEventListener("click", (event) => {
    popups.forEach((popup, index) => {
      if (event.target === popup) {
        closePopup(index);
      }
    });
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
const accessToken = 'vqyqxbi9o0j34m19drzgvgzypk849w';
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

  // // Fetch next scheduled stream information from the Twitch API
  // fetchNextScheduledStream();

  // Create a new Twitch player instance
  twitchPlayer = new Twitch.Embed("twitch-embed", {
    width: containerWidth,
    height: newHeight,
    channel: "theiaweb",
    layout: "video-with-chat"
  });

  // Fetch live stream information from the Twitch API
  fetchLiveStreamInfo();
}


// function fetchNextScheduledStream() {
//   fetch(`https://api.twitch.tv/helix/schedule?broadcaster_id=${nextScheduledStreamChannelId}`, {
//     method: 'GET',
//     headers: {
//       'Client-ID': clientId,
//       'Authorization': `Bearer ${accessToken}`
//     }
//   })
//   .then(response => response.json())
//   .then(data => {
//     if (data.data && data.data.length > 0) {
//       // Next scheduled stream is available, update the information
//       var nextStreamTitle = data.data[0].title;
//       nextStreamDateValue = data.data[0].scheduled_start_time; // Update the global variable

//       document.getElementById('nextStreamTitle').textContent = nextStreamTitle;
//       document.getElementById('nextStreamDate').textContent = `Aucun stream de prevu donc la Date: ${nextStreamDateValue}`;
//       document.getElementById('nextStreamInfo').style.display = 'block';
//     } else {
//       // No next scheduled stream, hide the information
//       document.getElementById('nextStreamInfo').style.display = 'block'; //A modifier une fois les streams lancer
//     }
//   })
//   .catch(error => {
//     console.error('Error fetching next scheduled stream information:', error);
//   });
// }

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
      document.getElementById('streamTitle').textContent = streamTitle;

    } else {
      // Stream is offline, display default information
      document.getElementById('streamTitle').textContent = 'Offline';
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


      if (subscriberCount === undefined ){
        document.getElementById('subscriberCount').innerText = "Rip aucun abonnés";

      }
      else{
        document.getElementById('subscriberCount').innerText = subscriberCount + " : Rip aucun abonnés ";
      }
    })
    .catch(error => {
      console.error('Error fetching subscriber count:', error);
    });
};

// Call the function whenever the window is resized
window.addEventListener('resize', initializePlayer);


//#endregion

