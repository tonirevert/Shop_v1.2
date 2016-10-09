<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/3.51/jquery.form.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.0.1/min/dropzone.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.0.1/dropzone.css">
<!--End of dropzone scripts-->
<script type="text/javascript" src="modules/products/view/js/controller_products.js"></script>
<br>
<br>
<br>
<br>
<br>
<p><h2>Input a new product:</h2></p>
 <div class="status alert alert-success" style="display: none"></div>
<form name="formroduct" id="formproduct">
    <br>
    <table>
        <tr>
           <td>Name: </td>
           <td><input type="text" name="prodname" id="prodname" required="required" placeholder="Product name"
             value=""/>
             <div id="error_prodname"></div>
           </td>
        </tr>
        <tr>
           <td>Reference: </td>
           <td><input type="text" name="prodref" id="prodref" required="required" placeholder="Reference"
            value=""/>
            <div id="error_prodref"></div>
           </td>
        </tr>
        <tr>
           <td>Price: </td>
           <td><input type="text" name="prodprice" id="prodprice" required="required" placeholder="Price"
            value=""/>
            <div id="error_prodprice"></div>
          </td>
        </tr>
        <tr>
		   <td>Reception date: </td>
		   <td><input type="text" name="date_reception" id="date_reception" placeholder="Reception date" readonly="readonly"
         value=""/>
         <div id="error_date_reception"></div>
       </td>
		</tr>
		<tr>
		   <td>Expiration date: </td>
		   <td><input type="text" name="date_expiration" id="date_expiration" placeholder="Expiration date" readonly="readonly"
         value=""/>
         <div id="error_date_expiration"></div>
       </td>

		</tr>
		<tr>
      <div class="form-group">
           <td>Category: </td>
           <td>
              1 <input type="checkbox" name="category[]" class="catCheckbox" value="cat1">
		          2 <input type="checkbox" name="category[]" class="catCheckbox" value="cat2">
			        3 <input type="checkbox" name="category[]" class="catCheckbox" value="cat3">
			        4 <input type="checkbox" name="category[]" class="catCheckbox" value="cat4" id="error_category">
			  <!--<td><div id="error_category"></div></td>-->
      </div>
           </td>
        </tr>
        <tr>
            <td>Packaging:</td>
            <td>
                None <input name="packaging" id="packaging" type="radio" class="packaging" value="none" checked>
				        Boxed <input name="packaging" id="packaging" type="radio" class="packaging" value="boxed">
				        Bagged <input name="packaging" id="packaging" type="radio" class="packaging" value="bagged">
            </td>
        </tr>
        <tr><td>Origin:</td></tr>
        <tr>
            <td>Country: </td>
			  <td id="error_country">
			    <select name="country" id="country">
			    <option selected>Select country</option>
				<option value="spain">Spain</option>
				<option value="portugal">Portugal</option>
				<option value="uk">UK</option>
				<option value="ireland">Ireland</option>
				</select>
				<div ></div>
			</td>
        </tr>
        <tr>
          <td> </td>
        </tr>
        <tr>
            <td>Province: </td>
			  <td id="error_province">
			    <select name="province" id="province">
			    <option selected>Select province</option>
				<option value="barcelona">Barcelona</option>
				<option value="madrid">Madrid</option>
				<option value="sevilla">Sevilla</option>
				<option value="valencia">Valencia</option>
				</select>
				<div></div>
			</td>
        </tr>
        <tr>
          <td> </td>
        </tr>
        <tr>
            <td>City: </td>
			  <td id="error_city">
			    <select name="city" id="city">
			    <option selected>Select city</option>
				<option value="ontinyent">Ontinyent</option>
				<option value="barcelona">Barcelona</option>
				<option value="madrid">Madrid</option>
				<option value="sevilla">Sevilla</option>
				<option value="valencia">Valencia</option>
				</select>
				<div></div>
			</td>
        <tr>
           <td>Description: </td>
           <td><textarea rows="4" cols="50" name="proddesc" id="proddesc" placeholder="Product description"
             value=""></textarea>
             <div id="error_proddesc"></div>
           </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
            <div class="form-group" id="progress">
            <div id="bar"></div>
            <div id="percent">0%</div >
            </div>

            <div class="msg"></div>
            <br/>
            <div id="dropzone" class="dropzone"></div><br/>
          </td>
        </tr>
    </table>
    <br/>
    <button type="button" name="submit_products" id="submit_products" value="submit">
      Submit product
    </button>
</form>
<br>
<br>
<br>
<br>
<br>
