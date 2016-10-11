'use strict';
function genericOnClick(info, tab) {
	console.log("item " + info.menuItemId + " was clicked");
	console.log("info: " + JSON.stringify(info));
	console.log("tab: " + JSON.stringify(tab));
}

// Create one test item for each context type.
var contexts = ["page","link", "image","video",
	"audio"];
for (var i = 0; i < contexts.length; i++) {
	var context = contexts[i];
	var title = "Upload " + context;
	var id = chrome.contextMenus.create({"title": title, "contexts":[context],
		"onclick": genericOnClick});
	console.log("'" + context + "' item:" + id);
}


