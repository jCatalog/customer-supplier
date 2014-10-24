var SupplierGroup = require('../server/models/supplierGroup').SupplierGroup,
    Config = require('../server/config/testConfig').SupplierGroup;

/** SupplierGroup test case */
describe('SupplierGroup', function(){
  describe('SupplierGroup CRUD operation', function(){
    
     /** SupplierGroup create */
      it('SupplierGroup create', function(done){
        var supplierGroup = new SupplierGroup(Config.createSupplierGroup);
        supplierGroup.save(done);
      });
      
     /** SupplierGroup getAll */
	    it('SupplierGroup get all', function(done){
        SupplierGroup.find({},function(err, res){
          if (err) return done(err);
          done();
        });
	    });
    
    /** get one SupplierGroup*/ 
    it('SupplierGroup get by id', function(done){
      SupplierGroup.findById(Config.supplierGroupId,function(err, res){
          if (err) return done(err);
          done();
        });
	    });
    
    /**update exisiting SupplierGroup*/
    it('SupplierGroup update by id', function(done){
      SupplierGroup.findById(Config.supplierGroupId,function(err, supplierGroup){
          if (err) return done(err);
          else if(supplierGroup === null)  done();
          else{
              supplierGroup.groupName = Config.editSupplierGroup.groupName;
              supplierGroup.save(done);
          }
        });
	    });
    
     /**delete SupplierGroup*/
    it('SupplierGroup delete', function(done){
      SupplierGroup.findById(Config.deleteSupplierGroup,function(err, supplierGroup){
          if (err) return done(err);
          else if(supplierGroup === null) done();
          else supplierGroup.remove(done);
        });
	    });
   });
});
