var contextMenuConfig;

contextMenuConfig = {
  "id": "contextMenu",
  "title": "See definition on Merriam-Webster",
  "contexts": ["selection"]
  //"contexts": ["selection", "link", "image", "page"]
}

chrome.contextMenus.create(contextMenuConfig, contextMenuErrorCallback);
chrome.contextMenus.onClicked.addListener(contextMenuOnClick);

function contextMenuOnClick(info, tab) {
  // editable: false
  // frameId: 245
  // frameUrl: "chrome://extensions-frame/"
  // menuItemId: "contextMenu"
  // pageUrl: "chrome://chrome/extensions/"
  // selectionText: "Merriam"
  console.log("selected menuItem is " + info.menuItemId);
  console.log(info);
  switch(info.menuItemId) {
    case ("contextMenu"): menuItemMW(info); break;
    default: console.log("Your request has not been handled");
  }
}

function menuItemMW(info) {
  chrome.windows.create({
    "url": "http://www.merriam-webster.com/dictionary/" + encodeURIComponent(info.selectionText.trim().toLowerCase()),
    "focused": true,
    "type": "popup"
  }, function(window) {
    console.log(window);
  })
}

function contextMenuErrorCallback() {
  console.log(chrome.runtime.lastError);
}