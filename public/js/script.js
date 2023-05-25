

// -----------------CARROUSSEL------------------- //


var
	carousel = document.querySelector('.carousel'),
	figure = carousel.querySelector('figure'),
	nav = carousel.querySelector('nav'),
	numImages = figure.childElementCount,
	theta =  2 * Math.PI / 4,
	currImage = 0
;
	
nav.addEventListener('click', onClick, true);

function onClick(e) {
	e.stopPropagation();
	
	var t = e.target;
	if (t.tagName.toUpperCase() != 'BUTTON')
		return;
	
	if (t.classList.contains('next')) {
		currImage++;
	}
	else {
		currImage--;
	}
	
	figure.style.transform = `rotateY(${currImage * -theta}rad)`;
}


	const introPara = document.getElementById("pauline");
	// Récupère le contenu HTML du paragraphe
	let contenu = introPara.innerHTML; //Je suis un <strong>joli</strong> paragraphe !

	// Remplacer le contenu HTML du paragraphe
	introPara.innerHTML = "Je suis un <em>nouveau</em> paragraphe !";
	// <p>Je suis un <em>nouveau</em> paragraphe !</p>

<<<<<<< Updated upstream
=======
// -----------------FORM------------------- //

>>>>>>> Stashed changes

