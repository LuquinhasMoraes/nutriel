<?php
	header("Content-Type: text/html; charset=UTF-8",true);
	header("access-control-allow-origin: *");
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
	header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $hostname = "localhost";
    $dbname = "nutriel";

	$DBConn="DRIVER={SQL Server};SERVER=$hostname;DATABASE=$dbname;charset=UTF8";
	$DBUsername="root";
	$DBPswd="";
	
	// $hostname = "mysql.hostinger.com.br";
 //    $dbname = "u652169297_nutri";

	// $DBConn="DRIVER={SQL Server};SERVER=$hostname;DATABASE=$dbname;charset=UTF8";
	// $DBUsername="u652169297_lucas";
	// $DBPswd="nutriel123";


	try {
	    $dbh = new PDO("mysql:dbname=$dbname;host=$hostname;charset=UTF8", $DBUsername, $DBPswd);
	}
	catch (PDOException $e){
    	echo $e->getMessage();
    }
