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

//Animation Boule HomePage

const animatedImg = document.getElementById('animated-svg');
const container = document.getElementById('svg-container');

// Function to update the image position based on mouse movement
function handleMouseMove(event) {
  const containerRect = container.getBoundingClientRect();
  const x = event.clientX - containerRect.left;
  const y = event.clientY - containerRect.top;
  const offsetX = (x - containerRect.width / 2) * 0.1; // Adjust the offset as needed
  const offsetY = (y - containerRect.height / 2) * 0.1;

  animatedImg.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}

// Event listeners for mouseenter and mouseleave
container.addEventListener('mouseenter', () => {
  container.addEventListener('mousemove', handleMouseMove);
});

container.addEventListener('mouseleave', () => {
  animatedImg.style.transform = 'translate(0, 0)'; // Reset the position on mouseleave
  container.removeEventListener('mousemove', handleMouseMove);
});


//ANIMATION BUBBLE HOME PAGE 

// Get all the images with the class "body__bg"
const bodyBgImages = document.querySelectorAll('.body__bg');

// Function to add the bubble effect animation to the images and set z-index
function addBubbleEffectAnimation(images) {
  images.forEach((image, index) => {
    const animationDuration = (index + 1) * 5; // Adjust the duration of each image's animation (in seconds)

    image.style.animation = `bubbleEffectAnimation ${animationDuration}s ease-in-out infinite`;
    image.style.zIndex = -1; // Set the z-index to ensure the image is behind all components
  });
}

// Add the bubble effect animation and set z-index to the images
addBubbleEffectAnimation(bodyBgImages);



//#endregion
//#region TEST FEATURES 
//#endregion
