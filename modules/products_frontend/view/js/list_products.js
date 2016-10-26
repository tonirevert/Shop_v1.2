$(document).ready(function () {
    $.get("modules/products_frontend/controller/controller_products.class.php?num_pages=true", function (data, status){
        var json = JSON.parse(data);
        var pages = json.pages;
        //console.log(json);
        //console.log(pages);

        $("#results").load("modules/products_frontend/controller/controller_products.class.php"); //load initial records

        // init bootpag
        $(".pagination").bootpag({
            total: pages,
            page: 1,
            maxVisible: 3,
            next: 'next',
            prev: 'prev'
        }).on("page", function (e, num) {
            //alert(num);
            e.preventDefault();
            //$("#results").prepend('<div class="loading-indication"><img src="modules/services/view/img/ajax-loader.gif" /> Loading...</div>');
            $("#results").load("modules/products_frontend/controller/controller_products.class.php", {'page_num': num});
            console.log($("#results"));
            // ... after content load

        });

    }).fail(function (xhr) {

        if(xhr.status  === 404){
            $("#results").load("modules/products_frontend/controller/controller_products.class.php?view_error=false");
        }else{
            $("#results").load("modules/products_frontend/controller/controller_products.class.php?view_error=true");
        }

    });
});
