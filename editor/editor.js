// All demos
let demos = {
	'test-project-1.html': {
		'number': '0.0.0',
		'color': 'white',
		'project': '/'
	},
	'ascii-art-example.html': {
		'number': '1.1.1',
		'color': 'pink',
		'project': '/units/1/#ascii-art'
	},
	'ascii-art-template.html': {
		'number': '1.1.2',
		'color': 'pink',
		'project': '/units/1/#ascii-art'
	},
	'concrete-poetry-example.html': {
		'number': '1.2.1',
		'color': 'pink',
		'project': '/units/1/#concrete-poetry'
	},
	'concrete-poetry-template.html': {
		'number': '1.2.2',
		'color': 'pink',
		'project': '/units/1/#concrete-poetry'
	},
	'self-portrait-example.html': {
		'number': '1.3.1',
		'color': 'pink',
		'project': '/units/1/#self-portrait'
	},
	'self-portrait-template.html': {
		'number': '1.3.2',
		'color': 'pink',
		'project': '/units/1/#self-portrait'
	},
	'blog-post-example.html': {
		'number': '1.4.1',
		'color': 'blue',
		'project': '/units/1/#blog-post'
	},
	'blog-post-template.html': {
		'number': '1.4.2',
		'color': 'blue',
		'project': '/units/1/#blog-post'
	},
}

// Generate demos list
let catalogTemp = '';
for (let demo of Object.keys(demos)) {
	catalogTemp += `
		<div class="demos-item" style="--primary: var(--${demos[demo]['color']});">
			<a href="?demo=${demo}" class="demos-link"><span class="demos-link-number">${demos[demo]['number']}</span> ${demo}</a>
			<a href="?demo=${demo}" target="_blank" class="demos-newtab"><span class="symbol">&#xe89e;</span> <span class="demos-newtab-text">Open in new tab</span></a>
		</div>
	`
}
const catalog = document.querySelector('.demos-list');
catalog.innerHTML = catalogTemp;

// Demos catalog
function toggleDemos() {
	const demos = document.querySelector('.demos');
	if (parseInt(demos.dataset.active) == 1) {
		demos.dataset.active = 0;
	} else {
		demos.dataset.active = 1;
	}
}
function openDemos() {
	const demos = document.querySelector('.demos');
	demos.dataset.active = 1;
}
function closeDemos() {
	const demos = document.querySelector('.demos');
	demos.dataset.active = 0;
}

// Generate editor
let cm;
let activeDemo = 'test-project-1.html';
function generateEditor() {
	const editor = document.querySelector('.editor-cm');
	cm = CodeMirror(editor, {
		mode: "htmlmixed",
		value: '<h1>Hello World!</h1>',
		autoCloseTags: true,
		autoCloseBrackets: true,
		matchBrackets: true,
		smartIndent: true,
		lineNumbers: true,
		tabSize: 2,
		showHint: true,
		extraKeys: {
			"Ctrl-Space": "autocomplete",
			"Ctrl-[": "indentLess",
			"Ctrl-]": "indentMore",
			'Cmd-/': 'toggleComment',
			'Ctrl-/': 'toggleComment',
		},
		lineWrapping: false,
		theme: "gdwithgd",
	});
	cm.on("change", updatePreview);

	// Initialize page with demo (load requested demo if applicable)
	const pageHref = window.location.search;
	const searchParams = new URLSearchParams(pageHref.substring(pageHref.indexOf('?')));
	if (searchParams.has('demo')) {
		urlDemo = searchParams.get('demo');
		if (Object.keys(demos).includes(urlDemo)) {
			fetchDemo(urlDemo);
		} else {
			fetchDemo('test-project-1.html');
		}
	} else {
		fetchDemo('test-project-1.html');
	}
}
generateEditor();

// Fetch demo and populate editor
function fetchDemo(src) {
	activeDemo = src;
	const editorTitle = document.querySelector('.editor-navbar-title-file');
	editorTitle.innerText = src;
	const projectDetailsBtn = document.querySelector('.editor-navbar-info');
	projectDetailsBtn.href = demos[src]['project'];
	fetch("/demos/"+src)
		.then((response) => response.text())
		.then(code => {
			cm.setValue(code);
		})
}

// Update preview when changes made in editor
function updatePreview() {
	const preview = document.querySelector('.editor-iframe');
	preview.srcdoc = cm.getValue();
}

// Editor controls
let lineWrap = false;
function editorToggleWrapping() {
	lineWrap = !lineWrap;
	cm.setOption('lineWrapping', lineWrap);
}
let editorFontsize = 16;
function editorFontsizeDown() {
	const editorCM = document.querySelector('.editor-cm');
	editorFontsize -= 2;
	if (editorFontsize <= 8) {
		editorFontsize = 8;
	}
	editorCM.style.setProperty('--font-size', editorFontsize + 'px');
	cm.refresh();
}
function editorFontsizeUp() {
	const editorCM = document.querySelector('.editor-cm');
	editorFontsize += 2;
	if (editorFontsize >= 24) {
		editorFontsize = 24;
	}
	editorCM.style.setProperty('--font-size', editorFontsize + 'px');
	cm.refresh();
}
function editorReset() {
	fetchDemo(activeDemo);
}
function editorDownload() {
	let codeBlob = new Blob([ cm.getValue()], { type: 'text/html' })
	blobURL = URL.createObjectURL(codeBlob);
	let tempLink = document.createElement("a");
	tempLink.href = blobURL;
	tempLink.download = activeDemo;
	tempLink.click();
}
function editorShortcuts() {
	const shortcuts = document.querySelector('.editor-shortcuts');
	if (parseInt(shortcuts.dataset.active) == 1) {
		shortcuts.dataset.active = 0;
	} else {
		shortcuts.dataset.active = 1;
	}
}