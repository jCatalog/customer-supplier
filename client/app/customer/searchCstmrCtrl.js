myApp.controller('searchCstmrCtrl', [ '$scope', '$http', '$routeParams','$location',
	'customer', 'tenant', '$rootScope', 'fileReader', 'growl', '$modal','$resource',
	function($scope, $http, $routeParams, $location, customer, tenant, $rootScope, fileReader, growl, $modal, $resource){
     $scope.customer_excel = function()
    {
      var element = angular.element('<a/>');
        element.attr({
            href: '/api/getCustomerExcel'
        })[0].click();
    };
    
    $scope.rem_customer = function(cus_id,index)
    {
    var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
      });

      modalInstance.result.then(function (selectedItem) {
        customer.delete({url:'customers',
        customer_id:cus_id}).$promise.then(function(data){
          $scope.srch.customer.resultList.splice(index,1);
          $scope.filtered();
          growl.addSuccessMessage('Customer removed Succesfully');
        }).catch(function(error){
            growl.addErrorMessage("oops! Something went wrong");
        })
      });
    };  
    
     $scope.customer_view = function(id)
      {
        location.href="/#/customer/"+id;
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
      $scope.filteredItems = $scope.srch.customer.resultList;
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
    var resrc = customer;
    var srchObj = $rootScope.srch.customer;
		var rqstData = customTransform(resrcname);
			resrc.searchQuery({url:resrcname+'Search'}, rqstData).$promise.then(function(data){	
				$scope.srch.customer.resultList = data;
				srchObj.searchDirty = true;
        $scope.data = data;
         $scope.currentPage = 0;
         $scope.groupToPages();
			}).catch(function(error){
					growl.addErrorMessage("oops! Something went wrong");
			})

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