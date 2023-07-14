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
  
  firebase.initializeApp(firebaseConfig);
  
  var clientsCollection = firebase.firestore().collection("clients");
  var oneTimePurchaseRef = firebase.firestore().collection("prices").doc("One Time Purchase");
  var threeTimesPurchaseRef = firebase.firestore().collection("prices").doc("Three Times Purchase");
  var solutionMainsLibresRef = firebase.firestore().collection("prices").doc("Solution Main Libre");
  
  