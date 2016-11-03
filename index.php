<?php
//I use this to avoid header problems
ob_start();
session_start();
$_SESSION['module'] = "";
$_SESSION['result_prodpic'] = array();
require_once("view/inc/header.php");
require_once("view/inc/menu.php");
require_once("paths.php");

if (PRODUCTION){ //WE ARE IN PRODUCTION
    ini_set('display_errors', '1');
    ini_set('error_reporting', E_ERROR | E_WARNING | E_NOTICE);
}else{
    ini_set('display_errors', '0');
    ini_set('error_reporting', '0');
}

include ('utils/utils.inc.php');

if (!isset($_GET['module'])){
    require_once("modules/main/controller/controller_main.class.php");
} else if((isset($_GET['module'])) && (!isset($_GET['view']))){
    require_once("modules/".$_GET['module']."/controller/controller_" .$_GET['module']. ".class.php");
}

if ( (isset($_GET['module'])) && (isset($_GET['view'])) ){
    require_once("modules/".$_GET['module']."/view/".$_GET['view'].".php");
}

require_once("view/inc/footer.html");
