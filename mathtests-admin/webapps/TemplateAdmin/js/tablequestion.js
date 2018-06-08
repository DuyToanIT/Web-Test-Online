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
    var tbquestion, dataQuestion;
    CKEDITOR.replace( 'contentsQuestion' );
    
    tbquestion = $('#questiontb').DataTable({
      "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Vietnamese.json"
      },
      select: {
        style:    'os',
        selector: 'td:first-child'
      },
    
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
        {data: "content"},
        {data: "answerA"},
        {data: "answerB"},
        {data: "answerC"},
        {data: "answerD"},
        {data: null,render: function (data, type, row) {
          return '<i data-group="grpEdit" class = "fa fa-edit text-success pointer"></i> ';
        }}
      ],
      initComplete:function(settings, json){
        loadTableQuestion();
        // $("select[name=exampletb_length]").select2({width:'80px', minimumResultsForSearch:-1});
      },
      drawCallback:function(settings){
        bindTableQuestionEvents()
      }
    });
    //end table question data
    tbquestion.on('order.dt search.dt', function(){
      tbquestion.column(0, {search: 'applied', order: 'applied'}).nodes().each(function(cell, i){
        cell.innerHTML = i + 1; 
      })
    }).draw();
    
    // $('#questiontb').on( 'click', 'tbody td:not(:first-child)', function (e) {
    //   tbquestion.inline( this, {
    //       submit: 'allIfChanged'
    //   } );
    // } );
    function loadTableQuestion(){
      $.ajax({
        type: 'GET',
        url: baseURL + subUrl.questionAll,
        contentType: 'application/json',
        beforeSend: function(xhr){
          xhr.setRequestHeader("Authorization", 'Bearer '+Cookies.get("token"))
        }
      }).done(function(res){
        var data = {
          data: res
        };
        
        for(var i = 0; i < res.length;i++){
            Cookies.set("question_"+res[i].id, JSON.stringify(res[i]));
        }
        tbquestion.clear().draw();
        tbquestion.rows.add(res);// Add new data
        tbquestion.columns.adjust().draw(); // Redraw the DataTable
      }).fail(function(err){
        console.log(err);
      });
    };
  
    function loadTableQuestionPersonal(){
      $.ajax({
        type: 'GET',
        url: baseURL + subUrl.questionPersonal,
        contentType: 'application/json',
        beforeSend: function(xhr){
          xhr.setRequestHeader("Authorization", 'Bearer '+Cookies.get("token"))
        }
      }).done(function(res){
        for(var i = 0; i < res.length;i++){
          Cookies.set("question_"+res[i].id, JSON.stringify(res[i]));
        }
        tbquestion.clear().draw();
        tbquestion.rows.add(res);// Add new data
        tbquestion.columns.adjust().draw(); // Redraw the DataTable
      }).fail(function(err){
        console.log(err);
      });
    }
    function bindTableQuestionEvents() {
        $("i[data-group=grpEdit]").off('click').click(function () {
            var rowId = $(this).closest('tr').attr('id');
            $("#hidId").val(rowId);
            dataQuestion = Cookies.getJSON("question_"+rowId);
            //console.log(dataQuestion);
            $('#question').modal("show");
        });
    };
    
    $('#question').modal({ show: false }).on('show.bs.modal', function () {
        var id = $('#hidId').val();
        if (id == -1) {
          CKEDITOR.instances.contentsQuestion.setData("");
          $("#txtDapAn1").val("");
          $("#txtDapAn2").val("");
          $("#txtDapAn3").val("");
          $("#txtDapAn4").val("");
          $("#answerCorrect").val("");
          $("#answerCorrectContents").val("");


        } else {
          CKEDITOR.instances.contentsQuestion.setData(dataQuestion.content);
          //console.log(dataQuestion);
          $("#txtDapAn1").val(dataQuestion.answerA);
          $("#txtDapAn2").val(dataQuestion.answerB);
          $("#txtDapAn3").val(dataQuestion.answerC);
          $("#txtDapAn4").val(dataQuestion.answerD);
          $("#answerCorrect").val(dataQuestion.answerCorrect);
          $("#answerCorrectContents").val(dataQuestion.answerCorrectContent);
          $("#checkPubliced").prop("checked", dataQuestion.publiced);
          
        }
      })
    //-----------------Get list question personal --------------------//
    $('#questionsPersonal').click(function(){
      loadTableQuestionPersonal();
    })
    $('#btnAdd').click(function(){
      $('#hidId').val(-1);
      $('#question').modal("show");
    })
    //--------------Add question--------------------------------------//
    $('#btnAddQuestion').click(function(){
       // alert(CKEDITOR.instances.contentsQuestion.getData());
       // alert($('#contentsQuestion').val());
    //    alert($('#txtDapAn1').val());
    //    alert($('#answerCorrect').val());
    //    alert($('#answerCorrectContents').val());
    //    alert($('#checkPubliced').is(':checked'));
      if($(CKEDITOR.instances.contentsQuestion.getData()) != "" && $('#txtDapAn1').val() != "" && $('#txtDapAn2').val() != "" && $('#txtDapAn3').val() != "" && $('#txtDapAn4').val() != "" && $('#answerCorrect').val() != "")
      {
        var postData; 
        var UrlAPI = "";
        if($("#hidId").val() == -1){
          UrlAPI = baseURL+ subUrl.questionAdd;
          postData = {
            content: CKEDITOR.instances.contentsQuestion.getData(),
            answerA: $('#txtDapAn1').val(),
            answerB: $('#txtDapAn2').val(),
            answerC: $('#txtDapAn3').val(),
            answerD: $('#txtDapAn4').val(),
            answerCorrect: $('#answerCorrect').val(),
            answerCorrectContent: $('#answerCorrectContents').val(),
            publiced: $('#checkPubliced').is(':checked')
          };
        }else
        {
          UrlAPI = baseURL+ subUrl.questionUpdate;
          postData = {
            id : $("#hidId").val(),
            content: CKEDITOR.instances.contentsQuestion.getData(),
            answerA: $('#txtDapAn1').val(),
            answerB: $('#txtDapAn2').val(),
            answerC: $('#txtDapAn3').val(),
            answerD: $('#txtDapAn4').val(),
            answerCorrect: $('#answerCorrect').val(),
            answerCorrectContent: $('#answerCorrectContents').val(),
            publiced: $('#checkPubliced').is(':checked')
          };
        }
        // console.log(UrlAPI);
        // console.log($('#hidId').val());
        $.ajax({
        type: 'POST',
        url: UrlAPI,
        contentType: 'application/json',
        data: JSON.stringify(postData),
        beforeSend: function (xhr) {  
          xhr.setRequestHeader("Authorization", 'Bearer '+Cookies.get("token"))
        }
        }).done(function(res){
          alert('Bạn đã thêm thành công');
          loadTableQuestion();
        }).fail(function(err){
          console.log(err);
          
        });
      }
    });
    
    
    
  
  })  