var RequestInfo = {
    HTTP: "http://",
    host: "localhost",
    port: 9999,
    JWTtoken: "",
    cors:"*"
  };
  
  var subUrl = {
    contentExam : '/mathtestscore/api/exams/getquestions'
  };
  $(document).ready(function(){
    //get content exam
    var baseURL = RequestInfo.HTTP+RequestInfo.host+":"+RequestInfo.port;
    var tbquestion;
    tbquestion= $('#tbTopic').DataTable({
      "searching": false,
      "lengthChange": false,
          aLengthMenu:[
            [10,25,50,100,-1],
            [10,25,50,100,"All"]
          ],
          iDisplayLength:25,
         // order: [[1,"asc"]],
          aaData: null,
          rowId: "id",
          columns:[
            //{data: null},
            //{data: "content"},
            {data: null,render: function (data, type, row) {
              //console.log(row);
                return '<div class="card">'+
                  '<div class="card-header">'+data.content+'</div>'+
                    '<div class="card-body">'+
                      '<div class="row">'+
                        '<div class="col-sm-6">'+
                          '<input type="radio" name="iCheck">'+data.answerA+
                        '</div>'+
                        '<div class="col-sm-6">'+
                          '<input type="radio" name="iCheck">'+ data.answerB+
                        '</div>'+
                        '<div class="col-sm-6">'+
                          '<input type="radio" name="iCheck">' + data.answerC +
                        '</div>'+
                        '<div class="col-sm-6">'+
                          '<input type="radio" name="iCheck">' + data.answerD +
                        '</div>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'
              }},
              
          ],
          initComplete:function(settings, json){
            loadTableContentsExam();
            // $("select[name=exampletb_length]").select2({width:'80px', minimumResultsForSearch:-1});
          },
          drawCallback:function(settings){
            //bindTableQuestionEvents()
          }
    });

    function loadTableContentsExam(){
        var idEx = Cookies.get('examDo');
        var dataExam = {
            idExam: idEx
        };
        $.ajax({
            type: 'POST',
            url: baseURL + subUrl.contentExam,
            contentType: 'application/json',
            data: JSON.stringify(dataExam),
            beforeSend: function(xhr){
              xhr.setRequestHeader("Authorization", 'Bearer '+Cookies.get("token"))
            }
          }).done(function(res){
            var data = {
              data: res
            };
            //console.log(data);
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
    //get time 
    var idEx = Cookies.get('examDo');
    var times = "";
    var grs= Cookies.getJSON('groups');
    grs.forEach(gr => {
        if(gr.subjects.length >0)
            gr.subjects.forEach(subject =>{
                if(subject.exam.length > 0)
                    subject.exam.forEach(exam=>{
                        if(exam.id == idEx)
                        {
                            times = exam.timeLeft;
                        }
                    });
            });
    });
    console.log(times)
    //Thoi hgian lam bai
    update_timer_display();
        var time = "";
        var notifi = new PNotify({
            title: 'Thời gian còn lại: ',
            type: 'info',
            hide: false,
        });
        function update_timer_display(){
            var countDownDate = new Date(new Date().getTime() + times*60000);
            var x = setInterval(function() {
                var now = new Date().getTime();
                var distance = countDownDate - now;
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                time = hours + ":"+ minutes + ":" + seconds;
                if (distance < 0) {
                    clearInterval(x);
                    alert("Hết giờ làm bài");
                    location.href = "exam.html";
                }
                notifi.update (
                {
                    text: time
                }
                );
            }, 1000);
        };  
        
        // Submit exam
    $('#btnSubmitExam').click(function(){
        $.confirm({
            title: 'Thông báo!',
            content: 'Bạn có muốn nộp bài không ?',
            buttons: {
                Có: function () {
                    $.alert('Đã nộp thành công!');
                    location.href = "exam.html";
                },
                Không: function () {
                    $.alert('Vẫn chưa nộp bài!');
                }
            }
        });
    });

    $('#btnCancelExam').click(function(){
        $.confirm({
            title: 'Thông báo!',
            content: 'Bạn có chắc muốn hủy bài làm không ?',
            buttons: {
                Có: function () {
                    $.alert('Đã hủy!');
                    location.href = "exam.html";
                },
                Không: function () {
                    
                }
            }
        });
    });
  })  