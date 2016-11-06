<section >
    <div class="container">

        <?php
        if (isset($arrData) && !empty($arrData)) {
            ?>
            <div class="media">
                <div class="pull-left">
                    <img src="<?php echo $arrData['prodpic']?>" class="img-product" >
                </div>
                <div class="media-body">
                    <h3 class="media-heading title-product"><?php echo $arrData['prodname'] ?></h3>
                    <p class="text-limited"><?php echo $arrData['proddesc'] ?></p>
                    <br>
                    <h5 class="special"> <strong>Price: <?php echo $arrData['prodprice'] ?>€</strong> </h5>


                </div>
            </div>
            <?php
        }
        ?>

    </div>
</section>
