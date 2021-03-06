/**
 * Unit teste of Util file
 *
 *@author Carlos Brito
 *@since 09/02/2018
 */

var validator = require("../lib/util");
var expect = require("expect.js");

describe('Util', function() {

    it('1. should apply the Module 11', function() {
        var retorno = validator.module11('14000000000000019');
        expect(retorno).to.be.an('array');
        expect(retorno).to.be.eql([2, 36, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 3, 18]);
    });

    it('2. should reject a number that don"t have a 17 characters in Module 11 function', function() {
        try {
            validator.module11('14');
            expect().fail('Accepted a number out of the lenght');
        } catch (err) {
            expect(err).to.be('The "nosso número" number must contain 17 characters.');
        }
    });

    it('3. should reject the "nosso número" number', function() {
        validator.calc('10493169364000010004600008733875174390000007116', function(err, success) {
            expect(err).to.be('The "nosso número" number must contain 17 characters.');
        });
    });

    it('4. should eval the DV "nosso número" number', function() {
        validator.calc('14000000000000019', function(err, success) {
            expect(success).to.be(7);
        });
    });

    it('5. should eval the DV "nosso número" number', function() {
        validator.calc('14000000000085272', function(err, success) {
            expect(success).to.be(0);
        });
    });

    it('6. should eval the DV "nosso número" number', function() {
        validator.calc('14000000000088195', function(err, success) {
            expect(success).to.be(9);
        });
    });
});