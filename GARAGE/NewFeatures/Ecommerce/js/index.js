
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
const app = initializeApp(firebaseConfig);
  
// Référence à la base de données Firebase
const db = firebase.firestore();

// Fonction pour vérifier si une collection existe déjà
function checkCollectionExists(collectionName) {
  return db.collection(collectionName).get()
    .then((snapshot) => {
      return !snapshot.empty;
    })
    .catch((error) => {
      console.error("Erreur lors de la vérification de la collection :", error);
      return false;
    });
}

// Fonction pour créer une collection si elle n'existe pas
function createCollectionIfNotExists(collectionName) {
  checkCollectionExists(collectionName)
    .then((exists) => {
      if (!exists) {
        // Créez un document bidon pour la collection pour vous assurer qu'elle est créée
        db.collection(collectionName).doc('dummyDoc').set({ dummyField: 'dummyValue' })
          .then(() => {
            console.log(`Collection "${collectionName}" créée avec succès.`);
          })
          .catch((error) => {
            console.error("Erreur lors de la création de la collection :", error);
          });
      }
    });
}

// Créez les collections nécessaires s'ils n'existent pas
createCollectionIfNotExists('promotions');
createCollectionIfNotExists('best_sellers');
createCollectionIfNotExists('new_products');


// Fonction pour récupérer les produits d'une collection spécifique
function getProductsFromCollection(collectionName) {
  return db.collection(collectionName).get() // Utilisez "db" au lieu de "firestore" ici
    .then((querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push(doc.data());
      });
      return products;
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des produits :", error);
    });
}

// Fonction pour afficher les produits dans une section spécifique
function displayProducts(products, containerId) {
  const container = document.getElementById(containerId);
  let html = '';
  products.forEach((product) => {
    html += `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price} €</p>
      </div>
    `;
  });
  container.innerHTML = html;
}

// Afficher les produits de promotion
getProductsFromCollection('promotions')
  .then((promotionProducts) => {
    displayProducts(promotionProducts, 'promotion-products');
  });

// Afficher les produits les plus vendus
getProductsFromCollection('best_sellers')
  .then((bestSellers) => {
    displayProducts(bestSellers, 'best-sellers-products');
  });

// Afficher les nouveaux produits mis en avant
getProductsFromCollection('new_products')
  .then((newProducts) => {
    displayProducts(newProducts, 'new-products');
  });