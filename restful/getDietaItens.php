<?php
include "connection.php";
    
    $CliCod = $_GET['id'];

    $sql  = "SELECT * FROM dietas WHERE CliCod = '$CliCod' ";

    $stmt = $dbh->prepare($sql);

    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if($result){

        $sql  = "SELECT * FROM dietasitens inner join alimentos on alimentos.AliCod = dietasitens.AliCod WHERE DieCod = " . $result['DieCod'];

        $stmt = $dbh->prepare($sql);

        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

	    $json = json_encode($result, JSON_UNESCAPED_UNICODE);

	    echo $json;

    } else {
    	echo "";
    }

