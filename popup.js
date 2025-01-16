document.addEventListener("DOMContentLoaded", function () {
  const channelInput = document.getElementById("channel-input");
  const addChannelBtn = document.getElementById("add-channel-btn");
  const saveChannelsBtn = document.getElementById("save-channels-btn");

  addChannelBtn.addEventListener("click", function () {
    const channelUrl = channelInput.value.trim();
    if (channelUrl) {
      chrome.storage.local.get("allowedChannels", function (result) {
        const allowedChannels = result.allowedChannels || [];
        allowedChannels.push(channelUrl);
        chrome.storage.local.set({ allowedChannels });
        channelInput.value = "";
      });
    }
  });

  saveChannelsBtn.addEventListener("click", function () {
    chrome.storage.local.get("allowedChannels", function (result) {
      const allowedChannels = result.allowedChannels || [];
      chrome.runtime.sendMessage({ action: "saveChannels", allowedChannels });
      window.close();
    });
  });
});
