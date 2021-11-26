<?php
/*
Player statistics, Web Service
Author: Albin Rönnkvist
*/

/*
URI: https://albinronnkvist.se/skola/dt173g/projekt/webbtjanst/playerstats.php/spelare

------------------------------------------------------------------------------------------------------------------
| id (int, AI, PRIMARY KEY) | name (varchar(64)) | team (varchar(64)) | goal (int) | assist (int) | points (int) |
------------------------------------------------------------------------------------------------------------------

POST            Creates a new resource.
GET             Retrieves a resource.
PUT             Updates an existing resource.
DELETE          Deletes a resource.
*/


    /*
    Figure out what is being requested
    */

    // Get request method, path and input data of the request
    $method = $_SERVER['REQUEST_METHOD'];
    $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
    $input = json_decode(file_get_contents('php://input'),true);

    if($request[0] != "spelare"){ 
        http_response_code(404);
        exit();
    }

    

    /*
    Connect to database
    */

    // Send return header information
    header("Content-Type: application/json; charset=UTF-8");

    // Database connection
    $conn = mysqli_connect("DBHOST","DBUSER","DBPASS","DBDATABASE") or die("Error connecting to database.");
    $db_connected = mysqli_select_db($conn, "DBDATABASE");
    mysqli_set_charset($conn, 'utf8');



    /*
    Request methods
    */

    // HTTP method implementations of GET, POST, PUT and DELETE
    switch ($method){
        case "GET":
            $sql = "SELECT id, Fullname, Team, Goals, Assists, Points FROM spelare";
            if(isset($request[1])) $sql = $sql . " WHERE id = " . $request[1] . ";";
            if(!isset($request[1])) $sql = $sql . " ORDER BY Points DESC" . ";";
            break;
        case "PUT":
            $sql = "UPDATE spelare SET Fullname = '" . $input['fullname'] . "', Team = '" . $input['team'] . "', Goals = '" . $input['goals'] . "', Assists = '" . $input['assists'] . "', Points = '" . $input['points'] . "'  WHERE id = " . $request[1] . ";";
            break;
        case "POST":
            $sql = "INSERT INTO spelare (Fullname, Team, Goals, Assists, Points) VALUES ('" . $input['fullname'] . "', '" . $input['team'] . "', '" . $input['goals'] . "', '" . $input['assists'] . "', '" . $input['points'] . "');";
            break;

        case "DELETE":
            $sql = "DELETE FROM spelare WHERE id = " . $request[1] . ";";
            break;
    }

    

    /*
    Response message
    */
    
    // Database-query
    $result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

    // Always response with json array of spelare except for GET /spelare/id
	$harr = [];
    if($method != "GET") $sql = "SELECT id, Fullname, Team, Goals, Assists, Points FROM spelare";
    $result = mysqli_query($conn,$sql) or die(mysqli_error($conn));
    while($row = mysqli_fetch_assoc($result)){
        $row_arr['id'] = $row['id'];
        $row_arr['Fullname'] = $row['Fullname'];
        $row_arr['Team'] = $row['Team'];
        $row_arr['Goals'] = $row['Goals'];
        $row_arr['Assists'] = $row['Assists'];
        $row_arr['Points'] = $row['Points'];
        array_push($harr,$row_arr);
	}
	mysqli_close($conn);
	
	echo json_encode($harr);
?>