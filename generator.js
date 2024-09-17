const fs = require('fs');

// Get JSON
const projects = require('./projects.json');

function generateCatalog() {

	// Generate projects
	let projectsContent = '';
	for (let project of Object.keys(projects)) {
		let entry = projects[project];

		// Generate marquee
		let marquee = "";
		for (let i=0; i<5; i++) {
			marquee += `
				<div class="project-link-title">
					<span class="project-link-title-file">${project}</span>
					<span class="project-link-title-desc">${entry['tagline']}</span>
				</div>
			`;
		}

		// Generate tags
		let tags = "";
		for (let tag of entry['tags']) {
			tags += `<div>${tag}</div>`;
		}
		
		projectsContent += `
			<div class="project" data-rating="${entry['rating']}" data-active="0" id="${entry['id']}">
				<div class="project-link">
					<div class="project-link-number">${entry['number']}</div>
					<div class="project-link-content">
						<div class="project-link-title-container">
							<h2 class="project-link-title">
								<span class="project-link-title-file">${project}</span>
								<span class="project-link-title-desc">${entry['tagline']}</span>
							</h2>
							${marquee}
						</div>
						<div class="project-link-info">
							<div class="project-link-info-rating">
								<h3 class="project-link-info-title">Difficulty</h3>
								<div class="project-link-info-rating-list">
									<div></div>
									<div></div>
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
							</div>
							<div class="project-link-info-divider"></div>
							<div class="project-link-info-tags">
								<h3 class="project-link-info-title">Topics</h3>
								<div class="project-link-info-tags-list">
									${tags}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="project-details-container">
					<div class="project-details">
						<div>
							<div class="project-details-info">
								${entry['desc']}
							</div>
							<div class="project-details-links">
								<a href="${entry['demo-url']}" target="_blank">
									<span>See an example</span>
									<span class="symbol">&#xf1e1;</span>
								</a>
								<a href="${entry['template-url']}" target="_blank">
									<span>Start the project</span>
									<span class="symbol">&#xf1e1;</span>
								</a>
							</div>
						</div>
						<div>
							<iframe class="project-details-preview" src="${entry['preview-url']}"></iframe>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	let pageContent = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>test-project-1.html</title>
			<link rel="stylesheet" href="style.css">
		</head>
		<body>
			<header class="header">
				<h1 class="header-title">test-project-1.html</h1>
				<p class="header-desc">
					Creative coding projects for any skill level. By&nbsp;<a href="https://gdwithgd.com/" target="_blank">GD&nbsp;with&nbsp;GD</a>.
				</p>
			</header>
		
			<main class="projects">
				${projectsContent}
			</main>

			<footer class="footer">
				<p>
					Colophon: <a href="https://www.redhat.com/en/about/brand/standards/typography" target="_blank">Red Hat</a> by <a href="https://mckltype.com/" target="_blank">MCKL</a> and <a href="https://fonts.google.com/icons" target="_blank">Google Material Symbols</a>.
				</p>
			</footer>
			
			<script src="script.js"></script>
		</body>
		</html>
	`;

	// Create work file
	fs.writeFile(`index.html`, pageContent, err => {
		if (err) {
			console.error(err);
		}
	});
}
generateCatalog();