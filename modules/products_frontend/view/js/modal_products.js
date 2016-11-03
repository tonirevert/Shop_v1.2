//console.log("Modal products");
//we do this so that  details_prod don't appear
$("#details_prod").hide();
$(document).ready(function () {
    $('.prod').click(function () {
        var id = this.getAttribute('id');
        //alert(id);
        //console.log(id);

        $.get("modules/products_frontend/controller/controller_products.class.php?idProduct=" + id, function (data, status) {
            //console.log("Data: "+data+" Status: "+ status);
            var json = JSON.parse(data);
            var product = json.product;

            //alert(product.name);
            //console.log(product);

            $("#img_prod").html('<img src="' + product.prodpic + '" height="75" width="75"> ');
            $("#name_prod").html(product.prodname);
            $("#description_prod").html("<strong>Description: <br/></strong>" + product.proddesc);
            //$("#titration_prod").html("<strong>Titration:</strong>" + product.titration);
            $("#price_prod").html("Price: " + product.prodprice + " €");

            //we do this so that  details_prod  appear
            $("#details_prod").show();

            //$.fn.bootstrapBtn = $.fn.button.noConflict();

            $("#product").dialog({
                width: 850, //<!-- ------------- ancho de la ventana -->
                height: 500, //<!--  ------------- altura de la ventana -->
                //show: "scale", <!-- ----------- animación de la ventana al aparecer -->
                //hide: "scale", <!-- ----------- animación al cerrar la ventana -->
                resizable: "false", //<!-- ------ fija o redimensionable si ponemos este valor a "true" -->
                //position: "down",<!--  ------ posicion de la ventana en la pantalla (left, top, right...) -->
                modal: "true", //<!-- ------------ si esta en true bloquea el contenido de la web mientras la ventana esta activa (muy elegante) -->
                buttons: {
                    Ok: function () {
                        $(this).dialog("close");
                    }
                },
                show: {/*https://api.jqueryui.com/bounce-effect/ Efects: blind, (bounce, times: 3),fade, puff,shake */
                    /*effect: "blind",
                    duration: 1000*/
                    effect: "fade"
                },
                hide: {
                    /*effect: "explode",
                    duration: 1000*/
                    effect: "fade"
                }
            });
        })
                .fail(function (xhr) {
                    //if  we already have an error 404
                    if (xhr.status === 404) {
                        $("#results").load("modules/products_frontend/controller/controller_products.class.php?view_error=false");
                    } else {
                        $("#results").load("modules/products_frontend/controller/controller_products.class.php?view_error=true");
                    }
                    //;
                });
    });
});
