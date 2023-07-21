// Récupérer les prix des services depuis Firebase Firestore et afficher les options dans le formulaire
oneTimePurchaseRef.get().then(function(oneTimePurchaseSnapshot) {
    if (oneTimePurchaseSnapshot.exists) {
      oneTimePurchaseData = oneTimePurchaseSnapshot.data();
      // Access and use the data from oneTimePurchaseData
      console.log(oneTimePurchaseData);
      displayServicesOptions(oneTimePurchaseData, oneTimePurchaseRef.id);
    } else {
      console.log("One Time Purchase document does not exist.");
    }
  }).catch(function(error) {
    console.error("Error getting One Time Purchase document: ", error);
  });
  
  // Call the function to display the options for Solution Mains Libres
  function displayServicesOptions(pricesData, docId) {
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
    });
  }
  