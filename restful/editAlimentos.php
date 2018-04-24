<?php
    include "connection.php";
    
    header("Content-type: text/html; charset=utf-8");
    $json = file_get_contents('php://input');
    $obj_php = json_decode($json);

    $obj_php = $obj_php[0];

    // var_dump($obj_php);
    // exit();

    $sql = "UPDATE alimentos SET AliDes = '" . $obj_php->AliDes . "' , AliTip = '$obj_php->AliTip', AliKca = '$obj_php->AliKca', AliPro = '$obj_php->AliPro', AliGor = '$obj_php->AliGor', AliCol = '$obj_php->AliCol', AliVitD = '$obj_php->AliVitD', AliVitC = '$obj_php->AliVitC', AliVitB6 = '$obj_php->AliVitB6', AliVitB12 = '$obj_php->AliVitB12' , AliTotHc = '$obj_php->AliTotHc' WHERE AliCod = '$obj_php->AliCod'";
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



