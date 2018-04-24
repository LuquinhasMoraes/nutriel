<?php
include "connection.php";

    $sql  = "SELECT * FROM alimentos";

    $stmt = $dbh->prepare($sql);

    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // echo $result[2]['CliNom'];
    // exit;

    if($result){
        // foreach ($result as $line) {
        //  $line1[] =  $line;
        // }
        
        $json = json_encode($result, JSON_UNESCAPED_UNICODE );
        echo $json;

    } 

