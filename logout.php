<?php

//$_SESSION['user_id'] = -1;
//session_destroy();
session_unset($_SESSION['user_id']);
header('Location: ./index.php');
