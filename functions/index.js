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
const cors = require("cors")({origin: true});
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

exports.checkIfEmailExists = onRequest(async (req, res) => {
  cors(request, response, async () => {
    const original = req.query.text;

    // Generate the custom key based on the date and the first letter of the email
    const date = new Date().toISOString().slice(0, 10);
    const sanitizedEmail = original.replace(/[.$#\[\]@]/g, '');
    const customKey = `${date} ${sanitizedEmail}`;

    // Check if the email already exists in the database
    const databaseRef = await admin.firestore().collection("newsletterEmails");
    res.json({ result: `Adresse Email: ${writeResult.id} added.` });
  });
});
