app.controller('HomeController', ['$scope', 'Data', '$location',

	function($scope, Data, $location){

		Data.get('article').then(function(data){
		    $scope.articles = data.data;
	    });


		$scope.nextPage = function() {

		}

		$scope.view = 'list';

	    $scope.editArticle = function (id) {
	    	$location.path('article/edit/' + id)
	    }

	    $scope.deleteArticle = function (id, index) {
	    	var artic = $scope.articles[index];
	    	swal({   
	    		title: "Are you sure?",   
	    		text: "You will not be able to recover!",   
	    		type: "warning",   
	    		showCancelButton: true,   
	    		confirmButtonColor: "#DD6B55",   
	    		confirmButtonText: "Yes, delete it!",   
	    		closeOnConfirm: false 
	    	}, function(){ 
	    		var del =  Data.delete('article/' + id);

	    		del.then(function(result) {
	    			if(result.status != 'error'){
	    				swal("Deleted!", "The article " + artic.name +" was deleted.", "success");
	    				return $scope.articles.splice(index, index+1)
	    			} else {
	    				console.log( result );
	    			}
	    		})
	    	});
	    }
	}
])

app.controller('ArticleController', ['$scope', '$routeParams', 'Data','$location',
	function($scope, $routeParams, Data,$location){
		Data.get('article/'+$routeParams.articID).then(function(data){
	        $scope.article = data.data[0];
	    });

	    $scope.addArticle = 'addArticle';

	    $scope.deleteArticle = function (id) {
	    	swal({   
	    		title: "Are you sure?",   
	    		text: "You will not be able to recover!",   
	    		type: "warning",   
	    		showCancelButton: true,   
	    		confirmButtonColor: "#DD6B55",   
	    		confirmButtonText: "Yes, delete it!",   
	    		closeOnConfirm: false 
	    	}, function(){ 
	    		var del =  Data.delete('article/' + id);
	    		del.then(function(result) {
	    			if(result.status != 'error'){
	    				swal("Deleted!", "Your imaginary file has been deleted.", "success");
	    				$location.path('article'); 
	    			} else {
	    				console.log( result );
	    			}
	    		})
	    	});
	    }
	}
])

app.controller('EditController', ['$scope', '$routeParams', 'Data','edit', '$location',
	function($scope, $routeParams, Data, edit, $location){
		var articID = ($routeParams.articID) ? parseInt($routeParams.articID) : 0;
	    $scope.buttonText = (articID > 0) ? 'Update' : 'Add New';

		if (articID != 0) {
			var original = edit.data;
			original.id = articID;		
			$scope.edit = angular.copy(original)[0];		
			$scope.edit.id = articID;

			$scope.isClean = function() {
		        return angular.equals(original, $scope.edit);
		    }

			$scope.addArticle = 'addArticle';

		} else {
			$scope.edit = {
				"id"		  : randomId(1000, 5223),
				"name"		  : "",
				"title"		  : "",
				"description" : "",
				"content"	  : "" 
			}
		}

	    $scope.saveArticle = function (id, article) {
	    	if (articID == 0) {
	    		Data.post('article', article).then(function (result) {
                    if(result.status != 'error'){

                    	swal({
                    		title: "Added!",
	    					type: "success"
                    	});

                    	$location.path('article');

                    }else{
                        console.log(result);
                    }
                });

	    	} else {
	    		Data.put('article/'+ id, article).then(function (result) {
	    			if(result.status != 'error'){
	    				swal({
                    		title: "Updated!",
	    					type: "success"
                    	})

                    	$location.path('article');

	    			} else {
	    				console.log( result );
	    			}
	            });


	    	}
	    }

	    $scope.deleteArticle = function (id) {
	    	swal({   
	    		title: "Are you sure?",   
	    		text: "You will not be able to recover!",   
	    		type: "warning",   
	    		showCancelButton: true,   
	    		confirmButtonColor: "#DD6B55",   
	    		confirmButtonText: "Yes, delete it!",   
	    		closeOnConfirm: false 
	    	}, function(){ 
	    		var del =  Data.delete('article/' + id);
	    		del.then(function(result) {
	    			if(result.status != 'error'){
	    				swal("Deleted!", "Your imaginary file has been deleted.", "success");
	    				$location.path('article');
	    			} else {
	    				console.log( result );
	    			}
	    		})
	    	});
	    }


	    function randomId(min, max) {
  			var rand = (min - 1) + Math.random() * ((max + 1) - (min - 1));
  			rand = Math.round(rand);
  			while (rand == min - 1 || rand == max + 1) {
    			var rand = (min - 1) + Math.random() * ((max + 1) - (min - 1));
    			rand = Math.round(rand);
  			}

  			return rand;
		}


	}
])

app.controller('AdminController', ['$scope', '$routeParams', '$location', 
	function($scope, $routeParams, $location){

		$scope.LoginIn = function(){
			$location.path('/article')
		}
	}
])