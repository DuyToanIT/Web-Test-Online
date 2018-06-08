var RequestInfo = {
  HTTP: "http",
  host: "10.0.1.166",
  port: 8080,
  JWTtoken: "",
  cors:"*"
};

$(document).ready(function(){
    
   // CKEDITOR.replace('contentsQuestion');
    $('#btnlogin').click(function(event) {
        /* Act on the event */
        var auth = {
          username : $('#login-username').val(),
          password : $('#login-password').val()
        };
        
        $.ajax({
          type: 'POST',
          url: 'http://10.0.2.22:8080/auth/login',
          beforeSend: function (xhr) {  
            xhr.setRequestHeader("Access-Control-Allow-Origin", '*');
          },
          data: JSON.stringify(auth),
          contentType: 'application/json'
        }).done(function (res){
          //Cookies.set("token", res.access_token);
          location.href = "index.html";
          console.log(res);
         // getData(res.access_token);
        }).fail(function(err){
          console.log(err);
        });
      });
})  