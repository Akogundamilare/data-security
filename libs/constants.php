<?php


// dont add a trailing / at the end
define('HTTP_SERVER', 'http://us-cdbr-east-02.cleardb.com');
// add slash / at the end
define('SITE_DIR', '/aes.drive/');

// database prefix if you use
define('DB_PREFIX', 'aes_');

define('DB_DRIVER', 'mysql');
define('DB_HOST', getenv('DB_HOST'));
define('DB_HOST_USERNAME', getenv('DB_USERNAME'));
define('DB_HOST_PASSWORD', getenv('DB_PASS'));
define('DB_DATABASE', getenv('DB_NAME'));

define('SITE_NAME', 'aes.drive');

// define database tables
define('TABLE_ADMIN_USER', DB_PREFIX.'admin_user');
define('TABLE_ADMIN_SHARE', DB_PREFIX.'admin_share');
define('TABLE_ADMIN_RSA', DB_PREFIX.'admin_aes');




