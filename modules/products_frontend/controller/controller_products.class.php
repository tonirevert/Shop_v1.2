<?php

//include  with absolute route
$path = $_SERVER['DOCUMENT_ROOT'] . '/shop_arevert/';
include($path . 'modules/products_frontend/utils/utils.inc.php');
//define('SITE_ROOT', $path);
include $path . 'paths.php';
include $path . 'classes/Log.class.singleton.php';
include $path . 'utils/common.inc.php';
include $path . 'utils/filters.inc.php';
include $path . 'utils/response_code.inc.php';

$_SESSION['module'] = "products_frontend";

if ((isset($_GET["autocomplete"])) && ($_GET["autocomplete"] === "true")){

    set_error_handler('ErrorHandler');
    $model_path = SITE_ROOT . 'modules/products_frontend/model/model/';
    try{
        $nameProducts = loadModel($model_path, "products_model", "select_column_products", "prodname");
    }catch(Exception $e){
        showErrorPage(2, "ERROR - 503 DB", 'HTTP/1.0 503 Service Unavailable', 503);
    }
    restore_error_handler();

    if($nameProducts){
        $jsondata["name_products"] = $nameProducts;
        echo json_encode($jsondata);
        exit;
    }else{
        showErrorPage(2, "ERROR - 404 NO DATA", 'HTTP/1.0 404 Not Found', 404);
    }

}//End autocomplete

if(isset($_GET["name_products"])){

  $result = filter_string($_GET["name_products"]);
  if($result['result']){
      $criteria = $result['data'];
  }else{
      $criteria = ' ';
  }
  $model_path = SITE_ROOT . 'modules/products_frontend/model/model/';
  set_error_handler('ErrorHandler');
  try{
      $arrArgument = array(
          "column" => "prodname",
          "like" => $criteria
      );
      $product = loadModel($model_path, "products_model", "select_like_products", $arrArgument);
  }catch(Exception $e){
      showErrorPage(2, "ERROR - 503 BD", 'HTTP/1.0 503 Service Unavailable', 503);
  }
  restore_error_handler();

  if($product){
    $jsondata["product_autocomplete"] = $product;
    echo json_encode($jsondata);
    exit;
  }else{
    showErrorPage(2, "ERROR - 404 NO DATA", 'HTTP/1.0 404 Not Found', 404);
  }
}//End name product

if(isset($_GET["count_products"])){
    $result = filter_string($_GET["count_products"]);
    if($result['result']){
        $criteria = $result['data'];
    }else{
        $criteria = '';
    }
    $model_path = SITE_ROOT . 'modules/products_frontend/model/model/';
    set_error_handler('ErrorHandler');
    try{
        $arrArgument = array(
            "column" => "prodname",
            "like" => $criteria
        );
        $total_rows = loadModel($model_path, "products_model", "count_like_products", $arrArgument);
    }catch(Exception $e){
        $showErrorPage(2, "ERROR - 503 BD", 'HTTP/1.0 503 Service Unavailable', 503);
    }
    restore_error_handler();

    if($total_rows){
        $jsondata["num_products"] = $total_rows[0]["total"];
        echo json_encode($jsondata);
        exit;
    }else{
        showErrorPage(2, "ERROR - 404 NO DATA", 'HTTP/1.0 404 Not Found', 404);
    }
}//End count products

//obtain num total pages
if ((isset($_GET["num_pages"])) && ($_GET["num_pages"] === "true")) {

    if(isset($_GET["keyword"])){
        $result = filter_string($_GET["keyword"]);
        if($result['result']){
            $criteria = $result['data'];
        }else{
            $criteria = ' ';
        }
    }else{
        $criteria = ' ';
    }

    $item_per_page = 6;
    $path_model = SITE_ROOT . 'modules/products_frontend/model/model/';

    //change work error apache
    set_error_handler('ErrorHandler');

    try {

        $arrArgument = array(
            "column" => "prodname",
            "like" => $criteria
        );

        $arrValue = loadModel($path_model, "products_model", "count_like_products", $arrArgument);
        $get_total_rows = $arrValue[0]["total"]; //total records
        $pages = ceil($get_total_rows / $item_per_page); //break total records into pages
    } catch (Exception $e) {
        showErrorPage(2, "ERROR - 503 BD", 'HTTP/1.0 503 Service Unavailable', 503);
    }

    //change to defualt work error apache
    restore_error_handler();

    if ($get_total_rows) {
        $jsondata["pages"] = $pages;
        echo json_encode($jsondata);
        exit;
    } else {
        showErrorPage(2, "ERROR - 404 NO DATA", 'HTTP/1.0 404 Not Found', 404);
    }

}//End num_pages

if ((isset($_GET["view_error"])) && ($_GET["view_error"] === "true")) {
    showErrorPage(0, "ERROR - 503 BD Unavailable", 503);
}
if ((isset($_GET["view_error"])) && ($_GET["view_error"] === "false")) {
    showErrorPage(3, "RESULTS NOT FOUND <br> Please, check over if you misspelled any letter of the search word");
}


if (isset($_GET["idProduct"])) {

    //filter if idProduct is a number
    $result = filter_num_int($_GET["idProduct"]);
    if ($result['result']) {
        $id = $result['data'];
    } else {
        $id = 1;
    }

    set_error_handler('ErrorHandler');
    try {
        $arrValue = null;
        $path_model = SITE_ROOT . 'modules/products_frontend/model/model/';
        $arrValue = loadModel($path_model, "products_model", "details_products", $id);

    } catch (Exception $e) {
        showErrorPage(2, "ERROR - 503 BD", 'HTTP/1.0 503 Service Unavailable', 503);
    }
    restore_error_handler();

    if ($arrValue) {
        $jsondata["product"] = $arrValue[0];
	      echo json_encode($jsondata);
        exit;
    } else {
        showErrorPage(2, "ERROR - 404 NO DATA", 'HTTP/1.0 404 Not Found', 404);
    }
} else {

    if (isset($_POST["page_num"])) {
        $result = filter_num_int($_POST["page_num"]);
        if ($result['result']) {
            $page_number = $result['data'];
        }
    } else {
        $page_number = 1;
    }

    $item_per_page = 6;

    if(isset($_GET["keyword"])){
        $result = filter_string($_GET["keyword"]);
        if($result['result']){
            $criteria = $result['data'];
        }else{
            $criteria = '';
        }
    }else{
        $criteria = '';
    }

    if(isset($_POST["keyword"])){
        $result = filter_string($_POST["keyword"]);
        if($result['result']){
            $criteria = $result['data'];
        }else{
            $criteria = '';
        }
    }

    $position = (($page_number - 1) * $item_per_page);
    $model_path = SITE_ROOT . 'modules/products_frontend/model/model/';
    $limit = $item_per_page;
    $arrArgument = array(
        "column" => "prodname",
        "like" => $criteria,
        "position" => $position,
        "limit" => $limit
    );///////////////////////////////////////////////////////////////////////////////HASTA AQUI

    set_error_handler('ErrorHandler');
    try {

        $path_model = SITE_ROOT . 'modules/products_frontend/model/model/';
        $arrValue = loadModel($path_model, "products_model", "select_like_limit_products", $arrArgument);

    } catch (Exception $e) {
        showErrorPage(0, "ERROR - 503 BD Unavailable", 503);
    }
    restore_error_handler();

    if ($arrValue) {
        paint_template_products($arrValue);
    } else {
        showErrorPage(0, "ERROR - 404 NO PRODUCTS",404);
    }
}//End else num_pages
