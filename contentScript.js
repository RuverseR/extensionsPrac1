function isVideoAllowed(videoUrl) {
  chrome.storage.local.get("allowedChannels", function (result) {
    const allowedChannels = result.allowedChannels || [];
    const videoChannelUrl = extractChannelUrl(videoUrl);
    if (allowedChannels.includes(videoChannelUrl)) {
      return true;
    }
    blockVideo();
  });
}

function extractChannelUrl(videoUrl) {
  const urlParts = videoUrl.split("/");
  const channelId = urlParts[urlParts.length - 2];
  return `https://www.youtube.com/channel/${channelId}`;
}

function blockVideo() {
  const videoElement = document.querySelector("video");
  if (videoElement) {
    videoElement.parentNode.removeChild(videoElement);
  }
  const popup = document.createElement("div");
  popup.textContent = "Video blocked by Brainrot Reducer";
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.backgroundColor = "#fff";
  popup.style.border = "1px solid #000";
  popup.style.padding = "10px";
  document.body.appendChild(popup);
}

function observeVideoLinks() {
  const videoLinks = document.querySelectorAll("a[href*='watch']");
  videoLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      const videoUrl = link.href;
      if (!isVideoAllowed(videoUrl)) {
        event.preventDefault();
      }
    });
  });
}

observeVideoLinks();

new MutationObserver(observeVideoLinks).observe(document.body, {
  childList: true,
  subtree: true,
});
