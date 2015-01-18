/**
* testBlog Module
*
* Description
*/

var app = angular.module('testBlog', ['ngRoute']);

app.config(['$routeProvider',
	function($routeProvider) {

		$routeProvider
			.when('/admin', {
				title: 'Admin',
				templateUrl: 'view/admin_tpl.html',
				controller: 'AdminController'
			})

			.when('/article', {
				title: 'Articles',
				templateUrl: 'view/home_tpl.html',
				controller: 'HomeController'
			})

			.when('/article/:articID', {
				title: 'View article',
				templateUrl: 'view/post_tpl.html',
				controller: 'ArticleController'
			})

			.when('/article/edit/:articID', {
				title: 'Edit article',
				templateUrl: 'view/post_tpl.html',
				controller: 'EditController',
				resolve: {
		          	edit: function(Data, $route){
		            	var articID = $route.current.params.articID;
		            	if ( articID != 0 ) {
		            		return Data.get('article/' + articID);
		            	};
		          	}
		        }
			})


			.otherwise({
                redirectTo: 'admin'
            })
	}
])


app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

