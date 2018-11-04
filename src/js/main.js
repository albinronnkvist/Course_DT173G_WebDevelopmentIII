/*
File: main.js
Description: Main javascript-file for minor scripts
Author: Albin Rönnkvist
*/
"use strict";



// Display current year
var currentYear = ((new Date()).getFullYear());
var footerTextEL = document.getElementById("footertext");
footerTextEL.innerHTML += "<i class='far fa-copyright'></i> " + currentYear + " Albin Rönnkvist";



// Loading icon
document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'interactive') {
         document.getElementById('content').style.visibility="hidden";
         document.getElementById('load').style.visibility="hidden";
         //  Show loading icon if page loads for more than 500 ms
         setTimeout(function(){
            document.getElementById('load').style.visibility="visible";
         },500);
    } 
    else if (state == 'complete') {
        setTimeout(function(){
           document.getElementById('interactive');
           document.getElementById('load').style.visibility="hidden";
           document.getElementById('load').style.height="0px";
           document.getElementById('content').style.visibility="visible";
        });
    }
}



// Scroll to top
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("to-top").style.display = "block";
    } else {
        document.getElementById("to-top").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}



// Breadcrumbs
var opencrumbs = document.getElementById("opencrumbs");
if (typeof(opencrumbs) != 'undefined' && opencrumbs != null) {
    opencrumbs.addEventListener("click", function() {
        var crumbsLi = document.getElementsByClassName("crumbschildren");
        for (var i=0; i<crumbsLi.length; i++) {
            if(crumbsLi[i].style.marginLeft != "0px") {
                crumbsLi[i].style.marginLeft = "0" + "px";
            }
            else {
                crumbsLi[i].style.marginLeft = "-50" + "px";
            }
        }
    });
}