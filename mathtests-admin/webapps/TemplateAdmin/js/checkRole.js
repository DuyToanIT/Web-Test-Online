var RequestInfo = {
    HTTP: "http://",
    host: "localhost",
    port: 9999,
    JWTtoken: "",
    cors:"*"
  };
  
  var accessSubUrl = {
    listQuestion: 'tablequestion.html',
    listUser: 'tableusers.html',
    listExam: 'tableSubjects.html',
    listGroup: 'group.html'
  };
  
  $(document).ready(function(){
    var user = Cookies.getJSON("user");
    var accept = false;
    var admin = false;
    
    for(var i = 0; i < user.authorities.length; i++){
        if(user.authorities[i].authority == "ROLE_SUPERVISOR")
          accept = true;
        if(user.authorities[i].authority == "ROLE_ADMIN")
          admin = true;
    }
    if(accept == false)
        location.href = "exam.html";
    if(admin == false)
      $(menuListUsers).hide();
  });  