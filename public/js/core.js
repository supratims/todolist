//Service class - todo: move services to a different file
angular.module('todoService', [])
	
	//implement the CRUD methods 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}
		}
	}]);
//Main Controller
angular.module('todoController', [])

	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;

		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		$scope.createTodo = function() {
			$scope.loading = true;

			if ($scope.formData.text != undefined) {

				Todos.create($scope.formData)
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; 
						$scope.todos = data; 
					});
			}
		};

		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; 
				});
		};
	}]);

//Core angular injection - inject all dependent controllers and services
angular.module('simpleToDo', ['ngRoute', 'todoController', 'todoService']);