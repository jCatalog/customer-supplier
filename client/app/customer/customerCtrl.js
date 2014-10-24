myApp.controller('customerCtrl', [ '$scope', '$http', '$routeParams','$location',
	'customer', 'tenant', '$rootScope', 'fileReader', 'growl', '$modal','$resource',
	function($scope, $http, $routeParams, $location, customer, tenant, $rootScope, fileReader, growl, $modal, $resource){
    
    $scope.customer_view = function(id1,id2)
    {
      location.href="/#/tenant/"+id1+"/customer/"+id2;
    };
    
		$scope.customer_list = function()
		{
			customer.query({url:'customersByTenant', id:$routeParams.id}).$promise.then(function(data){	
				$scope.customerList = data;
				$scope.tenant_id = $routeParams.id;
			}).catch(function(error){
        growl.addErrorMessage('oops! Something went wrong');
			})
		};

		$scope.checkAccessor = function(){
			var path = $location.path();
			if(path.indexOf('tenant')==-1){
				// its admin
				$scope.accessor = 'admin';
				tenant.query({url:'tenants'}).$promise.then(function(data){
					$scope.tenantList = data;
				}).catch(function(error){
          growl.addErrorMessage('oops! Something went wrong');
				})
			}
			else
			{
				$scope.accessor = 'tenant';
				$scope.tenant_id = $routeParams.id;
			}
		}
    
		$scope.checkView = function(){
			if(window.location.href.indexOf("new") > -1) 
			{
				$scope.page = 'new';
				//$scope.imageSrc = 'img/image_upload.jpg'
			}		
			if(window.location.href.indexOf("/customer") > -1) {
				customer.get({url:'customers',customer_id:$routeParams.customer_id}).$promise.then(function(data){
					$scope.customer = data;
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
					if($scope.customer.contacts)
					{
						for(i=0;i<$scope.customer.contacts.length;i++)
						{
							$scope.contacts.push($scope.customer.contacts[i]);
						}
					}
					if($scope.customer.addresses)
					{
						for(i=0;i<$scope.customer.addresses.length;i++)
						{
							$scope.addresses.push($scope.customer.addresses[i]);
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

		customer.query({url:'customerGroup'}).$promise.then(function(data){	
			$scope.cus_gp_dtls = data;
		}).catch(function(error){
        growl.addErrorMessage('oops! Something went wrong');
    })
		$scope.contacts = [];

		$scope.addresses = [];



		$scope.editTenantCustomer = function(customer1,cntct,address){
			if($scope.customer_create.$valid && $scope.customer.customerGroup._id != 'null' && $scope.customer.tenantRef._id != 'null')
			{	
				var ten_id = customer1.tenantRef._id;
				customer1.tenantRef = {};
				customer1.tenantRef = ten_id;
				delete ten_id; 

				if(cntct)
				{
					customer1.contacts = [];
					for(i=0;i<cntct.length;i++)
					{
						customer1.contacts.push(cntct[i]);
					}	
				}
				if(address)
				{
					customer1.addresses = [];
					for(i=0;i<address.length;i++)
					{
						customer1.addresses.push(address[i]);
					}	
				}
				if($scope.imageSrc != "img/image_upload.jpg")
				{	
					if(!customer1.abstractBusinessPartner)
						customer1.abstractBusinessPartner = {};					
					customer1.abstractBusinessPartner.logo = $scope.imageSrc;
				}
				customer.update({url:'customers',customer_id:$routeParams.customer_id}, customer1).$promise.then(function(data){
          growl.addSuccessMessage('customer updated Succesfully');
					if($scope.accessor=='tenant')
						$location.path("/tenant/"+$routeParams.id+"/customer/"+$routeParams.customer_id);
					else
						$location.path("/customer/"+$routeParams.customer_id);
				}).catch(function(error){
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
		}
		
		$scope.edit_contact = function(contact_dtls)
		{
			$scope.edit_flg = true;
			$scope.newContact = angular.copy(contact_dtls);
			$('#contactModal').modal('show');
		};

		$scope.delete_contact = function(indx){
			$scope.contacts.splice(indx,1);
      growl.addSuccessMessage('contacts deleted Succesfully');

		}

		$scope.delete_address = function(indx){
			$scope.addresses.splice(indx,1);
      growl.addSuccessMessage('address deleted Succesfully');
		}
		
		$scope.cancel_new = function()
		{
			$scope.customer = {};
			$scope.addresses = [];
      $scope.contacts = [];
      $scope.customer.tenantRef = 'null';
			$scope.customer.customerGroup = 'null';
			$scope.customer.isCustomerGrpMaster='Yes';
			$scope.customer.withVAT = 'No';
			$scope.customer.isLocked='Yes';
      $scope.imageSrc = '';
      growl.addSuccessMessage('customer data reset Succesfully');
		}
		
		$scope.back_new = function()
		{
			location.href="#/tenant/"+$routeParams.id;
		}

		$scope.new_contact = function(){
			$scope.edit_flg = false;
			$scope.newContact = {};
			$('#contactModal').modal('show');
		};

		$scope.addContact = function(contact_dtls)
		{
			if($scope.edit_flg)
			{
        if($scope.contactValidation()){
            growl.addErrorMessage('please enter required and valid field to update contact');
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
        }
         
			}
      else
      {
         if( $scope.contactValidation()){
            growl.addErrorMessage('please enter required and valid field to create new contact');
         }
        else{
          growl.addSuccessMessage('new contact created');
          $scope.contacts.push(contact_dtls);
        }  
      }  
		};

		$scope.edit_address = function(address){
			$scope.edit_flg = true;
			$scope.newAddr = angular.copy(address);
			$('#addressModal').modal('show');
		};

		$scope.new_address = function()
		{
			$scope.edit_flg = false;
			$scope.newAddr = {};
			$('#addressModal').modal('show');
		};

		$scope.addAddress = function(address_dtls)
		{
      if($scope.edit_flg)
			{	
        if( $scope.addressValidation()){
            growl.addErrorMessage('please enter required and valid field to update address');
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
          }
			}
      else
      {
         if( $scope.addressValidation()){
            growl.addErrorMessage('please enter required and valid field to create new address');
         }
          else{
          growl.addSuccessMessage('new address added');
          $scope.addresses.push(address_dtls);
          }
      }  
			
		};

		$scope.getFile = function (sc_f,sc) {
        sc.progress = 0;
        fileReader.readAsDataUrl(sc_f,sc)
        	.then(function(result) {
                $scope.imageSrc = result;
            });
    	};

		$scope.SubmitCustomer = function(customer_dtls,contacts,address)
		{
			
			if($scope.customer_create.$valid && $scope.customer.customerGroup != 'null' && $scope.customer.tenantRef != 'null')
			{	
				if($scope.imageSrc != "img/image_upload.jpg")
				{	
					if(!customer_dtls.abstractBusinessPartner)
						customer_dtls.abstractBusinessPartner = {};					
					customer_dtls.abstractBusinessPartner.logo = $scope.imageSrc;
				}
				if(contacts)
				{
					customer_dtls.contacts = [];
					for (var i = 0; i < contacts.length; i++){
	    				customer_dtls.contacts.push(contacts[i]);
					}
				}

				if(address)
				{
					customer_dtls.addresses = [];
					for (var i = 0; i < address.length; i++){
	    				customer_dtls.addresses.push(address[i]);
					}
				}
				if($scope.accessor=='tenant')
				customer_dtls.tenantRef = $routeParams.id;
				customer.save({url:'customers'}, customer_dtls).$promise.then(function(data){
          growl.addSuccessMessage('customer created Succesfully');
					if($scope.accessor=='tenant')
						$location.path("/tenant/"+$routeParams.id);
					else
						$location.path("/customer/"+data._id);
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
  $scope.keyup = function(a)
  {
    var text = $('#' + a).val();
      alert(text);
      var lines = text.split("\n");
      var currentLine = this.value.substr(0, this.selectionStart).split("\n").length;
      if(event.keyCode == 13) {
        if (lines.length >= $(this).attr('rows'))
          return false;
      }
      else{
       if(lines[currentLine-1].length >= $(this).attr('cols')) {
         return false; // prevent characters from appearing
       }
      }
  };
 //JQuery   
 $(function(){
    $('#textarea1,#textarea2,#textarea3').on('keypress',function(event){
      var text = $(this).val();
      var lines = text.split("\n");
      var currentLine = this.value.substr(0, this.selectionStart).split("\n").length;
      if(event.keyCode == 13) {
        if (lines.length >= $(this).attr('rows'))
          return false;
      }
      else{
       if(lines[currentLine-1].length >= $(this).attr('cols')) {
         return false; // prevent characters from appearing
       }
      }
  });
});
    var StaticData = $resource('/api/getStaticData');
    StaticData.query().$promise.then(function(data){
      $scope.language = data[0].languages;
      $scope.country = data[1].countries;
    });
    $scope.contactValidation = function(){
      return  ($scope.newContact.firstName === undefined || $scope.newContact.firstName === '' || $scope.newContact.lastName === undefined || $scope.newContact.lastName ==='' || $scope.newContact.email === undefined || $scope.newContact.email === '' || $scope.customer_create.firstName.$error.pattern || $scope.customer_create.lastName.$error.pattern || $scope.customer_create.description.$error.pattern || $scope.customer_create.email.$error.pattern || $scope.customer_create.phone.$error.pattern || $scope.customer_create.alternatePhone.$error.pattern || $scope.customer_create.mobile.$error.pattern || $scope.customer_create.url.$error.pattern);
   }
    $scope.addressValidation = function(){
      return ($scope.newAddr.name1 === undefined || $scope.newAddr.name1 === ''  || $scope.newAddr.country === undefined || $scope.newAddr.country ==='' || $scope.newAddr.city === undefined || $scope.newAddr.city === '' || $scope.customer_create.name1.$error.pattern || $scope.customer_create.name2.$error.pattern || $scope.customer_create.name3.$error.pattern || $scope.customer_create.zipCode.$error.pattern || $scope.customer_create.pobox.$error.pattern || $scope.customer_create.poboxZipCode.$error.pattern || $scope.customer_create.phoneNo.$error.pattern || $scope.customer_create.faxNo.$error.pattern || $scope.customer_create.email_add.$error.pattern || $scope.customer_create.corporateurl.$error.pattern || $scope.customer_create.numOfEmployees.$error.pattern);   
}
    
}]); 
myApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});