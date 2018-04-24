<?php
    include "connection.php";
    $json = file_get_contents('php://input');
    $obj_php = json_decode($json);

    $sql = "INSERT INTO alimentos ( AliDes, AliTip, AliKca, AliPro, AliGor, AliCol, AliFib, AliAgu, AliVitD, AliVitC, AliVitB6, AliVitB12, AliTotHc) VALUES ('" . $obj_php->descricao . "', '$obj_php->tipo', '$obj_php->kcal', '$obj_php->proteinas', '$obj_php->gorduras', '$obj_php->colesterol', '$obj_php->fibra', '$obj_php->agua', '$obj_php->vitD', '$obj_php->vitC', '$obj_php->vitB6', '$obj_php->vitB12', '$obj_php->totHc' ) ";
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



