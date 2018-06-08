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
  userCreate: '/mathtestscore/auth/registryUser'

};
$(document).ready(function(){
  
  var baseURL = RequestInfo.HTTP+RequestInfo.host+":"+RequestInfo.port;
//  var tbquestion, dataQuestion, cookie;
  //$('#tableSubject').DataTable();
  //CKEDITOR.replace('contentsQuestion');
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
      console.log(Cookies.getJSON('token'));
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
          location.href= 'quiz.html';
          } else {
            location.href = link;
          }
      }).fail(function(err){
        //console.log(err);
      });         
    }).fail(function(err){
      alert("Sai thông tin đăng nhập")//console.log(err);
    });
  });
  //End button login
  // tbquestion = $('#questiontb').DataTable({
  //   "language": {
  //             "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Vietnamese.json"
  //   },
  //   columnDefs:[
  //     {
  //       orderable: false,
  //       targets:[0,6]
  //     }
  //   ],
  //   aLengthMenu:[
  //     [10,25,50,100,-1],
  //     [10,25,50,100,"All"]
  //   ],
  //   iDisplayLength:50,
  //   order: [[1,"asc"]],
  //   aaData: null,
  //   rowId: "id",
  //   columns:[
  //     {data: null, className: "text-center"},
  //     {data: "content"},
  //     {data: "answerA"},
  //     {data: "answerB"},
  //     {data: "answerC"},
  //     {data: "answerD"},
  //     {data: null, render: function (data, type, row) {
  //       return '<i data-group="grpEdit" class = "fa fa-edit text-success pointer"></i> ' +
  //       '<i data-group="grpDelete" class = "fa fa-remove text-danger pointer"></i> ';
  //     }}
  //   ],
  //   initComplete:function(settings, json){
  //     loadTable();
  //     // $("select[name=exampletb_length]").select2({width:'80px', minimumResultsForSearch:-1});
  //   },
  //   drawCallback:function(settings){
  //     // bindTableEvents()
  //   }
  // });
  // //end table question data
  // tbquestion.on('order.dt search.dt', function(){
  //   tbquestion.column(0, {search: 'applied', order: 'applied'}).nodes().each(function(cell, i){
  //     cell.innerHTML = i + 1; 
  //   })
  // }).draw();
      
  // function loadTable(){
  //   $.ajax({
  //     type: 'GET',
  //     url: baseURL + subUrl.questionAll,
  //     contentType: 'application/json',
  //     beforeSend: function(xhr){
  //       xhr.setRequestHeader("Authorization", 'Bearer '+Cookies.get("token"))
  //     }
  //   }).done(function(res){
  //     tbquestion.clear().draw();
  //     tbquestion.rows.add(res);// Add new data
  //     tbquestion.columns.adjust().draw(); // Redraw the DataTable
  //   }).fail(function(err){
  //     console.log(err);
  //   });
  // };

  // function bindTableEvents() {};
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
   
    if($('txtUserName').val() != "" && $('txtPassword').val() != "" && $('#txtFirstName').val() != "" && $('#txtLastName').val() != "" && $('#txtEmail').val() != "" && $('#txtBirthday').val() !="")
     {
      var postData = JSON.stringify({
        username: $.trim($('txtUserName').val()),
        password: $.trim($('txtPassword').val()),
        firstName: $.trim($('#txtFirstName').val()),
        lastName: $.trim($('#txtLastName').val()),
        email: $.trim($('#txtEmail').val()),
        birthDate: $.trim($('#txtBirthday').val()),
        authorities: $('#authorities').val()
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
        alert('Tao thanh cong');
        $('#modalRegister').modal('hide');
  
      }).fail(function(err){
        console.log(err);
      });
     }
  });

  $('#logout').click(function(){
    Cookies.remove('token');
    Cookies.remove('user');
    location.href = 'login.html';
  });
})  