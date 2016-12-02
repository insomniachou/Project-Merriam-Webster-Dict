var contextMenuConfig, word;

contextMenuConfig = {
  "id": "contextMenu",
  "title": "See definition on Merriam-Webster",
  "contexts": ["selection"]
}

chrome.contextMenus.create(contextMenuConfig, contextMenuFallback);
chrome.contextMenus.onClicked.addListener(contextMenuOnClick);

function contextMenuFallback(tab) {
  console.log("error when creating context menu");
}

function contextMenuOnClick(info, tab) {
  console.log("selected menuItem is " + info.menuItemId);
  word = encodeURIComponent(info.selectionText.trim().toLowerCase());
  switch(info.menuItemId) {
    case ("contextMenu"): menuItemMW(info); break;
    default: console.log("Your request has not been handled");
  }
}

function menuItemMW(info) {
  var queryInfo = {
    'url' : "*://www.merriam-webster.com/*"
  };

  chrome.tabs.query(queryInfo, queryCallback);
}

function queryCallback(tabs) {
  var redirectUrl = "https://www.merriam-webster.com/dictionary/" + word;
  var tabUpdateProperties = {
    'url': redirectUrl,
    'active': true,
    'highlighted': true
  };
  var windowUpdateProperties = {
    'focused': true
  }
  if (tabs.length === 0) {
    chrome.windows.create({
      "url": redirectUrl,
      "focused": true,
      "type": "popup"
    }, function(window) {
      console.log(window);
    })
  } else {
    chrome.tabs.update(tabs[0].id, tabUpdateProperties);
    chrome.windows.update(tabs[0].windowId, windowUpdateProperties);
    //WM website doesn't implement AJAX, no need to send message
    //chrome.tabs.sendMessage(tabs[0].id, {'message': word}, sendMessageCallback);
  }
}
