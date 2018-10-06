let overlay = document.getElementById("wm-overlay");
let content = document.getElementById("wm-content");

function showWMOverlay() {
    overlay.style.display = "block";
}

function hideWMOverlay() {
    overlay.style.display = "none";
}

chrome.runtime.onMessage.addListener(function (message) {
    if (!overlay) {
        content = document.createElement("div");
        content.setAttribute("id", "wm-content");
        overlay = document.createElement("div");
        overlay.setAttribute("id", "wm-overlay");
        overlay.appendChild(content);
        overlay.addEventListener("click", hideWMOverlay);
        document.body.appendChild(overlay);
    }
    content.innerHTML = `<div>${message}</div>`;
    showWMOverlay();
});