//Plugin to put the values into the fields if them are empty
jQuery.fn.fill_or_clean = function () {

    this.each(function () {

        if ($("#prodname").val() === "") {
            $("#prodname").val("Input product name");
            $("#prodname").focus(function () {
                if ($("#prodname").val() === "Input product name") {
                    $("#prodname").val("");
                }
            });
        }
        $("#prodname").blur(function () { //Onblur is activated when user changes the focus
            if ($("#prodname").val() === "") {
                $("#prodname").val("Input product name");
            }
        });//Product name end

        if ($("#prodref").val() === "") {
            $("#prodref").val("Input product reference");
            $("#prodref").focus(function () {
                if ($("#prodref").val() === "Input product reference") {
                    $("#prodref").val("");
                }
            });
        }
        $("#prodref").blur(function () { //Onblur is activated when user changes the focus
            if ($("#prodref").val() === "") {
                $("#prodref").val("Input product reference");
            }
        });//Product reference end

        if ($("#prodprice").val() === "") {
            $("#prodprice").val("Input product price");
            $("#prodprice").focus(function () {
                if ($("#prodprice").val() === "Input product price") {
                    $("#prodprice").val("");
                }
            });
        }
        $("#prodprice").blur(function () { //Onblur is activated when user changes the focus
            if ($("#prodprice").val() === "") {
                $("#prodprice").val("Input product price");
            }
        });//Product price end

        if ($("#date_reception").val() === "") {
            $("#date_reception").val("Input reception date");
            $("#date_reception").focus(function () {
                if ($("#date_reception").val() === "Input reception date") {
                    $("#date_reception").val("");
                }
            });
        }
        $("#date_reception").blur(function () { //Onblur is activated when user changes the focus
            if ($("#date_reception").val() === "") {
                $("#date_reception").val("Input reception date");
            }
        });//Date reception end

        if ($("#date_expiration").val() === "") {
            $("#date_expiration").val("Input expiration date");
            $("#date_expiration").focus(function () {
                if ($("#date_expiration").val() === "Input expiration date") {
                    $("#date_expiration").val("");
                }
            });
        }
        $("#date_expiration").blur(function () { //Onblur is activated when user changes the focus
            if ($("#date_expiration").val() === "") {
                $("#date_expiration").val("Input expiration date");
            }
        });//Date expiration end

        if ($("#proddesc").val() === "") {
            //console.log("Inside first if proddesc");
            $("#proddesc").val("Input product description");
            $("#proddesc").focus(function () {
                if ($("#proddesc").val() === "Input product description") {
                  //console.log("Inside second if proddesc");
                    $("#proddesc").val("");
                }
            });
        }
        $("#proddesc").blur(function () { //Onblur is activated when user changes the focus
            if ($("#proddesc").val() === "") {
                $("#proddesc").val("Input product description");
            }
        });//Product description end
        //info http://stackoverflow.com/questions/415602/set-value-of-textarea-in-jquery

    });//End of the each
    return this;
};// End of fill or clean function

//Solution to : "Uncaught Error: Dropzone already attached."
Dropzone.autoDiscover = false;
$(document).ready(function () {
    //console.log("Inside ready");

    $( "#date_reception" ).datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true, changeYear: true,
        minDate: -90, maxDate: "+1M"
    });
    $( "#date_expiration" ).datepicker({
      dateFormat: 'dd/mm/yy',
      changeMonth: true, changeYear: true,
      minDate: 0, maxDate: "+36M"
    });


    $('#submit_products').click(function(){
        //console.log("Inside click function");
        validate_product();
    });


    $.get("modules/products/controller/controller_products.class.php?load_data=true",
          function(response){

            if(response.product===""){
                $("#prodname").val('');
                $("#prodref").val('');
                /*$("prodprice").val('');
                $("date_reception").val('');
                $("date_expiration").val('');
                $("#country").val('Select country');
                $("#province").val('Select province');
                $("#city").val('Select city');
                $("#proddesc").val('');
                var inputElements = document.getElementsByClassName('catCheckbox');
                for (var i =0; i< inputElements.length; i++){
                    if (inputElements[i].checked){
                        inputElements[i].checked = false;
                    }
                }*/
            $(this).fill_or_clean();
            }else{
              $("#prodname").val(response.product.prodname);
              $("#prodref").val(response.product.prodref);
              /*$("prodprice").val(response.product.prodprice);
              $("date_reception").val(response.product.date_reception);
              $("date_expiration").val(response.product.date_expiration);
              var category = response.product.category;
              var inputElements2 = document.getElementsByClassName('catCheckbox');
              for (var j = 0; j < category.length; j++){
                  for (var k = 0; k < inputElements2.length; k++){
                      if (category[j]===inputElements2[j]){
                            inputElements2[k].checked = true;
                      }
                  }
              }
              $("#country").val(response.product.country);
              $("#province").val(response.product.province);
              $("#city").val(response.product.city);
              $("#proddesc").val(response.product.proddesc);*/
            }
          }, "json");



    //Dropzone function //////////////////////////////////
    $("#dropzone").dropzone({

        url: "modules/products/controller/controller_products.class.php?upload=true",
        addRemoveLinks: true,
        maxFileSize: 1000,
        dictResponseError: "An error has occurred on the server",
        acceptedFiles: 'image/*,.jpeg,.jpg,.png,.gif,.JPEG,.JPG,.PNG,.GIF,.rar,application/pdf,.psd',
        init: function () {
            this.on("success", function (file, response) {
                //alert(response);
                $("#progress").show();
                $("#bar").width('100%');
                $("#percent").html('100%');
                $('.msg').text('').removeClass('msg_error');
                $('.msg').text('Success Upload image!!').addClass('msg_ok').animate({'right': '300px'}, 300);
                console.log(file.name);
                console.log("Response: "+response);
            });
        },
        complete: function (file) {
            //if(file.status == "success"){
            //alert("El archivo se ha subido correctamente: " + file.name);
            //}
        },
        error: function (file) {
            //alert("Error subiendo el archivo " + file.name);
        },
        removedfile: function (file, serverFileName) {
            var name = file.name;

            console.log(name);
            $.ajax({
                type: "POST",
                url: "modules/products/controller/controller_products.class.php?delete=true",
                data: "filename=" + name,
                success: function (data) {
                  //console.log(name);
                  console.log(data);
                    $("#progress").hide();
                    $('.msg').text('').removeClass('msg_ok');
                    $('.msg').text('').removeClass('msg_error');
                    $("#e_avatar").html("");

                    var json = JSON.parse(data);
                    //console.log(data);
                    if (json.res === true) {
                        var element;
                        if ((element = file.previewElement) !== null) {
                            element.parentNode.removeChild(file.previewElement);
                            //alert("Imagen eliminada: " + name);
                        } else {
                            false;
                        }
                    } else { //json.res == false, elimino la imagen también
                        var element;
                        if ((element = file.previewElement) !== null) {
                            element.parentNode.removeChild(file.previewElement);
                        } else {
                            false;
                        }
                    }

                }
            });
        }
    });//End dropzone


    var string_reg = /^[0-9a-zA-Z]+[\-'\s]?[0-9a-zA-Z ]+$/;
    //var val_dates = /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/;
    var val_dates = /\d{2}.\d{2}.\d{4}$/;
    var prod_ref = /^[0-9a-zA-Z]{2,20}$/;
    var prod_price = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/;
    var string_description = /^(.){1,500}$/;
    //var string_description = /^[0-9A-Za-z]{2,90}$/;

    /* Fade out function  to hide the error messages */

    $("#prodname").keyup(function () {
      if ($(this).val() !== "" && prod_ref.test($(this).val())) {
          $(".error").fadeOut();
          return false;
      }
    });

    $("#prodref").keyup(function () {
      if ($(this).val() !== "" && prod_ref.test($(this).val())) {
          $(".error").fadeOut();
          return false;
      }
    });
/*
    $("#prodprice").keyup(function () {
      if ($(this).val() !== "" && prod_price.test($(this).val())) {
          $(".error").fadeOut();
          return false;
      }
    });

    $("#proddesc").keyup(function () {
      if ($(this).val() !== "" && string_description.test($(this).val())) {
          $(".error").fadeOut();
          return false;
      }
    });
*/
    //Function triggered when the user click on submit

      //console.log("Inside submit user");

});//End document ready





function validate_product(){
    var result = true;

    var prodname = document.getElementById('prodname').value;
    var prodref = document.getElementById('prodref').value;
    /*var prodprice = document.getElementById('prodprice').value;
    var date_reception = document.getElementById('date_reception').value;
    var date_expiration = document.getElementById('date_expiration').value;
    var country = document.getElementById('countrty').value;
    var province = document.getElementById('province').value;
    var city = document.getElementById('city').value;
    var proddesc = document.getElementById('proddesc').value;
    var category = [];
    var inputElements = document.getElementsByClassName('catCheckbox');
    var j = 0;
    for (var i = 0; i < inputElements.length; i++){
        if (inputElements[i].checked){
            category[j]=inputElements[i].value;
            j++;
        }
    }*/

    var string_reg = /^[0-9a-zA-Z]+[\-'\s]?[0-9a-zA-Z ]+$/;
    //var val_dates = /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/;
    var val_dates = /\d{2}.\d{2}.\d{4}$/;
    var prod_ref = /^[0-9a-zA-Z]{2,20}$/;
    var prod_price = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/;
    var string_description = /^(.){1,500}$/;

    $(".error").remove();
    if ($("#prodname").val() === "" || $("#prodname").val() === "Input product name"){
      $("#prodname").focus().after("<span class='error'>Input product name</span>");
      return false;
    }else if(!string_reg.test($("#prodname").val())){
      $("#prodname").focus().after("<span class='error'>Name must be 2 to 30 letters</span>");
      return false;
    }

    if ($("#prodref").val() === "" || $("#prodref").val() === "Input product reference") {
        $("#prodref").focus().after("<span class='error'>Input product reference</span>");
        return false;
    } else if (!prod_ref.test($("#prodref").val())) {
        $("#prodref").focus().after("<span class='error'>Reference must be 2 to 30 letters</span>");
        return false;
    }
    /*
    if ($("#prodprice").val() === "" || $("#prodprice").val() === "Input product reference") {
        $("#prodprice").focus().after("<span class='error'>Input product reference</span>");
        return false;
    } else if (!prod_price.test($("#prodprice").val())) {
        $("#prodprice").focus().after("<span class='error'>Price must be numbers (like 1.2)</span>");
        return false;
    }

    if ($("#date_reception").val() === "" || $("#date_reception").val() === "Input product reference") {
        $("#date_reception").focus().after("<span class='error'>JS Input product reception date</span>");
        return false;
    } else if (!val_dates.test($("#date_reception").val())) {
        $("#date_reception").focus().after("<span class='error'>JS Input product reception date</span>");
        return false;
    }

    if ($("#date_expiration").val() === "" || $("#date_expiration").val() === "Input product reference") {
        $("#date_expiration").focus().after("<span class='error'>JS Input product reception date</span>");
        return false;
    } else if (!val_dates.test($("#date_expiration").val())) {
        $("#date_expiration").focus().after("<span class='error'>JS Input product expiration date</span>");
        return false;
    }

    if ($("#proddesc").val() === "" || $("#proddesc").val() === "Input product description") {
        $("#proddesc").focus().after("<span class='error'>Input product description</span>");
        return false;
    } else if (!string_description.test($("#proddesc").val())) {
        $("#proddesc").focus().after("<span class='error'>Description cannot be empty</span>");
        return false;
    }*/
    console.log("Before if result");
    if (result){
      console.log("Inside if result");
      /*var data = {"prodname":prodname, "prodref": prodref, "prodprice": prodprice, "date_reception": date_reception, "date_expiration": date_expiration,
      "country": country, "province": province, "city": city, "proddesc": proddesc, "category": category};*/
      var data = {"prodname":prodname, "prodref": prodref};
      var data_products_JSON = JSON.stringify(data);

      $.post('modules/products/controller/controller_products.class.php',
          {alta_products_json:data_products_JSON},
      function (response){
        console.log("Response: "+response);
        console.log(response.prodname);
        if(response.success){
          window.location.href = response.redirect;
        }
    },"json").fail(function(xhr){
          //console.log("Inside error json");
          //console.log(xhr.responseJSON);
          if(xhr.responseJSON.error.prodname)
            $("#prodname").focus().after("<span  class='error1'>" + xhr.responseJSON.error.prodname + "</span>");

          if(xhr.responseJSON.error.prodref)
            $("#prodref").focus().after("<span  class='error1'>" + xhr.responseJSON.error.prodref + "</span>");

        /*  if(xhr.responseJSON.error.prodprice){
            $("#prodprice").focus().after("<span  class='error1'>" + xhr.responseJSON.error.prodprice + "</span>");
          }
          if(xhr.responseJSON.error.date_reception){
            $("#date_reception").focus().after("<span  class='error1'>" + xhr.responseJSON.error.date_reception + "</span>");
          }
          if(xhr.responseJSON.error.date_expiration){
            $("#date_expiration").focus().after("<span  class='error1'>" + xhr.responseJSON.error.date_expiration + "</span>");
          }
          if(xhr.responseJSON.error.country){
            $("#country").focus().after("<span  class='error1'>" + xhr.responseJSON.error.country + "</span>");
          }
          if(xhr.responseJSON.error.province){
            $("#province").focus().after("<span  class='error1'>" + xhr.responseJSON.error.province + "</span>");
          }
          if(xhr.responseJSON.error.city){
            $("#city").focus().after("<span  class='error1'>" + xhr.responseJSON.error.city + "</span>");
          }
          if(xhr.responseJSON.error.proddesc){
            $("#proddesc").focus().after("<span  class='error1'>" + xhr.responseJSON.error.proddesc + "</span>");
          }
          if(xhr.responseJSON.error.category){
            $("#category").focus().after("<span  class='error1'>" + xhr.responseJSON.error.category + "</span>");
          }
          */
          if (xhr.responseJSON.success1) {
                if (xhr.responseJSON.img_avatar !== "/shop_arevert/media/default-prodpic.png") {
                    //$("#progress").show();
                    //$("#bar").width('100%');
                    //$("#percent").html('100%');
                    //$('.msg').text('').removeClass('msg_error');
                    //$('.msg').text('Success Upload image!!').addClass('msg_ok').animate({ 'right' : '300px' }, 300);
                }
            } else {
                $("#progress").hide();
                $('.msg').text('').removeClass('msg_ok');
                $('.msg').text('Error Upload image!!').addClass('msg_error').animate({'right': '300px'}, 300);
            }

    });//End fail function hrx
  }//End if result
}//End validate_product
