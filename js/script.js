

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


	/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
navToggle = document.getElementById('nav-toggle'),
navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
navToggle.addEventListener('click', () =>{
navMenu.classList.add('show-menu')
})
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
navClose.addEventListener('click', () =>{
navMenu.classList.remove('show-menu')
})
}

	/*==================== REMOVE MENU MOBILE ====================*/

const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


 /*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
 const sections = document.querySelectorAll('section[id]')

 function scrollActive(){
	 const scrollY = window.pageYOffset
 
	 sections.forEach(current =>{
		 const sectionHeight = current.offsetHeight
		 const sectionTop = current.offsetTop - 50;
		 sectionId = current.getAttribute('id')
 
		 if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
			 document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
		 }else{
			 document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
		 }
	 })
 }
 window.addEventListener('scroll', scrollActive)
 
 /*==================== CHANGE BACKGROUND HEADER ====================*/ 
 function scrollHeader(){
	 const nav = document.getElementById('header')
	 // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
	 if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
 }
 window.addEventListener('scroll', scrollHeader)