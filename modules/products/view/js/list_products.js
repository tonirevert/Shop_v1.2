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
    load_users_ajax();
    //load_users_get_v1();
    //load_users_get_v2();
});

function print_product(data) {
    //alert(data.user.avatar);
    console.log(data);
    //console.log(data.product);
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

    var prodprice = document.createElement("div");
    prodprice.innerHTML = "prodprice = ";
    prodprice.innerHTML += data.product.prodprice;

    var date_reception = document.createElement("div");
    date_reception.innerHTML = "date_reception = ";
    date_reception.innerHTML += data.product.date_reception;

    var date_expiration = document.createElement("div");
    date_expiration.innerHTML = "date_expiration = ";
    date_expiration.innerHTML += data.product.date_expiration;

    var category = document.createElement("div");
    category.innerHTML = "category = ";
    for(var i =0;i < data.product.category.length;i++){
    category.innerHTML += " - "+data.product.category[i];
    }

    var packaging = document.createElement("div");
    packaging.innerHTML = "packaging = ";
    packaging.innerHTML += data.product.packaging;

    var country = document.createElement("div");
    country.innerHTML = "country = ";
    country.innerHTML += data.product.country;

    var province = document.createElement("div");
    province.innerHTML = "province = ";
    province.innerHTML += data.product.province;

    var city = document.createElement("div");
    city.innerHTML = "city = ";
    city.innerHTML += data.product.city;

    var proddesc = document.createElement("div");
    proddesc.innerHTML = "proddesc = ";
    proddesc.innerHTML += data.product.proddesc;

    //arreglar ruta IMATGE!!!!!

    var cad = data.product.prodpic;
    //console.log(cad);
    //var cad = cad.toLowerCase();
    var img = document.createElement("div");
    var html = '<img src="' + cad + '" height="100" width="100"> ';
    img.innerHTML = html;
    //alert(html);

    div_product.appendChild(parrafo);
    parrafo.appendChild(message);
    parrafo.appendChild(prodname);
    parrafo.appendChild(prodref);
    parrafo.appendChild(prodprice);
    parrafo.appendChild(date_reception);
    parrafo.appendChild(date_expiration);
    parrafo.appendChild(category);
    parrafo.appendChild(packaging);
    parrafo.appendChild(country);
    parrafo.appendChild(province);
    parrafo.appendChild(city);
    parrafo.appendChild(proddesc);
    content.appendChild(div_product);
    content.appendChild(img);
}
