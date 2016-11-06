//console.log("Modal products");
//we do this so that  details_prod don't appear
$("#details_prod").hide();
$(document).ready(function () {

    //Used to change the mouse over this element
    $('.product_name').css('cursor', 'pointer');
    //source: http://stackoverflow.com/questions/5932837/how-do-i-change-the-style-of-the-cursor-with-jquery
    $('.product_name').click(function () {
        var id = this.getAttribute('id');
        //alert(id);
        console.log(id);
        //$.get("modules/products_frontend/controller/controller_products.class.php?name_products=" + keyword, function (data, status){
        $.get("modules/products_frontend/controller/controller_products.class.php?idProduct=" + id, function (data, status) {
            //console.log("Data: "+data+" Status: "+ status);
            var json = JSON.parse(data);
            var product = json.product;

            $('#results').html('');
            $('.pagination_prods').html('');
            //alert(product.name);
            //console.log(product);
            var img_prod = document.getElementById('img_product');
            img_prod.innerHTML = '<img src="'+ product.prodpic +'" class="img-product">';

            var nom_product = document.getElementById('nom_product');
            nom_product.innerHTML = product.prodname;
            var desc_product = document.getElementById('desc_product');
            desc_product.innerHTML = product.proddesc;
            var price_product = document.getElementById('price_product');
            price_product.innerHTML = "Precio: " + product.prodprice + " €";
            price_product.setAttribute("class", "special");

            // $("#img_prod").html('<img src="' + product.prodpic + '" height="75" width="75"> ');
            // $("#name_prod").html(product.prodname);
            // $("#description_prod").html("<strong>Description: <br/></strong>" + product.proddesc);
            // //$("#titration_prod").html("<strong>Titration:</strong>" + product.titration);
            // $("#price_prod").html("Price: " + product.prodprice + " €");
            //
            // //we do this so that  details_prod  appear
            // $("#details_prod").show();

            //$.fn.bootstrapBtn = $.fn.button.noConflict();

            // $("#product").dialog({
            //     width: 850, //<!-- ------------- ancho de la ventana -->
            //     height: 500, //<!--  ------------- altura de la ventana -->
            //     //show: "scale", <!-- ----------- animación de la ventana al aparecer -->
            //     //hide: "scale", <!-- ----------- animación al cerrar la ventana -->
            //     resizable: "false", //<!-- ------ fija o redimensionable si ponemos este valor a "true" -->
            //     //position: "down",<!--  ------ posicion de la ventana en la pantalla (left, top, right...) -->
            //     modal: "true", //<!-- ------------ si esta en true bloquea el contenido de la web mientras la ventana esta activa (muy elegante) -->
            //     buttons: {
            //         Ok: function () {
            //             $(this).dialog("close");
            //         }
            //     },
            //     show: {/*https://api.jqueryui.com/bounce-effect/ Efects: blind, (bounce, times: 3),fade, puff,shake */
            //         /*effect: "blind",
            //         duration: 1000*/
            //         effect: "fade"
            //     },
            //     hide: {
            //         /*effect: "explode",
            //         duration: 1000*/
            //         effect: "fade"
            //     }
            // });
        })
                .fail(function (xhr) {
                    $("#results").load("modules/products_frontend/controller/controller_products.class.php?view_error=true");
                });
    });
});
