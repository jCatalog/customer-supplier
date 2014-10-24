var CustomerGroup = require('../server/models/customerGroup').CustomerGroup,
    Config = require('../server/config/testConfig').CustomerGroup;

/** customerGroup test case */
describe('CustomerGroup', function(){
  describe('CustomerGroup CRUD operation', function(){
    
     /** CustomerGroup create */
      it('CustomerGroup create', function(done){
        var customerGroup = new CustomerGroup(Config.createCustomerGroup);
        customerGroup.save(done);
      });
      
     /** CustomerGroup getAll */
	    it('CustomerGroup get all', function(done){
        CustomerGroup.find({},function(err, res){
          if (err) return done(err);
          done();
        });
	    });
    
    /** get one CustomerGroup*/ 
    it('CustomerGroup get by id', function(done){
      CustomerGroup.findById(Config.customerGroupId,function(err, res){
          if (err) return done(err);
          done();
        });
	    });
    
    /**update exisiting CustomerGroup*/
    it('CustomerGroup update by id', function(done){
      CustomerGroup.findById(Config.customerGroupId,function(err, customerGroup){
          if (err) return done(err);
          else if(customerGroup === null)  done();
          else{
              customerGroup.groupName = Config.editCustomerGroup.groupName;
              customerGroup.save(done);
          }
        });
	    });
    
     /**delete CustomerGroup*/
    it('CustomerGroup delete', function(done){
      CustomerGroup.findById(Config.deleteCustomerGroup,function(err, customerGroup){
          if (err) return done(err);
          else if(customerGroup === null) done();
          else customerGroup.remove(done);
        });
	    });
   });
});
