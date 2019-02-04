/*
get title from yt link

fetch("https://www.youtube.com/watch?v=gpzjvW6nJu8")
.then(res => res.text())
.then(d => console.log(d.match(/<script >(.*)<\/script>/g).filter(v => v.includes('ytplayer.config'))[0].match(/(?<="title":")([^"]*)(?=")/g)))

*/

// add to separate file contextmenu.js
/*var contextMenuItem = {
    "id": "queueLink",
    "title": "Queue link",
    "contexts": ["link"]
}

chrome.contextMenus.create(contextMenuItem);*/


chrome.contextMenus.onClicked.addListener((clickData) => {
    let { menuItemId, linkUrl } = clickData;
    console.log(clickData);
    if (menuItemId == contextMenuItem.id) {
        //console.log(clickData);

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { method: "get" }, function (response) {
                console.log(response);
                if (response === undefined) return;

                console.log(response.data);
                let title = response.data;


                chrome.storage.local.get(['queue'], function (result) {
                    let queue = result.queue || [];

                    queue.push({
                        title: title,
                        url: linkUrl
                    });

                    chrome.storage.local.set({ "queue": queue }, function () {
                        console.log(queue);
                    });
                });
            });
        });


    }
})

// remove?
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    if (changeInfo.status === "complete") {
        let { url, title } = tab;

        //console.log("Navigated to: " + url);

    }
});