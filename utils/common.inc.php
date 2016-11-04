<?php
  function loadModel($model_path, $model_name, $function, $arrArgument = ''){
    $model = $model_path . $model_name . '.class.singleton.php';

    if (file_exists($model)) {
        include_once($model);

        $modelClass = $model_name;

        if (!method_exists($modelClass, $function)){
            throw new Exception();
        }

        $obj = $modelClass::getInstance();

        if (isset($arrArgument)){
            return $obj->$function($arrArgument);
        }
    } else {
        throw new Exception();
    }
  }

function loadView($rutaVista='', $templateName='', $arrPassValue = ''){
        $view_path = $rutaVista . $templateName;
        $arrData = '';

        if(file_exists($view_path)){
            if(isset($arrPassValue)){
                $arrData = $arrPassValue;
            }
            include_once($view_path);
        }else{

            $result = filter_num_int($rutaVista);
            if($result['result']){
              $rutaVista= $result['data'];
            }else{
              $rutaVista= http_response_code();
            }

            $log = Log::getInstance();
            $log->add_log_general("error loadView general", $_GET['module'], "response ".http_response_code());
            $log->add_log_user("error loadView general", "", $_GET['module'], "response".http_response_code());

          $result = response_code($rutaVista);
          $arrData = $result;
          require_once $_SERVER['DOCUMENT_ROOT'] . '/shop_arevert/view/inc/templates_error/'. "error". '.php';
        }
}
