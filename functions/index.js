//#region CONSTANTES
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const puppeteer = require('puppeteer');
const cors = require('cors')({ origin: true });
admin.initializeApp();

// Create a Nodemailer transporter using the Gmail SMTP server
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'theiaweb.contact@gmail.com',
    pass: 'ggiffkbxrjlofqmi',
  },
});
//#endregion
//#region SEND EMAIL TO USER && ADMIN
// Function to send emails
exports.sendEmail = functions.firestore
  .document('contacts/{contactId}')
  .onCreate(async (snapshot) => {
    const data = snapshot.data();

    try {
      // Send email to the user
      const userMessage = {
        from: 'theiaweb.contact@gmail.com',
        to: data.email,
        subject: 'Merci pour votre prise de contact',
        text: `Chèr(e) ${data.name},\n\nMerci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.\n\nCordialement,\nTheia Web`,
        html: `<p>Chèr(e) ${data.name},</p>
          <p>Merci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
          <p>Cordialement,<br>Theia Web</p>`,
      };
      await transporter.sendMail(userMessage);

      // Send email to the admin
      const adminMessage = {
        from: 'theiaweb.contact@gmail.com',
        to: 'theiaweb.contact@gmail.com',
        subject: 'Nouvelle soumission de formulaire de contact',
        text: `New Contact Form Submission \n\n Nom du client : ${data.surname} ${data.name},\n\n Email : ${data.email}\n\n Téléphone : ${data.phone}\n\n Compagny/Entreprise du client : ${data.company} \n\n Sujet du message : ${data.subject} \n\n Contenu du message envoyé : ${data.message}`,
        html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `,      
    };
      await transporter.sendMail(adminMessage);
      // Update Firestore document to indicate the emails were sent
      return snapshot.ref.update({ emailsSent: true });
    } catch (error) {
      console.error('Error sending emails:', error);
      return null;
    }
  });
//#endregion
//#region SAVE DATA TO FIRESTORE 
// Function to save form data to Firestore
exports.saveFormData = functions.https.onRequest(async (req, res) => {
  try {
    cors(req, res, async () => {
      // Extract form data from the request body
      const { surname, name, email, phone, company, subject, message } = req.body;

      // Create a new document in Firestore collection
      const docRef = admin.firestore().collection('contacts').doc();

      // Set the data for the document
      await docRef.set({
        surname,
        name,
        email,
        phone,
        company,
        subject,
        message,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Send a response back to the client
      res.status(200).send('Form data saved successfully.');
    });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).send('An error occurred while saving the form data.');
  }
});
//#endregion
//#region REGION TEST 

// Récupérez une référence à la collection "devis" dans Firestore
var quotesCollection = firebase.firestore().collection("devis");

// Ajoutez un gestionnaire d'événement pour le formulaire de devis
document.getElementById("quoteForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Empêche la soumission du formulaire par défaut

  // Récupérez les valeurs des champs du formulaire
  var clientName = document.getElementById("clientName").value;
  var itemName = document.getElementById("itemName").value;
  var itemPrice = document.getElementById("itemPrice").value;

  // Générez le devis en utilisant les valeurs du formulaire
  var quote = "Devis pour " + clientName + ": " + itemName + " - " + itemPrice + "€";

  // Enregistrez le devis dans la collection "devis" de Firestore
  quotesCollection.add({
    quote: quote
  })
  .then(function(docRef) {
    console.log("Devis enregistré avec ID :", docRef.id);
    // Réinitialisez les valeurs des champs du formulaire
    document.getElementById("clientName").value = "";
    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
  })
  .catch(function(error) {
    console.error("Erreur lors de l'enregistrement du devis :", error);
  });
});


// // Replace with your Firebase project's config object
// var firebaseConfig = {
//   apiKey: "AIzaSyDB4BfdCWo9fHb4rC2YZl5gOgtikxQHi5g",
//   authDomain: "formtheia.firebaseapp.com",
//   databaseURL: "https://formtheia-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "formtheia",
//   storageBucket: "formtheia.appspot.com",
//   messagingSenderId: "335132907653",
//   appId: "1:335132907653:web:2dfef81a7293c2551571ec"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// // Get a reference to the Firestore database
// var db = firebase.firestore();
// var ContactFormItem = Document.getElementById('contactForm').getElementByClassName('contact__category'),

// // SUBMIT FORM USER + ADMIN 

// // Handle form submission
// document.getElementById('contactForm').addEventListener('submit', function (event) {
//   event.preventDefault(); // Prevent form from submitting and page refresh

//   // Get form values
//   var surname = ContactFormItem.getElementById('surname');
//   var name = ContactFormItem.getElementById('name');
//   var email = ContactFormItem.getElementById('email');
//   var phone = ContactFormItem.getElementById('phone');
//   var company = ContactFormItem.getElementById('company');
//   var subject = ContactFormItem.getElementById('subject');
//   var message = ContactFormItem.getElementById('message');
//   // Save form data to Firestore
//   db.collection('contacts').add({
//     surname: surname,
//     name: name,
//     email: email,
//     phone: phone,
//     company: company,
//     subject: subject,
//     message: message,
//     timestamp: firebase.firestore.FieldValue.serverTimestamp()
//   })
//     .then(function (docRef) {
//       console.log('Form submitted successfully!');
//       // Reset form fields
//       document.getElementById('surname').value = '';
//       document.getElementById('name').value = '';
//       document.getElementById('email').value = '';
//       document.getElementById('phone').value = '';
//       document.getElementById('company').value = '';
//       document.getElementById('subject').value = '';
//       document.getElementById('message').value = '';
//     })
//     .catch(function (error) {
//       console.error('Error submitting form:', error);
//     });
// });


// const { initializeApp } = require('firebase-admin/app');
// const { getFirestore, FieldValue } = require('firebase-admin/firestore');
// const functions = require('firebase-functions');
// const nodemailer = require('nodemailer');
// const express = require('express');
// const bodyParser = require('body-parser');
// const admin = require('firebase-admin');

// initializeApp({
// });

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'theiaweb.contact@gmail.com',
//     pass: 'ggiffkbxrjlofqmi'
//   }
// });

// const db = getFirestore();
// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.post('/sendEmailAndSaveToFirestore', async (req, res) => {
//   try {
//     const { name, surname, email, phone, company, subject, message } = req.body;

//     const data = {
//       name, 
//       surname,
//       email,
//       phone,
//       company,
//       subject,
//       message,
//       timestamp: admin.firestore.FieldValue.serverTimestamp()
//     };

//     const collectionRef = db.collection('ContactData');
//     await collectionRef.add(data);
//     console.log('Added document to collection "ContactData":', data);

//     // Return a success response
//     res.status(200).send('Data saved successfully');
//   } catch (error) {
//     console.error('Error saving data:', error);
//     // Return an error response
//     res.status(500).send('An error occurred while saving data');
//   }
// });

// exports.api = functions.https.onRequest(app);


// const functions = require('firebase-functions');
// const nodemailer = require('nodemailer');
// const admin = require('firebase-admin');

// admin.initializeApp();
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'theiaweb.contact@gmail.com',
//     pass: 'cwsmnseyqepnqplf'
//   }
// });

// // Firebase Function to handle form submission
// exports.sendEmailAndSaveToFirestore = functions.https.onRequest(async (req, res) => {
//   try {
//     // Extract form data from the request body
//     const {
//       surname,
//       name,
//       email,
//       phone,
//       company,
//       subject,
//       message,
//       cgu
//     } = req.body;

//     // Save form data to Firestore
//     const formData = {
//       surname,
//       name,
//       email,
//       phone,
//       company,
//       subject,
//       message,
//       cgu,
//       timestamp: admin.firestore.FieldValue.serverTimestamp()
//     };

//     const firestore = admin.firestore();
//     const formSnapshot = await firestore.collection('formSubmissions').add(formData);
//     console.log('Form data saved to Firestore:', formSnapshot.id);

//     // Send email to the user
//     const userMailOptions = {
//       from: 'theiaweb.contact@gmail.com',
//       to: email,
//       subject: 'Merci pour votre prise de contact',
//       text: `Chèr(e) ${name},\n\nMerci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.\n\nCordialement,\nTheia Web`,
//       html: `<p>Chèr(e) ${name},</p>
//         <p>Merci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
//         <p>Cordialement,<br>Theia Web</p>`
//     };

//     // Send email to the admin
//     const adminMailOptions = {
//       from: 'theiaweb.contact@gmail.com',
//       to: 'theiaweb.contact@gmail.com',
//       subject: 'Info client',
//       text: `Info \n\n Nom du client : ${surname} ${name},\n\n Email : ${email}\n\n Téléphone : ${phone}\n\n Compagny/Entreprise du client : ${company} \n\n Sujet du message : ${subject} \n\n Contenu du message envoyé : ${message}`,
//       html: `<p> Info <br><br> Nom du client : ${surname} ${name},<br><br>Email : ${email}<br><br>Téléphone : ${phone}<br><br> Compagny/Entreprise du client : ${company} <br><br> Sujet du message : ${subject} <br><br> Contenu du message envoyé : ${message}</p>`
//     };

//     // Send emails asynchronously
//     await Promise.all([
//       transporter.sendMail(userMailOptions),
//       transporter.sendMail(adminMailOptions)
//     ]);

//     // Send a response indicating success
//     res.status(200).send('Emails sent and data saved successfully');
//   } catch (error) {
//     console.error('Error sending emails and saving data:', error);
//     // Send a response indicating failure
//     res.status(500).send('Error sending emails and saving data');
//   }
// });
//#endregion