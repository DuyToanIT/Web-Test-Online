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
   
   //----------------------------------Table User----------------------------------//
   tbUser = $('#userstb').DataTable({
    //"language": {
      //        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Vietnamese.json"
    //},
    columnDefs:[
      {
        orderable: false,
        targets:[0,6]
      }
    ],
    aLengthMenu:[
      [10,25,50,100,-1],
      [10,25,50,100,"All"]
    ],
    iDisplayLength:25,
    order: [[1,"asc"]],
    aaData: null,
    rowId: "id",
    columns:[
      {data: null, className: "text-center"},
      {data: "username"},
      {data: "firstName"},
      {data: "lastName"},
      {data: "birthDate"},
      {data: "email"},
      {data: "authorities[].authority"}
    ],
    initComplete:function(settings, json){
      loadTableUsers();
      // $("select[name=exampletb_length]").select2({width:'80px', minimumResultsForSearch:-1});
    },
    drawCallback:function(settings){
      //bindTableQuestionEvents()
    }
  });
  //end table question data
  tbUser.on('order.dt search.dt', function(){
    tbUser.column(0, {search: 'applied', order: 'applied'}).nodes().each(function(cell, i){
      cell.innerHTML = i + 1; 
    })
  }).draw();
  
  function loadTableUsers(){
    $.ajax({
      type: 'GET',
      url: baseURL + subUrl.userAll,
      contentType: 'application/json',
      beforeSend: function(xhr){
        xhr.setRequestHeader("Authorization", 'Bearer '+Cookies.get("token"))
      }
    }).done(function(res){
      var data = {
        data: res
      };
      Cookies.set("UserAll", res);
      console.log(data);
      //console.log(Cookies.getJSON("questionsAll"));
      tbUser.clear().draw();
      tbUser.rows.add(res);// Add new data
      tbUser.columns.adjust().draw(); // Redraw the DataTable
    }).fail(function(err){
        alert(err);
    });
  };
  
  
  })  