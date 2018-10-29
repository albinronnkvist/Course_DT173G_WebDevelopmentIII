/*
File: menu.js
Description: Toggle and display menu
Author: Albin Rönnkvist
*/



// Variables
var menutoggleEl = document.getElementById("menutoggle");
var mainmenuEl = document.getElementById("mainmenu");



// Toggle menu
function toggle() {
    if (mainmenuEl.style.display === "none") {
        mainmenuEl.style.display = "block";
        menutoggleEl.classList.add("toggleactive");
    } 
    else {
        mainmenuEl.style.display = "none";
        menutoggleEl.classList.remove("toggleactive");
    }
}
menutoggleEl.addEventListener("click", toggle, false);



// Always display links on large screens
if (window.matchMedia("(min-width: 800px)").matches) {
    mainmenuEl.style.display = "block";
} 
else {
    mainmenuEl.style.display = "none";
}



// Show / Hide menu on browser resize
function displaymenu() {
    if (window.matchMedia("(min-width: 800px)").matches) {
        mainmenuEl.style.display = "block";
    } 
    else {
        mainmenuEl.style.display = "none";
        menutoggleEl.classList.remove("toggleactive");
    }
}
window.addEventListener("resize", displaymenu, false);