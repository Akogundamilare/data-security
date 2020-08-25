<?php
require('vendor/autoload.php');

require_once './libs/config.php';
require_once './libs/constants.php';
?>


<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>RNS-AES Drive</title>
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
        <img src="public/icon/logo.jpg" id="icon" width="80" alt="User Login Icon"/>
      <!--<img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />-->
    </div>

    <!-- Login Form method="POST" action="settings.php" -->
    <form >
      <input type="text" id="login" class="fadeIn second" name="login" placeholder="login">
      <input type="password" id="password" class="fadeIn third" name="login" placeholder="password">
      <input type="button" class="fadeIn fourth login_sub" value="Log In" />
    
    </form>

    <!-- Remind Passowrd -->
    <div id="formFooter">
        <a class="underlineHover" href="register.php">New User? Register</a>
    </div>

  </div>
</div>
        
        
    </body>
</html>
