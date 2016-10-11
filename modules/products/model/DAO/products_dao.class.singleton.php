<?php
echo json_encode("products_dao.class.singleton.php");
exit;
/*
class productDAO {

    static $_instance;

    private function __construct() {

    }

    public static function getInstance() {
        if(!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function create_product_DAO($db, $arrArgument) {
        $prodname = $arrArgument['prodname'];
        $prodref = $arrArgument['prodref'];
        $prodprice = $arrArgument['prodprice'];
        $date_reception = $arrArgument['date_reception'];
        $date_expiration = $arrArgument['date_expiration'];
        $category = $arrArgument['category'];
        $packaging = $arrArgument['packaging'];
        $country = $arrArgument['country'];
        $province = $arrArgument['province'];
        $city = $arrArgument['city'];
        $proddesc = $arrArgument['proddesc'];
        $prodpic = $arrArgument['prodpic'];

        $cat1=0;
        $cat2=0;
        $cat3=0;
        $cat4=0;

        foreach ($category as $indice) {
            if ($indice === 'cat1')
                $cat1 = 1;
            if ($indice === 'cat2')
                $cat2 = 1;
            if ($indice === 'cat3')
                $cat3 = 1;
            if ($indice === 'cat4')
                $cat14 = 1;
        }

        $sql = "INSERT INTO products (prodname, prodref, prodprice, date_reception,"
                . " date_expiration, packaging, country, province, city, proddesc,"
                . " prodpic, cat1, cat2, cat3, cat4) VALUES ('$prodname', '$prodref',"
                . " '$prodprice', '$date_reception', '$date_expiration', '$cat1', "
                . " '$cat2', '$cat3', '$cat4', '$packaging', '$country', $province,"
                . " '$city', '$proddesc', '$prodpic')";

        return $db->ejecutar($sql);

    }
}
*/
