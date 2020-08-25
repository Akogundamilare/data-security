<?php
require_once './libs/config.php';
require_once './libs/constants.php';
session_set_cookie_params(0);
session_start();
$conn = new mysqli(DB_HOST, DB_HOST_USERNAME, DB_HOST_PASSWORD, DB_DATABASE)or die(mysql_error());
switch ($_GET['load']) {
    case 'upload_to_folder':
        upload_to_folder($conn);
        break;
        case 'upload_insert_db':
        upload_insert_db($conn);
        break;
        case 'getData':
        getData($conn);
        break;
    case 'getDelete':
        getDelete($conn);
        break;
    case 'getDeleteR':
        getDeleteR($conn);
        break;
    case 'listOfICONs':
        listOfICONs();
        break;
    case 'getDecryp':
        getDecryp($conn);
        break;
        case 'registerUser':
            registerUser($conn);
            break;
    case 'loginUser':
        loginUser($conn);
        break;
    case 'changePassword':
        changePassword($conn);
        break;
    case 'upload_share_db':
        upload_share_db($conn);
        break;
    case 'getDataReceived':
        getDataReceived($conn);
        break;
    case 'fileSize_Call':
        fileSize_Call($conn);
            break;
}



function upload_to_folder($conn){

$filename = $_FILES['file']['name'];

/* Location */
$location = "upload/".$filename;
$uploadOk = 1;
$imageFileType = pathinfo($location,PATHINFO_EXTENSION);

   if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
      echo $location;
   }else{
      echo 0;
   }
}

function file_newname($path, $filename){
    if ($pos = strrpos($filename, '.')) {
           $name = substr($filename, 0, $pos);
           $ext = substr($filename, $pos);
    } else {
           $name = $filename;
    }

    $newpath = $path.'/'.$filename;
    $newname = $filename;
    $counter = 0;
    while (file_exists($newpath)) {
           $newname = $name .'_'. $counter . $ext;
           $newpath = $path.'/'.$newname;
           $counter++;
     }

    return $newname;
}

function file_newname_split($filename){
    if ($pos = strrpos($filename, '.')) {
           $name = substr($filename, 0, $pos);
           $ext = substr($filename, $pos);
    }
    return $name;
}
function upload_insert_db($conn){
    $date =  Date('d-m-Y h:i:s');   
    $fileName = file_newname("./document/my/", $_POST['fileName'].".txt");
    $f1 = "./document/my/".$fileName;  
    $f2 = "./document/single/".$fileName;
    $fileName = file_newname_split($fileName);
    $myfile = fopen($f1, "w") or die("Unable to open file!");
$txt = $_POST['encrypted'];
fwrite($myfile, $txt);
fclose($myfile);
$myfile2 = fopen($f2, "w") or die("Unable to open file!");
$txt2 = $_POST['aesEnc'];
fwrite($myfile2, $txt2);
fclose($myfile2);
    $insertInto = $conn->query("INSERT INTO ".TABLE_ADMIN_RSA." VALUES(null, '".$_POST['userId']."', '".$f1."', '".$fileName."', '".$f2."',   '".$date."')");
if ($insertInto > 0){
    echo 200;
}else{
    echo 401;
}
//    $name = pathinfo($f11, PATHINFO_FILENAME);
//$extension = pathinfo($f11, PATHINFO_EXTENSION);
//
//$increment = ''; //start with no suffix
//
//while(file_exists($name . $increment . '.' . $extension)) {
//    $increment++;
//}
//
//$basename = $name . $increment . '.' . $extension;
//echo $basename;
    
//    $row_cnt = $select->num_rows;
//    $fileName = $_POST['fileName'];
//    $sum = 1;
//    if(checkExistence($f11, $fileName)){ 
//        
////        while ($row = $select->fetch_array()) {
////            $sum +=1;
////        }
//      $f1 = "./document/my/".$_POST['fileName'].checkExistence($f11, $fileName).".txt";  
//      $f2 = "./document/single/".$_POST['fileName'].checkExistence($f11, $fileName).".txt";
//        $fileName = $fileName.checkExistence($f11, $fileName);
//      $myfile = fopen($f1, "w") or die("Unable to open file!");
//$txt = $_POST['encrypted'];
//fwrite($myfile, $txt);
//fclose($myfile);
//
//$myfile2 = fopen($f2, "w") or die("Unable to open file!");
//$txt2 = $_POST['aesEnc'];
//fwrite($myfile2, $txt2);
//fclose($myfile2);
//    }else{
//        $f1 = "./document/my/".$_POST['fileName'].".txt";
//        $f2 = "./document/single/".$_POST['fileName'].".txt";
//        
//        $myfile = fopen($f1, "w") or die("Unable to open file!");
//$txt = $_POST['encrypted'];
//fwrite($myfile, $txt);
//fclose($myfile);
//
//$myfile2 = fopen($f2, "w") or die("Unable to open file!");
//$txt2 = $_POST['aesEnc'];
//fwrite($myfile2, $txt2);
//fclose($myfile2);
//    }
//    
//    
//
////  echo $f1;  
//    $insertInto = $conn->query("INSERT INTO ".TABLE_ADMIN_RSA." VALUES(null, '".$_POST['userId']."', '".$f1."', '".$fileName."', '".$f2."',   '".$date."')");
//if ($insertInto > 0){
//    echo 200;
//}else{
//    echo 401;
//}
//    $insertInto = $conn->query("INSERT INTO ".TABLE_ADMIN_RSA." VALUES(null, '".$_POST['userId']."', '".$_POST['encrypted']."', '".$_POST['fileName']."', '".$_POST['aesEnc']."',   '".$date."')");
//if ($insertInto > 0){
//    echo 200;
//}else{
//    echo 401;
//}
    
//    echo 'KLECC  '.$_POST['encrypted'].'   '.$_POST['fileName'];
}


function getData($conn){
    
//    echo $_GET['userId'];
    $select = $conn->query("SELECT * FROM ".TABLE_ADMIN_RSA." WHERE user_id= '".$_GET['userId']."' ");
//   
    $row_cnt = $select->num_rows;
 // echo md5($_POST['password']);
 
 if($row_cnt > 0){    
 
     echo json_encode($select->fetch_all(MYSQLI_ASSOC));
 }else{
     echo '';
 }
 
}

function getDataReceived($conn){
//    echo $_GET['userId'];
    $select1 = $conn->query("SELECT * FROM ".TABLE_ADMIN_USER." WHERE id= '".$_GET['userId']."' ");
    $row = $select1->fetch_array();
//    echo $row['username'];
    $select2 = $conn->query("SELECT * FROM ".TABLE_ADMIN_SHARE." WHERE user_name= '".$row['username']."' ");
    $row2 = $select2->fetch_array();
    $select = $conn->query("SELECT * FROM ".TABLE_ADMIN_RSA." WHERE id= '".$row2['file_id']."' ");
    
    
//    echo json_encode($select->fetch_all(MYSQLI_ASSOC));
    $row_cnt = $select->num_rows;
 // echo md5($_POST['password']);
 
 if($row_cnt > 0){    
 
     echo json_encode($select->fetch_all(MYSQLI_ASSOC));
 }else{
     echo '';
 }
}

function listOfICONs(){
    echo json_encode(scandir("icon/"));
}

function getDecryp($conn){
 $id = $_GET['myId'];
// echo $id.'   JJJJ';
    $select = $conn->query("SELECT * FROM ".TABLE_ADMIN_RSA." WHERE  id='".$_GET['myId']."' ");
//    
    $row = $select->fetch_array();
//    
     echo $row['id'].'::::'.$row['name'].'::::'.$row['aesdata'].'::::'.$row['aes'];//$row['cp'];
    
}

function registerUser($conn){
 $insertInto = $conn->query("INSERT INTO ".TABLE_ADMIN_USER." VALUES(null, '".$_POST['username']."', '". md5($_POST['password'])."', 'user',   '0')");
if ($insertInto > 0){
    echo 200;
}else{
    echo 401;
}   
    
}

function loginUser($conn){
    
    $quer = "SELECT * FROM ".TABLE_ADMIN_USER." WHERE username='".$_GET['username']."' AND password='".md5($_GET['password'])."' ";   
    $stm = $conn->query($quer);
 $row_cnt = $stm->num_rows;
 $row = $stm->fetch_assoc();
 
// echo md5($_POST['password']);
 
 if($row_cnt > 0){    
     if( isset($row['username'])){
         $_SESSION['user_id'] = $row['id'];
//         header('location: rsa.drive.php');
         echo '200'.'::::'.$_SESSION['user_id'];         
     } else {
         echo 401;
         }
    
 }else{

     echo 404;


 }
}

function changePassword($conn){
   
 $insertInto = $conn->query("UPDATE ".TABLE_ADMIN_USER." SET password ='".md5($_POST['newPass'])."' WHERE password = '".md5($_POST['oldPass'])."' AND id = '".$_POST['myId']."'");
if ($insertInto === TRUE){
    echo 200;
}else{
    echo 401;
}   
            
}

function getDelete($conn){
    $dele = $conn->query("DELETE FROM ".TABLE_ADMIN_RSA." WHERE id='".$_GET['myId']."' ");
    if($dele === TRUE){
        echo 200;
    }else{
        echo 401;
    }
}

function getDeleteR($conn){
    $dele = $conn->query("DELETE FROM ".TABLE_ADMIN_SHARE." WHERE file_id='".$_GET['myId']."' ");
    if($dele === TRUE){
        echo 200;
    }else{
        echo 401;
    }
}
function upload_share_db($conn){
    $date =  Date('d-m-Y h:i:s');
    // document
    $username = $_POST['username'];
    
    $select = $conn->query("SELECT * FROM ".TABLE_ADMIN_USER." WHERE username = '".$username."'");
//    
    $row_cnt = $select->num_rows;
//    
    if($row_cnt > 0){      
//
    $insertInto = $conn->query("INSERT INTO ".TABLE_ADMIN_SHARE." VALUES(null, '".$_POST['myId']."', '".$_POST['username']."', '".$_POST['userId']."',  '".$date."')");
if ($insertInto > 0){
    echo 200;
}else{
    echo 400;
}
//
//
//        echo '  '.$username.'   '.$_POST['myId'].'    '.$date;
    }else{
//        
    }
//    $insertInto = $conn->query("INSERT INTO ".TABLE_ADMIN_RSA." VALUES(null, '".$_POST['userId']."', '".$_POST['encrypted']."', '".$_POST['fileName']."', '".$_POST['aesEnc']."',   '".$date."')");
//if ($insertInto > 0){
//    echo 200;
//}else{
//    echo 401;
//}
    
//    echo 'KLECC  '.$_POST['encrypted'].'   '.$_POST['fileName'];
}

function fileSize_Call($conn){
    
    $select1 = $conn->query("SELECT * FROM ".TABLE_ADMIN_USER." WHERE id= '".$_GET['myId']."' ");
    $row = $select1->fetch_array();
 
    $row_cnt = $select1->num_rows;
    $total_aes = 0;
    $total_aes_norm = 0;
    if($row_cnt > 0){
//        
//        
//        //    echo $row['username'];
    $select2 = $conn->query("SELECT * FROM ".TABLE_ADMIN_SHARE." WHERE user_name= '".$row['username']."' ");
    
//    $row2 = $select2->fetch_array();
    
    while ($row2 = $select2->fetch_array()) {
        $select3 = $conn->query("SELECT * FROM ".TABLE_ADMIN_RSA." WHERE id= '".$row2['file_id']."' ");
        while ($row3 = $select3->fetch_array()) {
//            echo $row3['aesdata'];
            $total_aes += returnFileSize($row3['aesdata']);
            $total_aes_norm += returnFileSize($row3['aes']);
        }
    }
     $select3 = $conn->query("SELECT * FROM ".TABLE_ADMIN_RSA." WHERE user_id= '".$_GET['myId']."' ");
        while ($row3 = $select3->fetch_array()) {
//            echo $row2['file_id'];
            $total_aes += returnFileSize($row3['aesdata']);
            $total_aes_norm += returnFileSize($row3['aes']);
        }
//    
////    $row_cnt2 = $select2->num_rows;
////    
////    if($row_cnt2 > 0){
////    $select = $conn->query("SELECT * FROM ".TABLE_ADMIN_RSA." WHERE id= '".$row2['file_id']."' ");
////    }
//
//    
    echo ($total_aes +  $total_aes_norm);
    }
//    
}

function returnFileSize($filename){
    $fileSize = filesize($filename);
        return $fileSize;
}



//$row_cnt = $select->num_rows;
// // echo md5($_POST['password']);
// 
// if($row_cnt > 0){    
// 
//     echo json_encode($select->fetch_all(MYSQLI_ASSOC));
// }else{
//     echo '';
// }