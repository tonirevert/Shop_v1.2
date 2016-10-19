<?php
session_start();
include ($_SERVER['DOCUMENT_ROOT'] . "/shop_arevert/modules/products/utils/functions_products.inc.php");
include ($_SERVER['DOCUMENT_ROOT'] . "/shop_arevert/utils/upload.php");
include ($_SERVER['DOCUMENT_ROOT'] . "/shop_arevert/utils/common.inc.php");


if ((isset($_GET["upload"])) && ($_GET["upload"] == true)){

  $result_prodpic = upload_files();
  $_SESSION['result_prodpic'] = $result_prodpic;
    //echo json_encode($result_prodpic);
}

if ((isset($_POST['alta_products_json']))) {
    alta_products();
}

function alta_products(){
  $jsondata = array();
  $producstJSON = json_decode($_POST["alta_products_json"], true);
  $result= validate_products($producstJSON);

  if (empty($_SESSION['result_prodpic'])){
      $_SESSION['result_prodpic'] = array('result' => true, 'error' => "", "data" => "/shop_arevert/media/default-prodpic.png");
  }

  $result_prodpic = $_SESSION['result_prodpic'];

  if(($result['result']) && ($result_prodpic['result'])) {
      $arrArgument = array(
        'prodname' => $result['data']['prodname'],
        'prodref' => $result['data']['prodref'],
        'prodprice' => $result['data']['prodprice'],
        'date_reception' => $result['data']['date_reception'],
        'date_expiration' => $result['data']['date_expiration'],
        'category' => $result['data']['category'],
        'packaging' => $result['data']['packaging'],
        'country' => $result['data']['country'],
        'province' => $result['data']['province'],
        'city' => $result['data']['city'],
        'proddesc' => $result['data']['proddesc'],
        'prodpic' => $result_prodpic['data']
      );
      //$arrValue=true;

      $arrValue = false;
      $path_model = $_SERVER['DOCUMENT_ROOT'] . '/shop_arevert/modules/products/model/model/';
      $arrValue = loadModel($path_model, "products_model", "create_product", $arrArgument);
      //echo json_encode($arrValue);
      //die();

      if ($arrValue){
          $message = "Product has been successfull registered";
      }else{
          $message = "Problem ocurred registering a porduct";
      }



      $_SESSION['product'] = $arrArgument;
      $_SESSION['message'] = $message;
      $callback="index.php?module=products&view=results_products";

      $jsondata['success'] = true;
      $jsondata['redirect'] = $callback;
      echo json_encode($jsondata);
      exit;
  }else{
    $jsondata['success'] = false;
    $jsondata['error'] = $result['error'];
    $jsondata['error_prodpic'] = $result_prodpic['error'];

    $jsondata['success1'] = false;
    if ($result_prodpic['result']) {
        $jsondata['success1'] = true;
        $jsondata['prodpic'] = $result_prodpic['data'];
    }
    header('HTTP/1.0 400 Bad error');
    echo json_encode($jsondata);
  }//End else
}//End alta products

if ((isset($_GET["delete"])) && ($_GET["delete"] == true)){
    //echo json_encode("Hello world from delete in controller_products.class.php");
    $_SESSION['result_prodpic'] = array();
    $result = remove_files();
    if($result === true){
      echo json_encode(array("res" => true));
    }else{
      echo json_encode(array("res" => false));
    }
    //echo json_decode($result);
}


//////////////////////////////////////////////////////////////// load
if (isset($_GET["load"]) && $_GET["load"] == true) {
    $jsondata = array();
    if (isset($_SESSION['product'])) {
        //echo debug($_SESSION['user']);
        $jsondata["product"] = $_SESSION['product'];

    }
    if (isset($_SESSION['message'])) {
        //echo $_SESSION['msje'];
        $jsondata["message"] = $_SESSION['message'];
    }
    close_session();
    echo json_encode($jsondata);
    exit;
}

function close_session() {
    unset($_SESSION['product']);
    unset($_SESSION['message']);
    $_SESSION = array(); // Destruye todas las variables de la sesión
    session_destroy(); // Destruye la sesión
}

/////////////////////////////////////////////////// load_data
if ((isset($_GET["load_data"])) && ($_GET["load_data"] == true)) {
    $jsondata = array();

    if (isset($_SESSION['product'])) {
        $jsondata["product"] = $_SESSION['product'];
        echo json_encode($jsondata);
        exit;
    } else {
        $jsondata["product"] = "";
        echo json_encode($jsondata);
        exit;
    }
}

/////////////////////////////////////////////////// load_country
if(  (isset($_GET["load_country"])) && ($_GET["load_country"] == true)  ){
		    $json = array();

    	$url = 'http://www.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfCountryNamesByName/JSON';

		$path_model=$_SERVER['DOCUMENT_ROOT'] . '/shop_arevert/modules/products/model/model/';
		$json = loadModel($path_model, "products_model", "obtain_countries", $url);

		if($json){
			echo $json;
			exit;
		}else{
			$json = "error";
			echo $json;
			exit;
		}
	}

/////////////////////////////////////////////////// load_provinces
if(  (isset($_GET["load_provinces"])) && ($_GET["load_provinces"] == true)  ){
    		$jsondata = array();
        $json = array();

		$path_model=$_SERVER['DOCUMENT_ROOT'] . '/shop_arevert/modules/products/model/model/';
		$json = loadModel($path_model, "products_model", "obtain_provinces");

		if($json){
			$jsondata["provinces"] = $json;
			echo json_encode($jsondata);
			exit;
		}else{
			$jsondata["provinces"] = "error";
			echo json_encode($jsondata);
			exit;
		}
	}
/////////////////////////////////////////////////// load_cities
if(  isset($_POST['idPoblac']) ){
	      $jsondata = array();
        $json = array();

		$path_model=$_SERVER['DOCUMENT_ROOT'] . '/shop_arevert/modules/products/model/model/';
		$json = loadModel($path_model, "products_model", "obtain_cities", $_POST['idPoblac']);

		if($json){
			$jsondata["cities"] = $json;
			echo json_encode($jsondata);
			exit;
		}else{
			$jsondata["cities"] = "error";
			echo json_encode($jsondata);
			exit;
		}
	}
