const functions = require('firebase-functions');
const cors = require('cors');
const nodemailer = require('nodemailer');
<<<<<<< Updated upstream
const cors = require('cors')({ origin: true });

exports.sendEmailToUser = functions.firestore
  .document('contacts/{contactId}')
  .onCreate(async(snapshot, context) => {
    const contactData = snapshot.data();

    // Configure the email transport
=======
const admin = require('firebase-admin');
admin.initializeApp();

const corsHandler = cors({ origin: true });
const body = req.method === 'POST' ? JSON.parse(req.body) : req.body;

// Firebase Function to handle form submission
exports.sendEmailAndSaveToFirestore = functions.https.onRequest(async (req, res) => {
  // Use the cors middleware before processing the request
  corsHandler(req, res, async () => {
  try {
    // Extract form data from the request body
    const {
      surname,
      name,
      email,
      phone,
      company,
      subject,
      message,
      cgu
    } = body;

    // Save form data to Firestore
    const formData = {
      surname,
      name,
      email,
      phone,
      company,
      subject,
      message,
      cgu,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    };
>>>>>>> Stashed changes
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'theiaweb.contact@gmail.com',
        pass: 'cwsmnseyqepnqplf'
      }
    });
<<<<<<< Updated upstream

    const mailOptions = {
=======
    
    const firestore = admin.firestore();
    const formSnapshot = await firestore.collection('formSubmissions').add(formData);
    console.log('Form data saved to Firestore:', formSnapshot.id);

    // Send email to the user
    const userMailOptions = {
>>>>>>> Stashed changes
      from: 'theiaweb.contact@gmail.com',
      to: contactData.email,
      subject: 'Merci pour votre prise de contact',
      text: `Chèr(e) ${contactData.name},\n\nMerci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.\n\nCordialement,\nTheia Web`,
      html: `<p>Chèr(e) ${contactData.name},</p>
        <p>Merci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
        <p>Cordialement,<br>Theia Web</p>`
    };

    const mailAdmin = {
      from: 'theiaweb.contact@gmail.com',
      to: 'theiaweb.contact@gmail.com',
      subject: 'Info client',
      text: `Info \n\n Nom du client : ${contactData.surname} ${contactData.name},\n\n Email : ${contactData.email}\n\n Téléphone : ${contactData.phone}\n\n Compagny/Entreprise du client : ${contactData.company} \n\n Sujet du message : ${contactData.subject} \n\n Contenu du message envoyé : ${contactData.message}`,
      html: `<p> Info <br><br> Nom du client : ${contactData.surname} ${contactData.name},<br><br>Email : ${contactData.email}<br><br>Téléphone : ${contactData.phone}<br><br> Compagny/Entreprise du client : ${contactData.company} <br><br> Sujet du message : ${contactData.subject} <br><br> Contenu du message envoyé : ${contactData.message}</p>`
    };

    const sendMailToUser = transporter.sendMail(mailOptions);
    const sendMailToAdmin = transporter.sendMail(mailAdmin);

<<<<<<< Updated upstream
    // Set cache-control headers to prevent caching
    const headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };

    const response = {
      status: 'success',
      message: 'Emails sent successfully'
    };

    return Promise.all([sendMailToUser, sendMailToAdmin])
      .then(() => {
        console.log('Emails sent successfully');
        return {
          headers,
          statusCode: 200,
          body: JSON.stringify(response)
        };
      })
      .catch((error) => {
        console.error('Error sending emails:', error);
        return {
          headers,
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to send emails' })
        };
      });
  });
=======
    // Send a response indicating success
    res.status(200).send('Emails sent and data saved successfully');
  } catch (error) {
    console.error('Error sending emails and saving data:', error);
    // Send a response indicating failure
    res.status(500).send('Error sending emails and saving data');
  }
});
});
>>>>>>> Stashed changes
