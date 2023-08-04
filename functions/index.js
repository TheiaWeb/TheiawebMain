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
//#region GENERATEUR DE DEVIS
//#endregion
//#region  Newsletter
exports.checkIfEmailExists = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
      const email = request.query.email;

  // Generate the custom key based on the date and the first letter of the email
  const date = new Date().toISOString().slice(0, 10);
  const firstLetter = email.charAt(0).toLowerCase();
  const sanitizedEmail = email.replace(/[.$#\[\]@]/g, '');
  const customKey = `${date}_${firstLetter}_${sanitizedEmail}`;

  // Check if the email already exists in the database
  const databaseRef = admin.database().ref("newsletterEmails");
  databaseRef.child(customKey).once("value", (snapshot) => {
    const exists = snapshot.exists();
    response.json({ exists: exists });
  });
})});
//#endregion