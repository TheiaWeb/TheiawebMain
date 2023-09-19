// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs,addDoc, collection } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getDatabase, ref, onValue, child, push, update, set  } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB4BfdCWo9fHb4rC2YZl5gOgtikxQHi5g",
  authDomain: "formtheia.firebaseapp.com",
  databaseURL: "https://formtheia-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "formtheia",
  storageBucket: "formtheia.appspot.com",
  messagingSenderId: "335132907653",
  appId: "1:335132907653:web:d4620962ca0a24131571ec",
  measurementId: "G-5F4K9SXY34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const Database = getDatabase(app);
const Firestore = getFirestore(app);

// Initialize Cloud Firestore and get a reference to the service
//#region  CONTACT FORM
function handleFormSubmit() {
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Get input values
    const getInputValue = (id) => document.getElementById(id).value;
    const surname = getInputValue('surname');
    const name = getInputValue('name');
    const email = getInputValue('email');
    const phone = getInputValue('phone');
    const message = getInputValue('message');
    
    // Get current timestamp
    const now = new Date();
    const timestamp = now.toString();
    
    // Gather selected services using checkboxes
    const services = Array.from(document.querySelectorAll('.contact__choose-services-check input[type="checkbox"]:checked'))
      .map(checkbox => checkbox.value);
      
    // Get checkbox values
    const getCheckboxValue = (id) => document.getElementById(id).checked;
    const cguAccepted = getCheckboxValue('cgu-check');
    const newsletterSubscribed = getCheckboxValue('newsletter-check');
    
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
      timestamp: timestamp,
    };
    
    // Save data to Firestore
    try {
      await addDoc(collection(Firestore, 'contacts'), userData);
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
const necessarySwitch = document.getElementById("necessary-switch");
const statisticSwitch = document.getElementById("statistic-switch");
const preferencesSwitch = document.getElementById("preferences-switch");
const marketingSwitch = document.getElementById("marketing-switch");


const popup = document.getElementById("popupRGPD");
const acceptButton = document.getElementById("acceptButton");
const acceptButtonMultiple = document.querySelector('.pref__content-btn-accept');
const ReturnButton = document.querySelector('.pref__content-btn-return');
const preferencieslink = document.getElementById("popupRGPD__content-link");
const preferencies = document.getElementById("pref-rgpd");

let userAcceptedCookies = false; // Flag to track if the user has accepted cookies

// Event listener for the initial accept button
acceptButton.addEventListener("click", async () => {
  if (!userAcceptedCookies) {
    const necessaryState = true;
    const statisticState = true;
    const preferencesState = true;
    const marketingState = true;

    const now = new Date();
    const timestamp = now.toString();
    const docName = "Date: " + timestamp;

    try {
      const docRef = await addDoc(collection(Firestore, "CGU_Acceptation"), {
        necessary: necessaryState,
        statistic: statisticState,
        preferences: preferencesState,
        marketing: marketingState,
        timestamp: timestamp,
      });
      console.log("Document written with ID: ", docRef.id);
      console.log("Preferences saved to Firestore!");
    } catch (e) {
      console.error("Error adding document: ", e);
      console.log("An error occurred while saving preferences.");
    }

    userAcceptedCookies = true; // Set the flag to true after the first acceptance
    popup.style.display = "none";
  }
});

// Event listener for the second accept button
acceptButtonMultiple.addEventListener('click', async () => {
  if (!userAcceptedCookies) {
    const necessaryState = necessarySwitch.checked;
    const statisticState = statisticSwitch.checked;
    const preferencesState = preferencesSwitch.checked;
    const marketingState = marketingSwitch.checked;

    const now = new Date();
    const timestamp = now.toString();
    const docName = "Date: " + timestamp;

    try {
      // Save the individual cookie preferences in Firestore
      const docRef = await addDoc(collection(Firestore, "CGU_Acceptation"), {
        necessary: necessaryState,
        statistic: statisticState,
        preferences: preferencesState,
        marketing: marketingState,
        timestamp: timestamp
      });

      console.log("Document written with ID: ", docRef.id);
      console.log("Preferences successfully saved to Firestore!");
    } catch (error) {
      console.error("Error writing document: ", error);
      console.log('An error occurred while saving preferences.');
    }

    userAcceptedCookies = true; // Set the flag to true after the first acceptance
    preferencies.style.display = "none";
    popup.style.display = "none";
  }
});

preferencieslink.addEventListener("click", () => {
  preferencies.style.display = "flex"; // Display the preferences panel
});

ReturnButton.addEventListener("click", () => {
  preferencies.style.display = "none"; // Display the preferences panel
});
//#endregion

//#region Newsletter 
const text = document.getElementById('newsletterModal');
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get the email input value
  const emailInput = document.getElementById('emailInput');
  const email = emailInput.value;

  // Get current timestamp
  const now = new Date();
  const timestamp = now.toString();

  // Create data object
  const newsletterData = {
    email: email,
    timestamp: timestamp,
  };

  try {
    // Save data to Firestore or perform your desired action here
    text.style.opacity = 1;
    
    const docRef = await addDoc(collection(Firestore, 'newsletterSubscriptions'), newsletterData);
    console.log('Email saved:', email);
    newsletterForm.reset(); // Optional: Reset the form after submission
    setTimeout(() => {
      text.style.opacity = 0;
    }, 3000);
  } catch (error) {
    console.error('Error saving email:', error);
  }
});



//#endregion


