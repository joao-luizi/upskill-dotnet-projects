/**
 * Carrega os dados de um veículo no formulário de edição.
 *
 * @param {number} i - Índice do veículo no array global `veiculos`.
 */
function editar(i) {
  const v = veiculos[i];
  const form = document.getElementById("formVeiculo");
  form.editIndex.value = i;
  form.marca.value = v.marca;
  form.modelo.value = v.modelo;
  form.ano.value = v.ano;
  form.inspecao.value = toUnifiedDate(new Date(v.ultimaInspecao), false); // sem fusos horários envolvidos
  form.vendido.checked = v.vendido;
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

/**
 *  Reinicia o formulário de edição/criação de veículos.
 *
 * Limpa todos os campos do formulário e redefine o índice de edição,
 * indicando que nenhum elemento está atualmente selecionado para edição.
 *
 *
 * @returns {void}
 */
function resetForm() {
  form.editIndex.value = -1;
  form.marca.value = "";
  form.modelo.value = "";
  form.ano.value = "";
  form.inspecao.value = "";
  form.vendido.checked = false;
}

/**
 *  Cria uma linha de tabela a partir de um conjunto de células.
 *
 * @param {HTMLTableCellElement[]} cellArr - Array de elementos <td>.
 * @returns {HTMLTableRowElement} Linha de tabela criada.
 */
function getRow(cellArr) {
  let tr = document.createElement("tr");
  cellArr.forEach((cell) => tr.appendChild(cell));
  return tr;
}

/**
 *  Cria uma célula de tabela com conteúdo textual.
 *
 * @param {string|number} value - Valor a inserir na célula.
 * @returns {HTMLTableCellElement} Célula criada.
 */
function getCellString(value) {
  let td = document.createElement("td");
  td.innerText = value;
  return td;
}

/**
 *  Cria uma célula de tabela para datas de inspeção.
 *
 *  Inclui a data formatada e o estado da inspeção
 *
 * @param {string|Date} value - Data da última inspeção.
 * @returns {HTMLTableCellElement} Célula criada.
 */
function getCellDate(value) {
  let td = document.createElement("td");
  let date = new Date(value);
  td.innerHTML = `${toUnifiedDate(date, true)} (${inspecaoEstado(date)})`;
  return td;
}

/**
 *  Cria uma célula indicando o estado de venda do item.
 *
 * @param {boolean} value - Indica se o item está vendido.
 * @returns {HTMLTableCellElement} Célula criada.
 */
function getCellCustom(value) {
  let td = document.createElement("td");
  td.innerText = value == true ? "Vendido" : "Disponivel";
  td.className = value == true ? "vendido" : "ok";
  return td;
}

/**
 *  Cria uma célula com botões de ação (editar e remover).
 *
 * @param {number} value - Índice do elemento associado.
 * @returns {HTMLTableCellElement} Célula criada.
 */
function getCellButtons(value) {
  let td = document.createElement("td");
  let bt1 = document.createElement("button");
  let bt2 = document.createElement("button");
  bt1.innerText = "Editar";
  bt1.setAttribute("data-index", value);
  bt1.addEventListener("click", (e) => {
    editar(e.target.getAttribute("data-index"));
  });
  bt2.innerText = "Remover";
  bt2.setAttribute("data-index", value);
  bt2.addEventListener("click", (e) => {
    deleteRecord(e.target.getAttribute("data-index"));
    guardar("veiculos", veiculos);
    refreshUI();
    resetForm();
  });
  td.appendChild(bt1);
  td.appendChild(bt2);
  return td;
}

/**
 *  Preenche uma tabela HTML com os dados fornecidos.
 *
 * Limpa o conteúdo atual do elemento pai e cria uma linha
 * por cada item do array.
 *
 * @param {HTMLElement} parentElement - Elemento <tbody> da tabela.
 * @param {Object[]} arr - Array de objetos a apresentar.
 * @returns {void}
 */
function fillTable(parentElement, arr) {
  parentElement.innerHTML = "";
  arr.forEach((element) => {
    let cellArr = [];
    cellArr.push(getCellString(element["marca"]));
    cellArr.push(getCellString(element["modelo"]));
    cellArr.push(getCellString(element["ano"]));
    cellArr.push(getCellDate(element["ultimaInspecao"]));
    cellArr.push(getCellCustom(element["vendido"]));
    cellArr.push(getCellButtons(element["data-index"]));
    let tr = getRow(cellArr);
    parentElement.appendChild(tr);
  });
}

/**
 * Recria as opções de um elemento <select>.
 *
 * Remove todas as opções existentes e cria novamente a opção genérica
 * (ex: "Todas") seguida das opções dinâmicas fornecidas.
 *
 * @param {Object} sortObj - Configuração do select.
 * @param {string[]} options - Lista de valores a usar nas opções.
 *
 * @returns {void}
 */
function createNewOptions(sortObj, sortedOptions) {
  const select = sortObj.selectEl;
  let all = document.createElement("option");
  all.value = "";
  all.innerText = sortObj.stringAll;
  select.innerHTML = "";
  select.appendChild(all);
  sortedOptions.forEach((a) => {
    let option = document.createElement("option");
    option.value = a;
    option.innerText = a;
    select.appendChild(option);
  });
}

/**
 *  Atualiza o indicador visual da ordem de ordenação.
 *
 * Altera o símbolo e o texto de ajuda (title) de um elemento
 * da interface gráfica consoante a ordem selecionada.
 *
 * @param {HTMLElement} element - Elemento HTML a atualizar.
 * @param {boolean} isAscending - Indica se a ordenação é ascendente.
 *
 * @returns {void}
 */
function updateSortElement(element, isAscending) {
  if (isAscending) {
    element.innerHTML = "↑";
    element.title = "Ordenado por ordem crescente";
  } else {
    element.title = "Ordenado por ordem decrescente";
    element.innerHTML = "↓";
  }
}

/**
 *  Seleciona no elemento <select> a opção cujo valor corresponde ao valor anterior.
 *
 * A função percorre todas as opções de um elemento select e define como selecionada
 * aquela cujo atributo `value` seja igual a `oldValue`.
 *
 * Caso existam valores duplicados, será selecionada a última ocorrência,
 * uma vez que a iteração não é interrompida propositadamente.
 *
 * @param {HTMLSelectElement} parentElement - Elemento select a ser atualizado.
 * @param {string} oldValue - Valor previamente selecionado.
 */
function setOldValue(parentElement, oldValue) {
  for (let i = 0; i < parentElement.options.length; i++) {
    if (parentElement.options[i].value == oldValue) {
      parentElement.selectedIndex = i;
    }
  }
}
