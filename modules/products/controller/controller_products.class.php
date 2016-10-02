<?php
session_start();
include ($_SERVER['DOCUMENT_ROOT'] . "/shop_arevert/modules/products/utils/functions_products.inc.php");
include ($_SERVER['DOCUMENT_ROOT'] . "/shop_arevert/utils/upload.php");
//include 'modules/products/utils/functions_products.inc.php';
//include 'utils/upload.php';

if ((isset($_GET["upload"])) && ($_GET["upload"] == true)){
  //echo json_encode("Hello world from upload in controller_products php");
  $result_prodpic = upload_files();
  $_SESSION['result_prodpic'] = $result_prodpic;
    echo json_encode($result_prodpic);
}

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

if ((isset($_POST['alta_products_json']))) {
    alta_products();
}

function alta_products(){
  $jsondata = array();
  $producstJSON = json_decode($_POST["alta_products_json"], true);//Tenia mal el nombre!!!!

  $result= validate_products($producstJSON);

  if (empty($_SESSION['result_prodpic'])){
      $_SESSION['result_prodpic'] = array('result' => true, 'error' => "",
    "data" => 'media/default-prodpic.png');
  }

  $result_prodpic = $_SESSION['result_prodpic'];

  if(($result['result']) && ($result_prodpic['result'])){
      $arrArgument = array(
        'prodname' => $result['data']['prodname'],

        'prodpic' => $result_prodpic['data']
      );
      $message = "Product has been successfull registered";

      $_SESSION['product'] = $arrArgument;
      $_SESSION['message'] = $message;
      $callback="index.php?module=products&view=results_products";

      $jsondata['success'] = true;
      $jsondata['redirect'] = $callback;
      echo json_encode($jsondata);
      exit;
  }else{
    $jsondata["success"] = false;
    $jsondata['error'] = $result['error'];
    $jsondata['error_prodpic'] = $result_prodpic['error'];

    $jsondata['success1'] = false;
    if ($result_prodpic['result']){
        $jsondata['success1'] = true;
        $jsondata['prodpic'] = $result_prodpic['data'];
    }
    header('HTTP/1.0 400 Bad error');
    echo json_encode($jsondata);
  }//End else
}//End alta products


//////////////////////////////////////////////////////////////// load
if (isset($_GET["load"]) && $_GET["load"] == true) {
    $jsondata = array();
    if (isset($_SESSION['user'])) {
        //echo debug($_SESSION['user']);
        $jsondata["user"] = $_SESSION['user'];
    }
    if (isset($_SESSION['msje'])) {
        //echo $_SESSION['msje'];
        $jsondata["msje"] = $_SESSION['msje'];
    }
    close_session();
    echo json_encode($jsondata);
    exit;
}

function close_session() {
    unset($_SESSION['user']);
    unset($_SESSION['msje']);
    $_SESSION = array(); // Destruye todas las variables de la sesión
    session_destroy(); // Destruye la sesión
}
/*
/////////////////////////////////////////////////// load_data
if ((isset($_GET["load_data"])) && ($_GET["load_data"] == true)) {
    $jsondata = array();

    if (isset($_SESSION['user'])) {
        $jsondata["user"] = $_SESSION['user'];
        echo json_encode($jsondata);
        exit;
    } else {
        $jsondata["user"] = "";
        echo json_encode($jsondata);
        exit;
    }
}
*/
