
myApp.factory('customer', ['$resource', function($resource) {
  var baseUrl="/api/";
  return $resource(baseUrl+':url/:id/:customer_id', {},
  	{
  		'update': { method:'PUT' },
  		'save': {method: 'POST', isArray:false} ,
  		'searchQuery': { method: 'POST', isArray: true },
      'query': { isArray: true}
  	});

}]);