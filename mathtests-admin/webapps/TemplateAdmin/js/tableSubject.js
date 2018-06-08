var RequestInfo = {
    HTTP: "http://",
    host: "localhost",
    port: 9999,
    JWTtoken: "",
    cors:"*"
  };
  
var subUrl = {
  contentGroup : "/mathtestscore/api/groups/all",
  subjectAdd: "/mathtestscore/api/subjects/add",
  examAdd: "/mathtestscore/api/exams/add",
  questionAll: '/mathtestscore/api/questions/all',
  addQuestionToExam: '/mathtestscore/api/exams/question'
};

$(document).ready(function(){
    //console.log(subUrl);
    var baseURL = RequestInfo.HTTP+RequestInfo.host+":"+RequestInfo.port;
    var tbquestion, tbSubject;
    tbSubject= $('#tbSubject').DataTable({
        "searching": false,
        "lengthChange": false,
        "showNEntries" : false,
        aLengthMenu:[
            [10,25,50,100,-1],
            [10,25,50,100,"All"]
        ],
        iDisplayLength:25,
        aaData: null,
        rowId: "id",
        columns:[
            {data: null,render: function (data, type, row) {     
                var stringHtml = '<div class="card">'+
                '<div class="card-header">'+data.name+'</div>'+
                '<div class="card-body">';
                
                (data.subjects.length != 0 ? data.subjects.forEach(function(subject) {
                   // console.log(subject);
                    stringHtml += subject.name;
                    stringHtml += '<button class= "btn btn-primary float-right" name="btnAddExam" id='+"subject_"+subject.id+'>Thêm đề thi</button><br>'
                    for(var i = 0; i < subject.exam.length; i++){
                        stringHtml += "+Đề "+(i+1)+":"+'<a href="#" name ="exam" id='+"exam_"+subject.exam[i].id+' data-target="#confirmModalExam" data-toggle="modal">'+subject.exam[i].title+'</a><br>'
                    }                     
                }):stringHtml+="Chưa có dữ liệu")                   
                stringHtml += '</div>'+
                '<div class="card-footer">'+
                    '<div class="btn btn-primary" name="btnAddSubject">Tạo danh mục</div>'+
                '</div>'+
                '</div>'
                //console.log(stringHtml);
                return stringHtml;
              }},
              
          ],
          initComplete:function(settings, json){
            loadTableSubject();
            
          },
          drawCallback:function(settings){
            bindTableSubject();
          }
    });

    function loadTableSubject(){
        console.log(subUrl);
        $.ajax({
            type: 'GET',
            url: baseURL + subUrl.contentGroup,
            contentType: 'application/json',
            //data: JSON.stringify(dataExam),
            beforeSend: function(xhr){
              xhr.setRequestHeader("Authorization", 'Bearer '+Cookies.get("token"))
            }
          }).done(function(res){
            var data = {
              data: res
            };
            console.log(data);
           // Cookies.set("questionsAll", data);
           // console.log(res);
           // console.log(Cookies.getJSON("questionsAll"));
           tbSubject.clear().draw();
           tbSubject.rows.add(res);// Add new data
           tbSubject.columns.adjust().draw(); // Redraw the DataTable
          }).fail(function(err){
            console.log(err);
          })
    };

    function bindTableSubject() {
        $("div[name=btnAddSubject]").off('click').click(function () {
            var rowId = $(this).closest('tr').attr('id');
            console.log(rowId);
            //$("#hidId").val(rowId);
            Cookies.set('rowId', rowId);
            $('#subjectModal').modal("show");
        });

        $("button[name=btnAddExam]").off('click').click(function () {
             var subjectId = $(this).attr('id');
             Cookies.set('subjectID', subjectId.substr(8,subjectId.length));
            $('#examModal').modal("show");
        });

        $("a[name=exam]").off('click').click(function () {
          var examId = $(this).attr('id');
          //var subjectId = $(this).attr('id');
          //console.log(subjectId.substr(8,subjectId.length));
         // //$("#hidId").val(rowId);
          Cookies.set('examIDAdding', examId.substr(5,examId.length));
         $('#addQuestionModal').modal("show");
     });
    };
    
$('#btnDoExam').click(function(){
  location.href = "quiz.html";

})

$('#btnAddContentSubject').click(function(){
    var rowId = Cookies.get('rowId');
    
    var postData = {
        idGroup :rowId,
        name: $('#txtContentSubject').val()
    }
    $.ajax({
        type: 'POST',
        url: baseURL + subUrl.subjectAdd,
        contentType: 'application/json',
        data: JSON.stringify(postData),
        beforeSend: function(xhr){
          xhr.setRequestHeader("Authorization", 'Bearer '+Cookies.get("token"))
        }
      }).done(function(res){
        alert('Thêm thành công');
        loadTableSubject();
      }).fail(function(err){
        console.log(err);
        
      })

   // $('#question').modal('show');
})

$('#btnAddContentExam').click(function(){
    var subId = Cookies.get('subjectID');
    
    var postData = {
        idSubject : subId,
        name: $('#txtTitleExam').val(),
        timeLeft : $('#txtTimeExam').val()
    }
    $.ajax({
        type: 'POST',
        url: baseURL + subUrl.examAdd,
        contentType: 'application/json',
        data: JSON.stringify(postData),
        beforeSend: function(xhr){
          xhr.setRequestHeader("Authorization", 'Bearer '+Cookies.get("token"))
        }
      }).done(function(res){
        alert('Thêm thành công');
        loadTableSubject();
      }).fail(function(err){
        console.log(err);
        
      })

   // $('#question').modal('show');
})
// modal list question
tbquestion = $('#questiontb').DataTable({
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
  iDisplayLength:5,
  order: [[1,"asc"]],
  aaData: null,
  rowId: "id",
  columns:[
    {data: null, className: "text-center"},
    {data: "content"},
    {data: null,render: function (data, type, row) {
      return '<input type="checkbox" name="questionCheck" value='+data.id+'> ';
    }}
  ],
  initComplete:function(settings, json){
    loadTableQuestion();
  },
  drawCallback:function(settings){
    //bindTableQuestionEvents()
  }
});
// //end table question data
tbquestion.on('order.dt search.dt', function(){
  tbquestion.column(0, {search: 'applied', order: 'applied'}).nodes().each(function(cell, i){
    cell.innerHTML = i + 1; 
  })
}).draw();

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
function bindTableQuestionEvents() {
  // $("button[name=question]").off('click').click(function () {
  //     var questionId = $(this).closest('tr').attr('id');
  //     var examID = Cookies.get("examIDAdding");
  //     var postData = {
  //       idExam : examID,
  //       idQuestion : questionId
  //     }
  //     $.ajax({
  //         type: 'POST',
  //         url: baseURL + subUrl.addQuestionToExam,
  //         contentType: 'application/json',
  //         data: JSON.stringify(postData),
  //         beforeSend: function(xhr){
  //           xhr.setRequestHeader("Authorization", 'Bearer '+Cookies.get("token"))
  //         }
  //       }).done(function(res){
  //         alert('Thêm thành công');
  //         //loadTableSubject();
  //       }).fail(function(err){
  //         alert("ss");
  //         console.log(err);
          
  //       })
      
  // });
};
$('#btnAddQuestionToExam').click(function(){
  var question_ID = [];
  $('input:checked').each(function() {
    question_ID.push(this.value);
  });
  question_ID = question_ID.toString();
  //var questionId = $(this).closest('tr').attr('id');
      var examID = Cookies.get("examIDAdding");
      var postData = {
        idExam : examID,
        idQuestion : question_ID
      }
      console.log(postData);
      $.ajax({
          type: 'POST',
          url: baseURL + subUrl.addQuestionToExam,
          contentType: 'application/json',
          data: JSON.stringify(postData),
          beforeSend: function(xhr){
            xhr.setRequestHeader("Authorization", 'Bearer '+Cookies.get("token"))
          }
        }).done(function(res){
          alert('Thêm thành công');
          //loadTableSubject();
        }).fail(function(err){
          alert("ss");
          console.log(err);
          
        })
       // console.log(question_ID);
  //console.log($("input[name=questionCheck]").is(':checked').val());
});

});