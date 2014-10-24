var Supplier = require('../server/models/supplier').Supplier,
    Config = require('../server/config/testConfig').Supplier;

/** Supplier test case */
describe('Supplier', function(){
  describe('Supplier operation', function(){
    
    /**Supplier Create*/
    it('Supplier create', function(done){
        var supplier = new Supplier(Config.createSupplier);
        supplier.save(done);
    });
    
     /** getAll Supplier*/    
    it('Supplier get all', function(done){
      Supplier.find({},function(err, res){
        if (err) return done(err);
        done();
      });
    });
    
    /** get one Supplier*/ 
    it('Supplier get by id', function(done){
      Supplier.findById(Config.supplierId,function(err, res){
          if (err) return done(err);
          done();
        });
	    });
    
    /**update exisiting Supplier*/
    it('Supplier update by id', function(done){
      Supplier.findById(Config.supplierId,function(err, supplier){
          if (err) return done(err);
          else if(supplier === null)  done();
          else{
              Config.supplierfunc(Config.editSupplier, supplier);
              supplier.save(done);
          }
        });
	    });
    
    /**delete Supplier*/
    it('Supplier delete', function(done){
      Supplier.findById(Config.deleteCustomer,function(err, supplier){
          if (err) return done(err);
          else if(supplier === null) done();
          else supplier.remove(done);
        });
	    });
    
    /**get Supplier by tenant*/
    it('get Supplier by tenant id', function(done){
      Supplier.find(Config.byTenant,function(err, supplier){
          if (err) return done(err);
          done();
        });
	    });
    
    /**get Supplier by search*/
    it('get Supplier by search', function(done){
      var obj = {};
      Config.bySearch(obj);
      Supplier.find(obj,function(err, supplier){
          if (err) return done(err);
          done();
        });
	    });
    
  });
});
    