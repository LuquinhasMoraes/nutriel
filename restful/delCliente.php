<?php
include "connection.php";
    
    $id = $_GET['id'];

    $sql  = "DELETE FROM clientes WHERE CliCod = $id";

    $stmt = $dbh->prepare($sql);

    $result = $stmt->execute();

    if($result)
        echo "OK";
