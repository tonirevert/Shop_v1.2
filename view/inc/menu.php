<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">LOGO</a>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
                <li class=<?php if($_GET['module']== "main"){ echo "active";}else{ echo "";}?>>
                  <a href="index.php?module=main">HOME</a></li>
                <li class=<?php if($_GET['module']=='products'){echo 'active';}else{ echo "";}?>>
                  <a href="index.php?module=products&view=create_products">PRODUCTS</a></li>
                  <!--<li class=<?php if($_GET['module']=='products'){echo 'active';}else{ echo "";}?>>
                    <a href="index.php?module=products">LIST</a></li>-->
                <li class=<?php if($_GET['module']=='products_frontend'){echo 'active';}else{ echo "";}?>>
                    <a href="index.php?module=products_frontend&view=list_products">LIST</a></li>
                <li class=<?php if($_GET['module']=='services'){echo 'active';}else{ echo "";}?>>
                  <a href="index.php?module=services">SERVICES</a></li>
                <li class=<?php if($_GET['module']=='portfolio'){echo 'active';}else{ echo "";}?>>
                  <a href="index.php?module=portfolio">PORTFOLIO</a></li>
                <li class=<?php if($_GET['module']=='pricing'){echo 'active';}else{ echo "";}?>>
                  <a href="index.php?module=pricing">PRICING</a></li>
                <li class=<?PHP if($_GET['module']=='contact'){echo 'active';}else{ echo "";}?>>
                  <a href="index.php?module=contact">CONTACT</a></li>
            </ul>
        </div>
    </div>
</div>
<br/>
<section id="title" class="emerald">
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <h1><?php
                    if (!isset($_GET['module'])) {
                        echo "Home";
                    } else if (isset($_GET['module']) && !isset($_GET['view'])) {
                        echo "<a href='index.php?module=" . $_GET['module'] . "'>" . $_GET['module'] . "</a>";
                    }else{
                        echo "<a href='index.php?module=" . $_GET['module'] . "&view=".$_GET['view']."'>" . $_GET['module'] . "</a>";
                    }
                    ?></h1>
                <strong>Web de test del proyecto</strong>


            </div>
             <h2 class="BackHome"><a href="index.php">Back Home</a></h2>
        </div>
    </div>
</section>
