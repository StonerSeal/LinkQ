let lasttargettext = "[initial]";

console.log("hello :)")
document.body.addEventListener("mousedown", e => {
    let { which, target } = e;
    if (which === 3) {
        //console.log(target.innerText);
        lasttargettext = target.innerText;
    }
})


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.method == "get") {
        sendResponse({ data: lasttargettext });
    }
});