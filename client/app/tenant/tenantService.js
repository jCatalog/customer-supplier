myApp.factory('tenant', ['$resource', function($resource) {
    var baseUrl="/api/";
    return $resource(baseUrl+':url/:id', {},
    {
    	'update': { method:'PUT' },
    	'query': { isArray: true}
    });
 }]);