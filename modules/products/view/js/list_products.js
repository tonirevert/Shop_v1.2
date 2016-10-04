////////////////////////////////////////////////////////////////
function load_users_ajax() {
    $.ajax({
        type: 'GET',
        url: "modules/products/controller/controller_products.class.php?load=true",
        //dataType: 'json',
        async: false
    }).done(function (data) {
        var json = JSON.parse(data);

        //alert(json.user.usuario);

        print_product(json);

    }).fail(function (xhr) {
        alert(xhr.responseText);
    });
}

////////////////////////////////////////////////////////////////
function load_users_get_v1() {
    $.get("modules/products/controller/controller_products.class.php?load=true", function (data, status) {
        var json = JSON.parse(data);
        //$( "#content" ).html( json.msje );
        //alert("Data: " + json.user.usuario + "\nStatus: " + status);

        print_product(json);
    });
}

////////////////////////////////////////////////////////////////
function load_users_get_v2() {
    var jqxhr = $.get("modules/products/controller/controller_products.class.php?load=true", function (data) {
        var json = JSON.parse(data);
        console.log(json);
        print_product(json);
        //alert( "success" );
    }).done(function () {
        //alert( "second success" );
    }).fail(function () {
        //alert( "error" );
    }).always(function () {
        //alert( "finished" );
    });

    jqxhr.always(function () {
        //alert( "second finished" );
    });
}

$(document).ready(function () {
    //load_users_ajax();
    //load_users_get_v1();
    load_users_get_v2();
});

function print_product(data) {
    //alert(data.user.avatar);
    console.log(data);
    console.log(data.product);
    console.log(data.product.prodname);
    var content = document.getElementById("content");
    var div_product = document.createElement("div");
    var parrafo = document.createElement("p");

    var message = document.createElement("div");
    message.innerHTML = "message = ";
    message.innerHTML += data.message;

    var prodname = document.createElement("div");
    prodname.innerHTML = "prodname = ";
    prodname.innerHTML += data.product.prodname;

    var prodref = document.createElement("div");
    prodref.innerHTML = "prodref = ";
    prodref.innerHTML += data.product.prodref;

    //arreglar ruta IMATGE!!!!!

    var cad = data.product.prodpic;
    //console.log(cad);
    //var cad = cad.toLowerCase();
    var img = document.createElement("div");
    var html = '<img src="' + cad + '" height="75" width="75"> ';
    img.innerHTML = html;
    //alert(html);

    div_product.appendChild(parrafo);
    parrafo.appendChild(message);
    parrafo.appendChild(prodname);
    parrafo.appendChild(prodref);

    content.appendChild(img);
}
