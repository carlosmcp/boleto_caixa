/**
 * Calculate the DV's number from field "nosso número" of CAIXA's bank payment slip
 *
 *@author Carlos Brito
 *@since 09/02/201
 */
const INDICE_MULTIPLICACAO = [2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

module.exports = function() {

    /**
     * Calculate the "nosso numero"'s DV
     * @param  {Integer}  nosso_numero Number of caixa's bank payment slip
     * @param  {Function} callback     callback function
     * @return {Boolean}               return if the number it's ok
     */
    var calculate = function(nosso_numero, callback) {
        var result_module_11 = [];
        var result = 0;

        try {
            result_module_11 = apllyModule11(nosso_numero);
            result_module_11.forEach(function(item) {
                result += item;
            });

            result %= 11;
            result = Math.abs(11 - 4);
            callback(null, (result > 9) ? 0 : result);
        } catch (err) {
            callback(err);
        }
    }

    /**
     * Aplly the Module11 on value
     * @param  {String} value the value to apply the module
     * @return {Array}        Array with the new values
     */
    var apllyModule11 = function(value) {
        if (value && value.length !== 17) {
            throw ('The "nosso número" number must contain 17 characters.');
        }
        var result = [INDICE_MULTIPLICACAO.length];
        var i = 0;

        for (; i < INDICE_MULTIPLICACAO.length; i++) {
            result[i] = INDICE_MULTIPLICACAO[i] * value.substr(i, 1);
        }
        console.log("#result:", result);
        return result;
    }

    var modulo11 = function(campo) {
        var soma = 0
        var tam = campo.length;
        var campoTmp = campo.split("").reverse().join('');
        var DOIS_NOVE = [2,3,4,5,6,7,8,9];
        
        for (i = 0; i < tam; i++) {
            soma = soma + DOIS_NOVE[i % 8] * campoTmp.substr(i, 1);
        }
        return 11 - (soma % 11)
    }

    return {
        modulo11: modulo11,
        apllyModule11: apllyModule11,
        calculate: calculate
    }
}