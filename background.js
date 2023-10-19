var installed = {};

browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (installed[tabId] === undefined) {
      installed[tabId] = "yes";
      browser.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content-script.js"]
      });
  }
});
