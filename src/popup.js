function clearLinks() {
    let ps = document.body.querySelectorAll("p");
    ps.forEach(p => {
        p.remove();
    })
}

async function loadLinks() {
    chrome.storage.local.get(['queue'], function (result) {
        let { queue } = result;

        if (queue === undefined) return;

        for (let i = 0; i < queue.length; i++) {
            let queueItem = queue[i];

            let a_tag = document.createElement("a");
            a_tag.innerText = queueItem.title || queueItem.url;
            a_tag.href = queueItem.url;

            a_tag.addEventListener("click", e => {
                console.log(e);
                let url = e.target.href;
                console.log(url)

                chrome.tabs.update({ url });

                let index = queue.map(v => v.url).indexOf(url);
                console.log("removing: " + index);
                queue.splice(index, 1);

                chrome.storage.local.set({ "queue": queue }, function () {
                });

                e.target.remove();

                /*clearPs();
                loadPs();*/

                window.close();
            });

            document.body.appendChild(a_tag);
        }
    });
};

(function () {
    loadLinks();
})();


document.body.querySelector("#clear").addEventListener("click", e => {
    chrome.storage.local.clear(obj => {
        clearLinks();
        window.close();
    });
})