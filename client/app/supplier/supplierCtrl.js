myApp.controller('supplierCtrl', [ '$scope', '$http', '$routeParams','$location',
	'supplier', 'fileReader', 'tenant', 'growl','$modal','$resource',
	function($scope, $http, $routeParams, $location, supplier, fileReader, tenant, growl, $modal, $resource){
		$scope.addresses = [];
     var StaticData = $resource('/api/getStaticData');
    StaticData.query().$promise.then(function(data){
      $scope.language = data[0].languages;
      $scope.country = data[1].countries;
    });
		supplier.query({url:'supplierGroup'}).$promise.then(function(data){	
			$scope.sup_gp_dtls = data;
		}).catch(function(error){
        growl.addErrorMessage('oops! Something went wrong');
    })
    
    $scope.cancel = function ($modalInstance) {
      $modalInstance.dismiss('cancel');
    };
     $scope.supplier_view = function(id1,id2)
    {
      location.href="/#/tenant/"+id1+"/supplier/"+id2;
    };
    
	$scope.addAddress = function(address_dtls)
		{
      if($scope.edit_flag)
			{	
        if( $scope.addressValidation()){
            growl.addErrorMessage('please enter required and valid field to update address');
            $scope.addressReset();
         }
          else{
            for(i=0;i<$scope.addresses.length;i++)
            {
              if($scope.addresses[i]._id == address_dtls._id)
              {
               $scope.addresses[i]=address_dtls;
              }	
            }
            growl.addSuccessMessage('address updated');
          //  $scope.addresses.push(address_dtls);
          }
			}
      else
      {
        if( $scope.addressValidation()){
           growl.addErrorMessage('please enter required and valid field to create new address');
           $scope.addressReset();
         }
          else{
           growl.addSuccessMessage('new address added');
           $scope.addresses.push(address_dtls);    
          }
      }  
			
		};
		$scope.edit_address = function(address_dtls){
			$scope.edit_flag = true;
			$scope.newAddr = angular.copy(address_dtls);
			$('#addressModal').modal('show');
		};
	
		$scope.new_address = function(){
			$scope.edit_flag = false;
      $scope.newAddr = {};
			$('#addressModal').modal('show');
		};

		$scope.delete_address = function(indx){
			$scope.addresses.splice(indx,1);
      growl.addSuccessMessage('address deleted Succesfully');
		};
		
		$scope.contacts = [];
		
		$scope.addContact = function(contact_dtls)
		{
			if($scope.edit_flag)
			{
        if( $scope.contactValidation()){
            growl.addErrorMessage('please enter required and valid field to update contact');
            $scope.contactReset();
         }
        else{
          for(i=0;i<$scope.contacts.length;i++)
          {
           if($scope.contacts[i]._id == contact_dtls._id)
            {
             $scope.contacts[i]=contact_dtls;
            }	
          }
           growl.addSuccessMessage('contact updated');
          // $scope.contacts.push(contact_dtls);
        }
         
			}
      else
      {
         if( $scope.contactValidation()){
            growl.addErrorMessage('please enter required and valid field to create new contact');
            $scope.contactReset();
         }
        else{
          growl.addSuccessMessage('new contact created');
          $scope.contacts.push(contact_dtls);
        }  
      }  
		};

		$scope.edit_contact = function(contact_dtls){
			$scope.edit_flag = true;
			$scope.newContact = angular.copy(contact_dtls);
			$('#contactModal').modal('show');
		};
	
		$scope.new_contact = function(data){
			$scope.edit_flag = false;
      $scope.newContact = {};
			$('#contactModal').modal('show');
		};

		$scope.delete_contact = function(indx){
			$scope.contacts.splice(indx,1);
      growl.addSuccessMessage('contact deleted Succesfully');
		}


		$scope.checkAccessor = function(){
			if(window.location.href.indexOf('tenant') > -1){
				//its tenant
				$scope.accessor = 'tenant';
				$scope.tenant_id = $routeParams.id;
			}
			else
			{
				// its admin
				$scope.accessor = 'admin';
				tenant.query({url:'tenants'}).$promise.then(function(data){
					$scope.tenantList = data;
				}).catch(function(error){
          growl.addErrorMessage('oops! Something went wrong');
				})
			}
		}

		$scope.checkView = function(){
			if(window.location.href.indexOf("new") > -1) 
			{
				$scope.page = 'new';
			}		
			if(window.location.href.indexOf("/supplier") > -1) {
				supplier.get({url:'suppliers',supplier_id:$routeParams.supplier_id}).$promise.then(function(data){
					$scope.supplier = data;
					$scope.tenant_id = $routeParams.id;
					if(data.abstractBusinessPartner)
					{
						if(data.abstractBusinessPartner.logo != 'image not found')
						{
							$scope.imageSrc = data.abstractBusinessPartner.logo;
						}
					}	
					$scope.contacts = [];
					$scope.addresses = [];
					if($scope.supplier.contacts)
					{
						for(i=0;i<$scope.supplier.contacts.length;i++)
						{
							$scope.contacts.push($scope.supplier.contacts[i]);
						}
					}
					if($scope.supplier.addresses)
					{
						for(i=0;i<$scope.supplier.addresses.length;i++)
						{
							$scope.addresses.push($scope.supplier.addresses[i]);
						}
					}
				})
				.catch(function(error){
          growl.addErrorMessage('oops! Something went wrong');
				})
				if(window.location.href.indexOf("edit") > -1){
					$scope.page = 'edit';
				}
				else
				{
					$scope.page = 'view';
				}	
    		}

    	}	


		$scope.checkAccessor();
		$scope.checkView();
		
		$scope.fetch_data = function()
		{
			supplier.query({url:'suppliersByTenant', id:$routeParams.id}).$promise.then(function(data){	
        		$scope.supplierData=data;
        		$scope.tenant_id = $routeParams.id;
			})
			.catch(function(error){
         growl.addErrorMessage('oops! Something went wrong');
			})
		};
		
		$scope.back_new = function()
		{
			location.href="#/tenant/"+$routeParams.id;
		};

		$scope.update = function(supplier_dt,contact_dtls,address_dtls)
		{
			if($scope.supplier_form.$valid && $scope.supplier.supplierGroup._id != 'null' && $scope.supplier.tenantRef._id != 'null')
			{	
				var ten_id = supplier_dt.tenantRef._id;
				supplier_dt.tenantRef = {};
				supplier_dt.tenantRef = ten_id;
				delete ten_id;
				if($scope.imageSrc != "img/image_upload.jpg")
				{	
					if(!supplier_dt.abstractBusinessPartner)
					{
						supplier_dt.abstractBusinessPartner = {};
					}	
					supplier_dt.abstractBusinessPartner.logo = $scope.imageSrc;
				}
				if(contact_dtls)
				{
					supplier_dt.contacts = [];
					for (var i = 0; i < contact_dtls.length; i++){
	    				supplier_dt.contacts.push(contact_dtls[i]);
					}
				}	
				if(address_dtls)
				{
					supplier_dt.addresses = [];
					for (var i = 0; i < address_dtls.length; i++){
	    				supplier_dt.addresses.push(address_dtls[i]);
					}
				}	
				
				supplier.update({url:'suppliers',supplier_id:$routeParams.supplier_id}, supplier_dt).$promise.then(function(data){
          growl.addSuccessMessage('supplier updated Succesfully');
					if($scope.accessor=='tenant')
						$location.path("/tenant/"+$routeParams.id+"/supplier/"+$routeParams.supplier_id);
					else
						$location.path("/supplier/"+$routeParams.supplier_id);
				})
				.catch(function(error){
          growl.addErrorMessage('oops! Something went wrong');
				})
			}
			else
			{
          var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html'
            //controller: 'ModalInstanceCtrl',
          });
			}	
		};

		$scope.cancel_new = function(){
			$scope.supplier = {};
      $scope.addresses = [];
      $scope.contacts = [];
      $scope.supplier.tenantRef = 'null';
			$scope.supplier.supplierGroup = 'null';
      $scope.imageSrc = '';
      growl.addSuccessMessage('supplier data reset Succesfully');
		};

		$scope.getFile = function (sc_f,sc) {
        sc.progress = 0;
        fileReader.readAsDataUrl(sc_f,sc)
        	.then(function(result) {
                $scope.imageSrc = result;
            });
    	};
    $scope.contactValidation = function() {
    return ($scope.newContact.firstName === undefined || $scope.newContact.firstName === '' || $scope.newContact.lastName === undefined || $scope.newContact.lastName === '' || $scope.newContact.email === undefined || $scope.newContact.email === '' || $scope.supplier_form.firstName.$error.pattern || $scope.supplier_form.lastName.$error.pattern || $scope.supplier_form.description.$error.pattern || $scope.supplier_form.email.$error.pattern || $scope.supplier_form.phone.$error.pattern || $scope.supplier_form.alternatePhone.$error.pattern || $scope.supplier_form.mobile.$error.pattern || $scope.supplier_form.url.$error.pattern);
}
$scope.addressValidation = function() {
    return ($scope.newAddr.name1 === undefined || $scope.newAddr.name1 === '' || $scope.newAddr.country === undefined || $scope.newAddr.country === '' || $scope.newAddr.city === undefined || $scope.newAddr.city === '' || $scope.supplier_form.name1.$error.pattern || $scope.supplier_form.name2.$error.pattern || $scope.supplier_form.name3.$error.pattern || $scope.supplier_form.zipCode.$error.pattern || $scope.supplier_form.pobox.$error.pattern || $scope.supplier_form.poboxZipCode.$error.pattern || $scope.supplier_form.phoneNo.$error.pattern || $scope.supplier_form.faxNo.$error.pattern || $scope.supplier_form.email_add.$error.pattern || $scope.supplier_form.corporateurl.$error.pattern || $scope.supplier_form.numOfEmployees.$error.pattern);
}
		$scope.submit = function(supplier_dtls,contact_dtls,address_dtls)
		{

			if($scope.supplier_form.$valid && $scope.supplier.supplierGroup != 'null' && $scope.supplier.tenantRef != 'null')
			{	
				if(contact_dtls)
				{
					supplier_dtls.contacts = [];
					for (var i = 0; i < contact_dtls.length; i++){
	    				supplier_dtls.contacts.push(contact_dtls[i]);
					}
				}	
				if(address_dtls)
				{
					supplier_dtls.addresses = [];
					for (var i = 0; i < address_dtls.length; i++){
	    				supplier_dtls.addresses.push(address_dtls[i]);
					}
				}	
				if($scope.imageSrc != "img/image_upload.jpg")
				{	
					if(!supplier_dtls.abstractBusinessPartner)
						supplier_dtls.abstractBusinessPartner = {};					
					supplier_dtls.abstractBusinessPartner.logo = $scope.imageSrc;
				}
				getObject(supplier_dtls);
				if($scope.accessor=='tenant')
				{
					supplier_dtls.tenantRef = $routeParams.id;
				}	
				supplier.save({url:'suppliers'}, supplier_dtls).$promise.then(function(data){
          growl.addSuccessMessage('supplier created Succesfully');
					if($scope.accessor=='tenant')
					{
						$location.path("/tenant/"+$routeParams.id);
					}
					else
					{
						$location.path("/supplier/"+data._id);
					}	
				})
				.catch(function(error){
           growl.addErrorMessage('oops! Something went wrong');
				})
			}
			else
			{
          var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
          });
			}		
		};
		$scope.addressReset = function(){
			$scope.newAddr.name1 = '';
			$scope.newAddr.name2 = '';
			$scope.newAddr.name3 = '';
			$scope.newAddr.country = '';
			$scope.newAddr.city = '';
			$scope.newAddr.zipCode = '';
			$scope.newAddr.pobox = '';
			$scope.newAddr.poboxZipCode = '';
			$scope.newAddr.phoneNo = '';
			$scope.newAddr.faxNo='';
			$scope.newAddr.email ='';
			$scope.newAddr.corporateURL ='';
			$scope.newAddr.numOfEmployees ='';
		}
		 $scope.contactReset = function(){
		 	$scope.newContact.firstName = '';
		 	$scope.newContact.lastName = '';
		 	$scope.newContact.email = '';
		 	$scope.newContact.description = '';
		 	$scope.newContact.phone = '';
		 	$scope.newContact.alternatePhone = '';
		 	$scope.newContact.mobile = '';
		 	$scope.newContact.url = '';
		 }
		 var getObject=function (theObject) {
		    var result = null;
		    if(theObject instanceof Array) {
		        for(var i = 0; i < theObject.length; i++) {
		            result = getObject(theObject[i]);
		        }
		    }
		    else
		    {
		        for(var prop in theObject) {
		          if(theObject[prop]==""){
		          	delete theObject[prop];
		            //console.log('deleted',theObject.prop)
		          }
		            if(theObject[prop] instanceof Object || theObject[prop] instanceof Array)
		                result = getObject(theObject[prop]);
		        }
		    }
		        
		};
}]); 

myApp.directive("ngFileSelect",function(){
  return {
    link: function($scope,el){
    	el.bind("change", function(e){
        	 $scope.file = (e.srcElement || e.target).files[0];
        	 $scope.getFile($scope.file,$scope);
      	});   
    }    
  }; 
});

myApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});