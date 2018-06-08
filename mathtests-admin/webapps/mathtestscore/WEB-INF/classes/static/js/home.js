angular.module('mathtest.home', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider){
      
      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise("/")
      $stateProvider
      .state('home', {
        templateUrl: 'html/home.html'
       })
      .state('home.users', {
      		url: '/users',
        	templateUrl: 'html/users.html',
          controller: 'UserCtrl'
      })
      .state('home.questions', {
    		url: '/questions',
      	templateUrl: 'html/questions.html',
        controller: 'QuestionsCtrl'
    });
})
.controller('HomeCtrl', ['$scope', '$rootScope', '$http', '$location', 'AuthService','$state',
  function($scope, $rootScope, $http, $location, authService, $state) {
    $rootScope.selectedTab = $location.path() || '/';
    $scope.error = false;
    $scope.logout = function(){
      authService.removeAuth();
      $state.transitionTo('login');
    };

}])
.controller('UserCtrl', ['$scope', '$rootScope', '$http', '$location', 'AuthService','$state',
  function($scope, $rootScope, $http, $location, authService, $state) {
    // get information Users
	// Customize Field Edit
	 $scope.editor = new $.fn.dataTable.Editor( {
	  	    ajax: {
	  	        dataType: 'json',
	            create: {
	                type: 'POST',
	                url: 'http://localhost:60814/TroubleshootingWS.asmx/GetTroubleshootingDataForOfflineUse'
	            },
	            edit: {
	                type: 'POST',
	                url: authService.getProtocol() + "://"+ authService.getAddress() + '/user/updates',
	                headers: authService.createAuthorizationTokenHeader(),
	                data: function ( d ) {
	                	var array = $.map(d.data, function(value, index) {
	                		return  {id:index,value:value};
	                	});
	                	var jsonSend = {
	                			id:array[0].id,
	                			firstName: array[0].value.firstName,
	                			lastName: array[0].value.lastName,
	                			email: array[0].value.email,
	                			birthDate: array[0].value.birthDate,
	                			enabled: array[0].value.enabled,

	                	}
	                    return JSON.stringify(jsonSend);
	                },
	                success: function( data, result) {
	                	$scope.userTable.buttons().destroy()
	                	$scope.userTable.row( "#" + data.id ).data( data ).invalidate().draw();
	                }

	            }
	        },
	        table: "#usersTable",
	        idSrc:  'id',
	        fields: [ {
	                label: "Họ:",
	                name: "lastName"
	            }, {
	                label: "Tên:",
	                name: "firstName"
	            }, {
	                label: "Ngày sinh:",
	                name: "birthDate",
	                type: "date",
	                dateFormat: 'YYYY-MM-DD'
	            }, {
	                label: "Email:",
	                name: "email"
	            },{
	            	label: "Quyền:",
	            	name: "authority"
	            },{
	            	label: "Enable:",
	            	name: "enabled",
	            	type:  "checkbox",
	                separator: "|",
	                options:   [
	                    { label: '', value: true }
	                ]
	            }
	        ]
	      } );
	 
	      $('#usersTable').on( 'click', 'tbody td:not(:last-child)', function (e) {
	    	$scope.editor.inline( this , {
	            submit: 'allIfChanged'
	        } );
	      } )
	      .on( 'change', 'input.editor-active', function () {
	    	$scope.editor
	              .edit( $(this).closest('tr'), false  )
	              .set( 'enabled', $(this).prop( 'checked' ) ? true : false )
	              .submit();
	      } );
	      /*$scope.editor.on( 'submitSuccess', function (e, json, data) {
	    	  console.log( json );
	    	  $scope.userTable.row({selected:true}).data( json ).draw();
	      });*/
	      // Data Table User
	     
	      $scope.userTable = $('#usersTable').DataTable( {
		        dom: "lfrti",
		        ajax: {
		        	url: authService.getProtocol() + "://"+ authService.getAddress() + '/user/all',
		            method: 'GET',
		            headers: authService.createAuthorizationTokenHeader(),
		            dataSrc : function (json) {
		                console.log("Done!!!!!");
		                return json;
		            }
		        },
		        destroy: true,
		        order: [[ 4, 'asc' ]],
		        rowId: 'id',
		        columns: [
		            { data: "lastName"  },
		            { data: "firstName" },
		            { data: "birthDate" },
		            { data: "email" 	},
		            { data: "authorities.0.authority"},
		            { 
		              data: "enabled",
		              render: function ( data, type, row ) {
		                    if ( type === 'display' ) {
		                        return '<input type="checkbox" class="editor-active">';
		                    }
		                    return data;
		                },
		                className: "dt-body-center"
		            }
		        ],
		        select: {
		            style: 'os',
		            selector: 'td:not(:last-child)' // no row selection on last column
		        },
		        buttons: [
		            { extend: "create", editor: $scope.editor },
		            { extend: "edit",   editor: $scope.editor },
		        ],
		        rowCallback: function ( row, data ) {
		            // Set the checked state of the checkbox in the table
		            $('input.editor-active', row).prop( 'checked', data.enabled == true );
		        }
		   } ); 

}])
;
