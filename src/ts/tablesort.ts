/*
File: tablesort.ts
Description: sort table by goals, assists or points
Author: Albin Rönnkvist
*/
"use strict";



// Sort table
// Sort table by goals
function sortByGoals() {
    // Get th-element
    let th = document.getElementById("th-goals");
    // Get table
    let table, rows, switching, i, x, y, shouldSwitch;
    table = <HTMLTableElement>document.getElementById("poangliga");

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
    let th = document.getElementById("th-assists");
    // Get table
    let table, rows, switching, i, x, y, shouldSwitch;
    table = <HTMLTableElement>document.getElementById("poangliga");

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
    let th = document.getElementById("th-points");
    // Get table
    let table, rows, switching, i, x, y, shouldSwitch;
    table = <HTMLTableElement>document.getElementById("poangliga");

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