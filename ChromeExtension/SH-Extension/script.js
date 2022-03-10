console.log("Hello World")
async function fetchData() {
    // fetch existing content from id demo
    const existingContent = document.getElementById("demo").innerHTML;
    // split existing content into an array by space
    let i = parseInt(existingContent.split(" ").slice(-1));
    // parse existing content array's last element to integer
    console.log(existingContent)
    console.log(i);
    i++;
    document.getElementById("demo").innerHTML = "Hello World " + i;

}
document.getElementById("myButton").addEventListener("click", fetchData);
document.getElementById("myButton").addEventListener("click", getUrl);

chrome.tabs.onCreated.addListener(showAlert);

async function getUrl() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        let url = tabs[0].url;
        // use `url` here inside the callback because it's asynchronous!
        console.log(url);
        document.getElementById("url").innerHTML = url;
        getOrigin(url);
    });
}

// make an https request to the url https://archive.softwareheritage.org/api/1/origin/url/get
// and display the response in the Chrome console

// boiler plate code to make https request to a url
async function getOrigin(url) {
    const res = await fetch(`https://archive.softwareheritage.org/api/1/origin/${url}/get`);
    // check if the response is ok
    if (res.ok) {
        const record = await res.json();
        console.log(record);
        document.getElementById("origin").innerHTML = record.origin_visits_url;
        chrome.action.setBadgeText({ text: "." });
        chrome.action.setBadgeBackgroundColor({ color: '#0F0' }, () => {
            // callback
        });
    }
    else {
        console.log(res.status);
        document.getElementById("origin").innerHTML = "No origin found";
        chrome.action.setBadgeText({ text: "!" });
        chrome.action.setBadgeBackgroundColor({ color: '#F00' }, () => {
        });


    }
}


function showAlert() {
    alert("Hello World!");
}

