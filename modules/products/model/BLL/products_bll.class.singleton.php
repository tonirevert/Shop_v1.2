<?php
echo json_encode("products_bll.class.singleton.php");
exit;
/*
$path = $_SERVER['DOCUMENT_ROOT'] . '/shop_arevert/';
define('SITE_ROOT', $path);
define('MODEL_PATH', SITE_ROOT . 'model/');

require(MODEL_PATH . "Db.class.singleton.php");
require(SITE_ROOT . "modules/products/model/DAO/user_dao.class.singleton.php");

class products_bll{

    private $dao;
    private $db;
    static $_instance;

    private function __construct() {
        $this->dao = productDAO::getInstance();
        $this->db = Db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function create_product_BLL($arrArgument){
      return $this->dao->create_product_DAO($this->db, $arrArgument);
    }
}
*/
