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
  var urlbase = "modules/products_frontend/controller/count_products.class.php";
  if(!keyword){
      url = urlbase + "?num_pages=true";
  }else{
      url = urlbase + "?num_pages=true&keyword=" + keyword;
  }

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
          }).on("page", function (e,num){
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
  $.get("modules/products_frontend/controller/controller_products.class.php?name_product" + keyword, function (data, status){
      var json = JSON.parse(data);
      var product = json.products_autocomplete;

      $('#results').html('');
      $('.pagination_prods').html('');

      var img_product = document.getElementById('img_product');
      img_product.innerHTML = '<img src="' + product[0].prodpict + ' " class="img_product">';

      var name_product = document.getElementById('nom_product');
      name_product.innerHTML = product[0].prodname;
      var desc_prod = document.getElementById('desc_product');
      desc_prod.innerHTML = product[0].proddesc;
      var price_product = document.getElementById('prodprice');
      price_product.innerHTML = "Price:" + product[0].prodprice+ " €";
      price_product.setAttribute("class", "special");

  }).fail(function (xhr) {
      $("#results").load("modules/products_frontend/controller/controller_products.class.php?view_error=false");
      $('.pagination_prods').html('');
      reset();
  });
}//End search_product
