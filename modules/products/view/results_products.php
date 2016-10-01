<?php


	debugPHP($_POST);

	debugPHP($_SESSION);

	foreach ($_SESSION as $indice => $valor){
		if($indice==="category"){
			echo "<br>Category:<br>";
			$category = $_SESSION["category"];
			foreach ($category as $indice => $valor)
				echo "$indice: $valor<br>";
		}else{
			echo "$indice : $valor<br>";
		}
	}
