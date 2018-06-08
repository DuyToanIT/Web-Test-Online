var RequestInfo = {
    HTTP: "http://",
    host: "167.99.75.75",
    port: 8080,
    JWTtoken: "",
    cors:"*"
  };

$(document).ready(function(){
    var baseURL = RequestInfo.HTTP+RequestInfo.host+":"+RequestInfo.port;
    var tb1, infoData;
        var token = Cookies.get('token');
        tb1 = $('#questiontb').DataTable({
          columnDefs:[
            {
              orderable: false,
              targets:[0,5]
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
            {data: "content"},
            {data: "answerA"},
            {data: "answerB"},
            {data: "answerC"},
            {data: "answerD"},
            {data: null, render: function (data, type, row) {
              return '<i data-group="grpEdit" class = "fa fa-edit text-success pointer"></i> ' +
              '<i data-group="grpDelete" class = "fa fa-remove text-danger pointer"></i> ';
            }}
          ],
          initComplete:function(settings, json){
            loadTable();
           // $("select[name=exampletb_length]").select2({width:'80px', minimumResultsForSearch:-1});
          },
          drawCallback:function(settings){
            // bindTableEvents()
          }
        });
        
        tb1.on('order.dt search.dt', function(){
          tb1.column(0, {search: 'applied', order: 'applied'}).nodes().each(function(cell, i){
            cell.innerHTML = i + 1; 
          })
        }).draw();
      
        function loadTable(){
          var url = "http://167.99.75.75:8080/user/questions";
          var token = Cookies.get('token');
          $.ajax({
            type: 'GET',
            url: baseURL+'/user/questions',
            beforeSend: function (xhr) {  
              //xhr.setRequestHeader("Access-Control-Allow-Origin", '*');
              xhr.setRequestHeader("Authorization", 'Bearer '+token);
            },
            contentType: 'application/json'
          }).done(function(res){
            tb1.clear().draw();
            tb1.rows.add(res);// Add new data
            tb1.columns.adjust().draw();

          }).fail(function(err){
            console.log(err);
          });
        }
})  