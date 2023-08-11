//#region CONSTANTES
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require("cors")({ origin: true });
admin.initializeApp();

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
// Create a Nodemailer transporter using the Gmail SMTP server
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'theiaweb.contact@gmail.com',
    pass: 'ggiffkbxrjlofqmi',
  },
});
//#endregion
//#region SEND EMAIL TO USER && ADMIN ON CONTACT FORM 
// ALSO SEND CONFIRMATION EMAIL FORM NEWSLETTER
// Function to send emails
exports.sendEmailOnContactCreation = functions.firestore
  .document('contacts/{contactId}')
  .onCreate(async (snapshot, context) => {
    const contactData = snapshot.data();

    const clientMailOptions = {
      from: 'theiaweb.contact@gmail.com',
      to: contactData.email,
      subject: 'Merci pour votre prise de contact',
      text: `Chèr(e) ${contactData.name},\n\nMerci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.\n\nCordialement,\nTheia Web`,
      html: `<p>Chèr(e) ${contactData.name},</p>
              <p>Merci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
              <p>Vous nous avez contactés à ce(s) sujet(s):<br>${contactData.services.join('<br>')}</p>
              <p>Cordialement,<br>Theia Web</p>`,
    };
    
    // Admin email options
    const adminMailOptions = {
      from: 'theiaweb.contact@gmail.com',
      to: 'theiaweb.contact@gmail.com', // Admin's email
      subject: 'Nouvelle prise de contact via le formulaire !',
      html: `
      <h3>Nouveau contact, nouvelle mission lets go ca !!</h3>
      <p><strong>Name:</strong> ${contactData.name} ${contactData.surname}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Phone:</strong> ${contactData.phone}</p>
      <p><strong>Services:</strong> ${contactData.services.join(', ')}</p>
      <p><strong>Message:</strong> ${contactData.message}</p>
      <p><strong>CGU Accepted:</strong> ${contactData.cguAccepted ? 'Yes' : 'No'}</p>
      <p><strong>Newsletter Subscribed:</strong> ${contactData.newsletterSubscribed ? 'Yes' : 'No'}</p>
  `,
    };

    try {
      await transporter.sendMail(adminMailOptions);
      await transporter.sendMail(clientMailOptions);
      console.log('Emails sent successfully.');
      return Promise.resolve(); // Resolve the promise to signal completion
    } catch (error) {
      console.error('Error sending emails:', error);
      return Promise.reject(error); // Reject the promise on error
    }
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