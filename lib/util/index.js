/**
 *Calculate the DV's number from field "nosso número" of CAIXA's bank payment slip
 *The guide used to make this source can be found at "http://www.caixa.gov.br/Downloads/cobranca-caixa/ESP_COD_BARRAS_SIGCB_COBRANCA_CAIXA.pdf" / "Especificação do Código de Barras para Boletos de Cobrança Sem Registro e Registrada no SIGCB" - version 67.119 v009 micro 
 *
 *@author Carlos Brito {carlosmcp@gmail.com}
 *@since 09/02/2018
 */
const INDICE_MULTIPLICACAO = [2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

/**
 * Calculate the "nosso numero"'s DV
 * @param  {Integer}  nosso_numero Number of caixa's bank payment slip
 * @param  {Function} call/back     callback function
 * @return {Boolean}               return if the number it's ok
 */
module.exports.calc = function(nosso_numero, callback) {
    try {
        var result = 0;
        result = module.exports.module11(nosso_numero).reduce(function(valorAnterior, valorAtual, indice, array) {
            return valorAnterior + valorAtual;
        });

        result %= 11;
        result = Math.abs(11 - result);
        callback(null, (result > 9) ? 0 : result);
    } catch (err) {
        callback(err);
    }
};

/**
 * Aplly the Module 11 on value through the convolution with INDICE_MULTIPLICACAO mask
 * @param  {String} value the value to apply the module
 * @return {Array}        Array with the new values
 */
module.exports.module11 = function(value) {
    if (value && value.length !== 17) {
        throw ('The "nosso número" number must contain 17 characters.');
    }

    var i = 0;
    return INDICE_MULTIPLICACAO.map(function(item) {
        return item * value.substr(i++, 1);
    });
}