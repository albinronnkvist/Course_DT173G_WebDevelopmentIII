/*
File: main.js
Description: Main javascript-file for minor scripts
Author: Albin Rönnkvist
*/



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



// Sort table
// Sort table by goals
function sortByGoals() {
    // Get th-element
    var th = document.getElementById("th-goals");
    // Get table
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("poangliga");

    // Remove class from th-assists
    if (document.getElementById("th-assists").classList.contains("active-desc")) {
        document.getElementById("th-assists").classList.remove("active-desc");
    }

    // Don't sort by goals anymore
    if (th.classList.contains("active-desc")) {

        // Remove class
        th.classList.remove("active-desc");
        // Add class to th-points
        document.getElementById("th-points").classList.add("active-desc");

        switching = true;
        while (switching) {

            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {

                shouldSwitch = false;
                // Get the two elements you want to compare, one from current row and one from the next
                x = rows[i].getElementsByTagName("TD")[5];
                y = rows[i + 1].getElementsByTagName("TD")[5];

                // check if the two rows should switch place
                if (Number(x.innerHTML) < Number(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }

    // Sort by goals
    else if (!(th.classList.contains("active-desc"))) {

        // Add class
        th.classList.add("active-desc");
        // Remove class from th-points
        document.getElementById("th-points").classList.remove("active-desc");

        switching = true;
        while (switching) {

            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {

                shouldSwitch = false;
                // Get the two elements you want to compare, one from current row and one from the next
                x = rows[i].getElementsByTagName("TD")[3];
                y = rows[i + 1].getElementsByTagName("TD")[3];

                // check if the two rows should switch place:
                if (Number(x.innerHTML) < Number(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }
}



// Sort table by assists
function sortByAssists() {
    // Get th-element
    var th = document.getElementById("th-assists");
    // Get table
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("poangliga");

    // Remove class from th-goals
    if (document.getElementById("th-goals").classList.contains("active-desc")) {
        document.getElementById("th-goals").classList.remove("active-desc");
    }

    // Don't sort by assists anymore
    if (th.classList.contains("active-desc")) {

        // Remove class
        th.classList.remove("active-desc");
        // Add class to th-points
        document.getElementById("th-points").classList.add("active-desc");

        switching = true;
        while (switching) {

            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                // Get the two elements you want to compare, one from current row and one from the next
                x = rows[i].getElementsByTagName("TD")[5];
                y = rows[i + 1].getElementsByTagName("TD")[5];

                // check if the two rows should switch place:
                if (Number(x.innerHTML) < Number(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }

    // Sort by assists
    else if (!(th.classList.contains("active-desc"))) {

        // Add class
        th.classList.add("active-desc");
        // Remove class from th-points
        document.getElementById("th-points").classList.remove("active-desc");

        switching = true;
        while (switching) {

            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {

                shouldSwitch = false;
                // Get the two elements you want to compare, one from current row and one from the next
                x = rows[i].getElementsByTagName("TD")[4];
                y = rows[i + 1].getElementsByTagName("TD")[4];

                // check if the two rows should switch place:
                if (Number(x.innerHTML) < Number(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }
}



// Sort table by points
function sortByPoints() {
    // Get th-element
    var th = document.getElementById("th-points");
    // Get table
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("poangliga");

    // Remove class from th-goals
    if (document.getElementById("th-goals").classList.contains("active-desc")) {
        document.getElementById("th-goals").classList.remove("active-desc");
    }
    // Remove class from th-points
    if (document.getElementById("th-assists").classList.contains("active-desc")) {
        document.getElementById("th-assists").classList.remove("active-desc");
    }

    // Sort by assists
    if (!(th.classList.contains("active-desc"))) {

        // Add class
        th.classList.add("active-desc");

        switching = true;
        while (switching) {

            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {

                shouldSwitch = false;
                // Get the two elements you want to compare, one from current row and one from the next
                x = rows[i].getElementsByTagName("TD")[5];
                y = rows[i + 1].getElementsByTagName("TD")[5];

                // check if the two rows should switch place:
                if (Number(x.innerHTML) < Number(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }
}