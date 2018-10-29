/*
File: consume.js
Description: Consume web service
Author: Albin Rönnkvist
*/

"use strict";



/*
Main URL
*/
var URL = "https://albinronnkvist.se/dt173g/projekt/webbtjanst/playerstats.php/spelare";



/*
Elements
*/
// Get element "poangliga"
var poangligaEL = document.getElementById("poangliga");

// Get element "currentplayer"
var currentPlayerEL = document.getElementById("currentplayer");



/*
AJAX-requests
*/
// GET-method - show players on DOM onload
document.addEventListener("DOMContentLoaded", function() { 

  // Get name of current html-page
  var path = window.location.pathname;
  var page = path.split("/").pop();

  // Display different outcome for different html-pages
  switch(page) {  

    //
    // Index-page
    case "index.html":

        // Get players
        // AJAX-request, GET
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
              if (xmlhttp.status == 200) {
      
                    var jsonData = JSON.parse( xmlhttp.responseText );
                    for(var i=0; i < jsonData.length; i++){
                      var number = 1 + i;
                      poangligaEL.innerHTML += "<tr><td>" + number + "</td><td>" + jsonData[i].Fullname + "</td><td>" + jsonData[i].Team + "</td><td>" + jsonData[i].Goals + "</td><td>" + jsonData[i].Assists + "</td><td>" + jsonData[i].Points + "</td></tr>";    
                    }
              }
              else if (xmlhttp.status == 400) {
                alert("OBS! Något gick fel, försök igen senare. (Error 400)");
              }
              else {
                  alert("OBS! Något gick fel, försök igen senare. (Error: något annat än 200 returnerades)");
              }
            }
        };
      
        xmlhttp.open("GET", URL, true);
        xmlhttp.send();
      break;



    //
    // Create-page
    case "create.html":

        // Create new player
        document.getElementById("createplayer").addEventListener("click", function(){

          // Form inputs
          // Fullname, uppercase first letters
          var cfullname = document.getElementById("cfullname").value;
          cfullname = cfullname.replace(/[^-'\s]+/g, function(word) {
            return word.replace(/^./, function(first) {
              return first.toUpperCase();
            });
          });

          // Team
          var cteam = document.getElementById("cteam").value;
          
          // Goals
          var cgoals = document.getElementById("cgoals").value;

          // Assists
          var cassists = document.getElementById("cassists").value;

          // Points
          var cpoints = +cgoals + +cassists;



          // Check if fullname-input is empty
          if (cfullname==null || cfullname=="" || cfullname.length==0) {
            alert("OBS! Du måste fylla i ett namn.");
            return false;
          }
          // Prepare and send the request
          else {
            // Request body
            var json = {"fullname":cfullname,"team":cteam,"goals":cgoals,"assists":cassists,"points":cpoints};

            // AJAX-request, POST
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", URL, true);
            xmlhttp.setRequestHeader('Content-Type', 'application/json');
            xmlhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                document.getElementById("myModal").style.display = "block";
                document.getElementById("modal-text").style.color = "#4BB543";
                document.getElementById("modal-text").innerHTML += "<i class='far fa-check-circle'></i><br><br>Användare skapad!<br><br><br>";
                // When the user clicks on OK, close the modal
                document.getElementById("close").addEventListener("click", function(){
                  location.reload();
                });
              }
            };
            xmlhttp.send(JSON.stringify(json));
          }
        });
      break;
    


    //
    // Edit-page
    case "edit.html":

        // Delete player
        poangligaEL.addEventListener("click", function(ev) {
          if (ev.target.classList.contains("deletebutton")) {
            
            // AJAX-request, DELETE
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("DELETE", URL+"/"+ev.target.id, true);
            xmlhttp.send();

            // Reload page
            xmlhttp.onload = function() {
                location.reload();
            }
          }
        });



        // Get players + edit-buttons and delete-buttons
        // AJAX-request, GET
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
              if (xmlhttp.status == 200) {
      
                var jsonData = JSON.parse( xmlhttp.responseText );
                for(var i=0; i < jsonData.length; i++){
                  poangligaEL.innerHTML += "<tr><td>" + jsonData[i].Fullname + "</td><td>" + jsonData[i].Team + "</td><td><a class='button' href='edit-player.html?playerid="+jsonData[i].id+"' title='Redigera "+jsonData[i].Fullname+"'><i class='far fa-edit'></i></a></td><td><a class='deletebutton' id='"+jsonData[i].id+"' title='Radera "+jsonData[i].Fullname+"'><i class='fas fa-trash-alt'></i></a></td></tr>";    
                }
              }
              else if (xmlhttp.status == 400) {
                alert("OBS! Något gick fel, försök igen senare. (Error 400)");
              }
              else {
                  alert("OBS! Något gick fel, försök igen senare. (Error: något annat än 200 returnerades)");
              }
            }
        };
      
        xmlhttp.open("GET", URL, true);
        xmlhttp.send();
      break;



    //
    // Edit-player-page
    case "edit-player.html":

      // Get playerid from URL(not supported in IE)
      // var urlParams = new URLSearchParams(location.search);
      // var getid = urlParams.get('playerid');
      // Bad temporary solution
      var getid = location.search.substring(10);


      // Get single player
      // AJAX-request, GET
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
            if (xmlhttp.status == 200) {
    
                  var jsonData = JSON.parse( xmlhttp.responseText );
                  for(var i=0; i < jsonData.length; i++){

                    // Name in title
                    currentPlayerEL.innerHTML += " " + "<b>" + jsonData[i].Fullname + "</b>";

                    // Form inputs
                    // Fullname
                    document.getElementById('ufullname').value = jsonData[i].Fullname;

                    // Team
                    var teamsEL = document.getElementById('uteam');
                    var opt = document.createElement('option');
                    opt.value = jsonData[i].Team;
                    opt.text = jsonData[i].Team;
                    teamsEL.add(opt, teamsEL[0]);
                    teamsEL.selectedIndex = "0";

                    // Goals
                    document.getElementById('ugoals').value = jsonData[i].Goals;

                    // Assists
                    document.getElementById('uassists').value = jsonData[i].Assists;
                  }
            }
            else if (xmlhttp.status == 400) {
                alert("OBS! Något gick fel, försök igen senare. (Error 400)");
            }
            else {
                alert("OBS! Något gick fel, försök igen senare. (Error: något annat än 200 returnerades)");
            }
          }
      };
      xmlhttp.open("GET", URL+"/"+getid, true);
      xmlhttp.send();



      // Update player
      document.getElementById("updateplayer").addEventListener("click", function(){

        // Form inputs
        // Fullname, uppercase first letters
        var ufullname = document.getElementById("ufullname").value;
        ufullname = ufullname.replace(/[^-'\s]+/g, function(word) {
          return word.replace(/^./, function(first) {
            return first.toUpperCase();
          });
        });

        // Team
        var uteam = document.getElementById("uteam").value;
        
        // Goals
        var ugoals = document.getElementById("ugoals").value;

        // Assists
        var uassists = document.getElementById("uassists").value;

        // Points
        var upoints = +ugoals + +uassists;



        // Check if fullname-input is empty
        if (ufullname==null || ufullname=="" || ufullname.length==0) {
          alert("OBS! Du måste fylla i ett namn.");
          return false;
        }
        // Prepare and send the request
        else {
          // Request body
          var json = {"fullname":ufullname,"team":uteam,"goals":ugoals,"assists":uassists,"points":upoints};

          // AJAX-request, PUT
          var xmlhttp = new XMLHttpRequest();
          xmlhttp.open("PUT", URL+"/"+getid, true);
          xmlhttp.setRequestHeader('Content-Type', 'application/json');
          xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              document.getElementById("myModal").style.display = "block";
              document.getElementById("modal-text").style.color = "#4BB543";
              document.getElementById("modal-text").innerHTML += "<i class='far fa-check-circle'></i><br><br>Användare uppdaterad!<br><br><br>";
              // When the user clicks on OK, close the modal
              document.getElementById("close").addEventListener("click", function(){
                location.reload();
              });
            }
          };
          xmlhttp.send(JSON.stringify(json));
        }
      });
    break;
  } // End of switch statement
}); // End of document.onload-function