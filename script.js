// Table of contents/projects
function toggleProjects() {
	const toc = document.querySelector('.toc');
	if (parseInt(toc.dataset.active) == 1) {
		toc.dataset.active = 0;
	} else {
		toc.dataset.active = 1;
	}
}
function openProjects() {
	const toc = document.querySelector('.toc');
	toc.dataset.active = 1;
}
function closeProjects() {
	const toc = document.querySelector('.toc');
	toc.dataset.active = 0;
}
for (let tocLink of document.querySelectorAll('.toc-project')) {
	tocLink.addEventListener('click', closeProjects);
}

// Gradient scroll for project descriptions
function updateGradientVisibility(scrollableDiv) {
	if (scrollableDiv.scrollHeight - scrollableDiv.scrollTop - 50 <= scrollableDiv.clientHeight) {
		scrollableDiv.dataset.overlay = 0;
	} else {
		scrollableDiv.dataset.overlay = 1;
	}
}
for (let projectDesc of document.querySelectorAll('.project-desc')) {
	updateGradientVisibility(projectDesc);
	projectDesc.addEventListener('scroll', () => {updateGradientVisibility(projectDesc)});
}
function checkGradientVisibilities() {
	for (let projectDesc of document.querySelectorAll('.project-desc')) {
		updateGradientVisibility(projectDesc);
	}
}
window.addEventListener('resize', checkGradientVisibilities);

// Highlight resource
let activeResource = '';
function highlightResource(id) {
	let resource = document.querySelector("#"+id);
	resource.scrollIntoView();
	resource.dataset.highlight = 1;

	setTimeout(() => {
		document.addEventListener('click', resetResource)
		function resetResource(e) {
			if (!resource.contains(e.target)) {
				resource.dataset.highlight = 0;
				document.removeEventListener('click', resetResource);
			}
		}
	}, 100)
}

// Switch page orientation (1- or 2-column)
function switchOrientation() {
	const body = document.querySelector('body');
	if (parseInt(body.dataset.orientation) == 1) {
		body.dataset.orientation = 0;
	} else {
		body.dataset.orientation = 1;
	}
}

// Confetti to celebrate finishing a unit
const confettiCount = 200,
defaults = {
	spread: 360,
	origin: { y: .5 },
	ticks: 100,
	gravity: 0,
	decay: 0.94,
	startVelocity: 30,
	colors: ["#f3a8dd", "#98db6b", "#fdc03a", "#a690fc", "#5adee8", "#ff734d"],
	shapes: ["circle"],
};

function fire(particleRatio, opts) {
	confetti(
		Object.assign({}, defaults, opts, {
		particleCount: Math.floor(confettiCount * particleRatio),
		})
	);
}

let delayYay = false;
function confettiFire() {
	// SFX
	let pop = new Audio("/assets/sounds/pop.wav");
	pop.play();
	setTimeout(() => {
		if (!delayYay) {
			let yay = new Audio("/assets/sounds/yay.mp4");
			yay.play();
			delayYay = true;
			setTimeout(() => {
				delayYay = false;
			}, 1000)
		}
	}, 300)

	// Confetti blast
	fire(0.25, {
		spread: 360,
		startVelocity: 55,
	});
	fire(0.2, {
		spread: 60,
	});
	fire(0.35, {
		spread: 300,
		decay: 0.91,
		scalar: 0.8,
	});
	fire(0.1, {
		spread: 120,
		startVelocity: 25,
		decay: 0.92,
		scalar: 1.2,
	});
	fire(0.1, {
		spread: 120,
		startVelocity: 45,
	});
}

// Set current year in the footer
const footerYear = document.querySelector('#footer-year');
if (footerYear != undefined) {
	footerYear.innerText = new Date().getFullYear();
}