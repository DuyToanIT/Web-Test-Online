var RequestInfo = {
  HTTP: "http://",
  host: "localhost",
  port: 9999,
  JWTtoken: "",
  cors:"*"
};

var subUrl = {
  login: '/mathtestscore/auth/login',
  userInfo: '/mathtestscore/user/info',
  userUpdate: '/mathtestscore/user/updateinfo',
  questionAll: '/mathtestscore/api/questions/all',
  questionPersonal: '/mathtestscore/api/questions/owner',
  questionAdd: '/mathtestscore/api/questions/add',
  questionUpdate: '/mathtestscore/api/questions/update',
  userCreate: '/mathtestscore/auth/registryUser',
  groups: '/mathtestscore/api/groups/all',
  groupsUpdate: '/mathtestscore/api/groups/update',
  userAll: '/mathtestscore/user/all'
};

$(document).ready(function(){
  
  var baseURL = RequestInfo.HTTP+RequestInfo.host+":"+RequestInfo.port;
  var tbquestion, dataQuestion, tbgroups, tbUser;
 // $('#tableSubject').DataTable();
  //CKEDITOR.replace('#contentsQuestion');
  $('#btnlogin').click(function(event) {
    var auth = {
      username : $('#login-username').val(),
      password : $('#login-password').val()
    };
        
    $.ajax({
      type: 'POST',
      url: baseURL+subUrl.login,
      beforeSend: function (xhr) {  
        xhr.setRequestHeader("Access-Control-Allow-Origin", '*');
      },
      data: JSON.stringify(auth),
      contentType: 'application/json'
    }).done(function (res){
      Cookies.set("token", res.access_token);
      //console.log(Cookies.getJSON('token'));
      $.ajax({
        type: 'GET',
        url: baseURL+ subUrl.userInfo,
        contentType: 'application/json',
        beforeSend: function (xhr) {  
          xhr.setRequestHeader("Authorization", 'Bearer '+Cookies.get("token"))
        }
      }).done(function(res){
        Cookies.set("user", res, { expires: 7 });
        var authorityJSON =  JSON.stringify(res.authorities);
        console.log(authorityJSON);
        var link = "";
        $.each(JSON.parse(authorityJSON) , function (key, value) {
          if(value.authority == "ROLE_SUPERVISOR"){
            link = 'tablequestions.html';
          }
        });
        if(link == ""){
          location.href= 'exam.html';
          } else {
            location.href = link;
          }
      }).fail(function(err){
        //console.log(err);
      });         
    }).fail(function(err){
      //console.log(err);
    });
  });
  //End button login
  
  
  //--------------function get information user---------------------//
  function getUserInfo(){
    $.ajax({
      type: 'GET',
      url: baseURL+ subUrl.userInfo,
      contentType: 'application/json',
      beforeSend: function (xhr) {  
        xhr.setRequestHeader("Authorization", 'Bearer '+Cookies.get("token"))
      }
    }).done(function(res){
      Cookies.set("user", res, { expires: 7 });
    console.log('success');
    }).fail(function(err){
      //console.log(err);
    });
  };
  $('#acc').click(function(){
    var user = Cookies.getJSON('user');
    console.log(user);
    $('#txtUseName').val(user.username);
    $('#txtFirstName').val(user.firstName);
    $('#txtLastName').val(user.lastName);
    $('#txtEmail').val(user.email);
    $('#txtBirthday').val(user.birthDate);
    $('#infoAcc').modal('show');
  });
 
  $('#btnUpdateAcc').click(function(){
    if($('#txtFirstName').val() != "" && $('#txtLastName').val() != "" && $('#txtEmail').val() != "" && $('#txtBirthday').val() !="")
     {
      var postData = JSON.stringify({
        firstName: $.trim($('#txtFirstName').val()),
        lastName: $.trim($('#txtLastName').val()),
        email: $.trim($('#txtEmail').val()),
        birthDate: $.trim($('#txtBirthday').val()),
        enabled: Cookies.getJSON('user').enabled
      });
      $.ajax({
        type: 'POST',
        url: baseURL+subUrl.userUpdate,
        beforeSend: function (xhr) {  
          xhr.setRequestHeader("Authorization", 'Bearer '+Cookies.get("token"));
        },
        data: postData,
        contentType: 'application/json'
      }).done(function(res){
        Cookies.remove('user');
        Cookies.set('user', res,{ expires: 7 });
        $('#infoAcc').modal('hide');
  
      });
     }
    
  });
  $('#register').click(function(){
    $('#modalRegister').modal('show');
  });

  $('#btnCreateAcc').click(function(){
   
    if($('#txtUserNameR').val() != "" && $('#txtPasswordR').val() != "" && $('#txtFirstNameR').val() != "" && $('#txtLastNameR').val() != "" && $('#txtEmailR').val() != "" && $('#txtBirthdayR').val() !="")
     {
       var author = "ROLE_USER";
       if($('#authoritiesR').val() == "ROLE_SUPERVISOR")
          author= author+","+$('#authoritiesR').val();
       alert($('#authoritiesR').val());
      var postData = JSON.stringify({
        username: $.trim($('#txtUserNameR').val()),
        password: $.trim($('#txtPasswordR').val()),
        firstName: $.trim($('#txtFirstNameR').val()),
        lastName: $.trim($('#txtLastNameR').val()),
        email: $.trim($('#txtEmailR').val()),
        birthDate: $.trim($('#txtBirthdayR').val()),
        authorities: author
      });
      $.ajax({
        type: 'POST',
        url: baseURL+subUrl.userCreate,
        // beforeSend: function (xhr) {  
        //   xhr.setRequestHeader("Authorization", 'Bearer '+Cookies.get("token"));
        // },
        data: postData,
        contentType: 'application/json'
      }).done(function(res){
        //Cookies.remove('user');
       // Cookies.set('user', res,{ expires: 7 });
       //alert('sss');
        alert("Bạn đã tạo tài khoản thành công");
        $('#modalRegister').modal('hide');
  
      }).fail(function(err){
        console.log(err);
      });
     }
  });
  //--------------------Event Logout----------------------------//
  $('#logout').click(function(){
    Cookies.remove('token');
    Cookies.remove('user');
    location.href = 'login.html';
  });
  
 

})  