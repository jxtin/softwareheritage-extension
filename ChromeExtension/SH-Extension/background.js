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



const visited = { found: [], notFound: [] };



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
            // website is in list of domains that host SH repositories
            getOrigin(currUrl);
        }
        else {
            // else hide the icon
            console.log("website does not host SH repositories");
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
    if (url.includes("github.com")) {
        // get count of '/' in the url
        // if count is 4, then return the url
        if (url.split("/").length === 4) {
            console.log("url is already in the preferred format");
            console.log(url);
            return url;
        }
        else if (url.split("/").length > 4) {
            // split the url at '/tree'
            // return the url before '/tree'
            console.log(url.split("/tree")[0]);
            return url.split("/tree")[0];
        }
        else {
            return "https://github.com/";
        }

    }
    else if (url.includes("gitlab.com")) {
        if (url.includes("/-/")) {
            url = url.split("/-/")[0];
        }
        return url + ".git";
    }
    else if (url.includes("bitbucket.org")) {
        // split the url at  '/src'
        // return the url before '/src'
        return url.split("/src")[0] + ".git";
    }
    else if (url.includes("git.savannah.gnu.org")) {
        return url;
    }
    else if (url.includes("codeberg.org")) {
        return url + ".git";
    }
    else {
        return url;
    }
}



async function getOrigin(url) {
    console.log(url);
    url = convertUrl(url);
    console.log(url);
    console.log(visited);
    // check if the url is already in the list of visited websites
    const found = visited.found.find(website => website.url === url);
    const notFound = visited.notFound.find(website => website.url === url);
    // find url in visited.found
    console.log(found);
    console.log(notFound);


    if (found) {
        console.log("found in visited, and archived");
        chrome.action.setBadgeText({ text: "." });
        chrome.action.setBadgeBackgroundColor({ color: '#0F0' }, () => {
            // callback
        });
    }
    else if (notFound) {
        console.log("found in visited, but not archived");
        chrome.action.setBadgeText({ text: "!" });
        chrome.action.setBadgeBackgroundColor({ color: '#F00' }, () => {
            // callback
        });
    }
    else {
        console.log("not found in visited");

        const res = await fetch(`https://archive.softwareheritage.org/api/1/origin/${url}/get`);

        // check if the response is ok
        if (res.ok) {
            const record = await res.json();
            console.log(record);
            visited.found.push(record);
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
            visited.notFound.push({ url: url, status: res.status });
        }
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
