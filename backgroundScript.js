chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "saveChannels") {
    const allowedChannels = request.allowedChannels;
    chrome.storage.local.set({ allowedChannels });
  }
});
