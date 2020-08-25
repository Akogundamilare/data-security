
<?php
//require_once '../libs/config.php';
//require_once '../libs/constants.php';
?>


<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">
       <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
       <script src="public/js/jquery-3.4.1.min.js" type="text/javascript"></script>
       <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>-->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<script src="admin_js/connector.js" type="text/javascript"></script>
<link href="public/css/admin-ma.css" rel="stylesheet" type="text/css"/>
<script src="public/js/register.js" type="text/javascript"></script>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css">
    </head>
    <body>
       
       <div class="wrapper fadeInDown">
           <?php require_once './title.php';?>
  <div id="formContent">
    <!-- Tabs Titles -->

    <!-- Icon -->
    <div class="fadeIn first">
        <i class="glyphicon glyphicon-user"></i>
        <img src="public/icon/reg.jpg" id="icon" width="40" alt="User Icon"/>
      <!--<img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />-->
    </div>

    <!-- Login Form method="POST" action="settings.php" -->
    <form >
      <input type="text" id="username" class="fadeIn second" name="login" placeholder="Enter Username">
      <input type="password" id="password" class="fadeIn third" name="login" placeholder="Enter Password">
      <input type="button" class="fadeIn fourth reg_sub" value="Sign Up" />    
    </form>

    <div id="formFooter">
        <a class="underlineHover" href="index.php">Already a member? Login</a>
    </div>

  </div>
</div>
        
        
    </body>
</html>