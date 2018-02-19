/**
 * Test file
 *
 *@author Carlos Brito
 *@since 09/02/201
 */

var validator = require("../index.js")();
var expect = require("expect.js");

describe('validator of bar code', function() {

    it('should apply the Module 11', function() {
        var retorno = validator.apllyModule11('14000000000000019');
        expect(retorno).to.be.an('array');
        expect(retorno).to.be.eql([2, 36, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 3, 18]);
    });

    it('should reject a number that don"t have a 17 characters in Module 11 function', function() {
        try {
            validator.apllyModule11('14');
            expect().fail('Accepted a number out of the lenght');
        } catch (err) {
            expect(err).to.be('The "nosso número" number must contain 17 characters.');
        }
    });

    it('should reject de "nosso número" number', function() {
        validator.calculate('10493169364000010004600008733875174390000007116', function(err, success) {
            expect(err).to.be('The "nosso número" number must contain 17 characters.');
        });
    });

    it('should eval the DV "nosso número" number', function() {
        validator.calculate('14000000000000019', function(err, success) {
            expect(success).to.be(7);
        });
    });

    it('should eval the DV "nosso número" number', function() {
        validator.calculate('14000000000000019', function(err, success) {
        	console.log("#err:", err);
        	console.log("#success:", success);
            //expect(success).to.be(2);
        });
    });

 	it.only('should eval the DV "nosso número" number', function() {
        	console.log("#success:", validator.modulo11('14000000000000019'));
    });



});