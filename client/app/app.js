'use strict';
// Declare app level module which depends on views, and components
var myApp = angular
		.module('myApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngSanitize', 'angular-growl'])
		.config(['$routeProvider', 'growlProvider', function($routeProvider, growlProvider) {
		  growlProvider.globalTimeToLive(3000);
      growlProvider.globalEnableHtml(true);  
		    $routeProvider
				.when('/', 
					{templateUrl: 'customer/searchCstmr.html'},
					{controller: 'customer/searchCstmrCtrl.js'})
		
				.when('/login', {templateUrl: 'partials/login.html'})

				// CRUD OPERATIONS BY TENANT

				.when('/tenants', {templateUrl: 'tenant/tenantslist.html'},
					{controller: 'tenant/tenantCtrl.js'})
				
				.when('/tenant/:id', {templateUrl: 'tenant/tenantbar.html'},
					{controller: 'tenant/tenantCtrl.js'})
				
				.when('/tenant/edit/:id', {templateUrl: 'tenant/tenant.html'},
					{controller: 'tenant/tenantCtrl.js'})
				
				.when('/tenant/:id/new_customer', 
					{templateUrl: 'customer/customer.html'},
					{controller: 'customer/customerCtrl.js'})
				
				.when('/tenant/:id/new_supplier', 
					{templateUrl: 'supplier/supplier.html'},
					{controller: 'supplier/supplierCtrl.js'})
			
				.when('/tenant/:id/customer/:customer_id', 
					{templateUrl: 'customer/customer.html'},
					{controller: 'tenant/tenantCtrl.js'})

				.when('/tenant/:id/customer/edit/:customer_id', 
					{templateUrl: 'customer/customer.html'},
					{controller: 'tenant/tenantCtrl.js'})
				
				.when('/tenant/:id/supplier/:supplier_id', 
					{templateUrl: 'supplier/supplier.html'},
					{controller: 'supplier/supplierCtrl.js'})
				
				.when('/tenant/:id/supplier/edit/:supplier_id', 
					{templateUrl: 'supplier/supplier.html'},
					{controller: 'supplier/supplierCtrl.js'})

				// CRUD OPERATION BY ADMIN
				.when('/new_customer', 
					{templateUrl: 'customer/customer.html'},
					{controller: 'customer/customerCtrl.js'})
				
				.when('/customer/:customer_id', 
					{templateUrl: 'customer/customer.html'},
					{controller: 'customer/customerCtrl.js'})
				
				.when('/customer/edit/:customer_id', 
					{templateUrl: 'customer/customer.html'},
					{controller: 'customer/customerCtrl.js'})
				
				.when('/new_supplier', 
					{templateUrl: 'supplier/supplier.html'},
					{controller: 'supplier/supplierCtrl.js'})
				
				.when('/supplier/:supplier_id', 
					{templateUrl: 'supplier/supplier.html'},
					{controller: 'supplier/supplierCtrl.js'})						
				
				.when('/supplier/edit/:supplier_id', 
					{templateUrl: 'supplier/supplier.html'},
					{controller: 'supplier/supplierCtrl.js'})		

				// USE THE FOLLOWING ROUTE IF USING SEARCH DROPDOWN

				// USE THE FOLLOWING TWO ROUTES IF USING SEPERATE SEARCH PAGES
				.when('/customers', 
					{templateUrl: 'customer/searchCstmr.html'},
					{controller: 'customer/searchCstmrCtrl.js'})
				.when('/suppliers', 
					{templateUrl: 'supplier/searchSpplr.html'},
					{controller: 'supplier/searchSpplrCtrl.js'})

				.otherwise({redirectTo: '/'});
			}]);
