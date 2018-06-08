var RequestInfo = {
    HTTP: "http://",
    host: "localhost",
    port: 9999,
    JWTtoken: "",
    cors:"*"
  };
  
  var subUrl = {
    contentGroup : '/mathtestscore/api/groups/all'
  };

$(document).ready(function(){
    var baseURL = RequestInfo.HTTP+RequestInfo.host+":"+RequestInfo.port;
    var tbquestion;
    tbquestion= $('#tbSubject').DataTable({
      "searching": false,
      "lengthChange": false,
      "showNEntries" : false,
          aLengthMenu:[
            [10,25,50,100,-1],
            [10,25,50,100,"All"]
          ],
          iDisplayLength:25,
         // order: [[1,"asc"]],
          aaData: null,
            //cellId: "id",
          columns:[
            //{data: null},
            //{data: "content"},
            {data: null,render: function (data, type, row) {
              //console.log(data);
            
              
                var stringHtml = '<div class="card">'+
                '<div class="card-header">'+data.name+'</div>'+
                '<div class="card-body">';
                // for(var i = 0; i < data.subjects.length; i++){
                //   data.subjects[i].name
                // }
                 //console.log(data)+
                    (data.subjects.length != 0 ? data.subjects.forEach(function(subject) {
                      stringHtml += subject.name+'<br>'
                      console.log(subject);
                      for(var i = 0; i < subject.exam.length; i++){
                        stringHtml += "+Đề "+(i+1)+":"+'<a href="#" id='+"exam_"+subject.exam[i].id+' name="examDo">'+subject.exam[i].title+'</a><br>'
                      }
                      // console.log(entry.name)
                    // console.log(entry)
                      
                    }):stringHtml+="Chưa có dữ liệu")
                    
                    
                  
                    stringHtml += '</div>'+
                '<div class="card-footer">'+
                    '<div class="btn btn-primary">Xem tiếp</div>'+
                '</div>'+
              '</div>'
             // console.log(sss);
              return stringHtml;
              }},
              
          ],
          initComplete:function(settings, json){
            loadTableContentsExam();
            // $("select[name=exampletb_length]").select2({width:'80px', minimumResultsForSearch:-1});
          },
          drawCallback:function(settings){
            bindTableQuestionEvents()
          }
    });

    function loadTableContentsExam(){
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
           // console.log(data);
           // Cookies.set("questionsAll", data);
           // console.log(res);
           // console.log(Cookies.getJSON("questionsAll"));
            tbquestion.clear().draw();
            tbquestion.rows.add(res);// Add new data
            tbquestion.columns.adjust().draw(); // Redraw the DataTable
          }).fail(function(err){
            console.log(err);
          })
    };
    function bindTableQuestionEvents() {
       $("a[name=examDo]").off('click').click(function () {
         var examId = $(this).attr('id');
         Cookies.set('examDo', examId.substr(5,examId.length));
         $('#confirmModalExam').modal('show');
       });
    };
$('#btnDoExam').click(function(){
  location.href = "quiz.html";

})

});