<?php
//echo json_encode("products model class");
//exit;
$path = $_SERVER['DOCUMENT_ROOT'] . '/shop_arevert/';
define('SITE_ROOT', $path);
require(SITE_ROOT . "modules/products/model/BLL/products_bll.class.singleton.php");

class products_model {

    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = products_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function create_product($arrArgument) {
        return $this->bll->create_product_BLL($arrArgument);
    }

    public function list_products(){
        return $this->bll->list_products_BLL();
    }

    public function details_products($id){
        return $this->bll->details_products_BLL($id);
    }

    public function obtain_countries($url){
        return $this->bll->obtain_countries_BLL($url);
    }

    public function obtain_provinces(){
        return $this->bll->obtain_provinces_BLL();
    }

    public Function obtain_cities($arrArgument){
        return $this->bll->obtain_cities_BLL($arrArgument);
    }

}
