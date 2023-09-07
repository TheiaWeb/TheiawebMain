// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth,signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, GoogleAuthProvider   } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

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
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-btn");
const logoutButton = document.getElementById("logout-btn");
const userEmail = document.getElementById("user-email");
const loginForm = document.getElementById("login-form");
const logoutForm = document.getElementById("logout-form");
const provider = new GoogleAuthProvider();

loginButton.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            userEmail.textContent = user.email;
            loginForm.classList.add("hidden");
            logoutForm.classList.remove("hidden");
        })
        .catch(error => {
            console.error(error.message);
        });
});

const forgotPasswordLink = document.getElementById('forgot-password-link');

// Add a click event listener to the "Forgot Password" link
forgotPasswordLink.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior
    const email = emailInput.value;

    // Initiate the password reset process
    firebase.auth().sendPasswordResetEmail(email)
        .then(function() {
            alert('Password reset email sent! Check your inbox.');
        })
        .catch(function(error) {
            alert('An error occurred. Please check your email and try again.');
            console.error(error);
        });
});

const registerBtn = document.getElementById('register-btn');
const registerUsernameInput = document.getElementById('register-username'); // Add this line

registerBtn.addEventListener('click', function() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const username = registerUsernameInput.value; // Capture the username value

    // Create user with email and password
    auth.createUserWithEmailAndPassword(email, password)
        .then(function(userCredential) {
            // Add the username to the user's profile
            return userCredential.user.updateProfile({
                displayName: username
            });
        })
        .then(function() {
            alert('User registered successfully with username: ' + username);
            saveProfileDataToDatabase(user.uid, username, email, password, photo);
        })
        .catch(function(error) {
            alert('Registration failed. ' + error.message);
        });
});

// Initialize the Google Sign-In API
gapi.load('auth2', function() {
    gapi.auth2.init({
        client_id: '849987501666-pvneh82hm998jb1topscj1rgbcako8n5.apps.googleusercontent.com',
    });
});

// Get references to the relevant elements
const googleLoginBtn = document.getElementById('google-login-btn');

// Add a click event listener to the "Login with Google" button
googleLoginBtn.addEventListener('click', function() {
    const auth2 = gapi.auth2.getAuthInstance();

    auth2.signIn().then(function(googleUser) {
        const idToken = googleUser.getAuthResponse().id_token;

        // Sign in to Firebase with the Google ID token
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken);

        firebase.auth().signInWithCredential(credential)
            .then(function(userCredential) {
                // You can access the user information here:
                const user = userCredential.user;
                console.log('Logged in with Google:', user);
            })
            .catch(function(error) {
                console.error('Google login error:', error);
            });
    });
});

auth.onAuthStateChanged(user => {
    if (user) {

        if (!window.location.pathname.includes("dashboard")) {
            window.location.href = "../authe/dashboard/dashboard.html";
        }
    } else {
        if (!window.location.pathname.includes("index")) {
            window.location.href = "/index.html";
        }
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