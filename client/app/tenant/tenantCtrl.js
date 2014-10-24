myApp.controller('tenantCtrl', [ '$scope', '$http', '$routeParams','$location',
	'tenant', '$rootScope', 'growl',
	function($scope, $http, $routeParams, $location, tenant, $rootScope, growl){

		$scope.tenant_list = function(){
			tenant.query({url:'tenants'}).$promise.then(function(data){
				$scope.tenantList = data;
			})
			.catch(function(error){
			alert(error)
			})	
		}
		$scope.tenant_view = function(id1)
    {
      location.href="/#/tenant/"+id1;
    };
		if(window.location.href.indexOf("tenant/") > -1) {
			tenant.get({url:'tenants',id:$routeParams.id}).$promise.then(function(data){
				$scope.tenant = data;
			})
			.catch(function(error){
        growl.addErrorMessage('oops! Something went wrong');
			})
		}	

		$scope.editTenant = function(tenant1){
			console.log('data here',tenant);
			payload = {description: tenant1.description,
					  status: tenant1.status,
					  validFrom: tenant1.validFrom,
					  validTo: tenant1.validTo};
			tenant.update({url:'tenants',id:$routeParams.id}, data=payload).$promise.then(function(data){
				
				$scope.tenant = data;
				$location.path("/tenant/"+$routeParams.id);
			}).catch(function(error){
				growl.addErrorMessage('oops! Something went wrong');
			})
		}


	  $scope.open1 = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened1 = true;
	  };

	  $scope.open2 = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened2 = true;
	  };

	}]); 