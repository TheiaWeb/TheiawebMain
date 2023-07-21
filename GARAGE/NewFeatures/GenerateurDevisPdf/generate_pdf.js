
// Écouteur de soumission du formulaire
document.getElementById("generationDevis").addEventListener("submit", function(event) {
  event.preventDefault(); // Empêcher le rechargement de la page

  // Récupérer les valeurs des champs du formulaire
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // Récupérer le type d'achat sélectionné (One Time ou Three Times)
  var purchaseType;
  var purchaseTypeRadios = document.getElementsByName("purchaseType");
  for (var i = 0; i < purchaseTypeRadios.length; i++) {
    if (purchaseTypeRadios[i].checked) {
      purchaseType = purchaseTypeRadios[i].value;
      break;
    }
  }

  // Récupérer les services sélectionnés par le client
  var selectedServices = [];
  var checkboxes = document.getElementsByName("services");
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      selectedServices.push({
        name: checkboxes[i].getAttribute("data-name"),
        price: parseFloat(checkboxes[i].getAttribute("data-price"))
      });
    }
  }

  // Créer un nouvel objet avec les données du client et du devis
  var clientData = {
    name: name,
    email: email,
    message: message,
    services: selectedServices,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  };

  // Générer le contenu du PDF avec pdfmake
  var docDefinition = {
    content: [
      { text: 'Demande de devis', style: 'header' },
      { text: 'Nom: ' + name },
      { text: 'Adresse e-mail: ' + email },
      { text: 'Message: ' + message },
      { text: '\nServices:', style: 'subheader' }
    ],
    styles: {
      header: {
        fontSize: 24,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 20]
      },
      subheader: {
        fontSize: 18,
        bold: true,
        margin: [0, 20, 0, 10]
      },
      serviceItem: {
        margin: [0, 5, 0, 0]
      }
    }
  };

  // Ajouter les services sélectionnés dans le contenu du devis avec les prix
  var selectedServicesToDisplay;
  if (purchaseType === "oneTime") {
    selectedServicesToDisplay = selectedServices.filter(function(service) {
      return service.name.startsWith("OneTime");
      
    });
  } else if (purchaseType === "threeTimes") {
    selectedServicesToDisplay = selectedServices.filter(function(service) {
      return service.name.startsWith("ThreeTimes");
    });
  }

  selectedServicesToDisplay.forEach(function(service) {
    var serviceText = service.name + ' - ' + service.price + ' $';
    docDefinition.content.push({ text: serviceText, style: 'serviceItem' });
  });

  var pdfDocGenerator = pdfMake.createPdf(docDefinition);
  // Générer le fichier PDF et sauvegarder le lien dans Firebase Firestore
  pdfDocGenerator.getBlob(function(blob) {
    var storageRef = firebase.storage().ref();
    var pdfFileRef = storageRef.child('devis/' + 'Devis Numero :' + Date.now() + '.pdf');

    pdfFileRef.put(blob).then(function(snapshot) {
      return snapshot.ref.getDownloadURL();
    }).then(function(downloadURL) {
      // Ajouter le lien de téléchargement dans les données du client
      clientData.pdfURL = downloadURL;

      // Sauvegarder les données dans Firebase Firestore
      return clientsCollection.add(clientData);
    }).then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      // Afficher un message de réussite ou effectuer d'autres actions ici

      // Rediriger ou afficher le lien de téléchargement pour le client
      var downloadLink = document.createElement('a');
      downloadLink.href = clientData.pdfURL;
      downloadLink.target = '_blank'; // Ouvrir dans un nouvel onglet
      downloadLink.innerText = 'Ouvrir le devis';
      document.body.appendChild(downloadLink);

      // Ajouter le bouton de téléchargement du PDF
      var downloadButton = document.createElement('button');
      downloadButton.innerText = 'Télécharger le PDF';
      downloadButton.addEventListener('click', function() {
        window.open(downloadLink.href);
      });
      document.body.appendChild(downloadButton);

      downloadLink.click();
    }).catch(function(error) {
      console.error("Error adding document: ", error);
      // Gérer les erreurs ici
    });
  });
});

// Declare the variables outside the callback functions
var oneTimePurchaseData;
var threeTimesPurchaseData;
var solutionMainsLibresData;
var docDefinition = {
  content: [],
  styles: {
    header: {
      fontSize: 24,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 20]
    },
    subheader: {
      fontSize: 18,
      bold: true,
      margin: [0, 20, 0, 10]
    },
    serviceItem: {
      margin: [0, 5, 0, 0]
    }
  }
};

// Récupérer les prix des services depuis Firebase Firestore et afficher les options dans le formulaire
oneTimePurchaseRef.get().then(function(oneTimePurchaseSnapshot) {
  if (oneTimePurchaseSnapshot.exists) {
    oneTimePurchaseData = oneTimePurchaseSnapshot.data();
    // Access and use the data from oneTimePurchaseData
    console.log(oneTimePurchaseData);
    displayServicesOptions(oneTimePurchaseData, oneTimePurchaseRef.id, docDefinition);
  } else {
    console.log("One Time Purchase document does not exist.");
  }
}).catch(function(error) {
  console.error("Error getting One Time Purchase document: ", error);
});

threeTimesPurchaseRef.get().then(function(threeTimesPurchaseSnapshot) {
  if (threeTimesPurchaseSnapshot.exists) {
    threeTimesPurchaseData = threeTimesPurchaseSnapshot.data();
    // Access and use the data from threeTimesPurchaseData
    console.log(threeTimesPurchaseData);
    displayServicesOptions(threeTimesPurchaseData, threeTimesPurchaseRef.id, docDefinition);
  } else {
    console.log("Three Times Purchase document does not exist.");
  }
}).catch(function(error) {
  console.error("Error getting Three Times Purchase document: ", error);
});

solutionMainsLibresRef.get().then(function(solutionMainsLibresSnapshot) {
  if (solutionMainsLibresSnapshot.exists) {
    solutionMainsLibresData = solutionMainsLibresSnapshot.data();
    // Access and use the data from solutionMainsLibresData
    console.log(solutionMainsLibresData);
    displayServicesOptions(solutionMainsLibresData, solutionMainsLibresRef.id, docDefinition);

  } else {
    console.log("Solution Mains Libres document does not exist.");
  }
}).catch(function(error) {
  console.error("Error getting Solution Mains Libres document: ", error);
});

// Call the function to display the options for Solution Mains Libres
function displayServicesOptions(pricesData, docId, docDefinition) {
  var servicesList = document.getElementById('servicesList');

  // Add a heading for the document ID
  var docIdHeading = document.createElement('h3');
  docIdHeading.textContent = docId;
  servicesList.appendChild(docIdHeading);

  // Convert the services data to an array of objects
  var services = [];
  for (var serviceName in pricesData) {
    if (pricesData.hasOwnProperty(serviceName)) {
      var servicePrice = pricesData[serviceName];
      services.push({ name: serviceName, price: servicePrice });
    }
  }

  // Sort the services by name
  services.sort(function(a, b) {
    var nameA = a.name.toLowerCase();
    var nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  // Iterate over the sorted services
  services.forEach(function(service) {
    var serviceName = service.name;
    var servicePrice = service.price;

    var displayPrice = (serviceName === 'Site E-Commerce' || serviceName.includes('Solution Main Libre')) ? servicePrice : servicePrice + ' $';

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'service-' + serviceName;
    checkbox.name = 'services';
    checkbox.value = serviceName;
    checkbox.setAttribute('data-name', serviceName);
    checkbox.setAttribute('data-price', servicePrice);

    var label = document.createElement('label');
    label.htmlFor = 'service-' + serviceName;
    label.innerText = serviceName + ' - ' + displayPrice;

    servicesList.appendChild(checkbox);
    servicesList.appendChild(label);
    servicesList.appendChild(document.createElement('br'));

    // Add the service to docDefinition
    var serviceText = serviceName + ' - ' + servicePrice + ' $';
    docDefinition.content.push({ text: serviceText, style: 'serviceItem' });
  });
}

// Ajouter des écouteurs d'événements pour les boutons radio
var oneTimePurchaseRadio = document.getElementById("oneTimePurchaseRadio");
var threeTimesPurchaseRadio = document.getElementById("threeTimesPurchaseRadio");

oneTimePurchaseRadio.addEventListener("change", function() {
  var servicesList = document.getElementById('servicesList');
  servicesList.innerHTML = ''; // Remove all displayed services

  if (this.checked) {
    displayServicesOptions(oneTimePurchaseData, oneTimePurchaseRef.id, docDefinition);
  }

  displayServicesOptions(solutionMainsLibresData, solutionMainsLibresRef.id, docDefinition);
});

threeTimesPurchaseRadio.addEventListener("change", function() {
  var servicesList = document.getElementById('servicesList');
  servicesList.innerHTML = ''; // Remove all displayed services

  if (this.checked) {
    displayServicesOptions(threeTimesPurchaseData, threeTimesPurchaseRef.id, docDefinition);
  }

  displayServicesOptions(solutionMainsLibresData, solutionMainsLibresRef.id, docDefinition);
});
