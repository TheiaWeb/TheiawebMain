// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCCwmw3gY4lnt8VnoTW4kmYOxuTlcPufbs",
    authDomain: "testvincentcaca.firebaseapp.com",
    projectId: "testvincentcaca",
    storageBucket: "testvincentcaca.appspot.com",
    messagingSenderId: "849987501666",
    appId: "1:849987501666:web:c37bd0dc0de65623491b3b",
    measurementId: "G-FXK872ZL25"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const userEmail = document.getElementById("user-email");
const logoutButton = document.getElementById("logout-btn");
const userDisplayName = document.getElementById("user-displayname"); // Assuming you have an element with id "user-displayname" to display the name

auth.onAuthStateChanged(user => {
    if (user) {
        userDisplayName.textContent = user.displayName; // Display user's display name
    } else {
        window.location.href = "../index.html"; // Redirect to login page if not authenticated
    }
});

logoutButton.addEventListener("click", () => {
    auth.signOut()
        .then(() => {
            window.location.href = "../index.html"; // Redirect to login page after logout
        })
        .catch(error => {
            console.error(error.message);
        });
});

// Run this code when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get the currently signed-in user
    const user = auth.currentUser;

    if (!user) {
        console.log("User is not authenticated."); // Add appropriate error handling
        return;
    }

    const newEmailInput = document.getElementById("new-email");
    const updateEmailButton = document.getElementById("update-email-btn");

    updateEmailButton.addEventListener("click", () => {
        const newEmail = newEmailInput.value;

        // Update email address
        user.updateEmail(newEmail)
            .then(() => {
                console.log("Email updated successfully.");
                newEmailInput.value = "";
            })
            .catch(error => {
                console.error(error.message);
            });
    });
});