<?php
function paint_template_error($message){
    $log = Log::getInstance();
    $log->add_log_general("error paint_template_error", "products", "response" . http_response_code());
    $log->add_log_user("error paint_template_error", "", "products", "response" . http_response_code());

    $arrData = response_code(http_response_code());

    print ("<div id='page'>");
    print ("<br><br>");
    print ("<div id='header' class='status4xx'>");
    //https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP
    if (isset($message) && !empty($message)) {


        print( '<h1>ERROR ' . http_response_code() . ' - ' . $message . '</h1>');
    }
    print("</div>");
    print ("<div id='content'>");
    print ("<h2>The following error occurred:</h2>");
    print ("<p>The requested URL was not found on this server.</p>");
    print ("<P>Please check the URL or contact the <!--WEBMASTER//-->webmaster<!--WEBMASTER//-->.</p>");
    print ("</div>");
    print ("<div id='footer'>");
    print ("<p>Powered by <a href='http://www.ispconfig.org'>ISPConfig</a></p>");
    print ("</div>");
    print("</div>");
}//End paint_template_error

function paint_template_products($arrData) {
    /*print ("<script type='text/javascript' src='modules/products_frontend/view/js/modal_products.js' ></script>");*/
    print ("<section >");
    print ("<div class='container'>");
    print ("<div id='list_prod' class='row text-center pad-row'>");
    print ("<ol class='breadcrumb'>");
    print ("<li class='active' >Products</li>");
    print ("</ol>");
    print ("<br>");
    print ("<br>");
    print ("<br>");
    print ("<br>");
    if (isset($arrData) && !empty($arrData)) {
        $i = 0;
        foreach ($arrData as $product) {
            $i++;
            if (count($arrData) % 2 !== 0 && i >= count($arrData)){
                print( '<div class="odd_prod">');
            }else {
                if ($i % 2 != 0)
                    print( '<div class="table-row">');
                else
                    print('<div class="table-separator"></div>');
            }
            print ("<div class='prod' id='".$product['prodref']."'>");
            print ("<img class='prodImg' src='" . $product['prodpic'] . "'alt='product' >");
            print ("<p>" . $product['prodname'] . "</p>");
            print ("<p id='p2'>" . $product['prodprice'] . "€</p>");
            print("<div id='" . $product['prodref'] . "' class='product_name'> Read Details </div>");
            print ("</div>");
            if(count($arrData) % 2 !== 0 && i >= count($arrData)){
                print('</div>');
            }else{
              if ($i % 2 ==0){
                print('</div><br>');
              }
            }
        }
    }//End if
    print ("</div>");
    print ("</div>");
    print ("</section>");
}//End paint_template_products

function paint_template_search($message){
    $log=Log::getInstance();
    $log->add_log_general("error paint_template_search", "products", "response" . http_response_code());
    $log->add_log_user("error paint_template_search", "", "products", "response" . http_response_code());

    print ("<section> \n");
    print ("<div class='container'> \n");
    print ("<div class='row text-center pad-row'> \n");

    print ("<h2>" . $message . "</h2> \n");
    print ("<br><br><br><br> \n");

    print ("</div> \n");
    print ("</div> \n");
    print ("</section> \n");
}//End paint template search
