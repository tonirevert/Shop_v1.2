//Plugin to put the values into the fields if them are empty
jQuery.fn.fill_or_clean = function () {

    this.each(function () {

        if ($("#prodname").attr("value") === "") {
            $("#prodname").attr("value", "Input product name");
            $("#prodname").focus(function () {
                if ($("#prodname").attr("value") === "Input product name") {
                    $("#prodname").attr("value", "");
                }
            });
        }
        $("#prodname").blur(function () { //Onblur is activated when user changes the focus
            if ($("#prodname").attr("value") === "") {
                $("#prodname").attr("value", "Input product name");
            }
        });//Product name end

        if ($("#prodref").attr("value") === "") {
            $("#prodref").attr("value", "Input product reference");
            $("#prodref").focus(function () {
                if ($("#prodref").attr("value") === "Input product reference") {
                    $("#prodref").attr("value", "");
                }
            });
        }
        $("#prodref").blur(function () { //Onblur is activated when user changes the focus
            if ($("#prodref").attr("value") === "") {
                $("#prodref").attr("value", "Input product reference");
            }
        });//Product reference end

        if ($("#prodprice").attr("value") === "") {
            $("#prodprice").attr("value", "Input product price");
            $("#prodprice").focus(function () {
                if ($("#prodprice").attr("value") === "Input product price") {
                    $("#prodprice").attr("value", "");
                }
            });
        }
        $("#prodprice").blur(function () { //Onblur is activated when user changes the focus
            if ($("#prodprice").attr("value") === "") {
                $("#prodprice").attr("value", "Input product price");
            }
        });//Product price end

        if ($("#date_reception").attr("value") === "") {
            $("#date_reception").attr("value", "Input reception date");
            $("#date_reception").focus(function () {
                if ($("#date_reception").attr("value") === "Input reception date") {
                    $("#date_reception").attr("value", "");
                }
            });
        }
        $("#date_reception").blur(function () { //Onblur is activated when user changes the focus
            if ($("#date_reception").attr("value") === "") {
                $("#date_reception").attr("value", "Input reception date");
            }
        });//Date reception end

        if ($("#date_expiration").attr("value") === "") {
            $("#date_expiration").attr("value", "Input expiration date");
            $("#date_expiration").focus(function () {
                if ($("#date_expiration").attr("value") === "Input expiration date") {
                    $("#date_expiration").attr("value", "");
                }
            });
        }
        $("#date_expiration").blur(function () { //Onblur is activated when user changes the focus
            if ($("#date_expiration").attr("value") === "") {
                $("#date_expiration").attr("value", "Input expiration date");
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
};// End of fill or clean function


$(document).ready(function () {

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

    $(this).fill_or_clean();//Calling th fill or clean Plugin

    var string_reg = /^[0-9a-zA-Z]+[\-'\s]?[0-9a-zA-Z ]+$/;
    //var val_dates = /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/;
    var val_dates = /\d{2}.\d{2}.\d{4}$/;
    var prod_ref = /^[0-9a-zA-Z]{2,20}$/;
    var prod_price = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/;
    var string_description = /^(.){1,500}$/;
    //var string_description = /^[0-9A-Za-z]{2,90}$/;


    //Function triggered when the user click on submit
    $("#submit_products").click(function () {
        var result = true;
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
        }
        console.log("before submit");

        if (result) {
                var data = {"name": "toni"};

                var data_products_JSON = JSON.stringify(data);

                $.post('modules/products/controller/controller_products.class.php',
                        {alta_products_json: data_products_JSON},
                function (response) {
                    if (response.success){
                        window.location.href = response.redirect;
                    }


                }, "json").fail(function (xhr) {
                    if(xhr.responseJSON.error.prodname){
                      $("#error_prodname").focus().after("<span  class='error1'>" + xhr.responseJSON.error.prodname + "</span>");
                    }
                    if(xhr.responseJSON.error.prodref){
                      $("#error_prodref").focus().after("<span  class='error1'>" + xhr.responseJSON.error.prodref + "</span>");
                    }
                });
        }

        /*$("#formproduct").submit();
        $("#formproduct").attr("action", "index.php?module=products");*/
    });//End submit user

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

});//End document ready
