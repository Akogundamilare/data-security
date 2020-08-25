<?php
error_reporting( E_ALL & ~E_DEPRECATED & ~E_NOTICE );
require_once './libs/config.php';
require_once './libs/constants.php';
session_start();
//echo $_SESSION['user_id'];
if(!$_SESSION['user_id'] == ''){
    
//    return TRUE;
} else {
header('location: logout.php')  ;    
}
?>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>RNS-AES Drive</title>
        <link href="public/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css"/>
        <link href="public/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <!--<script src="public/js/jquery-3.4.1.min.js" type="text/javascript"></script>-->
        <script src="public/js/vendor/jquery-1.11.2.js" type="text/javascript"></script>
        <script src="public/js/ga.js" type="text/javascript"></script>
        <script src="public/js/responsiveslides.min.js" type="text/javascript"></script>
        <script src="public/js/vendor/bootstrap.min.js" type="text/javascript"></script>
        <script src="public/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js" type="text/javascript"></script>
        <script src="public/js/vendor/npm.js" type="text/javascript"></script>
        <script src="rsa.js" type="text/javascript"></script>
<!--        <script src="base64.js" type="text/javascript"></script>
        <script src="hex.js" type="text/javascript"></script>
        <script src="keygen.js" type="text/javascript"></script>-->
        <script src="public/js/jquery.min.js" type="text/javascript"></script>
        <link href="public/css/main.css" rel="stylesheet" type="text/css"/>
        <script src="public/js/main.js" type="text/javascript"></script>
        <!--<script src="public/js/aes.js" type="text/javascript"></script>-->
        <script src="public/js/CryptoJS v3.1.2/rollups/aes.js" type="text/javascript"></script>
<!--        <script language="Javascript" type="text/javascript">


</script>-->
       
<!--        <script>
      var openFile = function(event) {
        var input = event.target;

        var reader = new FileReader();
        reader.onload = function(){
          var text = reader.result;
          var node = document.getElementById('output');
          node.innerText = text;
          console.log(reader.result.substring(0, 200));
        };
        reader.readAsText(input.files[0]);
      };
    </script>-->

    </head>
    <body>

        <div class="container-fluid">
            <div class="row ">
                <!--<div class="col-sm-4 center-block">-->
<!--                    <h2 class="alert-info">AES Cloud Drive</h2>-->
<div class="col-sm-12 text-center">
<?php require_once './title.php';?>
</div>
                <!--</div>-->
                <div class="col-sm-4 center-block"> 
                
                <div class="form-group has-success has-feedback" >
  
<!--                    <input type="text" class="form-control text-center"  id="inputSuccess2" aria-describedby="inputSuccess2Status">
  <span class="glyphicon glyphicon-search form-control-feedback" aria-hidden="true"></span>
  <span id="inputSuccess2Status" class="sr-only">(success)</span>-->
</div>
                </div>
                <div class="col-sm-4"></div>
            </div>
            
            
            <div class="row">
  <div class="col-xs-12 col-md-2 " >
      
  
      <ul class="nav nav-pills nav-stacked">
  <li role="presentation" class="" data-toggle="modal" data-target="#myModal"><a href="#"id="click2Upload"><img src="public/icon/plus.png" width="35"  alt=""/> Encrypt/Decrypt </a></li>
  
</ul> 
      <br>
      
      
<ul class="nav nav-pills nav-stacked">
  <li role="presentation" class="active"><a href="#" id="Home">Home</a></li>
  <li role="presentation"><a href="#" id="Cpass">Change Password</a></li>
  <li role="presentation"><a href="logout.php">Logout</a></li>
</ul>  
  </div>
                <div class="col-xs-12 col-md-10 ">
                    
                    <div class="panel panel-default">
  <div class="panel-heading">
      <h3 class="panel-title"><span id="titleList">My Drive</span> <span id="swit"><i class="glyphicon glyphicon-exclamation-sign pull-right"></i></span></h3>
  </div>
                        <div class="panel-body" id="display-panel" >
      
      
      <div class="col-sm-8 " id="bigerShow" >
          <div class="" id="innerShow" style="overflow: scroll; height: 500px;">
          <div class="col-sm-12" id="messageEn">
              
          </div>
          
          <div class="col-sm-12" id="alphaToAsii">
              <div class="col-sm-5">
                  <label>Text Splitting to character(s)</label>
                  <textarea id="messageSpliting" readonly="readonly" class="form-control" rows="6"></textarea>                  
              </div>
              <div class="col-sm-2 text-center" ><br><br><=Character(s) to ASCII=></div>
              <div class="col-sm-5 " id="" >
                  <label>Text Converting to Decimal</label>
                  <textarea id="messageASCII" readonly="readonly" class="form-control" rows="6"></textarea>                  
              </div>
              
          </div>
          
          <div class="col-sm-12" id="decimalResidual">
              <div class="col-sm-5">
                  <label>Moduli Result(s)</label>
                  <textarea id="moduliResult" class="form-control" readonly="readonly" rows="6"></textarea>                  
              </div>
              <div class="col-sm-2 text-center"><br><br><=Decimal to Residues=></div>
              <div class="col-sm-5 " id="" >
                  <label>Getting Residues from Decimal</label>
                  <!--readonly="readonly"-->
                  <textarea id="gettingResidualData" class="form-control"  rows="6"></textarea>                  
              </div>
              
          </div>
          
          <div class="col-sm-12" id="encryptedAES">
              <div class="col-sm-5">
                  <label>Encryption Keys(s)</label>
                  <textarea id="keyResult" class="form-control" readonly="readonly" rows="6"></textarea>                  
              </div>
              <div class="col-sm-2 text-center"><br><br><=Residues to AES=></div>
              <div class="col-sm-5 " id="" >
                  <label>Data After Encryption</label>
                  <!--readonly="readonly"-->
                  <textarea id="gettingEncryption" class="form-control" rows="6"></textarea>                  
              </div>
              
          </div>
              
              
              
              
              <div class="col-sm-12" id="encryptedDetail">
              <div class="col-sm-5">
                  <label>Text Uploaded Metrics</label>
                  <textarea id="uploadedMetrics" class="form-control" readonly="readonly" rows="6"></textarea>                  
              </div>
              <div class="col-sm-2 text-center"><br><br><=Uploaded to After AES=></div>
              <div class="col-sm-5 " id="" >
                  <label>After Encryption Metrics</label>
                  <textarea id="afterAES" class="form-control" readonly="readonly" rows="6"></textarea>                  
              </div>
              
          </div>
              
              <!--s-->
              <div class="col-sm-12" id="aesDetail">
              <div class="col-sm-5">
                  <label>Text Uploaded Metrics</label>
                  <textarea id="uploadedKey" class="form-control" readonly="readonly" rows="6"></textarea>                  
                  <textarea id="uploadedAESMetrics" class="form-control" readonly="readonly" rows="6"></textarea>                  
              </div>
              <div class="col-sm-2 text-center"><br><br><=Uploaded to After AES=></div>
              <div class="col-sm-5 " id="" >
                  <label>After AES</label>
                  <textarea id="afterAESCode" class="form-control" readonly="readonly" rows="6"></textarea>                  
                  <textarea id="afterAESMetrics" class="form-control" readonly="readonly" rows="6"></textarea>                  
              </div>
              
          </div>
        
          
        </div>
          
          
           <div class="" id="innerShowSec" style="overflow: scroll; height: 500px;">
               
          <div class="col-sm-12" id="encryptedAESDec">
              <div class="col-sm-5">
                  <label>Encrypted data to Decryption</label>
                  <textarea id="gettingEncryptionDec" class="form-control" readonly="readonly" rows="6"></textarea>                  
              </div>
              <div class="col-sm-2 text-center"><br><br><=AES to Residues=></div>
              <div class="col-sm-5 " id="" >
                  <label>Getting Residues from Decryption</label>
                  <textarea id="gettingResidualDataDec" class="form-control" readonly="readonly" rows="6"></textarea>                  
              </div>
              
          </div>
               
               
               
               
          
          
          <div class="col-sm-12" id="alphaToAsiiDec">
              <div class="col-sm-5">
                  <label>Text Splitting to character(s)</label>
                  <textarea id="messageSplitingDec" class="form-control" readonly="readonly" rows="6"></textarea>                  
              </div>
              <div class="col-sm-2 text-center" ><br><br><=Character(s) to ASCII=></div>
              <div class="col-sm-5 " id="" >
                  <label>Text Converting to Decimal</label>
                  <textarea id="messageASCIIDec" class="form-control" readonly="readonly" rows="6"></textarea>                  
              </div>
              
          </div>
          
          <div class="col-sm-12" id="decimalResidualDec">
              <div class="col-sm-5">
                  <label>Moduli Result(s)</label>
                  <textarea id="moduliResultDec" class="form-control" readonly="readonly" rows="6"></textarea>                  
              </div>
              <div class="col-sm-2 text-center"><br><br><=Residues to Decimal=></div>
              <div class="col-sm-5 " id="" >
                  <label>Getting Decimal from Residues</label>                  
                  <textarea id="gettingASIICFromResidualDataDec" class="form-control" readonly="readonly" rows="6"></textarea>                  
              </div>              
          </div>
               
               
               <div class="col-sm-12" id="decimalResidualDecChar">
              <div class="col-sm-5">
                <label>Getting Decimal from Residues</label>                  
                  <textarea id="gettingASIICFromResidualDataDecSec" readonly="readonly" class="form-control" rows="6"></textarea>                
              </div>
              <div class="col-sm-2 text-center"><br><br><=Decimal to ASCII=></div>
              <div class="col-sm-5 " id="" >
                  <label>From Decimal to ASCII</label>                  
                  <textarea id="gettingASIICFromResidualDataDecChar" readonly="readonly" class="form-control" rows="6"></textarea>                  
              </div>
              
          </div>
               
               
               
               
          
          
              <div class="col-sm-12" id="">
              <label>Plain Text</label>
                  <textarea id="messageEnDec" readonly="readonly" class="form-control" rows="6"></textarea>                  
          </div>
             
               
               
              
              
              <div class="col-sm-12" id="encryptedDetailDec">
              <div class="col-sm-5">
                  <label>Encrypted Text Metrics(RNS-AES)</label>
                  <textarea id="uploadedMetricsDec" readonly="readonly" class="form-control" rows="6"></textarea>                  
              </div>
              <div class="col-sm-2 text-center"><br><br><=AES to Text=></div>
              <div class="col-sm-5 " id="" >
                  <label>After Decryption Metrics</label>
                  <textarea id="afterAESDec" class="form-control" readonly="readonly" rows="6"></textarea>                  
              </div>
              
          </div>
              
               
               
               
               
               <div class="col-sm-12" id="ordinaryAE">
                   <div class="col-sm-5">
                  <label>AES Encrypted Text</label>
                  
                  <textarea id="messageOrdEncDec" class="form-control" readonly="readonly" rows="6"></textarea>                  
                   </div>
                   <div class="col-sm-2 text-center"><br><br><=AES to Text=></div>
                   <div class="col-sm-5">
                  
                    <label>Plain Text Ordinary AES</label>
                  <textarea id="messageOrdDec" class="form-control" readonly="readonly" rows="6"></textarea>                  
                    </div>
               </div>
          <div class="col-sm-12" id="aesDetailDec">
              <div class="col-sm-5">
                  <label>Encrypted Text Metrics(AES)</label>
                  <textarea id="uploadedAESMetricsDec" class="form-control" readonly="readonly" rows="6"></textarea>                  
              </div>
              <div class="col-sm-2 text-center"><br><br><=Uploaded to After AES=></div>
              <div class="col-sm-5 " id="" >
                  <label>Ordinary AES Metrics</label>                 
                  <textarea id="afterAESMetricsDec" class="form-control" readonly="readonly" rows="6"></textarea>                  
              </div>
              
          </div>
        
          
          
        </div>
      </div>
      
      <div class="col-sm-4" id="smallerShow" style="overflow: hidden; height: 500px;">
          <!--<div class="container"> 
          showList          
          showResult
          -->
          <div class="row" >
              <div class="col-sm-12" id="showResult">
                  
              </div>
           <div class="col-sm-12" id="showList">   
          <ul class="nav nav-tabs nav-pills" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" data-toggle="tab" href="#home"><i class="fas fa-wallet  mr-3"></i>Encrypted Data</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#menu1"><i class="fa fa-handshake-o mr-3"></i>Received Data</a>
            </li>

          </ul>
             
                <div class="tab-content">
              <div id="home" class="container tab-pane active" style="color: blue; height: 400px; "><br>
                  <div class="card ">
<!--    <div class="card-header">
      <a class="card-link" data-toggle="collapse" href="#collapseOne">
        Your cloud data
      </a>
    </div>-->
    <!--<div id="collapseOne" class="collapse show" data-parent="#accordion">-->
      <div class="card-body">
        
          <br>
          <div class="col-sm-12 " >
              <div class="card shadow-lg" style="background-color:  #ffffff; color: #0066f6;overflow:  scroll; height: 350px; " id="car">
              <!--<div class="card-header" id="amountTitle"><i class="fas fa-balance-scale mr-2"></i> Data List</div>-->
      
                  <div class="card-body" id="dataValue" >
                  
      </div>
      
           
    </div>
    </div>
      
     
      </div>
    <!--</div>-->
  </div>

              </div>
              
        <div id="menu1" class="container tab-pane fade" style="color: blue;  height: 400px;"><br>
            
            <div class="card">
<!--    <div class="card-header">
      <a class="card-link" data-toggle="collapse" href="#collapseOne1">
        Received File(s)
      </a>
    </div>-->
    <!--<div id="collapseOne1" class="collapse show" data-parent="#accordion1">-->
      <div class="card-body">
        
          <br>
          <div class="col-sm-12" >
              <div class="card" >
      <!--<div class="card-header">Received</div>-->
      
      <div class="card-body" id="dataValueReceived">
          
                 
      </div>
          
    </div>
    </div>
      
     
      </div>
    <!--</div>-->
  </div>
        </div>
          
          </div>
               
               
          </div>
          <!--</div>-->
              
              
              
          <div class="row">
              <div class="col-sm-12">
                  <label class="text-right" id="showZise"></label>
                  <div class="progress" id="pBar">
                      
                      
    
                  </div>
              </div>
          </div>
         
          
          </div>
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          <!--////////////////////////////////////////////////////////////////////-->
      </div>
                            <div class="col-sm-12 text-center">
                                <br>
                                <!--<form>-->
                                <button type="button" class="btn btn-primary btn-sm" id="submitSave" title="Save"><i class="glyphicon glyphicon-cloud-upload"> Store</i></button>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <button type="button" class="btn btn-primary btn-sm" id="exportSave" title="export Save"><i class="glyphicon glyphicon-export"> Export to .txt File</i></button>
                                <!--</form>-->
                            </div>
      
  </div>
                        
                        <div class="panel-body" id="display-panel-Cpassword">
      
                            
                            
                            
                            
                            <fieldset>
                                <legend style="font-size: 18px; color: #2b542c;" class="text-center">Change Password </legend>
            <form action="" method="post" enctype="multipart/form-data" id="form-user-group" class="form-horizontal">
            <input type="hidden" name="id_all" value="<?php echo $select_It_All1['college_id']?>" />
        <div class="form-group ">
            <input type="hidden" id="userId" value="<?php echo  $_SESSION['user_id'];?>" />
<label for="input-college" class="col-sm-5 control-label">Current Password:</label>
            <div class="col-sm-7">
  <input type="text" name="txtLastName" style="color:#2b542c; font-weight: 600;" value="" placeholder="Enter Current Password" id="oldPass" class="form-control" />
                          </div>
          </div>
           <div class="form-group ">
			<label class="col-sm-5 control-label" for="input-accr">New Password:</label>
            <div class="col-sm-7">
                <input type="text" style="color:#2b542c; font-weight: 600;" name="txtMatric" value="" maxlength="15" placeholder="Enter New Password" id="newPass" class="form-control" />
                          </div>
          </div>
            <center>
		     <div class="form-group ">
           
            <div class="col-sm-10">
		    <br>
<button type="button" class="btn btn-primary btn-sm" id="submit1" title="Save"><i class="glyphicon glyphicon-lock"> Change Password</i></button>
<button type="reset" class="btn btn-default btn-sm" title="Reset"><i class="glyphicon glyphicon-remove"> Reset</i></button>
                          </div>
          </div>
			</center>
        
        </form>
    </fieldset>
      
            
      
                        </div>
                        
                        
                        
</div>
                    
                    
                    
                    
                </div>
</div
            
            
            
           
            
            
            
            
        </div>
         </div>
         
         
         
         
         
         <!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title" id="modalTitle">Select from option below</h4>
      </div>
      <div class="modal-body">
          <p>
          <form>
              <input type="radio" id="EnKry" name="en_de" value="1"/>Select to Encrypt
              <input type="radio" id="DnKry" name="en_de" value="2"/>Select to Decrypt
              <input type="hidden" id="userId" value="<?php echo  $_SESSION['user_id'];?>" />
              <input type="file" id="file_Upload" accept='text/plain' onchange='openFile(event)' class="form-control"/>
              <input type="file" id="file_UploadDec" accept='text/plain' onchange='openFile(event)' class="form-control"/>
              <br>
<!--              <span>AES Key Type: 
                  <select id="keyType" class="form-control">
                  <option value="">--Select Key Type--</option>
                  <option value="128">128</option>
                  <option value="192">192</option>
                  <option value="256">256</option>
              </select>
          </span>
              <br>-->
              <span>AES Password: <input id="aESPassword" placeholder="AES Password" title="AES Password" class="form-control input-sm" type="text" required="required"/> </span>
              <br>
              <span>Moduli value: <input id="nPassword" placeholder="Moduli value" title="Moduli value" class="form-control input-sm" type="text" required="required"  maxlength="1"/> </span>
              <br>
              <p>
                  <textarea id="contentShow" rows="4" cols="78" class="form-control"></textarea><br>
                  
                  <label>File Name:  <span id="Fname"></span></label><br>
                  <label>File Type:  <span id="Ftype"></span></label><br>
                  <label>File Size:  <span id="Fsize"></span></label>
              </p>
              
              <div class="">
              
              <button type="button" id="upLOad" data-dismiss="modal" class="btn btn-sm btn-primary">Start Encryption</button>
              <button type="button" id="upLOadDec" data-dismiss="modal" class="btn btn-sm btn-primary">Start Decryption</button>
              
              
          </form>
          </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
         
         
         
         
    </body>
</html>
