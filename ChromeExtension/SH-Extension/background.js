function checkLink() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        var currUrl = tabs[0].url;
        console.log(currUrl);
        let websites = ["https://github.com/", "https://www.facebook.com/", "https://www.youtube.com/"];
        // if any element in website contains currUrl as substring
        const found = websites.find(website => currUrl.includes(website));

        if (found) {
            // then show the icon
            console.log("website found")
        }
        else {
            // else hide the icon
            console.log("website not found")
        }
    });
}


async function getOrigin(url) {
    const res = await fetch(`https://archive.softwareheritage.org/api/1/origin/${url}/get`);
    // check if the response is ok
    if (res.ok) {
        const record = await res.json();
        console.log(record);
        chrome.action.setBadgeText({ text: "." });
        chrome.action.setBadgeBackgroundColor({ color: '#0F0' }, () => {
            // callback
        });
    }
    else {
        console.log(res.status);
        chrome.action.setBadgeText({ text: "!" });
        chrome.action.setBadgeBackgroundColor({ color: '#F00' }, () => {
        });


    }
}




// chrome.tabs.onUpdated.addListener(function
//     (tabId, changeInfo, tab) {
//     // read changeInfo data and do something with it (like read the url)
//     checkLink();
// }
// );

chrome.tabs.onActivated.addListener(function (activeInfo) {
    // driver code goes here
    checkLink();
});
