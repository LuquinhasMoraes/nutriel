<?php
include "connection.php";
	
	$id = $_GET['id'];

    $sql  = "SELECT * FROM clientes WHERE CliCod = $id";

    $stmt = $dbh->prepare($sql);

    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // foreach ($result as $line) {
    // 	$lineProd[] = array_map('utf8_decode', $line);
    // }

    $json = json_encode($result, JSON_UNESCAPED_UNICODE);

    echo $json;
   