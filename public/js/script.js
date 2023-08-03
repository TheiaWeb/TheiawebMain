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

// Get the popup element and buttons
const popup = document.getElementById("popupRGPD");
const acceptButton = document.getElementById("acceptButton");
const refuseButton = document.getElementById("refuseButton");
var database = firebase.database();
const preferencieslink = document.getElementById("popupRGPD__content-link");
const preferencies = document.getElementById("pref-rgpd");
const preferenciesBackBtn = document.getElementById("pref__content-btn-return");

const cookieModal = document.getElementById("cookieModal");
const modalAcceptButton = document.getElementById("modalAcceptButton");

// Check if user has already accepted or refused cookies before
const cookieConsent = localStorage.getItem("cookieConsent");


if (!cookieConsent) {
  cookieModal.style.display = "block";
}

// Function to handle cookie consent
function handleCookieConsent(consent) {
  // Set the consent in localStorage
  localStorage.setItem("cookieConsent", consent);
  // Hide the modal
  cookieModal.style.display = "none";
}

// Event listener for accepting cookies from the modal
modalAcceptButton.addEventListener("click", () => {
  handleCookieConsent("accepted");
  cookieModal.style.display = "none"; // Hide the modal after accepting
});

// Event listener for refusing cookies
refuseButton.addEventListener("click", () => {  
    cookieModal.style.display = "block";  
});


acceptButton.addEventListener("click", () => {
  // Set all preferences to true
  var necessaryState = true;
  var statisticState = true;
  var preferencesState = true;
  var marketingState = true;

  // Save the data to Firestore
  var now = new Date();
  var timestamp = now.toString(); // Convert to ISO string format

  var docName = "preferences_" + timestamp;
  firestore
    .collection("user_preferences")
    .doc(docName)
    .set({
      necessary: necessaryState,
      statistic: statisticState,
      preferences: preferencesState,
      marketing: marketingState,
      timestamp: timestamp,
    })
    .then(function () {
      console.log("Document successfully written!");
      console.log("Preferences saved to Firestore!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
      console.log("An error occurred while saving preferences.");
    });

  handleCookieConsent("accepted");
  popup.style.display = "none";
});

// Event listener for showing the preferencies 
preferencieslink.addEventListener("click", () =>{
  preferencies.style.display = "flex";
});

preferenciesBackBtn.addEventListener("click", () =>{
  preferencies.style.display = "none";
});

//#region Saving USER Data acceptation

// Get references to the switch elements
var necessarySwitch = document.querySelector('#necessary-switch');
var statisticSwitch = document.querySelector('#statistic-switch');
var preferencesSwitch = document.querySelector('#preferences-switch');
var marketingSwitch = document.querySelector('#marketing-switch');
var acceptButtonMultiple = document.querySelector('.pref__content-btn-accept');

acceptButtonMultiple.addEventListener('click', function () {
    // Get the states of the switches   
    var necessaryState = necessarySwitch.checked;
    var statisticState = statisticSwitch.checked;
    var preferencesState = preferencesSwitch.checked;
    var marketingState = marketingSwitch.checked;
    // Save the data to Firestore
// Get the current timestamp
var now = new Date();
var timestamp = now.toISOString(); // Convert to ISO string format

// Save the data to Firestore
var docName = "preferences_" + timestamp;
firestore.collection("user_preferences").doc(docName).set({
  necessary: necessaryState,
  statistic: statisticState,
  preferences: preferencesState,
  marketing: marketingState,
  timestamp: timestamp
})
.then(function() {
  console.log("Document successfully written!");
  console.log('Preferences saved to Firestore!');
})
.catch(function(error) {
  console.error("Error writing document: ", error);
  console.log('An error occurred while saving preferences.');
});
preferencies.style.display = "none";
popup.style.display = "none";

});
//#endregion
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

//#region Newsletter 
const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("emailInput");
const newsletterModal = document.getElementById("newsletterModal")

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting traditionally

  const email = emailInput.value;

  // Generate the custom key based on the date and the first letter of the email
  const date = new Date().toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'
  const firstLetter = email.charAt(0).toLowerCase();
  const sanitizedEmail = email.replace(/[.$#\[\]@]/g, ''); // Remove or replace special characters
  const customKey = `${date}_${firstLetter}_${sanitizedEmail}`;

  // Save the email to Firebase with the custom key
  database
    .ref("newsletterEmails")
    .child(customKey)
    .set({ email: email })
    .then(() => {
      console.log("Email saved successfully!");
       // Show the modal
       newsletterModal.classList.add("active");

       // Hide the modal after 2 seconds with fading effect
       setTimeout(() => {
         newsletterModal.classList.remove("active");
       }, 2000);
       
      emailInput.value = ""; // Clear the input after successful submission
      // Redirect the user to their Gmail inbox
      const emailServiceURL = getEmailServiceURL(email);
      if (emailServiceURL) {
        window.open(emailServiceURL, "_blank");
      } else {
        console.error("Unsupported email service or unable to get URL.");
      }
    })
    .catch((error) => {
      console.error("Error saving email:", error);
    });
});

function getEmailServiceURL(email) {
  // Logic to determine the email service and return the appropriate URL
  // For example, you can check if the email domain contains "gmail.com" for Gmail users:
  if (email.includes("@gmail.com")) {
    return "https://mail.google.com/mail/u/0/#inbox";
  }

  // Add more cases for other email services if needed.

  // Return null for unsupported email services.
  return null;
}

//#endregion