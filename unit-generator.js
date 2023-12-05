let projectsJSON;
let ratingColors = ['pink', 'green', 'blue', 'yellow', 'purple', 'red'];
function populateUnit(unitNumber) {
	fetch("/projects.json")
		.then((response) => response.json())
		.then(data => {
			projectsJSON = data;
			let temp = '';
			for (let projectName of Object.keys(data)) {
				const project = data[projectName];
				const projectNameAlt = projectName.split('.')[0];
				if (project['unit'] == unitNumber) {

					// Generate rating and detect color
					let rating = '';
					for (let i=0; i<6; i++) {
						if (i <= project['rating']) {
							rating += '<div data-active="1"></div>';
						} else {
							rating += '<div data-active="0"></div>';
						}
					}
					let color = ratingColors[project['rating']];

					// Generate description sections
					let description = '';
					for (let descSection of Object.keys(project['desc'])) {
						description += `
							<div class="project-desc-divider"></div>
							<div class="project-desc-section" id="${projectNameAlt}-${descSection.replace(/\s+/g, '-').toLowerCase()}">
								<h4><a href="#${projectNameAlt}-${descSection.replace(/\s+/g, '-').toLowerCase()}">${descSection}</a></h4>
								${project['desc'][descSection]}
							</div>
						`
					}

					// Generate demos
					let demos = '';
					for (let key of Object.keys(project['demos'])) {
						let demo = project['demos'][key];
						demos += `
							<a href="/editor/?demo=${demo['name']}" class="project-demos-link" target="_blank">
								<div class="project-demos-link-file"><span class="project-demos-link-number">${demo['number']}</span> ${demo['name']}</div>
								<div class="project-demos-link-name">${demo['desc']}</div>
							</a>
						`
					}

					// Generate resources
					let resources = '';
					for (let category of Object.keys(project['resources'])) {

						let resourceBlocks = '';
						for (let resource of project['resources'][category]['blocks']) {
							let links = '';
							for (let link of resource['links']) {
								links += `
									<a href="${link[1]}" target="_blank"><span class="symbol">&#xe157;</span> ${link[0]}</a>
								`;
							}

							let note = '';
							if (resource['note'] != '') {
								note = `
									<p class="resource-note">
										${resource['note']}
									</p>
								`;
							}

							resourceBlocks += `
								<div class="resource" id="${projectNameAlt}-${resource['id']}">
									<h5 class="resource-name">
										${resource['display-text']}
									</h5>
									<p class="resource-desc">
										${resource['desc']}
									</p>
									${note}
									<div class="resource-links">
										${links}
									</div>
								</div>
							`
						}

						resources += `
							<div class="resources" id="${projectNameAlt}-${category.replace(/\s+/g, '-').toLowerCase()}">
								<h4><a href="#${projectNameAlt}-${category.replace(/\s+/g, '-').toLowerCase()}" class="project-subsection"><span class="symbol">${project['resources'][category]['icon']}</span> ${category}</a></h4>

								<div class="resources-list">
									${resourceBlocks}
								</div>
							</div>
						`
					}

					temp += `
						<div class="section-divider"></div>

						<section id="${projectNameAlt}" class="project" style="--primary: var(--${color});">
							<div class="project-desc">
								<a href="#${projectNameAlt}" class="project-name">
									<div class="project-number">${project['number']}</div>
									<h2>${projectName}</h2>
								</a>

								<div class="project-prompt">
									<h4>
										<strong>${project['lead-in']}</strong>
										<br>
										${project['prompt']}
									</h4>
								</div>

								<div class="project-rating">
									<h4>Difficulty</h4>
									<div class="project-rating-dots">
										${rating}
									</div>
								</div>

								${description}
							</div>

							<div class="project-content">
								<div class="preview">
									<iframe class="preview-iframe" src="/demos/${project['demo']}"></iframe>
									<div class="preview-links">
										<a href="/editor/?demo=${project['demo']}" target="_blank"><span class="symbol">&#xe86f;</span> See the code for this demo</a>
									</div>
								</div>

								<div class="project-demos" id="${projectNameAlt}-demos">
									<h4><a href="#${projectNameAlt}-demos" class="project-subsection"><span class="symbol">&#xe86f;</span> Play with some code!</a></h4>
									<div class="project-demos-links">
										${demos}
									</div>
								</div>

								${resources}
							</div>
						</section>
					`
				}
			}

			// Add HTML to the DOM
			const projectsDOM = document.querySelector('.projects');
			projectsDOM.innerHTML = temp;
		})
}
populateUnit(1);