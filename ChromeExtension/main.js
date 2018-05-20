'use strict';
function uploadData(info) {
	const src = info['srcUrl'] || info['linkUrl'];
	fetch('https://xsafesaving.tk/api/files', {
		method: 'POST',
		body: JSON.stringify({url:src}),
		headers: {
			"Content-type": "application/json"
		},
		credentials: 'include'
	}).then(function (response) {
		showNotification('Upload Complete');
	});
}
function showNotification(text) {
	chrome.notifications.create({
		type: "basic",
		title: "xSafeSaving",
		message: text,
		iconUrl: "icon.png"
	}, function () {});
}

const contexts = ['link', 'image', 'video', 'audio'];
for (let i = 0; i < contexts.length; i++) {
	const context = contexts[i];
	let title = 'Upload ';
	if (context == 'link') {
		title += 'from ';
	}
	title += context;
	const id = chrome.contextMenus.create({
        'title': title, 'contexts': [context],
        'onclick': uploadData
    });
}


