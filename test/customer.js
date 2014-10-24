var Customer   = require('../server/models/customer').Customer,
    Config = require('../server/config/testConfig').Customer;

/** customer test case */
describe('Customer', function(){
  describe('Customer operation', function(){
    
    /**Customer Create*/
    it('Customer create', function(done){
        var customer = new Customer(Config.createCustomer);
        customer.save(done);
    });
    
     /** getAll Customer*/    
    it('Customer get all', function(done){
      Customer.find({},function(err, res){
        if (err) return done(err);
        done();
      });
    });
    
    /** get one Customer*/ 
    it('Customer get by id', function(done){
      Customer.findById(Config.customerId,function(err, res){
          if (err) return done(err);
          done();
        });
	    });
    
    /**update exisiting Customer*/
    it('Customer update by id', function(done){
      Customer.findById(Config.customerId,function(err, customer){
          if (err) return done(err);
          else if(customer === null)  done();
          else{
              Config.customerfunc(Config.editCustomer, customer);
              customer.save(done);
          }
        });
	    });
    
    /**delete Customer*/
    it('Customer delete', function(done){
      Customer.findById(Config.deleteCustomer,function(err, customer){
          if (err) return done(err);
          else if(customer === null) done();
          else customer.remove(done);
        });
	    });
    
    /**get Customer by tenant*/
    it('get customer by tenant id', function(done){
      Customer.find(Config.byTenant,function(err, customer){
          if (err) return done(err);
          done();
        });
	    });
    
    /**get Customer by search*/
    it('get customer by search', function(done){
      var obj = {};
      Config.bySearch(obj);
      Customer.find(obj,function(err, customer){
          if (err) return done(err);
          done();
        });
	    });
    
  });
});
    