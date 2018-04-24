<?php
	include "connection.php";
	$json = file_get_contents('php://input');
    $obj_php = json_decode($json);

    $ItensDietaValue = Array();
    $string = '';
    $DieCod = null;

    $sql = "SELECT * FROM dietas WHERE CliCod =  " . $obj_php[0]->CliCod;

    $stmt = $dbh->prepare($sql);

    $res = $stmt->execute();

    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if($res) {
    	
    	$DieCod = $res[0]['DieCod'];

    	for ($i=0; $i < count($obj_php); $i++)
    		$ItensComandaValues[] = "(" . $DieCod. ',' . $obj_php[$i]->AliCod . ',' . $obj_php[$i]->qtd . ", '" . $obj_php[$i]->horario . "', '" . $obj_php[$i]->obs . "')";

        $values = implode(", ", $ItensComandaValues);

        $sql = "INSERT INTO dietasitens (DieCod, AliCod, DieIteQtd, DieIteHor, DieIteObs) VALUES ".utf8_decode($values);
        echo $sql;
        $stmt = $dbh->prepare($sql);

        if($stmt->execute())
            echo "Executado!";
        else
        	echo "Erro ao cadastrar a itens dieta.";

    } else {

    	// SQL para inserir na tabela dieta
	    $sql = "INSERT INTO dietas (CliCod, DieDes) VALUES (". $obj_php[0]->CliCod .", 'Dieta do cliente' )";
	    $stmt = $dbh->prepare($sql);
	    // var_dump($obj_php); exit(); 
	    try { 


	        $dbh->beginTransaction(); 
	        
	        $stmt->execute();
	        
	        $DieCod = $dbh->lastInsertId(); 

	        for ($i=0; $i < count($obj_php); $i++)
	    		$ItensComandaValues[] = "(" . $DieCod. ',' . $obj_php[$i]->AliCod . ',' . $obj_php[$i]->qtd . ", '10:00')";

	        $values = implode(", ", $ItensComandaValues);

	        $sql = "INSERT INTO dietasitens (DieCod, AliCod, DieIteQtd, DieIteHor) VALUES ".utf8_decode($values);
	        echo $sql;
	        $stmt = $dbh->prepare($sql);

	        if($stmt->execute())
	            echo "Executado!";
	        else
	        	echo "Erro ao cadastrar a dieta.";
	        
	        $dbh->commit(); 

	    } catch(PDOExecption $e) { 

	        $dbh->rollback(); 
	        echo "Error!: " . $e->getMessage() . "</br>"; 
	    } 

    }

    