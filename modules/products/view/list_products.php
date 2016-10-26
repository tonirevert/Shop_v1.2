<section >
    <div class="container">
        <div id="list_prod" class="row text-center pad-row">
            <ol class="breadcrumb">
                <li class="active" >Products</li>
            </ol>
            <br>
            <br>
            <br>
            <br>
            <?php

            if (isset($arrData) && !empty($arrData)) {
                foreach ($arrData as $product) {
                    //echo $productos['id'] . " " . $productos['nombre'] . "</br>";
                    //echo $productos['descripcion'] . " " . $productos['precio'] . "</br>";
                    ?>
                    <div class="col-md-4 col-sm-4">
                    <a id="prod" href="index.php?module=products&idProduct=<?php echo $product['prodref'] ?>" >
                        <img class="prodImg" src=<?php echo $product['prodpic'] ?> alt="product" >
                        <p><?php echo $product['prodname'] ?></p>
                        <p id="p2"><?php echo $product['prodprice'] ?>€</p>
                    </a>
                  </div>
                    <?php
                }
            }
            ?>
        </div>
    </div>
</section>
