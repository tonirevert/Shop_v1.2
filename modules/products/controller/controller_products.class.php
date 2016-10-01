<?php

session_start();
include ($_SERVER['DOCUMENT_ROOT'] . "/01_shop_v1.2/modules/products/utils/functions_products.inc.php");
include ($_SERVER['DOCUMENT_ROOT'] . "/01_shop_v1.2/utils/upload.php");
//include 'modules/products/utils/functions_products.inc.php';
//include 'utils/upload.php';

if ((isset($_GET["upload"])) && ($_GET["upload"] == true)){
  //echo json_encode($_SERVER['DOCUMENT_ROOT'].substr(__FILE__, 0, (strpos(__FILE__, '/'))));
  echo json_encode("Hello world from upload in controller_products php");
  $result_prodpic = upload_files();
  //$_SESSION['result_prodpic'] = $result_prodpic;
    echo json_encode($result_prodpic);
}

if ((isset($_GET["delete"])) && ($_GET["delete"] == true)){
    echo json_encode("Hello world from delete in controller_products.class.php");
    //$_SESSION['result_prodpic'] = array();
    $result = remove_files();
    /*if($result === true){
      echo json_encode(array("res" => true));
    }else{
      echo json_encode(array("res" => false));
    }*/
    echo json_decode($result);
}

/*
  if ($_POST){

      // debugPHP($_POST);
     // exit;

      $result = validate_product();
      //debugPHP($result);
      //exit;

      if($result['result']){

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

          );



      } else {
          $error = $result['error'];
      }
  }//End if $_POST

//include 'modules/products/view/create_products.php';
*/
