<?php


// dont add a trailing / at the end
define('HTTP_SERVER', 'http://localhost');
// add slash / at the end
define('SITE_DIR', '/aes.drive/');

// database prefix if you use
define('DB_PREFIX', 'aes_');

define('DB_DRIVER', 'mysql');
define('DB_HOST', 'localhost');
define('DB_HOST_USERNAME', 'root');
define('DB_HOST_PASSWORD', '');
define('DB_DATABASE', 'aes_drive');

define('SITE_NAME', 'aes.drive');

// define database tables
define('TABLE_ADMIN_USER', DB_PREFIX.'admin_user');
define('TABLE_ADMIN_SHARE', DB_PREFIX.'admin_share');
define('TABLE_ADMIN_RSA', DB_PREFIX.'admin_aes');



