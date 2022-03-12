// list of domains that host SH repositories
const links = [
    "git.joeyh.name",
    "git.gnu.org.ua",
    "git.eclipse.org",
    "gitweb.torproject.org",
    "hdiff.luite.com",
    "git.alpinelinux.org",
    "git.openembedded.org",
    "git.yoctoproject.org",
    "git.zx2c4.com",
    "git.kernel.org",
    "fedorapeople.org",
    "git.baserock.org",
    "code.qt.io",
    "codeberg.org",
    "git.fsfe.org",
    "gitlab.com",
    "gitlab.lip6.fr",
    "0xacab.org",
    "gitlab.inria.fr",
    "gitlab.freedesktop.org",
    "gitlab.common-lisp.net",
    "gitlab.ow2.org",
    "gitlab.gnome.org",
    "gite.lirmm.fr",
    "framagit.org",
    "foss.heptapod.net",
    "foss.heptapod.net",
    "heptapod.host",
    "heptapod.host",
    "forge.extranet.logilab.fr",
    "forge.extranet.logilab.fr",
    "opam.ocaml.org",
    "coq.inria.fr",
    "bitbucket.org",
    "git.savannah.gnu.org",
    "cran.r-project.org",
    "github.com"
]
console.log(links);




function checkLink() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        var currUrl = tabs[0].url;
        // console.log(links);
        // console.log(typeof (links));
        // if any element in website contains currUrl as substring
        // console.log(links.includes(currUrl));
        const found = links.find(website => currUrl.includes(website));

        if (found) {
            // then show the icon
            console.log("website found")
            getOrigin(currUrl);
        }
        else {
            // else hide the icon
            console.log("website not found")
            chrome.action.setBadgeText({ text: "!" });
            chrome.action.setBadgeBackgroundColor({ color: '#00F' }, () => {
                // callback
            });
        }
    });
}


// function to convert urls to preferable format, mentioned in observations.md
// a series of if-else statements to check the url and convert it to the preferred format
// if the url is already in the preferred format, then do nothing
function convertUrl(url) {

}



async function getOrigin(url) {

    // url = convertUrl(url);

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


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // driver code goes here
    if (changeInfo.url) {
        // console.log("url changed");
        url = changeInfo.url;
        checkLink();
    }
    else {
        // console.log("url not changed");
    }

});





chrome.tabs.onActivated.addListener(function (activeInfo) {
    // driver code goes here
    checkLink();
});
