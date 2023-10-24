var installed = {};

browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (installed[tabId] === undefined) {
      installed[tabId] = "yes";
      browser.tabs.executeScript(tabId, {
        file: "content-script.js"
      });
  }
});


