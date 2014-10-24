myApp.controller('headerCtrl', [ '$scope', '$location', '$rootScope', 'tenant', 'customer', 'supplier', 'growl',
	function($scope, $location, $rootScope, tenant, customer, supplier, growl){
		
		$scope.isActive = function (viewLocation) { 
	        var loc_path = $location.path();
	        
	        var res = loc_path.match(/\/([a-z]+)\/?/i)
	        if (res === null)
	        	return (loc_path === viewLocation);
        	else
		        return (viewLocation === res[1] || viewLocation+"s" === res[1])
	        
	    };

	    $scope.setRole = function(){
			$rootScope.user = { role: "admin" };
		    var tenantList;
		    if($scope.user_role!='admin'){
				tenant.query({url:'tenants'}).$promise.then(function(data){
					tenantList = data;
					for(i=0; i<tenantList.length; i++){
						if(tenantList[i].name == $scope.user_role){
							$rootScope.user.role='tenant';
							$rootScope.user.name=tenantList[i].name;
							$rootScope.user.id=tenantList[i]._id;
							$location.path('/tenant/'+$rootScope.user.id);
							break;
						}
					}
					if(i==tenantList.length)	//no match found
					{
						$rootScope.user = { role: "admin" };
						$location.path('/');
					}
				}).catch(function(error){
					growl.addErrorMessage("oops! Something went wrong");
				})

		    }
	    }


	    // use the following functions if you wish to use dropdown for search
	    $scope.search = function(resrcname){
		
			var rqstData;

			if(resrcname=='customer'){
				rqstData = customTransform($scope.srch1);
				if(rqstData.length==0){
					alert('Fill some entry in the form please');
					$scope.searchDirty = false;
					return;
				}

				customer.searchQuery({url:'customerSearch'}, rqstData).$promise.then(function(data){	
					$rootScope.srchResult.List = data;
					$rootScope.searchDirty = true;
					$rootScope.resrcname = 'customer'
					$rootScope.Resrcname = 'Customer'
					$location.path('/searchresults');
				}).catch(function(error){
					growl.addErrorMessage("oops! Something went wrong");
				})
			}
			else{
				rqstData = customTransform($scope.srch2);
				if(rqstData.length==0){
					alert('Fill some entry in the form please');
					$scope.searchDirty = false;
					return;
				}
				supplier.searchQuery({url:'supplierSearch'}, rqstData).$promise.then(function(data){	
					$rootScope.srchResult.List = data;
					$rootScope.searchDirty = true;
					$rootScope.resrcname = 'supplier'
					$rootScope.Resrcname = 'Supplier'
					$location.path('/searchresults');
				}).catch(function(error){
					growl.addErrorMessage("oops! Something went wrong");
				})
			}

			function customTransform(srch){
				var temp = [];
				for (key in srch){
					console.log(key);
					if(srch[key]!=""){
						temp.push({
							"key": key,
							"value": srch[key]
						})					
					}
				}
				console.log(temp);
				return temp;
			}	    	
	    }


	    // some initializations. dont know where to put these yet.
	    $rootScope.tenantbar = {
	    	tabs : [
    			{active: true},
    			{active: false},
    			{active: false}
    		]
    	};

    	$rootScope.user = { role: "admin" };
    	$rootScope.srch = { customer: {}, supplier: {} };

}]); 