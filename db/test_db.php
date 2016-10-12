<?php

        $host = "127.0.0.1";
    		$user = "tonirevert";
    		$pass = "";
    		$db = "shop_arevert";
    		$port = 3306;
    		$tabla="mensajes";

    		$conexion = mysqli_connect($host, $user, $pass, $db, $port)or die(mysql_error());
		/*	$sql = "create database shop";
			$res = mysqli_query($conexion, $sql);
			print_r($res);

			$sql = "use shop";
			$res = mysqli_query($conexion, $sql);
			print_r($res);
*/
      $sql = "INSERT INTO products (prodname, prodref, prodprice, date_reception,"
        . " date_expiration, packaging, country, province, city, proddesc,"
        . " prodpic, cat1, cat2, cat3, cat4) VALUES ('Taurus2000', '12345678',"
        . " '200', '01/10/2016', '24/05/2017', '1', "
        . " '0', '0', '0', '0', 'Spain', 'Valencia',"
        . " 'Ontinyent', 'Descripción de prueba', 'ruta_imagen')";
			$res = mysqli_query($conexion, $sql);
			print_r($res);
/*
			$sql = "select * from mensajes";
			$result = mysqli_query($conexion, $sql);
			while ($row = mysqli_fetch_assoc($result)) {
        		$cad .= "Nombre: " . $row['nombre'] . " Email: " . $row['email']. "<br>";
        		$cad .= "Asunto: " . $row['asunto'] . " Msje: " . $row['mensaje']. "<br>";
    		}
*/
			mysqli_close($conexion);
			//print_r($cad);
