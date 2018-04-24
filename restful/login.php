<?php
include "connection.php";
header("Content-type: text/html; charset=utf-8");
$json = file_get_contents('php://input');
$obj_php = json_decode($json);

    // var_dump($obj_php); exit;

    $usuario    = $obj_php->usuario;
    $senha      = $obj_php->senha;
    $tipo       = $obj_php->tipo == '1' ? 'admin' : 'cliente';

    if($tipo == 'admin'):

        $sql = "SELECT * FROM usuarios WHERE UsuLog = '$usuario' AND UsuSen = '$senha'";
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($result, JSON_UNESCAPED_UNICODE);
        echo $json;
    else:

        $sql = "SELECT * FROM clientes WHERE CliLog = '$usuario' AND CliSen = '$senha'";
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($result, JSON_UNESCAPED_UNICODE);
        echo $json;

    endif;