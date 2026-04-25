const fMarca = document.getElementById("fMarca");
const fAno = document.getElementById("fAno");
const fVendido = document.getElementById("fVendido");
const form = document.getElementById("formVeiculo");
const carregarLS = document.getElementById("carregarLS");
const limparLS = document.getElementById("limparLS");
const tabela = document.getElementById("tabela");
const sortController = {
  marca: {
    selectEl: fMarca,
    sortEl: document.getElementById("fMarcaSortOrder"),
    sortAsc: true,
    sortf: sortStringArray,
    stringAll: "Todas as marcas",
  },
  ano: {
    selectEl: fAno,
    sortEl: document.getElementById("fAnoSortOrder"),
    sortAsc: true,
    sortf: sortNumberArray,
    stringAll: "Todos os anos",
  },
};

/**
 * Preenche e atualiza um filtro (select) com valores únicos e ordenados.
 *
 * A função:
 * - extrai valores únicos a partir do conjunto de dados,
 * - aplica a ordenação definida no sortController,
 * - recria as opções do select,
 * - e preserva o valor previamente selecionado, se existir.
 *
 * @param {Object[]} dbObj - Array de objetos que representa a base de dados em memória.
 * @param {string} sortCtlName - Nome da chave no sortController ("marca" ou "ano").
 */
function preencherFiltros(dbObj, sortCtlName) {
  const sortObj = sortController[sortCtlName];
  const oldValue = sortObj.selectEl.selectedOptions[0].value;
  let fOptions = getUniques(dbObj, sortCtlName);
  fOptions = sortObj.sortf(fOptions, sortObj.sortAsc);
  createNewOptions(sortObj, fOptions);
  setOldValue(sortObj.selectEl, oldValue);
}

/**
 * Aplica os filtros selecionados e renderiza a tabela de veículos.
 *
 * Filtra o array global de veículos com base nos valores atualmente
 * selecionados nos filtros (marca, ano e vendido) e delega a
 * renderização da tabela à função de UI correspondente.
 */
function render() {
  let filterMarca = fMarca.value;
  let filterAno = fAno.value;
  let filterVendido = fVendido.value;
  let filteredData = veiculos.filter((item) => {
    if (
      (filterMarca === "" || item["marca"] === filterMarca) &&
      (filterAno === "" || item["ano"] == filterAno) &&
      (filterVendido === "" || item["vendido"] === JSON.parse(filterVendido))
    )
      return item;
  });
  fillTable(tabela, filteredData);
}

/**
 * Atualiza completamente a interface da aplicação.
 *
 * Recalcula os filtros disponíveis com base no estado atual dos dados,
 * reaplica a ordenação definida e volta a renderizar a tabela.
 *
 * Esta função centraliza a sequência típica de atualização da UI,
 * evitando duplicação de código em vários event listeners.
 */
function refreshUI() {
  preencherFiltros(veiculos, "marca");
  preencherFiltros(veiculos, "ano");
  render();
}

/**
 * Função de inicialização da aplicação.
 *
 * Atua como ponto de entrada, sendo responsável por:
 * - associar event listeners aos elementos da interface,
 * - inicializar o estado da aplicação,
 * - carregar dados de local storage,
 * - e realizar o primeiro render da UI.
 */
function Init() {
  [fMarca, fAno, fVendido].forEach((f) => f.addEventListener("change", render));
  sortController.marca.sortEl.addEventListener("click", function () {
    let sortObj = sortController["marca"];
    sortObj.sortAsc = !sortObj.sortAsc;
    updateSortElement(this, sortObj.sortAsc);
    preencherFiltros(veiculos, "marca");
    render();
  });
  sortController.ano.sortEl.addEventListener("click", function () {
    let sortObj = sortController["ano"];
    sortObj.sortAsc = !sortObj.sortAsc;
    updateSortElement(this, sortObj.sortAsc);
    preencherFiltros(veiculos, "ano");
    render();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    updateInsert(e);
    refreshUI();
    resetForm();
  });
  carregarLS.addEventListener("click", () => {
    reInicializar();
    carregar();
    refreshUI();
  });

  limparLS.addEventListener("click", () => {
    cleanLS("veiculos");
    carregar();
    refreshUI();
  });
  updateSortElement(sortController.marca.sortEl, sortController.marca.sortAsc);
  updateSortElement(sortController.ano.sortEl, sortController.ano.sortAsc);
  resetForm();
  carregar();
  refreshUI();
}
