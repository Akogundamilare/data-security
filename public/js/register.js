$(document).ready(function(){
   $('.reg_sub').click(function(){
          
//        alert($('#username').val());
          $.post('upload.php?load=registerUser',{username:$('#username').val(), password:$('#password').val()}, function(data, textStatus){
              if(parseInt(data) === 200){
                  alert('Registration Successful');
                  window.location ='index.php';
              }else{
                  alert('Registration failed\nPlease try again');
              }
            
          });
           
       }); 
       
       
       
       
       $('.login_sub').click(function(){
          
//        alert($('#login').val());
          $.get('upload.php?load=loginUser',{username:$('#login').val(), password:$('#password').val()}, function(data, textStatus){
//              alert(data);
               if(parseInt(data.split("::::")[0]) === 200){
              window.location.href = 'aes.drive.php';

          }else{
                    alert('Incorrect Username or Password');
              window.location.href = 'index.php';
          }
            
          });
           
       }); 
});