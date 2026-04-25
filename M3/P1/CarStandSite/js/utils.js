/**
 * Compara dois objetos simples para verificar igualdade superficial.
 *
 * Esta função verifica se dois objetos possuem o mesmo conjunto de propriedades
 * e se os valores correspondentes são estritamente iguais.
 * A comparação é superficial: objetos ou arrays aninhados não são comparados em profundidade.
 *
 * @param {Object} obj1 - Primeiro objecto a comparar.
 * @param {Object} obj2 - Segundo objecto a comparar.
 * @returns {boolean} Verdade se os dois objectos tiverem as mesmas propriedades e valores.
 */
function isEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  let areSame = true;

  if (keys1.length != keys2.length) areSame = false;

  if (areSame) {
    const sortedKeys1 = sortStringArray(keys1);
    const sortedKeys2 = sortStringArray(keys2);
    let i = 0;
    while (areSame && i < sortedKeys1.length) {
      const key1 = sortedKeys1[i];
      const key2 = sortedKeys2[i];
      if (key1 !== key2 || obj1[key1] !== obj2[key2]) areSame = false;
      i++;
    }
  }
  return areSame;
}

/**

*  Extrai uma lista de valores únicos para uma determinada propriedade de um objeto.
*
* Esta implementação utiliza recursos modernos do JavaScript, como `map`,
* `Set` e o operador spread para coletar valores únicos de forma eficiente.
*
* A igualdade é determinada usando a comparação de conjuntos integrada do JavaScript,
* que é adequada para valores primitivos.
*
* @param {Object[]} arr - Array de objetos a serem processados.
* @param {string} key - Propriedade do objeto cujos valores serão coletados.
* @returns {Array} Array contendo os valores únicos da propriedade especificada.
*/
function getUniquesAlt(arr, key) {
  return [...new Set(arr.map((e) => e[key]))];
}

/**
*  Extrai uma lista de valores únicos para uma determinada propriedade de um objeto.
*
* Esta é uma implementação manual e imperativa que verifica explicitamente
* a existência de duplicatas iterando sobre os valores coletados anteriormente.
* É intencionalmente verbosa para fins pedagógicos.
*
* A complexidade de tempo é O(n²), tornando-a menos eficiente do que a
* implementação alternativa usando Set.
*
* @param {Object[]} arr - Array de objetos a serem processados.
* @param {string} key - Propriedade do objeto cujos valores serão coletados.
* @returns {Array} Array contendo os valores únicos da propriedade fornecida.
*/
function getUniques(arr, key) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let exists = false;
    let j = 0;
    while (!exists && j < result.length) {
      if (result[j] == arr[i][key]) exists = true;
      j++;
    }
    if (!exists) result.push(arr[i][key]);
  }
  return result;
}

/**
 * Cria um objeto Date a partir de ano, mês e dia, ajustando o mês para -1.
 *
 * @param {number} y - Ano (ex: 2025).
 * @param {number} m - Mês (1–12). O valor é decrementado internamente para compensar o índice base 0 do objeto Date.
 * @param {number} d - Dia do mês.
 * @returns {Date} Objeto Date com o mês ajustado corretamente.
 *
 */
function setDate(y, m, d) {
  let tmp = new Date(y, m, d);
  tmp.setMonth(tmp.getMonth() - 1);
  return tmp;
}

/**
 * Converte um objeto Date para uma string num formato unificado.
 *
 * @param {Date} d - Objeto Date a ser formatado.
 * @param {boolean} isTable - Se true, retorna o formato DD/MM/YYYY (exibição em tabela).
 *                            Se false, retorna o formato YYYY-MM-DD (inputs ou armazenamento).
 *
 * @returns {string} Data formatada como string.
 */
function toUnifiedDate(d, isTable) {
  const pad = (n) => String(n).padStart(2, "0");
  if (isTable)
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/**
 * Ordena um array de strings.
 *
 * @param {string[]} arr - Array de strings a ordenar.
 * @param {boolean} isAscending - Define a ordem da ordenação.
 *
 * @returns {string[]} O próprio array ordenado.
 *
 */
function sortStringArray(arr, isAscending) {
  let result = [];
  if (isAscending)
    result = arr.sort(function (a, b) {
      return a.localeCompare(b);
    });
  else
    result = arr.sort(function (a, b) {
      return b.localeCompare(a);
    });
  return result;
}

/**
 * Ordena um array de números.
 *
 * @param {number[]} arr - Array de números a ordenar.
 * @param {boolean} isAscending - Define a ordem da ordenação.
 *
 * @returns {number[]} O próprio array ordenado.
 *
 */
function sortNumberArray(arr, isAscending) {
  let result = [];

  if (isAscending)
    result = arr.sort(function (a, b) {
      return a - b;
    });
  else
    result = arr.sort(function (a, b) {
      return b - a;
    });
  return result;
}

/**
 *  Determina o estado da inspeção com base na data fornecida.
 *
 * Calcula a diferença aproximada em meses entre a data atual
 * e a data da última inspeção, retornando o HTML correspondente
 * ao estado da inspeção.
 *
 * @param {Date} data - Data da última inspeção.
 * @returns {string} HTML a inserir na célula da tabela,
 *                   contendo o estado da inspeção.
 *
 * @note O cálculo de meses é aproximado (30 dias por mês)
 */
function inspecaoEstado(data) {
  const agora = new Date();
  const diffMeses = (agora - data) / (1000 * 60 * 60 * 24 * 30);
  // Mais de 12 meses → inspeção expirada
  if (diffMeses > 12) return '<span class="vendido">Expirada</span>';
  // Entre 10 e 12 meses → aviso de expiração iminente
  if (diffMeses > 10) return '<span class="aviso">A expirar</span>';
  // Caso contrário → inspeção válida
  return '<span class="ok">Válida</span>';
}
