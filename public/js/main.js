function lengthInUtf8Bytes(str) {
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}


function byteLength(str) {
  var s = str.length;
  for (var i=str.length-1; i>=0; i--) {
    var code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s+=2;
    if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
  }
  return s;
}
function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
$(document).ready(function (){
    $('#file_Upload').hide();
    $('#file_UploadDec').hide();
     $('#upLOad').hide();
    $('#upLOadDec').hide();
    $('#innerShow').hide();
    $('#innerShowSec').hide();
    $('#alphaToAsii').hide();
    $('#decimalResidual').hide();
    $('#encryptedAES').hide();
    $('#encryptedDetail').hide();
    $('#aesDetail').hide();
    $('#submitSave').hide();
    $('#exportSave').hide();
    $('#showList').show();
    $('#showResult').hide();
//    $("#smallerShow").html('');
    retrieve_AES();
    retrieve_AES_Sent_Data();
    
    $('#EnKry').click(function(){
        $('#modalTitle').html('Encrypt File');
        $('#file_Upload').show();
    $('#file_UploadDec').hide();
     $('#upLOad').show();
    $('#upLOadDec').hide();
    });
    $('#DnKry').click(function(){
        $('#modalTitle').html('Decrypt File');
        $('#file_Upload').hide();
    $('#file_UploadDec').show();
     $('#upLOad').hide();
    $('#upLOadDec').show();
    });
    
    
    
$('#upLOad').click(function (){
        var password = $('#aESPassword').val();

if($('#nPassword').val() == ''){
            alert('Moduli value is required!');
//}else if($('#keyType').val() == ''){
//            alert('Key Type is required!');
}else if($('#aESPassword').val() == ''){
            alert('AES password is required!');
}    else{
var contentShow = $('#contentShow').val();
          
           var Fname = $('#Fname').text();
              var Ftype = $('#Ftype').text();
              var Fsize = $('#Fsize').text();
                $('#innerShow').show(1000);
                
                $.get('upload.php?load=fileSize_Call',{myId:$('#userId').val()}, function (data, textStatus) {
//           alert(bytesToSize(data));
            var siz = parseInt(Fsize) + parseInt(data);
            if(siz > 10400000){
                alert('You do not have enough space');
            }else{
                	var t0 = performance.now();	
              conVert2ASCII(t0, password);
              
              
              ordinaryAES(password);
            }
           });
                
	
              }  
 });
 
 $('#submitSave').click(function (){
	
	$('#submitSave').hide();
    storeToCloud(); 
});

$('#exportSave').click(function(){
    exportToTxt($('#gettingEncryption').val() );
//exportToTxt('ss');
//        alert($('#gettingEncryption').val()); 
});
 });
 
 function exportToTxt(tile){
     
     function download() {

    var fileContents = tile;//JSON.stringify(jsonObject, null, 2);
    var fileName = $('#Fname').text().toString().split('.txt')[0];

    var pp = document.createElement('a');
    pp.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContents));
    pp.setAttribute('download', fileName+".txt");
    pp.click();
  }
  setTimeout(function() {
    download()
  }, 500);
 }
 
function storeToCloud(){
    var fileName = $('#Fname').text().toString().split('.txt')[0];
    var encrypted = $('#gettingEncryption').val();
    var aesEnc = $('#afterAESCode').val();
                        
                        $.post('upload.php?load=upload_insert_db', {encrypted:encrypted, fileName:fileName, aesEnc:aesEnc, userId:$('#userId').val()}, function (data, textStatus) {
//                              alert(data); 
                            if(parseInt(data) === 200){
                                   alert(fileName+' Text Encrypted and Uploaded Successfully');
                                   retrieve_AES();
                                   retrieve_AES_Sent_Data();
                                   reloadData();
                                   $('#submitSave').hide();
                               }else{
                                   alert(fileName+' failed to uploaded');
                            }
                            
});


};

var contentShow;
function conVert2ASCII(t0, password){
    contentShow=document.getElementById("contentShow");
    $('#messageEn').html(contentShow);
    
    var stRAScii = "";
    var text = $('#messageEn').text().toString();
    var arr = text.split('').toString();
    $('#messageSpliting').append(arr);
    for (var i = 0; i < text.length; i++) {
        if(i === (text.length - 1)){
            stRAScii += text[i].charCodeAt(0);
        }else{
        stRAScii += text[i].charCodeAt(0)+',';
    }
  }
    
    $('#messageASCII').html(stRAScii);
    $('#alphaToAsii').show(1000);
        
        getResiduces(t0, password);
}

function getResiduces(t0, password){
    
    var n = $('#nPassword').val();           
              var n1, n2, n3;
              n1 = Math.pow(2, n);
              n2 = (Math.pow(2, 2 * n) - 1);
              n3 = (Math.pow(2, 2*n) + 1);
    $('#moduliResult').append('n  =>'+n+'\n');
    $('#moduliResult').append('2^n  =>'+n1+'\n');
    $('#moduliResult').append('2^2n - 1  =>'+n2+'\n');
    $('#moduliResult').append('2^2n + 1  =>'+n3);
    
    
    var text = $('#messageASCII').val().toString().split(',');
    var residual = "";
  for (var i = 0; i < text.length; i++) {
      if(i === (text.length - 1)){
          residual += (parseInt(text[i])%n1).toString()+',';
          residual += (parseInt(text[i])%n2).toString()+',';
          residual += (parseInt(text[i])%n3).toString();
      }else{
          residual += (parseInt(text[i])%n1).toString()+',';
          residual += (parseInt(text[i])%n2).toString()+',';
          residual += (parseInt(text[i])%n3).toString()+'/';
      }
  }

document.getElementById('gettingResidualData').innerHTML = residual.toString();

    $('#decimalResidual').show(1000);
   
encryptUsingAES(t0, password);
    
}
 //'my long and very secretive passphrase';
function encryptUsingAES(t0, password){
//    alert($('#keyType').val());
    var data = $('#gettingResidualData').val();
    

        var encrypted = CryptoJS.AES.encrypt(data, password);
        
//        var ciphertext = Aes.Ctr.encrypt(data, password, $('#keyType').val());
//var key = Aes.Ctr.encryptKey();
//alert(key);
//var cipherTxt = Aes.Ctr.encryptCipherText();
//alert(cipherTxt);

        $('#keyResult').append('Encryption Key: '+encrypted.key+'\n');
//        $('#keyResult').append('Encrypted IV: '+encrypted.iv+'\n');
//        $('#keyResult').append('Encrypted Salt: '+encrypted.salt+'\n');
        $('#keyResult').append('Encrypted Ciphertext: '+encrypted.ciphertext  );
        
        $('#gettingEncryption').append(encrypted.toString());
        
      

            $('#uploadedMetrics').append('File Name: '+$('#Fname').text().toString().split('.txt')[0]+'\n');            
            $('#uploadedMetrics').append('File Type: '+ $('#Ftype').text()+'\n');
            $('#uploadedMetrics').append('File Size: '+$('#Fsize').text()+'\n');
            
            $('#uploadedMetrics').append('Time Started: '+t0+'\n');        
            

            
            $('#afterAES').append('File Name: '+$('#Fname').text().toString().split('.txt')[0]+'\n');
            $('#afterAES').append('File Type: UTF-8'+'\n');
            $('#afterAES').append('File Size: '+bytesToSize(byteLength(encrypted.toString()))+'\n');
            var t1 = performance.now();
            $('#afterAES').append('Time Ended: '+t1+'\n');
           $('#afterAES').append('Over all Time: '+ ((t1 - t0)/1000) + " seconds."+'\n');
           $('#afterAES').append('Throughput: '+(parseInt($('#Fsize').text())/  ((t1 - t0)/1000))+'\n');
            
            $('#encryptedAES').show(1000);
            
            $('#encryptedDetail').show(1100);
            $('#submitSave').show(1500);
            
                
    $('#exportSave').show(1500);
        
    
    
     
}





function ordinaryAES(password){
    
    var t0 = performance.now();
    var encrypted = CryptoJS.AES.encrypt($('#messageEn').text().toString(), password);
    
//    var ciphertext = Aes.Ctr.encrypt($('#messageEn').text().toString(), password, $('#keyType').val()); 
//var key = Aes.Ctr.encryptKey();
////alert(key);
//var cipherTxt = Aes.Ctr.encryptCipherText();
        
//        var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase"); alert(encrypted.key); // 
//        alert(encrypted.);
        $('#uploadedKey').append('Encryption Key: '+encrypted.key+'\n');
//        $('#uploadedKey').append('Encrypted IV: '+encrypted.iv+'\n');
//        $('#uploadedKey').append('Encrypted Salt: '+encrypted.salt+'\n');
        $('#uploadedKey').append('Encrypted Ciphertext: '+encrypted.ciphertext  );
        
        $('#afterAESCode').append(encrypted.toString());
//        afterAESCode
        
        
        $('#uploadedAESMetrics').append('File Name: '+$('#Fname').text().toString().split('.txt')[0]+'\n');            
            $('#uploadedAESMetrics').append('File Type: '+ $('#Ftype').text()+'\n');
            $('#uploadedAESMetrics').append('File Size: '+$('#Fsize').text()+'\n');
           
            $('#uploadedAESMetrics').append('Time Started: '+t0+'\n');        
            

            
            $('#afterAESMetrics').append('File Name: '+$('#Fname').text().toString().split('.txt')[0]+'\n');
            $('#afterAESMetrics').append('File Type: UTF-8'+'\n');
            $('#afterAESMetrics').append('File Size: '+bytesToSize(byteLength(encrypted.toString()))+'\n');
            var t1 = performance.now();
            $('#afterAESMetrics').append('Time Ended: '+t1+'\n');
           $('#afterAESMetrics').append('Over all Time: '+ ((t1 - t0)/1000) + " seconds."+'\n');
           $('#afterAESMetrics').append('Throughput: '+(parseInt($('#Fsize').text())/  ((t1 - t0)/1000))+'\n');
        
            
            
            
            
            $('#aesDetail').show(1000);
}

var openFile = function(event) {
        var input = event.target;
        var f = event.target.files[0]; 
        var reader = new FileReader();
        reader.onload = function(){
          var text = reader.result;
          var node = document.getElementById('output');
          $('#contentShow').html(text.trim());
           $('#Fname').text(f.name.toString().split('.txt')[0]);
              $('#Ftype').text(f.type);
              $('#Fsize').text(bytesToSize(f.size));
        };        
        reader.readAsText(input.files[0]);
      };
      
var contact;
var cont;

function retrieve_AES(){
    $("#dataValue").html('');
//$("#dataValue").append('<label class="control-label alert alert-success">Encrypted Data...             </label>');
$.get('upload.php?load=getData', {userId:$('#userId').val()}, function(data, textStatus){
//    alert(data);
    if(data != ''){   
    contact = JSON.parse(data);
         contact = contact;  
         var j = 0;
        for(var i = 0; i < contact.length; i++){
            $("#dataValue").append("<div class='col-sm-12 text-left' ><br><a href='#' class='loadSelect' data-id='"+contact[i].id+"::::"+contact[i].name+"::::"+contact[i].date+"'><label style='font-size: 9px;'>"+(i + 1)+ '  '+ contact[i].name.split(".")[0]+"</label></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-sm btn-danger del_btn' data-id='"+contact[i].id+"'>Delete</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-sm btn-primary share_btn' type='button'  data-id='"+contact[i].id+"::::"+contact[i].name+"::::"+contact[i].date+"'>Share</button></div><br>");
            
            
    }
    
    $(document).on("click", ".del_btn", function(){
     myIdD = $(this).data('id');
//            alert(myIdD);
        $.get('upload.php?load=getDelete',{myId:$(this).data('id')}, function(data, textStatus){
            if(parseInt(data) === 200){
                alert('Data deleted successfully!');
                retrieve_AES();
                retrieve_AES_Sent_Data();
            }else{
                alert('Data failed to delete');
            }
        });
        
      
        });
        }
});
    
    
} 

function retrieve_AES_Sent_Data(){
    $("#dataValueReceived").html('');
//$("#dataValue").append('<label class="control-label alert alert-success">Encrypted Data...             </label>');
$.get('upload.php?load=getDataReceived', {userId:$('#userId').val()}, function(data, textStatus){
//    alert(data);  
        if(data != ''){
//            alert(data);
    contact = JSON.parse(data);
//         contact = contact;  
         var j = 0;
        for(var i = 0; i < contact.length; i++){
            $("#dataValueReceived").append("<div class='col-sm-12 text-left' ><br><a href='#' class='loadSelect' data-id='"+contact[i].id+"::::"+contact[i].name+"::::"+contact[i].date+"'><label style='font-size: 9px;'>"+(i + 1)+ '  '+ contact[i].name.split(".")[0]+"</label></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-sm btn-danger del_btn2' data-id='"+contact[i].id+"'>Delete</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-sm btn-primary share_btn' type='button'  data-id='"+contact[i].id+"::::"+contact[i].name+"::::"+contact[i].date+"'>Share</button></div><br>");
            
            
    }
    
    $(document).on("click", ".del_btn2", function(){
     myIdD = $(this).data('id');
//            alert(myIdD);
        $.get('upload.php?load=getDelete',{myId:$(this).data('id')}, function(data, textStatus){
            if(parseInt(data) === 200){
                alert('Data deleted successfully!');
                retrieve_AES();
                retrieve_AES_Sent_Data();
            }else{
                alert('Data failed to delete');
            }
        });
        
      
        });
        }
});
    
    
}

$(document).ready(function (){
   
   $('#display-panel-Cpassword').hide();
   
   $('#smallerShow').show();
   document.getElementById("bigerShow").style = "border-right: 1px solid grey";
    var sw = true;
    $('#swit').click(function (){
        
        if(sw === true){
            $('#smallerShow').hide();
            document.getElementById("bigerShow").className = "col-sm-12";
            document.getElementById("bigerShow").style = "border-right: 0px solid white";
            sw = false;
        }else{
            $('#smallerShow').show();
            document.getElementById("bigerShow").className = "col-sm-8";
            document.getElementById("bigerShow").style = "border-right: 1px solid grey";
            sw = true;
        }
     });
    
  
  $(document).on("click", ".loadSelect", function(){
     var myId = $(this).data('id');
        showDetails(myId);
   
  });
  $(document).on("click", ".share_btn", function(){
     var myId = $(this).data('id');
//     alert(myId);
        showShareDetails(myId);
   
  });
  
  $('#upLOadDec').click(function(){

            if($('#nPassword').val() == ''){
            alert('Moduli value is required!');
//}else if($('#keyType').val() == ''){
//            alert('Key Type is required!');
}else if($('#aESPassword').val() == ''){
            alert('AES password is required!');
}else{
            //, $('#keyType').val()
            decryptData($('#contentShow').val(),  $('#aESPassword').val(), $('#nPassword').val());
        }
});
  
  $('#Cpass').click(function(){
     $('#display-panel').hide(); 
     $('#display-panel-Cpassword').show();
     
     $('#titleList').html('Change Password');
  });
  
  $('#Home').click(function(){
     $('#display-panel').show(); 
     $('#display-panel-Cpassword').hide();
     $('#titleList').html('My Drive');
  });
function showShareDetails(myId){
        $('#showList').hide();
        
        $('#showResult').show();
            document.getElementById("bigerShow").className = "col-sm-8";
            document.getElementById("bigerShow").style = "border-right: 1px solid grey";
//            alert(myId);
        var name_id = myId.split("::::");
        $("#showResult").html('');
        $("#showResult").html('');
        $("#showResult").append("<div class='row' style='padding-left: 5px;'><label style='font-size: 12px;'>File Name: </label> "+ name_id[1].split(".")[0]+"\n\
<br><label style='font-size: 12px;'>File Type: </label> UTF-8  <br><label style='font-size: 12px;'>Uploaded Date: </label> "+name_id[2]+"<br><span>Username/E-mail: <input id='userName_Email' placeholder='Username/email Address' title='Username/email Address' class='form-control input-sm' type='text' required='required'/> </span><br><button class='btn btn-sm btn-primary share__btn' data-id='"+name_id[0]+"' > Share File </button>&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-sm btn-dark' id='backCall'>Back</button> </div>");
}



$(document).on("click", ".share__btn", function(){
     var myIdD_ = $(this).data('id');
//        alert(myIdD_+'    '+$('#userName_Email').val());
        $.post('upload.php?load=upload_share_db',{myId:myIdD_, userId:$('#userId').val(), username:$('#userName_Email').val()}, function(data, textStatus){
 
           if(parseInt(data) === 200){
               alert('File had been share with '+$('#userName_Email').val());
           } else{
//               alert(data);
               alert('Failed to share file with '+$('#userName_Email').val());
           }
            $('#userName_Email').val('');
             $('#showList').show();
            $('#showResult').hide();
        });
        
      
        });
    function  showDetails(myId){
        $('#showList').hide();
        
        $('#showResult').show();
            document.getElementById("bigerShow").className = "col-sm-8";
            document.getElementById("bigerShow").style = "border-right: 1px solid grey";
//            alert(myId);
        var name_id = myId.split("::::");
        $("#showResult").html('');
        $("#showResult").append("<div class='row' style='padding-left: 5px;'><label style='font-size: 12px;'>File Name: </label> "+ name_id[1].split(".")[0]+"\n\
<br><label style='font-size: 12px;'>File Type: </label> UTF-8  <br><label style='font-size: 12px;'>Uploaded Date: </label> "+name_id[2]+"<br><span>AES Password: <input id='aESPasswordDec' placeholder='AES Password' title='AES Password' class='form-control input-sm' type='text' required='required'/> </span><br><span>Value of n: <input id='nPasswordDec' placeholder='Value of n' title='Value of n' class='form-control input-sm' type='text' required='required'  maxlength='1'/> </span><br><button class='btn btn-sm btn-primary sub_btn' data-id='"+name_id[0]+"' > Decrypt </button>&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-sm btn-dark' id='backCall'>Back</button> </div>");
//<br><span>AES Key Type: <select id='keyTypeDec' class='form-control'><option value=''>--Select Key Type--</option><option value='128'>128</option><option value='192'>192</option><option value='256'>256</option></select></span>
    }
    
    
    $(document).on("click", "#backCall", function(){
        $('#showList').show();
    $('#showResult').hide();
    });
    
    var myIdD;    
        $(document).on("click", ".sub_btn", function(){
     myIdD = $(this).data('id');
//        alert(myIdD);
        $.get('upload.php?load=getDecryp',{myId:$(this).data('id')}, function(data, textStatus){
            var dec = data;
//            alert(data);
//            if($('#keyTypeDec').val() == ''){
//                alert('AES key Type is required');
//            }else 
            if($('#aESPasswordDec').val() == ''){
                alert('AES password is required');
            }else if($('#nPasswordDec').val() == ''){
                alert('Value of n is required');
            }else{
            
            var txt = '';
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function(){
  if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
    txt = xmlhttp.responseText;
    document.getElementById("gettingEncryptionDec").value = txt;
    var x = document.getElementById("gettingEncryptionDec").value; 
//    console.log(x);
//    decryptAES1(aESPasswordDec, nPasswordDec, data, x);
    decryptData1($('#aESPasswordDec').val(), $('#nPasswordDec').val(), dec);
  }
};
xmlhttp.open("GET",dec.split("::::")[2],true);
xmlhttp.send();
            
            
        }
        });
        
       $('#showList').show();
    $('#showResult').hide();
        });
        
        

$('#submit1').click(function (){
   
   $.post('upload.php?load=changePassword',{myId:$('#userId').val(), oldPass:$('#oldPass').val(), newPass:$('#newPass').val()}, function (data, textStatus) {
       if(parseInt(data) === 200){
                alert('Password changed successful');
       }else{
                alert('Password changed failed');
       }
       
       
            
        });
    
});
    
});


function decryptData1(aESPasswordDec, nPasswordDec, data){
//    alert(nPasswordDec+"   "+data);

$('#innerShow').hide();
    $('#innerShowSec').show();
    $('#alphaToAsiiDec').hide();
    $('#decimalResidualDec').hide();
    
    $('#encryptedAESDec').hide();
    $('#encryptedDetailDec').hide();
    $('#aesDetailDec').hide();
    $('#submitSaveDec').hide();
    $("#smallerShowDec").html('');
    $('#gettingASIICFromResidualDataDec').hide();
    $('#gettingEncryptionDec').html('');
    $('#gettingResidualDataDec').html('');
    $('#messageSplitingDec').html('');
    $('#messageASCIIDec').html('');
    $('#moduliResultDec').html('');
    $('#gettingASIICFromResidualDataDecChar').html('');
    $('#gettingASIICFromResidualDataDecChar').hide();
    $('#gettingASIICFromResidualDataDec').html('');
    $('#messageEnDec').html('');
    $('#uploadedMetricsDec').html('');
    $('#afterAESDec').html('');
    $('#messageOrdDec').html('');
    $('#uploadedAESMetricsDec').html('');
    $('#afterAESMetricsDec').html('');
    

        
//        loadTextFile(data.split("::::")[2], 'gettingEncryptionDec');
        
//        var txt = '';
//var xmlhttp = new XMLHttpRequest();
//xmlhttp.onreadystatechange = function(){
//  if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
//    txt = xmlhttp.responseText;
//    document.getElementById("gettingEncryptionDec").value = txt;
    var x = document.getElementById("gettingEncryptionDec").value; 
//    console.log(x);
    decryptAES1(aESPasswordDec, nPasswordDec, data, x);
//  }
//};
//xmlhttp.open("GET","document/my/Simulation Anneal.txt",true);
//xmlhttp.send();



//    decryptAES1(aESPasswordDec, nPasswordDec, data);
}


function decryptAES1(aESPasswordDec, nPasswordDec, data, x){
    
    var t0 = performance.now();
//        $('#encryptedAESDec').show(1000);
//        
//        loadTextFile(data.split("::::")[2], 'gettingEncryptionDec');
//        var x = document.getElementById("gettingEncryptionDec").value; 
//        if(x !== '' || x !== null){
        
    var decrypted = CryptoJS.AES.decrypt($('#gettingEncryptionDec').val(), aESPasswordDec).toString(CryptoJS.enc.Utf8);
//    alert(decrypted);
//        }
//    
////   let origtext = Aes.Ctr.decrypt(data.split("::::")[2], aESPasswordDec, $('#keyTypeDec').val());
//    
//    
//    
    $('#encryptedAESDec').show(1000);
////    gettingEncryptionDec
    $('#gettingResidualDataDec').append(decrypted.toString());
////     $('#keyResultDec').append('Decryption Key: '+decrypted.key+'\n');
////        $('#keyResultDec').append('Decrypted IV: '+decrypted.iv+'\n');
////        $('#keyResultDec').append('Decrypted Salt: '+decrypted.salt+'\n');
////        $('#keyResultDec').append('Decrypted Ciphertext: '+decrypted.ciphertext  );
//        
// ////       $('#gettingEncryptionDec').append(data.split("::::")[2]);
//        
////            alert(encrypted);
//            
//
            $('#uploadedMetricsDec').append('File Name: '+data.split("::::")[1]+'\n');            
            $('#uploadedMetricsDec').append('File Type:  UTF-8\n');
            $('#uploadedMetricsDec').append('File Size: '+bytesToSize(byteLength(data.split("::::")[2] ))+'\n');
            
            $('#uploadedMetricsDec').append('Time Started: '+t0+'\n');        
            

            
                var n1, n2, n3;
                n = parseInt(nPasswordDec);
              n1 = Math.pow(2, n);
              n2 = (Math.pow(2, 2 * n) - 1);
              n3 = (Math.pow(2, 2*n) + 1);
        var M = (n1*n2*n3);
        var m1 = (M/n1);
        var m2 = (M/n2);
        var m3 = (M/n3);
        
        var m1_inverse = (m1%n1);
        
        
        var m2_in_x = (m2%n2);
        var m2_inverse = mulInv(m2, n2); //((n2 + 1)/m2_in_x);
        
        var m3_in_y = (m3%n3);
        var m3_inverse = mulInv(m3, n3); //((n3 + 1)/m3_in_y);
    
    $('#moduliResultDec').append('n  =>'+n+'\n');
    $('#moduliResultDec').append('2^n  =>'+n1+'\n');
    $('#moduliResultDec').append('2^2n - 1  =>'+n2+'\n');
    $('#moduliResultDec').append('2^2n + 1  =>'+n3+'\n');
    $('#moduliResultDec').append('M: '+ M  +'\n');
    $('#moduliResultDec').append('M1: '+ m1  +'\n');
    $('#moduliResultDec').append('M2: '+ m2  +'\n');
    $('#moduliResultDec').append('M3: '+ m3  +'\n');
    $('#moduliResultDec').append('M1^1: '+ m1_inverse  +'\n');
    $('#moduliResultDec').append('M2^1: '+ m2_inverse  +'\n');
    $('#moduliResultDec').append('M3^1: '+ m3_inverse  +'\n');
     
    var contact = decrypted.toString();//origtext.toString();

var allString = "";
var singleChars = "";
var allChar = "";
    for(var i = 0; i < contact.split('/').length; i++){
        allString += String.fromCharCode(chineseRemainder(parseInt(n), contact.split('/')[i].split(',')));
if(i === (contact.split('/').length -1)){
    singleChars += (chineseRemainder(parseInt(n), contact.split('/')[i].split(',')) );
    allChar += String.fromCharCode(chineseRemainder(parseInt(n), contact.split('/')[i].split(',')));
}   else{
    singleChars += ( chineseRemainder(parseInt(n), contact.split('/')[i].split(',')) )+', ';
    allChar += String.fromCharCode(chineseRemainder(parseInt(n), contact.split('/')[i].split(',')))+',';
}     

    }
    
//    document.write(contact);
//    alert(contact);
    
    $('#afterAESDec').append('File Name: '+data.split("::::")[1]+'\n');
            $('#afterAESDec').append('File Type: UTF-8'+'\n');
            $('#afterAESDec').append('File Size: '+bytesToSize(byteLength(allString))+'\n');
            var t1 = performance.now();
            $('#afterAESDec').append('Time Ended: '+t1+'\n');
           $('#afterAESDec').append('Over all Time: '+ ((t1 - t0)/1000) + " seconds."+'\n');
           $('#afterAESDec').append('Decryption Throughput: '+(parseInt(bytesToSize(byteLength(data.split("::::")[2])))/  ((t1 - t0)/1000))+'\n');
            
            $('#encryptedAESDec').show(1000);
            
            $('#encryptedDetailDec').show(1100);
            
            
    $('#messageEnDec').append(allString.trim());
    $('#gettingASIICFromResidualDataDec').append(singleChars);
    $('#gettingASIICFromResidualDataDecSec').append(singleChars);
    $('#gettingASIICFromResidualDataDec').show();
    $('#gettingASIICFromResidualDataDecChar').append(allChar);
    $('#gettingASIICFromResidualDataDecChar').show(1000);
    $('#decimalResidualDec').show(1000);
//    decryptOrdinaryAES(aESPasswordDec, data);
//        var t0 = performance.now();
//    var decrypted = CryptoJS.AES.decrypt(data.split("::::")[2], aESPasswordDec).toString(CryptoJS.enc.Utf8);
//    
////   let origtext = Aes.Ctr.decrypt(data.split("::::")[2], aESPasswordDec, $('#keyTypeDec').val());
//    
//    
//    $('#encryptedAESDec').show(1000);
//    
////    gettingEncryptionDec
//    $('#gettingResidualDataDec').append(decrypted.toString());
////     $('#keyResultDec').append('Decryption Key: '+decrypted.key+'\n');
////        $('#keyResultDec').append('Decrypted IV: '+decrypted.iv+'\n');
////        $('#keyResultDec').append('Decrypted Salt: '+decrypted.salt+'\n');
////        $('#keyResultDec').append('Decrypted Ciphertext: '+decrypted.ciphertext  );
//        
//        $('#gettingEncryptionDec').append(data.split("::::")[2]);
//        
////            alert(encrypted);
//            
//
//            $('#uploadedMetricsDec').append('File Name: '+$('#Fname').text().toString().split('.txt')[0]+'\n');            
//            $('#uploadedMetricsDec').append('File Type:  UTF-8\n');
//            $('#uploadedMetricsDec').append('File Size: '+bytesToSize(byteLength(data.split("::::")[2] ))+'\n');
//            
//            $('#uploadedMetricsDec').append('Time Started: '+t0+'\n');        
//            
//
//            
//                var n1, n2, n3;
//                n = parseInt(nPasswordDec);
//              n1 = Math.pow(2, n);
//              n2 = (Math.pow(2, 2 * n) - 1);
//              n3 = (Math.pow(2, 2*n) + 1);
//        var M = (n1*n2*n3);
//        var m1 = (M/n1);
//        var m2 = (M/n2);
//        var m3 = (M/n3);
//        
//        var m1_inverse = (m1%n1);
//        
//        
//        var m2_in_x = (m2%n2);
//        var m2_inverse = mulInv(m2, n2); //((n2 + 1)/m2_in_x);
//        
//        var m3_in_y = (m3%n3);
//        var m3_inverse = mulInv(m3, n3); //((n3 + 1)/m3_in_y);
//    
//    $('#moduliResultDec').append('n  =>'+n+'\n');
//    $('#moduliResultDec').append('2^n  =>'+n1+'\n');
//    $('#moduliResultDec').append('2^2n - 1  =>'+n2+'\n');
//    $('#moduliResultDec').append('2^2n + 1  =>'+n3+'\n');
//    $('#moduliResultDec').append('M: '+ M  +'\n');
//    $('#moduliResultDec').append('M1: '+ m1  +'\n');
//    $('#moduliResultDec').append('M2: '+ m2  +'\n');
//    $('#moduliResultDec').append('M3: '+ m3  +'\n');
//    $('#moduliResultDec').append('M1^1: '+ m1_inverse  +'\n');
//    $('#moduliResultDec').append('M2^1: '+ m2_inverse  +'\n');
//    $('#moduliResultDec').append('M3^1: '+ m3_inverse  +'\n');
//     
//    var contact = decrypted.toString();//origtext.toString();
//
//var allString = "";
//var singleChars = "";
//var allChar = "";
//    for(var i = 0; i < contact.split('/').length; i++){
//        allString += String.fromCharCode(chineseRemainder(parseInt(n), contact.split('/')[i].split(',')));
//if(i === (contact.split('/').length -1)){
//    singleChars += (chineseRemainder(parseInt(n), contact.split('/')[i].split(',')) );
//    allChar += String.fromCharCode(chineseRemainder(parseInt(n), contact.split('/')[i].split(',')));
//}   else{
//    singleChars += ( chineseRemainder(parseInt(n), contact.split('/')[i].split(',')) )+', ';
//    allChar += String.fromCharCode(chineseRemainder(parseInt(n), contact.split('/')[i].split(',')))+',';
//}     
//
//    }
//    
////    document.write(contact);
////    alert(contact);
//    
//    $('#afterAESDec').append('File Name: '+data.split("::::")[1]+'\n');
//            $('#afterAESDec').append('File Type: UTF-8'+'\n');
//            $('#afterAESDec').append('File Size: '+bytesToSize(byteLength(allString))+'\n');
//            var t1 = performance.now();
//            $('#afterAESDec').append('Time Ended: '+t1+'\n');
//           $('#afterAESDec').append('Over all Time: '+ ((t1 - t0)/1000) + " seconds."+'\n');
//           $('#afterAESDec').append('Decryption Throughput: '+(parseInt(bytesToSize(byteLength(data.split("::::")[2])))/  ((t1 - t0)/1000))+'\n');
//            
//            $('#encryptedAESDec').show(1000);
//            
//            $('#encryptedDetailDec').show(1100);
//            
//            
//    $('#messageEnDec').append(allString.trim());
//    $('#gettingASIICFromResidualDataDec').append(singleChars);
//    $('#gettingASIICFromResidualDataDecSec').append(singleChars);
//    $('#gettingASIICFromResidualDataDec').show();
//    $('#gettingASIICFromResidualDataDecChar').append(allChar);
//    $('#gettingASIICFromResidualDataDecChar').show(1000);
//    $('#decimalResidualDec').show(1000);
//    decryptOrdinaryAES(aESPasswordDec, data);
var txt = '';
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function(){
  if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
    txt = xmlhttp.responseText;
    document.getElementById("gettingEncryptionDec").value = txt;
    var x = document.getElementById("gettingEncryptionDec").value; 
//    console.log(x);
//    decryptAES1(aESPasswordDec, nPasswordDec, data, x);
    decryptOrdinaryAES(aESPasswordDec, data, x);
//    decryptData1($('#aESPasswordDec').val(), $('#nPasswordDec').val(), dec);
  }
};
xmlhttp.open("GET",data.split("::::")[3],true);
xmlhttp.send();
}
function decryptOrdinaryAES(aESPasswordDec, data, x){
    var t0 = performance.now();
    var decrypted = CryptoJS.AES.decrypt(x, aESPasswordDec).toString(CryptoJS.enc.Utf8);
//    var origtext = Aes.Ctr.decrypt(data.split("::::")[3], aESPasswordDec, $('#keyTypeDec').val());
    $('#messageOrdDec').append(decrypted.toString());
    
    $('#messageOrdEncDec').append(x);
    
            $('#uploadedAESMetricsDec').append('File Name: '+data.split("::::")[1]+'\n');            
            $('#uploadedAESMetricsDec').append('File Type:  UTF-8\n');
            $('#uploadedAESMetricsDec').append('File Size: '+bytesToSize(byteLength(data.split("::::")[3] ))+'\n');
            
            $('#uploadedAESMetricsDec').append('Time Started: '+t0+'\n');        
            

            
            $('#afterAESMetricsDec').append('File Name: '+data.split("::::")[1]+'\n');
            $('#afterAESMetricsDec').append('File Type: UTF-8'+'\n');
            $('#afterAESMetricsDec').append('File Size: '+bytesToSize(byteLength(decrypted.toString()))+'\n');
            var t1 = performance.now();
            $('#afterAESMetricsDec').append('Time Ended: '+t1+'\n');
           $('#afterAESMetricsDec').append('Over all Time: '+ ((t1 - t0)/1000) + " seconds."+'\n');
           $('#afterAESMetricsDec').append('Decryption Throughput: '+(parseInt(bytesToSize(byteLength(decrypted.toString())))/  ((t1 - t0)/1000))+'\n');    
    $('#ordinaryAE').show();
    $('#aesDetailDec').show();
    retrieve_AES();
    retrieve_AES_Sent_Data();
//    alert(decrypted);
}

/////////////////////////////////////////////////////
function decryptData(data, aESPasswordDec, nPasswordDec){
//    alert(nPasswordDec+"   "+data);

$('#innerShow').hide();
    $('#innerShowSec').show();
    $('#alphaToAsiiDec').hide();
    $('#decimalResidualDec').hide();
    
    $('#encryptedAESDec').hide();
    $('#encryptedDetailDec').hide();
    $('#aesDetailDec').hide();
    $('#submitSaveDec').hide();
    $("#smallerShowDec").html('');
    $('#gettingASIICFromResidualDataDec').hide();
    $('#gettingEncryptionDec').html('');
    $('#gettingResidualDataDec').html('');
    $('#messageSplitingDec').html('');
    $('#messageASCIIDec').html('');
    $('#moduliResultDec').html('');
    $('#gettingASIICFromResidualDataDecChar').html('');
    $('#gettingASIICFromResidualDataDecChar').hide();
    $('#gettingASIICFromResidualDataDec').html('');
    $('#messageEnDec').html('');
    $('#uploadedMetricsDec').html('');
    $('#afterAESDec').html('');
    $('#messageOrdDec').html('');
    $('#uploadedAESMetricsDec').html('');
    $('#afterAESMetricsDec').html('');
    




    decryptAES(data, aESPasswordDec, nPasswordDec);
}


function decryptAES(data, aESPasswordDec, nPasswordDec){
        var t0 = performance.now();
    var decrypted = CryptoJS.AES.decrypt(data, aESPasswordDec).toString(CryptoJS.enc.Utf8);
    
//    var origtext = Aes.Ctr.decrypt(data, aESPasswordDec, key);
    
    
    $('#encryptedAESDec').show(1000);
    
//    gettingEncryptionDec
    $('#gettingResidualDataDec').append(decrypted.toString());
//     $('#keyResultDec').append('Decryption Key: '+decrypted.key+'\n');
//        $('#keyResultDec').append('Decrypted IV: '+decrypted.iv+'\n');
//        $('#keyResultDec').append('Decrypted Salt: '+decrypted.salt+'\n');
//        $('#keyResultDec').append('Decrypted Ciphertext: '+decrypted.ciphertext  );
        
        $('#gettingEncryptionDec').append(data);
        
//            alert(encrypted);
            

            $('#uploadedMetricsDec').append('File Name: '+$('#Fname').text().toString().split('.txt')[0]+'\n');            
            $('#uploadedMetricsDec').append('File Type:  UTF-8\n');
            $('#uploadedMetricsDec').append('File Size: '+bytesToSize(byteLength(data ))+'\n');
            
            $('#uploadedMetricsDec').append('Time Started: '+t0+'\n');        
            

            
                var n1, n2, n3;
                n = parseInt(nPasswordDec);
              n1 = Math.pow(2, n);
              n2 = (Math.pow(2, 2 * n) - 1);
              n3 = (Math.pow(2, 2*n) + 1);
        var M = (n1*n2*n3);
        var m1 = (M/n1);
        var m2 = (M/n2);
        var m3 = (M/n3);
        
        var m1_inverse = (m1%n1);
        
        
        var m2_in_x = (m2%n2);
        var m2_inverse = mulInv(m2, n2); //((n2 + 1)/m2_in_x);
        
        var m3_in_y = (m3%n3);
        var m3_inverse = mulInv(m3, n3); //((n3 + 1)/m3_in_y);
    
    $('#moduliResultDec').append('n  =>'+n+'\n');
    $('#moduliResultDec').append('2^n  =>'+n1+'\n');
    $('#moduliResultDec').append('2^2n - 1  =>'+n2+'\n');
    $('#moduliResultDec').append('2^2n + 1  =>'+n3+'\n');
    $('#moduliResultDec').append('M: '+ M  +'\n');
    $('#moduliResultDec').append('M1: '+ m1  +'\n');
    $('#moduliResultDec').append('M2: '+ m2  +'\n');
    $('#moduliResultDec').append('M3: '+ m3  +'\n');
    $('#moduliResultDec').append('M1^1: '+ m1_inverse  +'\n');
    $('#moduliResultDec').append('M2^1: '+ m2_inverse  +'\n');
    $('#moduliResultDec').append('M3^1: '+ m3_inverse  +'\n');
     
    var contact = decrypted.toString(); //origtext.toString();

var allString = "";
var singleChars = "";
var allChar = "";
    for(var i = 0; i < contact.split('/').length; i++){
        allString += String.fromCharCode(chineseRemainder(parseInt(n), contact.split('/')[i].split(',')));
if(i === (contact.split('/').length -1)){
    singleChars += (chineseRemainder(parseInt(n), contact.split('/')[i].split(',')) );
    allChar += String.fromCharCode(chineseRemainder(parseInt(n), contact.split('/')[i].split(',')));
}   else{
    singleChars += ( chineseRemainder(parseInt(n), contact.split('/')[i].split(',')) )+', ';
    allChar += String.fromCharCode(chineseRemainder(parseInt(n), contact.split('/')[i].split(',')))+',';
}     

    }
    
//    document.write(contact);
//    alert(contact);
    
    $('#afterAESDec').append('File Name: '+data.split("::::")[1]+'\n');
            $('#afterAESDec').append('File Type: UTF-8'+'\n');
            $('#afterAESDec').append('File Size: '+bytesToSize(byteLength(allString))+'\n');
            var t1 = performance.now();
            $('#afterAESDec').append('Time Ended: '+t1+'\n');
           $('#afterAESDec').append('Over all Time: '+ ((t1 - t0)/1000) + " seconds."+'\n');
           $('#afterAESDec').append('Decryption Throughput: '+(parseInt(bytesToSize(byteLength(data)))/  ((t1 - t0)/1000))+'\n');
            
            $('#encryptedAESDec').show(1000);
            
            $('#encryptedDetailDec').show(1100);
            
            
    $('#messageEnDec').append(allString.trim());
    $('#gettingASIICFromResidualDataDec').append(singleChars);
    $('#gettingASIICFromResidualDataDecSec').append(singleChars);
    $('#gettingASIICFromResidualDataDec').show();
    $('#gettingASIICFromResidualDataDecChar').append(allChar);
    $('#gettingASIICFromResidualDataDecChar').show(1000);
    $('#decimalResidualDec').show(1000);
    $('#ordinaryAE').hide();
//    decryptOrdinaryAES(aESPasswordDec, data);
}




function chineseRemainder(n, a) {
    
             var n1, n2, n3;
              n1 = Math.pow(2, n);
              n2 = (Math.pow(2, 2 * n) - 1);
              n3 = (Math.pow(2, 2*n) + 1);
              var prod = (n1*n2*n3);
               var nn = [n1, n2, n3];        
         var p, sm = 0;
        for (var i = 0; i < 3; i++) {
            p = prod / nn[i];
            sm += parseInt(a[i]) * mulInv(p, nn[i]) * p;
        }
        
        return sm % prod;
    }

function mulInv(a, b) {
        var b0 = b;
        var x0 = 0;
        var x1 = 1; 
        if (b === 1)
            return 1; 
        while (a > 1) {
            var q = parseInt(a / b);
            var amb = a % b;
            a = b;
            b = amb;
            var xqx = (x1 - (parseInt(q) * parseInt(x0)));
            x1 = x0;
            x0 = xqx;
        } 
        if (x1 < 0)
            x1 += b0; 
        return x1;
    }


function getSize(){
    $.get('upload.php?load=fileSize_Call',{myId:$('#userId').val()}, function (data, textStatus) {
//           alert(bytesToSize(data));
           $('#showZise').html(bytesToSize(data)+'/'+bytesToSize(10400000));
           var cal = (100/10400000);
           var cal2 = cal * parseInt(data);
           $('#pBar').html('<div class="progress-bar bg-dark" role="progressbar" id="pBar1" style="width:'+cal2+'%" aria-valuenow="15" aria-valuemin="5" aria-valuemax="100"></div>');
        });
}

$(document).ready(function(){
   getSize(); 
});
