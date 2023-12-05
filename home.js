// Header color swap
let colors = ['pink', 'green', 'blue', 'purple', 'yellow', 'red'];
const headerElmnts = document.querySelectorAll('.header-elmnt');
setInterval(() => {
	for (let headerElmnt of headerElmnts) {
		let colorIndex = parseInt(headerElmnt.dataset.color);
		colorIndex--;
		if (colorIndex <= -1) {
			colorIndex = colors.length-1;
		}
		headerElmnt.dataset.color = colorIndex;
		headerElmnt.style.setProperty('--primary', 'var(--'+colors[colorIndex]+')');
	}
}, 500)