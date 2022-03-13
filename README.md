# Browser Extension for Software Heritage 

### Aim : To provide a browser extension which looks up repositories and checks if they are archieved in Software Heritage initially and then add more features.
<br>


## Installation Instructions
- Clone the repository.
- Open chrome://extensions in the browser.
- Enable the developer mode toggle in top right.
- Press load unpacked extension button.
- Select SH-Extension folder.
- Pin the extension to view icon and label.

***Works for Chrome, and chromium based browsers like brave,edge, etc.***


### Features working right now: 
- Manually click on extension and press try it button to check if it is archieved or not. 
- Automatically checking and small indicator if the website
  - Blue for website does not host repositories.
  - Green if repository currently being viewed is archieved.
  - Red if repository currently being viewed is not archieved.

- ~~Background.js which checks if active url is part of a list of repository webpages.~~ 
- Expanding the links array in background.js and links.json **WIP** 
- Expanding convertUrl function in background.js to make it compatible with all the links in links.json **WIP**
- Added a list of visited websites locally and stored the results (cached) ✅

<br>

### Features to be added in future:
- ~~Find out an exhaustive set of websites which are archieved in Software Heritage.~~ ✅
- Add a simple ui for extension and display the results.
- ~~Figure out a way to reduce api calls and make it more efficient.~~ ✅ 
- Feature to archive new repositories on pressing a button.