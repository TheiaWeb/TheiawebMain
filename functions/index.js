/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const {initializeApp, getApps} = require("firebase-admin/app");
const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors')({ origin: true });
const firebaseConfig = {
  apiKey: "AIzaSyDB4BfdCWo9fHb4rC2YZl5gOgtikxQHi5g",
  authDomain: "formtheia.firebaseapp.com",
  databaseURL: "https://formtheia-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "formtheia",
  storageBucket: "formtheia.appspot.com",
  messagingSenderId: "335132907653",
  appId: "1:335132907653:web:d4620962ca0a24131571ec",
  measurementId: "G-5F4K9SXY34",
};
// Initialize Firebase Admin SDK
// Initialize Firebase Admin SDK only if it hasn't been initialized
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
const app = express();
// Create and deploy your Firebase Functions
// https://firebase.google.com/docs/functions/get-started

exports.sendEmailOnDataAdded = functions.firestore
    .document("contacts/{contactId}")
    .onCreate(async (snapshot, context) => {
      const userData = snapshot.data();
      const clientEmail = userData.personalInfo.email;
      
    // Email content
      const mailOptions = {
        from: gmailEmail,
          to: clientEmail,
          subject: "Merci pour votre prise de contact",
            text: `Chèr(e) ${userData.personalInfo.name},\n\nMerci de nous avoir 
          contactés. Nous avons bien reçu votre message et nous vous répondrons
           dans les plus brefs délais.\n\nNous vous remercions pour votre démarche
            et sommes a votre écoute, si vous souhaitez partager plus d'informations
             ou revenir sur les informations que vous nous avez fournies; n'hésitez
              pas a nous contacter par mail a l'adresse theiaweb.contact@gmail.com,
               ou par téléphone au 06 35 55 14 84. \n\n Cordialement,\nTheia Web`,
            html: `<p>Chèr(e) ${userData.personalInfo.name},</p>
              <p>Merci de nous avoir contactés. Nous avons bien reçu votre message
               et nous vous répondrons dans les 48H suite a votre prise de contact</p>
              <p>Nous vous remercions pour votre démarche et sommes a votre écoute, 
              si vous souhaitez partager plus d'informations ou revenir sur les 
              informations que vous nous avez fournies; n'hésitez pas a nous contacter 
              par mail a l'adresse theiaweb.contact@gmail.com, ou par téléphone au
              06 35 55 14 84.
              <p>Vous nous avez contactés à ce(s) sujet(s):
              <br><br><strong>${userData.services.join('<br>')}</strong></p>
              <p>Cordialement,<br>Theia Web</p>`,
    };

    // Admin email options
    const adminMailOptions = {
      from: gmailEmail,
      to: gmailEmail, // Admin's email
      subject: 'Nouvelle prise de contact via le formulaire !',
      html: `
      <h3>Nouveau contact, nouvelle mission lets go ca !!</h3>
      <p><strong>Name:</strong> ${userData.personalInfo.name} ${userData.personalInfo.surname}</p>
      <p><strong>Email:</strong> ${userData.personalInfo.email}</p>
      <p><strong>Phone:</strong> ${userData.personalInfo.phone}</p>
      <p><strong>Services:</strong> ${userData.services.join('<br>')}</p>
      <p><strong>Message:</strong> ${userData.personalInfo.message}</p>
      <p><strong>CGU Accepted:</strong> ${userData.preferences.cguAccepted ? 'Yes' : 'No'}</p>
      <p><strong>Newsletter Subscribed:</strong> ${userData.preferences.newsletterSubscribed ? 'Yes' : 'No'}</p>
  `,
    };

    // Send the email
    try {
      await mailTransport.sendMail(mailOptions);
      await mailTransport.sendMail(adminMailOptions);
      console.log('Email sent successfully.');
    } catch (error) {
      console.error('Error sending email:', error);
    }

    return null;
  });

  exports.checkIfEmailExists = functions.https.onCall(async (data, context) => {
    const searchString = data.searchString; // Get the search string from the client
  
    try {
      const querySnapshot = await getDocs(collection(Firestore, 'newsletterSubscriptions'));
      const results = [];
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
  
        // Check if the email field contains the search string
        if (data.email.includes(searchString)) {
          results.push({
            id: doc.id,
            ...data
          });
        }
      });
  
      return { results };
    } catch (error) {
      console.error('Error searching newsletter subscriptions:', error);
      throw new functions.https.HttpsError('internal', 'An error occurred while searching for email subscriptions.');
    }
  });
    // app.get('/checkIfEmailExists', cors, (request, response) => {
  //   const original = request.query.email;
  
  //   // Generate the custom key based on the date and the first letter of the email
  //   const date = new Date().toISOString().slice(0, 10);
  //   const sanitizedEmail = original.replace(/[.$#\[\]@]/g, '');
  //   const customKey = `${date} ${sanitizedEmail}`;
  
  //   // Check if the email already exists in the database
  //   const databaseRef = admin.firestore().collection("newsletterEmails");
  
  //   // Perform a database operation, e.g., add a document
  //   databaseRef.add({ email: original })
  //     .then((writeResult) => {
  //       response.json({ result: `Adresse Email: ${writeResult.id} added.` });
  //     })
  //     .catch((error) => {
  //       response.status(500).json({ error: "Internal Server Error" });
  //     });
  // });
  
  // // Export the Express app as a Cloud Function
  // exports.checkIfEmailExists = functions.https.onRequest(app);  