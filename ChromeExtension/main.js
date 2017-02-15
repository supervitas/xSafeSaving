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
		console.log(response);
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

var contexts = ['link', 'image', 'video', 'audio'];
for (var i = 0; i < contexts.length; i++) {
	var context = contexts[i];
	var title = 'Upload ';
	if (context == 'link') {
		title += 'from ';
	}
	title += context;
	var id = chrome.contextMenus.create({'title': title, 'contexts':[context],
		'onclick': uploadData});
}


