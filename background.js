const wmConfig = {
  "id": "wmConfig",
  "title": "See definition on Merriam-Webster",
  "contexts": ["selection"],
  "onclick": contextMenuOnClick
}

chrome.contextMenus.create(wmConfig, contextMenuFallback);

function contextMenuFallback() {
  console.log(chrome.runtime.lastError);
}

function contextMenuOnClick(info, tab) {
  const word = encodeURIComponent(info.selectionText.trim().toLowerCase());
  chrome.tabs.sendMessage(tab.id, word + " This is a test");


  // const queryInfo = {
  //   'url' : "*://www.merriam-webster.com/*"
  // };
  // chrome.tabs.query(queryInfo, queryCallback);

  // function queryCallback(tabs) {
  //   const redirectUrl = "https://www.merriam-webster.com/dictionary/" + word;
  //   const tabUpdateProperties = {
  //     'url': redirectUrl,
  //     'active': true,
  //     'highlighted': true
  //   };
  //   const windowUpdateProperties = {
  //     'focused': true
  //   }
  //   if (tabs.length === 0) {
  //     chrome.windows.create({
  //       "url": redirectUrl,
  //       "focused": true,
  //       "type": "popup"
  //     });
  //   } else {
  //     chrome.tabs.update(tabs[0].id, tabUpdateProperties);
  //     chrome.windows.update(tabs[0].windowId, windowUpdateProperties);
  //   }
  // }
}
