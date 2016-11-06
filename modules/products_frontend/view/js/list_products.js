function validate_search(search_value){
    if (search_value.length > 0){
        var regexp = /^[a-zA-Z0-9 .,]*$/;
        return regexp.test(search_value);
    }
    return false;
}

function refresh(){
    $('.pagination_prods').html = '';
    $('.pagination_prods').val = '';
}

function search(keyword){
//changes the url to avoid creating another different function
  var urlbase = "modules/products_frontend/controller/controller_products.class.php";
  if(!keyword){
      url = urlbase + "?num_pages=true";
  }else{
      url = urlbase + "?num_pages=true&keyword=" + keyword;
  }
  //console.log(url);
  $.get(url, function (data, status){
      var json = JSON.parse(data);
      var pages = json.pages;

      if(!keyword){
          url = urlbase;
      }else{
          url = urlbase + "?keyword=" + keyword;
      }

      $("#results").load(url);

      if(pages !== 0){
          refresh();

          $(".pagination_prods").bootpag({
              total: pages,
              page: 1,
              maxVisible: 5,
              next: 'next',
              prev: 'prev'
          }).on("page", function (e, num){
              e.preventDefault();
              if(!keyword){
                  $("#results").load("modules/products_frontend/controller/controller_products.class.php", {'page_num': num});
              }else{
                  $("#results").load("modules/products_frontend/controller/controller_products.class.php", {'page_num': num, 'keyword': keyword});
              }
              reset();
          });
      }else{
          $("#results").load("modules/products_frontend/controller/controller_products.class.php?view_error=false");
          $('.pagination_prods').html('');
          reset();
      }
      reset();

  }).fail(function (xhr){
      $("#results").load("modules/products_frontend/controller/controller_products.class.php?view_error=true");
      $('.pagination_prods').html('');
      reset();
  });
}//End search function

function search_product(keyword){
  console.log("search_product");
  $.get("modules/products_frontend/controller/controller_products.class.php?name_products=" + keyword, function (data, status){
    //console.log("get search_product");
    //console.log(data);
      var json = JSON.parse(data);
      console.log(json);
      //var json = data;
      var product = json.product_autocomplete;
//      console.log(data.prodname);
      //console.log(product.prodname);

      $('#results').html('');
      $('.pagination_prods').html('');

      var img_product = document.getElementById('img_product');
      img_product.innerHTML = '<img src="' + product[0].prodpic + ' " class="img-product">';

      var name_product = document.getElementById('nom_product');
      name_product.innerHTML = product[0].prodname;
      var desc_prod = document.getElementById('desc_product');
      desc_prod.innerHTML = product[0].proddesc;
      var price_product = document.getElementById('price_product');
      price_product.innerHTML = "Price:" + product[0].prodprice+ " €";
      price_product.setAttribute("class", "special");




  }).fail(function (xhr) {
      $("#results").load("modules/products_frontend/controller/controller_products.class.php?view_error=false");
      $('.pagination_prods').html('');
      reset();
  });
}//End search_product

function count_products(keyword){

  $.get("modules/products_frontend/controller/controller_products.class.php?count_products=" + keyword, function (data, status){
      var json = JSON.parse(data);
      var num_products = json.num_products;
      alert("num_products: "+num_products);
      console.log("get count_products");
      if (num_products == 0){
        console.log("0 en count_products");
          $("#results").load("modules/products_frontend/controller/controller_products.class.php?view_error=false");
          $('.pagination_prods').html('');
      }
      if (num_products == 1){
        console.log("1 en count_products");
          search_product(keyword);
      }
      if (num_products > 1){
        console.log(">1 en count_products");
          search(keyword);
      }
  }).fail(function () {
    $("#results").load("modules/products_frontend/controller/controller_products.class.php?view_error=true");
    $('.pagination_prods').html('');
    reset();
  });
}//End count_products

function reset(){
    $('#img_product').html('');
    $('#nom_product').html('');
    $('#desc_product').html('');
    $('#price_product').html('');
    $('#price_product').removeClass("special");

    $('#keyword').val('');
}//End reser function

$(document).ready(function () {
console.log("document ready");
    if(getCookie("search")){
      console.log("if getCookie");
        var keyword = getCookie("search");
        count_products(keyword);
        alert("document ready getCookie(search): "+ getCookie("search"));
        setCookie("search","",1);
    }else{
        console.log("else getCookie");
        search();
    }

    $("#search_prod").submit(function (e){
      console.log("submit search_prod");
        var keyword = document.getElementById('keyword').value;
        console.log(keyword);
        var v_keyword = validate_search(keyword);
        if(v_keyword){
          setCookie("search", keyword, 1);
        }
        alert(" search_prod submit getCookie(search): "+ getCookie("search"));
        location.reload(true);

        e.preventDefault();//This STOP default action
    });

    $('#Submit').click(function (){
        var keyword = document.getElementById('keyword').value;
        var v_keyword = validate_search(keyword);
        if (v_keyword){
            setCookie("search", keyword, 1);
        }
        alert("submit getCookie(search): "+ getCookie("search"));
        location.reload(true);
    });

    $.get("modules/products_frontend/controller/controller_products.class.php?autocomplete=true", function(data, status){
        var json = JSON.parse(data);
        var name_products = json.name_products;
        //alert(name_products[0].prodname);
        //console.log("name_products: "+name_products);
        var suggestions = new Array();
        for (var i = 0; i < name_products.length; i++){
            suggestions.push(name_products[i].prodname);
        }

        $("#keyword").autocomplete({
            source : suggestions,
            minLength: 1,
            select: function (event, ui){

                var keyword = ui.item.label;
                count_products(keyword);
            }
        });
    }).fail(function (xhr){
      $("#results").load("modules/products_frontend/controller/controller_products.class.php?view_error=false");
      $('.pagination_prods').html('');
      reset();
    });
});//End document ready

function setCookie(cname, cvalue, exdays){
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 *60 *60 *1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}//End setCookie

function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i= 0; i < ca.length; i++){
        var c = ca[i];
        while (c.charAt(0) === ' '){
            c = c.substring(1);
        }
        if(c.indexOf(name) === 0){
          return c.substring(name.length, c.length);
        }
    }
    return 0;
}//End getCookie
