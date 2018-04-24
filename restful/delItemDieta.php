<?php
include "connection.php";
    
    $id = $_GET['id'];

    $sql  = "DELETE FROM dietasitens WHERE DieIteCod = $id";

    $stmt = $dbh->prepare($sql);

    $result = $stmt->execute();

    if($result)
        echo "OK";
