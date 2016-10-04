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

            $(this).fill_or_clean();
            }else{
              $("#prodname").val(response.product.prodname);
              $("#prodref").val(response.product.prodref);

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

    //Function triggered when the user click on submit

      //console.log("Inside submit user");

});//End document ready





function validate_product(){
    var result = true;

    var prodname = document.getElementById('prodname').value;
    var prodref = document.getElementById('prodref').value;

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

    console.log("Before if result");
    if (result){
      console.log("Inside if result");

      var data = {"prodname":prodname, "prodref": prodref};
      var data_products_JSON = JSON.stringify(data);

      $.post('modules/products/controller/controller_products.class.php',
          {alta_products_json:data_products_JSON},
      function (response){
        console.log("Response: "+response);
        //console.log(response.prodname);
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
