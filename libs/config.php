<?php

// display all error except deprecated and notice  
error_reporting( E_ALL & ~E_DEPRECATED & ~E_NOTICE );
// turn on output buffering 
ob_start();

/*
if you make login section for admin 
use session here otherwise no need
session_start();
*/

require_once("constants.php");
require_once("common_functions.php");

/*
 * turn off magic-quotes support, for runtime e, as it will cause problems if enabled
 */
if (version_compare(PHP_VERSION, 5.3, '<') && function_exists('set_magic_quotes_runtime')) set_magic_quotes_runtime(0);

// set currentPage in the local scope
$currentPage = pathinfo($_SERVER['PHP_SELF'], PATHINFO_FILENAME);


// basic options for PDO 
$dboptions = array(
    PDO::ATTR_PERSISTENT => FALSE,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
);

$db_host = getenv('DB_HOST');
$db_username = getenv('DB_USERNAME');
$db_pass = getenv('DB_PASS');

//connect with the server
try {
    $con = new PDO('mysql:host=' . $db_host . ';', $db_username, $db_pass);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $con ->exec("CREATE DATABASE IF NOT EXISTS ".DB_DATABASE);
    $DB = new PDO(DB_DRIVER . ':host=' . DB_HOST . ';dbname=' . DB_DATABASE, DB_HOST_USERNAME, DB_HOST_PASSWORD, $dboptions);

if($con){
//$db = new PDO('mysql:host=localhost;dbname=registration', 'root','');
//$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$DB ->exec("CREATE TABLE IF NOT EXISTS ".TABLE_ADMIN_RSA."(id int(11) NOT NULL AUTO_INCREMENT, 
    user_id text,
aesdata text,
name text,
aes text,
date text,
PRIMARY KEY (`id`)
)");

$DB ->exec("CREATE TABLE IF NOT EXISTS ".TABLE_ADMIN_SHARE."(id int(11) NOT NULL AUTO_INCREMENT, 
file_id text,
user_name text,
user_from text,
date_share text,
PRIMARY KEY (`id`)
)");

$DB ->exec("CREATE TABLE IF NOT EXISTS ".TABLE_ADMIN_USER."(
        `id` int(11) NOT NULL AUTO_INCREMENT, 
        `username` text,
        `password` text,
        `privillege` varchar(50) NOT NULL,
        `status` int(50) NOT NULL,
        PRIMARY KEY (`id`)
        )");

$DB->exec("INSERT INTO ".TABLE_ADMIN_USER." VALUES (1, 'admin', '".md5("admin")."', 'admin', '0')");

/* End config */

}else{

echo "Connection Failed";

}
    
    
    
} catch (Exception $ex) {
//    echo errorMessage($ex->getMessage());
//    die;
}

?>