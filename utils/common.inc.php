<?php
  function loadModel($model_path, $model_name, $function, $arrArgument = '') {
    $model = $model_path . $model_name . '.class.singleton.php';

    if (file_exists($model)) {
        include_once($model);

        $modelClass = $model_name;

        if (!method_exists($modelClass, $function)) {
            loadView($_SERVER['DOCUMENT_ROOT'] . '/shop_arevert/view/inc', '404.php', $arrPassValue = 'Function not found in Model');
        }

        $obj = $modelClass::getInstance();

        if (isset($arrArgument)) {
            return $obj -> $function($arrArgument);
        }
    } else {
        loadView($_SERVER['DOCUMENT_ROOT'] . '/shop_arevert/view/inc', '404.php', $arrPassValue = 'Model Not Found under Model Folder');
    }
  }

function loadView($rutaVista, $templateName, $arrPassValue = ''){
        $view_path = $rutaVista . $templateName;
        $arrData = '';

        if(file_exists($view_path)){
            if(isset($arrPassValue)){
                $arrData = $arrPassValue;
            }
            include_once($view_path);
        }else{

          $message = "TEMPLATE NOT FOUND!";
          $arrData = $message;
          require_once $_SERVER['DOCUMENT_ROOT'] . '/shop_arevert/view/inv/404.php';
          die();
        }
}
