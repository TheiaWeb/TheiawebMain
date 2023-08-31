//#region CONSTANTES
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import "firebase/app";
import "firebase/database";
import "firebase/functions";

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
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();
var database = firebase.database();
const functions = firebase.functions();
const sendEmailOnDataAdded = functions.httpsCallable('sendEmailOnDataAdded');

// Create a Nodemailer transporter using the Gmail SMTP server
//#endregion
//#region SEND EMAIL TO USER && ADMIN ON CONTACT FORM 
// ALSO SEND CONFIRMATION EMAIL FORM NEWSLETTER
// Function to send emails
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Firebase Cloud Function triggered when new data is added to Firestore
exports.sendEmailOnDataAdded = functions.firestore
  .document('contacts/{contactId}')
  .onCreate(async (snapshot, context) => {
    const userData = snapshot.data();
    const clientEmail = userData.personalInfo.email;

    // Email content
    const mailOptions = {
      from: gmailEmail,
      to: clientEmail,
      subject: 'Merci pour votre prise de contact',
      text: `Chèr(e) ${userData.personalInfo.name},\n\nMerci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.\n\nNous vous remercions pour votre démarche et sommes a votre écoute, si vous souhaitez partager plus d'informations ou revenir sur les informations que vous nous avez fournies; n'hésitez pas a nous contacter par mail a l'adresse theiaweb.contact@gmail.com, ou par téléphone au 06 35 55 14 84. \n\n Cordialement,\nTheia Web`,
      html: `<p>Chèr(e) ${userData.personalInfo.name},</p>
              <p>Merci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons dans les 48H suite a votre prise de contact</p>
              <p>Nous vous remercions pour votre démarche et sommes a votre écoute, si vous souhaitez partager plus d'informations ou revenir sur les informations que vous nous avez fournies; n'hésitez pas a nous contacter par mail a l'adresse theiaweb.contact@gmail.com, ou par téléphone au 06 35 55 14 84.
              <p>Vous nous avez contactés à ce(s) sujet(s):<br><br><strong>${userData.services.join('<br>')}</strong></p>
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

// exports.subscribeToNewsletter = functions.database.ref('newsletterEmails/{emailId}')
// .onCreate(async (snapshot, context) => {
//   const data = snapshot.val(); // Use snapshot.val() instead of snapshot.data()

//   try {
//     // Send confirmation email to the user
//     const confirmationMessage = {
//       from: 'theiaweb.contact@gmail.com', // Replace with your email address
//       to: data.email,
//       subject: 'Confirm Your Newsletter Subscription',
//       text: `Dear ${data.customKey},\n\nThank you for subscribing to our newsletter! Please click the link below to confirm your subscription:\n\nhttps://yourwebsite.com/confirmSubscription?email=${data.email}&token=${data.confirmationToken}\n\nIf you didn't request this subscription, please ignore this email.\n\nBest regards,\nYour Company`,
//       html: `<p>Dear ${data.customKey},</p>
//         <p>Thank you for subscribing to our newsletter! Please click the link below to confirm your subscription:</p>
//         <p>If you didn't request this subscription, please ignore this email.</p>
//         <p>Best regards,<br>Your Company</p>`,
//     };

//     await transporter.sendMail(confirmationMessage);

//     // Update Realtime Database to indicate the confirmation email was sent
//     return snapshot.ref.update({ confirmationEmailSent: true });
//   } catch (error) {
//     console.error('Error sending confirmation email:', error);
//     return null;
//   }
// });


//#endregion

//#region  Newsletter
exports.checkIfEmailExists = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const email = request.query.email;

    // Generate the custom key based on the date and the first letter of the email
    const date = new Date().toISOString().slice(0, 10);
    const sanitizedEmail = email.replace(/[.$#\[\]@]/g, '');
    const customKey = `${date} ${sanitizedEmail}`;

    // Check if the email already exists in the database
    const databaseRef = admin.database().ref("newsletterEmails");
    databaseRef.child(customKey).once("value", (snapshot) => {
      const exists = snapshot.exists();
      response.json({ exists: exists });
    });
  })
});
//#endregion