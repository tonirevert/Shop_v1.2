<?php
    function debugPHP($array){
        echo "<pre>";
        print_r($array);
        echo "</pre><br>";
    }
    
    function redirect($url){
        die('<script>top.location.href="'.$url.'";</script>');
    }