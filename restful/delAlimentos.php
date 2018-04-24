<?php
    include "connection.php";
    
    $id = $_GET['id'];

    $sql  = "DELETE FROM alimentos WHERE AliCod = $id";

    $stmt = $dbh->prepare($sql);

    $result = $stmt->execute();

    if($result)
        echo "OK";
