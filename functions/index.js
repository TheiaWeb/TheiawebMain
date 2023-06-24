const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
admin.initializeApp();
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'theiaweb.contact@gmail.com',
    pass: 'cwsmnseyqepnqplf'
  }
});

// Firebase Function to handle form submission
exports.sendEmailAndSaveToFirestore = functions.https.onRequest(async (req, res) => {
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
    } = req.body;

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

    const firestore = admin.firestore();
    const formSnapshot = await firestore.collection('formSubmissions').add(formData);
    console.log('Form data saved to Firestore:', formSnapshot.id);

    // Send email to the user
    const userMailOptions = {
      from: 'theiaweb.contact@gmail.com',
      to: email,
      subject: 'Merci pour votre prise de contact',
      text: `Chèr(e) ${name},\n\nMerci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.\n\nCordialement,\nTheia Web`,
      html: `<p>Chèr(e) ${name},</p>
        <p>Merci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
        <p>Cordialement,<br>Theia Web</p>`
    };

    // Send email to the admin
    const adminMailOptions = {
      from: 'theiaweb.contact@gmail.com',
      to: 'theiaweb.contact@gmail.com',
      subject: 'Info client',
      text: `Info \n\n Nom du client : ${surname} ${name},\n\n Email : ${email}\n\n Téléphone : ${phone}\n\n Compagny/Entreprise du client : ${company} \n\n Sujet du message : ${subject} \n\n Contenu du message envoyé : ${message}`,
      html: `<p> Info <br><br> Nom du client : ${surname} ${name},<br><br>Email : ${email}<br><br>Téléphone : ${phone}<br><br> Compagny/Entreprise du client : ${company} <br><br> Sujet du message : ${subject} <br><br> Contenu du message envoyé : ${message}</p>`
    };

    // Send emails asynchronously
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    // Send a response indicating success
    res.status(200).send('Emails sent and data saved successfully');
  } catch (error) {
    console.error('Error sending emails and saving data:', error);
    // Send a response indicating failure
    res.status(500).send('Error sending emails and saving data');
  }
});
