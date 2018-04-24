<?php
    include "connection.php";
    
    header("Content-type: text/html; charset=utf-8");
    $json = file_get_contents('php://input');
    $obj_php = json_decode($json);

    $sql = "INSERT INTO clientes ( CliLog, CliSen, CliNom, CliCpf, CliGen, CliEma, CliTel, CliDatNas, CliAlt, CliDia, CliPes, CliCol, CliQua, CliBus, CliCin, CliImg) VALUES 
    ('" . $obj_php->login . "', '" . $obj_php->senha . "', '" . $obj_php->nome . "', '$obj_php->cpf', '$obj_php->genero', '$obj_php->email', '$obj_php->tel', '" . $obj_php->nasc . "', '$obj_php->altura', '$obj_php->diabetes', '$obj_php->peso', '$obj_php->colesterol', '$obj_php->quadril', '$obj_php->busto', '$obj_php->cintura', 'img/user.png') ";
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



