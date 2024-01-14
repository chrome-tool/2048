chrome.action.onClicked.addListener(function () {
  chrome.tabs.create({ url: "index.html" });
});
chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.create({ url: "index.html" });
});

if (chrome.runtime.setUninstallURL) {
  chrome.runtime.setUninstallURL("http://conviaapp.com/uninstall/");
} else {
}