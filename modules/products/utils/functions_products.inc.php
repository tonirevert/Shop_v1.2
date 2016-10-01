<?php

function validate_product(){
    $error = array();
    $valid = true;
    $filter = array(
        'prodname' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp' => '/^[0-9A-Za-z\s]{2,30}$/')
        ),
        'prodref' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp' => '/^[0-9A-Za-z]{2,30}$/')
        ),
        'prodprice' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp' => '/^[0-9]{1,30}$/')
        ),
        'date_reception' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp' => '/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}$/')
        ),
        'date_expiration' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp' => '/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}$/')
        ),
        'proddesc' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp' => '/^(.){1,500}$/')
        )
    );

    $result = filter_input_array(INPUT_POST, $filter);
    
    //Non checked data:
    $result['category'] = $_POST['category'];
    $result['packaging'] = $_POST['packaging'];
    $result['country'] = $_POST['country'];
    $result['province'] = $_POST['province'];
    $result['city'] = $_POST['city'];

    if (count($_POST['category']) <= 1 ){
        $error['category'] = "Select 1 or more";
        $valid = false;
    }
    
    if ($_POST['country']==='Select country'){
        $error['country']="You need to choose a country";
        $valid = false;
    }
    
    if ($_POST['province']==='Select province'){
        $error['province']="You need to choose a province";
        $valid = false;
    }
    
    if ($_POST['city']==='Select city'){
        $error['city']="You need to choose a city";
        $valid = false;
    }

    if($result['date_reception'] && $result['date_expiration']){
        $dates = validate_dates($_POST['date_reception'],$_POST['date_expiration']);
        
        if($dates){
            $error['date_reception'] = 'Reception date must be before of the expiration date';
            $valid = false;
        }
    }

    if ($result != null && $result){

        if(!$result['prodname']){
            $error['prodname'] = "Name must be 2 to 30 letters";
            $valid = false;
        }
        
        if(!$result['prodref']){
            $error['prodref'] = "Reference must be 2 to 30 letters";
            $valid = false;
        }
        
        if(!$result['prodprice']){
            $error['prodprice'] = "Reference must be 2 to 30 letters";
            $valid = false;
        }

        if (!$result['date_reception']) {
            if ($_POST['date_reception'] == "") {
                $error['date_reception'] = "this camp can't be empty";
                $valid = false;
            } else {
                $error['date_reception'] = 'error format date (dd/mm/yyyy)';
                $valid = false;
            }
        }

        if (!$result['date_expiration']) {
            if ($_POST['date_expiration'] == "") {
                $error['date_expiration'] = "this camp can't be empty";
                $valid = false;
            } else {
                $error['date_expiration'] = 'error format date (dd/mm/yyyy)';
                $valid = false;
            }
        }

        if(!$result['proddesc']){
            $error['proddesc'] = "Description must be 2 to 90 letters";
            $valid = false;
        }
      /*  */
    } else {
        $valid = false;
    };

    return $return = array('result' => $valid, 'error' => $error, 'data' => $result );
    
}//End of function validate product

    function validate_dates($start_days, $dayslight) {

    $start_day = date("m/d/Y", strtotime($start_days));
    $daylight = date("m/d/Y", strtotime($dayslight));
    
    list($mes_one, $dia_one, $anio_one) = split('/', $start_day);
    list($mes_two, $dia_two, $anio_two) = split('/', $daylight);

    $dateOne = new DateTime($anio_one . "-" . $mes_one . "-" . $dia_one);
    $dateTwo = new DateTime($anio_two . "-" . $mes_two . "-" . $dia_two);

    if ($dateOne <= $dateTwo) {
        return true;
    }
    return false;
    }