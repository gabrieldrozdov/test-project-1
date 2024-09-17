// Generate title spans
let colors = ['pink', 'green', 'blue', 'yellow', 'purple', 'red'];
function generateTitle() {
	const title = document.querySelector('.header-title');
	let temp = "";
	for (let letter of title.innerText) {
		let timing = Math.random()*5+5;
		temp += `<span style="--primary: var(--${colors[Math.floor(Math.random()*colors.length)]});"><span style="animation-duration: ${timing}s;">${letter}</span><span style="animation-duration: ${timing}s;">${letter}</span></span>`;
	}
	title.innerHTML = temp;
	setInterval(animateTitle, 1000);
}
generateTitle();

// Animate title loop
function animateTitle() {
	const title = document.querySelector('.header-title');
	for (let letter of title.querySelectorAll('span')) {
		letter.style.setProperty('--primary', `var(--${colors[Math.floor(Math.random()*colors.length)]})`);
	}
}

// Project links
for (const project of document.querySelectorAll('.project')) {
	const projectLink = project.querySelector('.project-link');
	projectLink.addEventListener('click', () => {
		if (parseInt(project.dataset.active) == 1) {
			closeProject(project.id);
		} else {
			openProject(project.id);
		}
	})
}
function openProject(projectID) {
	const project = document.querySelector(`#${projectID}`);
	project.dataset.active = 1;
	window.history.replaceState({}, "", "#"+projectID);
	setTimeout(() => {
		project.scrollIntoView();
	}, 100)
}
function closeProject(projectID) {
	const project = document.querySelector(`#${projectID}`);
	project.dataset.active = 0;
	window.history.replaceState({}, "", " ");
}

// Read URL and open the right project
function readURL() {
	const url = new URL(window.location.href);
	const projectID = url.hash;
	// console.log(projectID.split("#")[2])
	if (projectID) {
		openProject(projectID.split("#")[1]);
	}
}
readURL();