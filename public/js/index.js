// -----------------FORMULAIRE DE CONTACT ------------------- //

import {firebase} from 'firebase/app';
import 'firebase/database';
import { get } from 'firebase/database';

// firebase.js

const firebaseConfig = {
apiKey: "AIzaSyDsoCdwrXf9WQal8RrTaVMTw-1dqRjkuoo",
authDomain: "contact-form-theia.firebaseapp.com",
databaseURL: "https://contact-form-theia-default-rtdb.europe-west1.firebasedatabase.app",
projectId: "contact-form-theia",
storageBucket: "contact-form-theia.appspot.com",
messagingSenderId: "816324356333",
appId: "1:816324356333:web:64c76de1afb39f218944e4"
};

firebase.initializeApp(firebaseConfig);

const messagesRef = firebase.database().ref('contactForms');

function saveMessage(name, company, email, phone, message) {
const newMessageRef = messagesRef.push();
newMessageRef.set({
name: name,
company: company,
email: email,
phone: phone,
message: message
});
}

document.getElementById("contactForm").addEventListener('submit', Submitform);

function Submitform(e){
    e.preventDefault();
    var name = getElementVal('name');
    const company = document.getElementVal('company').value;
    const email = document.getElementVal('email').value;
    const phone = document.getElementVal('phone').value;
    const message = document.getElementVal('message').value;
    
    console.log(name,email,phone, company,message)
}

const getElementVal = (id) => {
    return document.getElementById(id).value;

};

