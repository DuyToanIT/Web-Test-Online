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
    groupsAdd: '/mathtestscore/api/groups/add',
    userAll: '/mathtestscore/user/all'

  };
  
  $(document).ready(function(){
    
    var baseURL = RequestInfo.HTTP+RequestInfo.host+":"+RequestInfo.port;
    var tbgroups;
   
    //--------------------Event table groups---------------------//
    tbgroups = $('#groupstb').DataTable({
      "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Vietnamese.json"
      },
      columnDefs:[
        {
          orderable: false,
          targets:[0,2]
        }
      ],
      aLengthMenu:[
        [10,25,50,100,-1],
        [10,25,50,100,"All"]
      ],
      iDisplayLength:50,
      order: [[1,"asc"]],
      aaData: null,
      rowId: "id",
      columns:[
        {data: null, className: "text-center"},
        { data: "name", render:function(data, type,row,meta){
          return '<input id= "name'+row.id+'"type="text" style="background-color: transparent" value= '+data+'>';
        }},
        {data: "null",className: "text-center",render: function (data, type, row) {
          return '<i data-group="grpEdit" class = "fa fa-edit text-success pointer"></i> ';
         // '<i data-group="grpInfo" class = "fa fa-info-circle text-info pointer"></i> ';
        }}
      ],
      initComplete:function(settings, json){
        loadTableGroups();
        // $("select[name=exampletb_length]").select2({width:'80px', minimumResultsForSearch:-1});
      },
      drawCallback:function(settings){
        bindTableGroupsEvents();
      }
    });
    //end table question data
    tbgroups.on('order.dt search.dt', function(){
      tbgroups.column(0, {search: 'applied', order: 'applied'}).nodes().each(function(cell, i){
        cell.innerHTML = i + 1; 
      })
    }).draw();
     //---------------------Load table group s-----------------------//   
    function loadTableGroups(){
      $.ajax({
        type: 'GET',
        url: baseURL + subUrl.groups,
        contentType: 'application/json',
        beforeSend: function(xhr){
          xhr.setRequestHeader("Authorization", 'Bearer '+Cookies.get("token"))
        }
      }).done(function(res){
        Cookies.set('groups', res);
       // alert(Cookies.get("groups"));
        tbgroups.clear().draw();
        tbgroups.rows.add(res);// Add new data
        tbgroups.columns.adjust().draw(); // Redraw the DataTable
      }).fail(function(err){
        console.log(err);
      });
    };
    //--------------------------bind table groups----------------------//
    function bindTableGroupsEvents() {
      $("i[data-group=grpEdit]").off('click').click(function () {
        var valueNameGroup = $('#name'+($(this).closest('tr').attr('id'))).val();
        //$(this).closest('tr').attr('id');
        //alert(($(this).closest('tr').attr('id')-1));
        var data = {
          id : $(this).closest('tr').attr('id'),
          name: valueNameGroup
        };
        $.ajax({
          type: 'POST',
          url : baseURL + subUrl.groupsUpdate,
          contentType: 'application/json',
          data: JSON.stringify(data),
          beforeSend: function(xhr){
            xhr.setRequestHeader("Authorization", 'Bearer '+Cookies.get("token"))
          }
        }).done(function(res){
          alert("Bạn đã cập nhật thành công");
          loadTableGroups();
        }).fail(function(err){
          console.log(err);
        });
      });
      //--------------------------detail data group----------------------//
      $("i[data-group=grpInfo]").off('click').click(function () {
        var idNameGroup = $('#name'+($(this).closest('tr').attr('id')-1)).val();
        var tbSubject = $('#tbSubject').DataTable({
          "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Vietnamese.json"
          },
          columnDefs:[
            {
              orderable: false,
              targets:[0,1]
            }
          ],
          aaData: null,
          columns:[
            {data: null, className:"text-center"},
            {data: null,render: function (data, type, row) {
               var stringHtml = '<div class="card">'+
              '<div class="card-header">'+data.name+'</div>'+
              '<div class="card-body">';
              // for(var i = 0; i < data.subjects.length; i++){
              //   data.subjects[i].name
              // }
               //console.log(data)+
                  (data.subjects.length != 0 ? data.subjects.forEach(function(subject) {
                    stringHtml += subject.name+'<br>'
                    for(var i = 0; i < subject.exam.length; i++){
                      stringHtml += "+Đề "+(i+1)+":"+'<a href="#" id='+"exam_"+subject.exam[i].id+' data-target="#confirmModalExam" data-toggle="modal">'+subject.exam[i].title+'</a><br>'
                    }
                    // console.log(entry.name)
                  // console.log(entry)
                    
                  }):stringHtml+="Chưa có dữ liệu")
                  
                  
                
                  stringHtml += '</div>'+
              '<div class="card-footer">'+
                  //'<div class="btn btn-primary">Xem tiếp</div>'+
              '</div>'+
            '</div>'
           // console.log(sss);
            return stringHtml;
            }}
          ],
          initComplete:function(settings, json){
            loadTableListSubject();
            // $("select[name=exampletb_length]").select2({width:'80px', minimumResultsForSearch:-1});
          },
          drawCallback:function(settings){
            // bindTableEvents()
          }
        });
        tbSubject.on('order.dt search.dt', function(){
            tbSubject.column(0, {search: 'applied', order: 'applied'}).nodes().each(function(cell, i){
              cell.innerHTML = i + 1; 
            })
          }).draw();
        function loadTableListSubject(){
          var data = Cookies.getJSON("groups");
           console.log(idNameGroup);
         // alert(data);
          tbSubject.clear().draw();
          tbSubject.rows.add(data);// Add new data
          tbSubject.columns.adjust().draw(); // Redraw the DataTable
        }
        $('#modalInfoGroup').modal('show');
      });
    }
  
    $('#btnAddGroup').click(function(){
        var data = {
            name : $('#txtContentGroup').val()
        }
        console.log(data);
        $.ajax({
            type: 'POST',
            url : baseURL + subUrl.groupsAdd,
            contentType: 'application/json',
            data: JSON.stringify(data),
            beforeSend: function(xhr){
              xhr.setRequestHeader("Authorization", 'Bearer '+Cookies.get("token"))
            }
          }).done(function(res){
            alert("Bạn đã thêm thành công");
            loadTableGroups();
          }).fail(function(err){
            console.log(err);
          });
          $('#modalAddGroup').modal('hide');
          
    })
  
  })  