<?php
    include "connection.php";
    
    header("Content-type: text/html; charset=utf-8");
    $json = file_get_contents('php://input');
    $obj_php = json_decode($json);

    $obj_php = $obj_php[0];

    // var_dump($obj_php);
    // exit();

    $sql = "UPDATE clientes SET CliLog = '" . $obj_php->CliLog . "', CliSen = '" . $obj_php->CliSen . "', CliNom = '" . $obj_php->CliNom . "' , CliCpf = '$obj_php->CliCpf', CliGen = '$obj_php->CliGen', CliEma = '$obj_php->CliEma', CliTel = '$obj_php->CliTel', CliDatNas = '". $obj_php->CliDatNas . "', CliAlt = '$obj_php->CliAlt', CliPes = '$obj_php->CliPes', CliQua = '$obj_php->CliQua', CliCin = '$obj_php->CliCin' WHERE CliCod = '$obj_php->CliCod'";
    // echo $sql;
    // exit;
    $stmt = $dbh->prepare($sql);
    if($stmt->execute())
    {
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $json = json_encode($result);
        echo $json;
    }
    else 
        echo "Houve um erro na instrução SQL.";



