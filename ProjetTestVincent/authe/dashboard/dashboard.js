import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth,signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile  } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; // Import Realtime Database functions
const firebaseConfig = {
    apiKey: "AIzaSyCCwmw3gY4lnt8VnoTW4kmYOxuTlcPufbs",
    authDomain: "testvincentcaca.firebaseapp.com",
    databaseURL: "https://testvincentcaca-default-rtdb.firebaseio.com",
    projectId: "testvincentcaca",
    storageBucket: "testvincentcaca.appspot.com",
    messagingSenderId: "849987501666",
    appId: "1:849987501666:web:c37bd0dc0de65623491b3b",
    measurementId: "G-FXK872ZL25"
  };

const logoutButton = document.getElementById('logout-btn');
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const user = auth.currentUser;
logoutButton.addEventListener('click', () => {
    signOut(auth)
      .then(() => {
        // User signed out successfully
        // You can perform any additional actions or redirection here
      })
      .catch((error) => {
        // An error occurred during sign out
        console.error(error);
      });
  });
  auth.onAuthStateChanged(user => {
    const username = document.getElementById("user_displayname");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const photoInput = document.getElementById("photo");
    const updateProfileButton = document.getElementById("update-profile-btn");

    if (user !== null) {
        user.providerData.forEach((profile) => {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
          });
        // Populate the fields with user data
        username.innerHTML = user.displayName || "";
        nameInput.value = user.displayName || "";
        emailInput.value = user.email || "";
        photoInput.value = user.photoURL || "";

        // Add event listener to update profile button
        updateProfileButton.addEventListener('click', () => {
            // Get the values from the input fields
            const newName = nameInput.value;
            const newEmail = emailInput.value;
            const newPhoto = photoInput.value;

            // Update user profile information
            updateProfile(auth.currentUser, {
                displayName: newName,
                photoURL: newPhoto
            }).then(() => {
                // Update email address if it has changed
                if (newEmail !== user.email) {
                    updateEmail(user, newEmail).then(() => {
                        // Profile and email updated successfully
                        console.log("Profile and email updated successfully.");
                    }).catch((error) => {
                        console.error("Error updating email:", error);
                    });
                } else {
                    // Only profile information updated
                    console.log("Profile updated successfully.");
                    saveProfileDataToDatabase(user.uid, newName, newEmail, newPhoto);
                }
            }).catch((error) => {
                console.error("Error updating profile:", error);
            });
        });
    }
        else {       
        window.location.href = "../index.html";
    }
});

// Function to save user profile data to Firebase Realtime Database
function saveProfileDataToDatabase(userId, displayName, email, photoURL) {
    const database = getDatabase();
    const profileRef = ref(database, `users/${userId}/profile`);

    set(profileRef, {
        displayName: displayName,
        email: email,
        photoURL: photoURL
    }).then(() => {
        console.log("Profile data saved to Firebase Realtime Database.");
    }).catch((error) => {
        console.error("Error saving profile data to Firebase Realtime Database:", error);
    });
}