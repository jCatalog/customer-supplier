myApp.factory('supplier', ['$resource', function($resource) {
    var baseUrl="/api/";
    return $resource(baseUrl+':url/:id/:supplier_id', {},
    {
		'update': { method:'PUT' },
		'save':{ method:'POST',isArray:false},
		'searchQuery': { method: 'POST', isArray: true },
		'query': { isArray: true}

    });

}]);