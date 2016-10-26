<?php

function filter_num_int($num){
  $num = filter_var($num, FILTER_SANITIZE_NUMBER_INT, FILTER_FLAG_STRIP_HIGH);
  if (!is_numeric($num)) {
      return $return = array('result' => false, 'error' => "Invalid page number!", 'data' => 1);
  }
  return $return = array('result' => true, 'error' => "", 'data' => $num);
}
