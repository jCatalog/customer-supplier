myApp.controller('searchSpplrCtrl', ['$scope', '$http', '$routeParams','$location',
	'supplier', 'fileReader', 'tenant', 'growl','$modal','$resource','$rootScope',
	function($scope, $http, $routeParams, $location, supplier, fileReader, tenant, growl, $modal, $resource,$rootScope){
    $scope.supplier_view = function(id)
    {
      location.href="/#/supplier/"+id;
    };
    
    $scope.rem_supplier = function(supp_id,index)
    {
    var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
      });

      modalInstance.result.then(function (selectedItem) {
        supplier.delete({url:'suppliers',
        supplier_id:supp_id}).$promise.then(function(data){	
          $scope.srch.supplier.resultList.splice(index,1);
          $scope.filtered();
          growl.addSuccessMessage('Supplier removed Succesfully');
        }).catch(function(error){
            growl.addErrorMessage("oops! Something went wrong");
        })
      });
    };
    
    $scope.supplier_excel = function()
    {
      var element = angular.element('<a/>');
        element.attr({
            href: '/api/getSupplierExcel'
        })[0].click();
    };	
    
    $scope.pagedItems = [];
   $scope.currentPage = 0;
	 $scope.filteredItems = [];
   $scope.filteredItems1 = [];
	 $scope.itemsPerPage = 20;
	 $scope.range = function (start, end) {
	    var ret = [];
	    if (!end) {
	        end = start;
	        start = 0;
	    }
	    for (var i = start; i < end; i++) {
	        ret.push(i);
	    }
	    return ret;
	};
    
     $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };
    
    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };
  
    $scope.groupToPages = function () {
      $scope.pagedItems = [];
      $scope.filteredItems = $scope.srch.supplier.resultList;
      $scope.filtered();   
    };

    $scope.filtered = function () {
      if($scope.filteredItems){
          for (var i = 0; i < $scope.filteredItems.length; i++) {
              if (i % $scope.itemsPerPage === 0) {
                  $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
              } else {
                  $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
              }
          }
      }
    }
 
  $scope.groupToPages();
  
	$scope.search = function(resrcname){
		var resrc = supplier;
		//var srchObj = resrcname=='customer'? $rootScope.srch.customer : $rootScope.srch.supplier;
    var srchObj = $rootScope.srch.supplier;
		var rqstData = customTransform(resrcname);
		if(rqstData.length==0){
			//alert('Fill some entry in the form please');
      var modalInstance = $modal.open({
      templateUrl: 'alert.html',
      controller: 'ModalInstanceCtrl'

      });
			$scope.searchDirty = false;
		}
		else{
			resrc.searchQuery({url:resrcname+'Search'}, rqstData).$promise.then(function(data){	
				srchObj.resultList = data;
				srchObj.searchDirty = true;
        $scope.data = data;
         $scope.currentPage = 0;
         $scope.groupToPages();
         
			}).catch(function(error){
					growl.addErrorMessage("oops! Something went wrong");
			})
//       console.log($scope.data);
		}

		function customTransform(){
			var temp = [];
			
			for (key in srchObj){
				switch(key){
					case 'customerId':
					case 'customerName':
					case 'supplierId':
					case 'supplierName':
					case 'city':
					case 'state':
					case 'country':
					// the above are those keys which need to be sent to api search request
						if(srchObj[key]!=""){
								temp.push({
									"key": key,
									"value": srchObj[key]
								})						
							}
				}

			}
			return temp;
		}
  }
 }]);
myApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

  $scope.ok = function () {
      $scope.item = 'yes';
    $modalInstance.close($scope.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});