//#region TOGGLE MENU
function toggleMenu() {
  const menu = document.getElementById('mobileMenu'); // Update the ID here
  const menuIcon = document.getElementById('iconImage'); 
  if (menu.classList.contains('menu-open')) {
    menu.classList.remove('menu-open');
  } else {
    menu.classList.add('menu-open');
    menuIcon.src = 'img/navbar-close.png'; // Replace with the image path for the close icon
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
//#region Front Animation Image 

//Animation Link dans menu 

// Function to add pulsating animation class on button click
function addPulsatingAnimation(event) {
  event.preventDefault();

  // Check if the target element is an anchor tag
  if (event.target.tagName === 'A') {
    const link = event.target;

    // Add the pulsating class to the anchor tag
    link.classList.add('pulsate');

    // Remove the pulsating class after 1 second (1000ms)
    setTimeout(() => {
      link.classList.remove('pulsate');

      // After the animation is completed, follow the link's href
      window.location.href = link.href;
    }, 1000);
  }
}

// Add click event listener to the navigation menu
const navMenu = document.querySelector('.nav__menu');
navMenu.addEventListener('click', addPulsatingAnimation);

// Function to add the animate-border class on link hover
function addAnimateBorder(event) {
  // Check if the target element is an anchor tag
  if (event.target.tagName === 'A') {
    const link = event.target;
    
    // Add the animate-border class to the anchor tag on hover
    link.classList.add('animate-border');
  }
}

// Function to remove the animate-border class when the mouse leaves the link
function removeAnimateBorder(event) {
  // Check if the target element is an anchor tag
  if (event.target.tagName === 'A') {
    const link = event.target;

    // Remove the animate-border class from the anchor tag on mouseleave
    link.classList.remove('animate-border');
  }
}

// Add mouseenter and mouseleave event listeners to the navigation menu
navMenu.addEventListener('mouseenter', addAnimateBorder);
navMenu.addEventListener('mouseleave', removeAnimateBorder);

//ANIMATION BOULE ACCEUIL ET FORM


// Function to update the image position based on mouse movement
function handleMouseMove(container, animatedImg, event) {
  const containerRect = container.getBoundingClientRect();
  const x = event.clientX - containerRect.left;
  const y = event.clientY - containerRect.top;
  const offsetX = -(x - containerRect.width / 3) * 0.1; // Adjust the offset as needed
  const offsetY = (y - containerRect.height / 3) * 0.1;

  animatedImg.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

  if (animatedImg.classList.contains('special-image')) {
    // Apply a different animation for the second image (if it has the 'special-image' class)
    // Modify the image however you want for a special effect
    animatedImg.style.opacity = 1 - (Math.abs(offsetX) / (containerRect.width / 3));
  }
}

// First container (assuming you already have this part of the code)
const container1 = document.getElementById('svg-container');
const animatedImg1 = document.getElementById('animated-svg');

container1.addEventListener('mouseenter', () => {
  container1.addEventListener('mousemove', (event) => handleMouseMove(container1, animatedImg1, event));
});

container1.addEventListener('mouseleave', () => {
  animatedImg1.style.transform = 'translate(0, 0)'; // Reset the position on mouseleave
  animatedImg1.style.opacity = 1; // Reset the opacity to its original value
  container1.removeEventListener('mousemove', (event) => handleMouseMove(container1, animatedImg1, event));
});

// Second container (using the provided IDs)
const container2 = document.getElementById('contact');
const animatedImg2 = container2.querySelector('#animationHomeImage');

container2.addEventListener('mouseenter', () => {
  container2.addEventListener('mousemove', (event) => handleMouseMove(container2, animatedImg2, event));
});

container2.addEventListener('mouseleave', () => {
  animatedImg2.style.transform = 'translate(0, 0)'; // Reset the position on mouseleave
  animatedImg2.style.opacity = 1; // Reset the opacity to its original value
  container2.removeEventListener('mousemove', (event) => handleMouseMove(container2, animatedImg2, event));
});

//ANIMATION BUBBLE HOME PAGE 

// Get the specific image with the class "body__bg" that you want to extend the duration for
const specificImage = document.querySelector('#animationBubbleSpecificTime');

// Function to add the bubble effect animation to the images and set z-index
function addBubbleEffectAnimation(images) {
  images.forEach((image, index) => {
    const animationDuration = (index + 1) * 5; // Default duration for other images (in seconds)

    image.style.animation = `bubbleEffectAnimation ${animationDuration}s ease-in-out infinite`;
    image.style.zIndex = -1; // Set the z-index to ensure the image is behind all components

    // Extend the duration for the specific image
    if (image === specificImage) {
      const specificDuration = 30; // Duration in seconds for the specific image
      image.style.animationDuration = `${specificDuration}s`;
    }
  });
}

// Get all the images with the class "body__bg"
const bodyBgImages = document.querySelectorAll('.body__bg');

// Add the bubble effect animation and set z-index to the images
addBubbleEffectAnimation(bodyBgImages);


//#endregion
//#region TEST FEATURES 

 // Get all the dots and cards

//#endregion