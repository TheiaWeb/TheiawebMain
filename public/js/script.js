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

//#region Save CONTACT FORM data firestore
function handleFormSubmit() {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Get input values
      const surname = document.getElementById('surname').value;
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;

      // Gather selected services using checkboxes
      const services = Array.from(document.querySelectorAll('.contact__choose-services-check input[type="checkbox"]:checked'))
          .map(checkbox => checkbox.value);

      // Get checkbox values
      const cguAccepted = document.getElementById('cgu-check').checked;
      const newsletterSubscribed = document.getElementById('newsletter-check').checked;

      // Create data object
      const userData = {
        personalInfo: {
          surname: surname,
          name: name,
          email: email,
          phone: phone,
          message: message
      },
      services: services,
      preferences: {
          cguAccepted: cguAccepted,
          newsletterSubscribed: newsletterSubscribed
      },
      };

      // Save data to Firestore
      const db = firebase.firestore();
      try {
          await db.collection('contacts').add(userData);
          console.log('Data saved successfully.');
          form.reset(); // Optional: Reset the form after submission
      } catch (error) {
          console.error('Error saving data:', error);
      }
  });
}

// Call the function when the document is loaded
document.addEventListener('DOMContentLoaded', handleFormSubmit);
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
  
  try {
    await firestore.collection("CGU_Acceptation").doc(docName).set({
      necessary: necessaryState,
      statistic: statisticState,
      preferences: preferencesState,
      marketing: marketingState,
      timestamp: timestamp,
    });
    console.log("Document successfully written!");
    console.log("Preferences saved to Firestore!");
  } catch (error) {
    console.error("Error writing document: ", error);
    console.log("An error occurred while saving preferences.");
  }

  handleCookieConsent("accepted");
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

  try {
    await firestore.collection("CGU_Acceptation").doc(docName).set({
      necessary: necessaryState,
      statistic: statisticState,
      preferences: preferencesState,
      marketing: marketingState,
      timestamp: timestamp
    });
    console.log("Document successfully written!");
    console.log('Preferences saved to Firestore!');
  } catch (error) {
    console.error("Error writing document: ", error);
    console.log('An error occurred while saving preferences.');
  }

  preferencies.style.display = "none";
  popup.style.display = "none";
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

  // Determine if it's a mobile device
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Set the layout property based on the device type
  var layoutType = isMobile ? "video" : "video-with-chat";

  // Define aspect ratios for mobile and non-mobile
  var mobileAspectRatio = 16 / 9;
  var desktopAspectRatio = playerWidth / playerHeight;

  // Calculate the height based on the aspect ratio and container width
  var newHeight = isMobile ? containerWidth / mobileAspectRatio : (playerHeight / playerWidth) * containerWidth;

  // Create a new Twitch player instance
  twitchPlayer = new Twitch.Embed("twitch-embed", {
    width: containerWidth,
    height: newHeight,
    channel: "theiaweb",
    layout: layoutType
  });

  // Fetch live stream information from the Twitch API
  fetchLiveStreamInfo();

  // Toggle the visibility of the viewersInfos div based on the device type
  var viewersInfosDiv = document.getElementById('viewersInfos');
  viewersInfosDiv.style.display = isMobile ? "none" : "flex";
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
      document.getElementById('streamTitle').textContent = 'Hors Ligne Revenez demain !';
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
        document.getElementById('subscriberCount').innerText = subscriberCount;
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
const newsletterModal = document.getElementById("newsletterModal");

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const checkEmailFunctionURL = "https://us-central1-formtheia.cloudfunctions.net/checkIfEmailExists";

  // Make an HTTP request to the Cloud Function to check if the email exists
  fetch(`${checkEmailFunctionURL}?email=${encodeURIComponent(email)}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.exists) {
        // The email already exists in the database
        newsletterModal.textContent = "Vous êtes déjà inscrits a notre newsletter !";
        newsletterModal.classList.add("active");
        setTimeout(() => {
          newsletterModal.classList.remove("active");
        }, 2000);
        emailInput.value = "";
      } else {
        // Continue with saving the email to the database
        const date = new Date().toISOString().slice(0, 10);
        const firstLetter = email.charAt(0).toLowerCase();
        const sanitizedEmail = email.replace(/[.$#\[\]@]/g, '');
        const customKey = `${date}_${firstLetter}_${sanitizedEmail}`;
        newsletterModal.textContent = "Merci pour votre inscription !";

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
          })
          .catch((error) => {
            console.error("Error saving email:", error);
          });
      }
    })
    .catch((error) => {
      console.error("Error checking email:", error);
    });
});

// function getEmailServiceURL(email) {
//   // Logic to determine the email service and return the appropriate URL
//   // For example, you can check if the email domain contains "gmail.com" for Gmail users:
//   if (email.includes("@gmail.com")) {
//     return "https://mail.google.com/mail/u/0/#inbox";
//   }

//   // Add more cases for other email services if needed.

//   // Return null for unsupported email services.
//   return null;
// }

//#endregion
