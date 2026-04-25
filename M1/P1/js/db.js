const db = [
  {
    marca: "Toyota",
    modelo: "Corolla",
    ano: 2020,
    //ultimaInspecao: new Date(2025, 2, 10),
    ultimaInspecao: new Date(2025, 1, 10),
    vendido: false,
  },
  {
    marca: "Honda",
    modelo: "Civic",
    ano: 2019,
    //ultimaInspecao: new Date(2023, 10, 5),
    ultimaInspecao: new Date(2023, 9, 5),
    vendido: true,
  },
  {
    marca: "Ford",
    modelo: "Focus",
    ano: 2021,
    //ultimaInspecao: new Date(2024, 5, 12),
    ultimaInspecao: new Date(2024, 4, 12),
    vendido: false,
  },
  {
    marca: "BMW",
    modelo: "Serie 1",
    ano: 2018,
    //ultimaInspecao: new Date(2023, 7, 22),
    ultimaInspecao: new Date(2023, 6, 22),
    vendido: true,
  },
  {
    marca: "Mercedes",
    modelo: "A180",
    ano: 2020,
    //ultimaInspecao: new Date(2024, 0, 15),
    ultimaInspecao: new Date(2025, 0, 15),
    vendido: false,
  },
  {
    marca: "Volkswagen",
    modelo: "Golf",
    ano: 2017,
    //ultimaInspecao: new Date(2022, 11, 30),
    ultimaInspecao: new Date(2022, 10, 30),
    vendido: true,
  },
  {
    marca: "Renault",
    modelo: "Clio",
    ano: 2022,
    //ultimaInspecao: new Date(2025, 3, 8),
    ultimaInspecao: new Date(2025, 2, 8),
    vendido: false,
  },
  {
    marca: "Peugeot",
    modelo: "208",
    ano: 2021,
    //ultimaInspecao: new Date(2024, 1, 19),
    ultimaInspecao: new Date(2024, 0, 19),
    vendido: false,
  },
  {
    marca: "Hyundai",
    modelo: "i20",
    ano: 2019,
    //ultimaInspecao: new Date(2023, 9, 3),
    ultimaInspecao: new Date(2023, 8, 3),
    vendido: true,
  },
  {
    marca: "Kia",
    modelo: "Rio",
    ano: 2020,
    //ultimaInspecao: new Date(2024, 4, 25),
    ultimaInspecao: new Date(2024, 3, 25),
    vendido: false,
  },
];

let veiculos = [];

/**
 * Insere um novo veículo ou atualiza um existente com base no formulário.
 *
 * @param {Event} e - Evento de submissão do formulário.
 */
function updateInsert(e) {
  const form = e.target;
  let needsSaving = false
  let vIndex = Number(form.editIndex.value);
  const dataObj = {
    marca: form.marca.value,
    modelo: form.modelo.value,
    ano: form.ano.value * 1, //make it qualified number type
    ultimaInspecao: new Date(form.inspecao.value).toISOString(),
    vendido: form.vendido.checked,
  };
  if (vIndex >= 0) {
    dataObj["data-index"] = vIndex;
    if (!isEqual(dataObj, veiculos[vIndex])){
      needsSaving = true;
      veiculos[vIndex] = dataObj;
    }
  } else {
    needsSaving = true;
    dataObj["data-index"] = veiculos.length;
    veiculos.push(dataObj);
  }
  if (needsSaving)
    guardar("veiculos", veiculos);
}

/**
 * Remove um veículo do array e atualiza a base de dados local.
 *
 * @param {number} i - Índice do veículo a remover.
 */
function deleteRecord(i) {
  let input = confirm("Remover veículo?");
  if (input) {
    veiculos.splice(i, 1);
    getDataWithIndex(veiculos);
  }
}

/**
 * Guarda dados no localStorage removendo propriedades internas.
 *
 * @param {string} storageKey - Chave do localStorage.
 * @param {Array<Object>} source - Array de objetos a guardar.
 */
function guardar(storageKey, source) {
  let dataObj = source.map((item) => {
    const copy = { ...item };
    delete copy["data-index"];
    return copy;
  });

  localStorage.setItem(storageKey, JSON.stringify(dataObj));
}

/**
 * Remove os dados persistidos no localStorage e limpa o array local.
 *
 * @param {string} storageKey - Chave a remover do localStorage.
 */
function cleanLS(storageKey) {
  let input = confirm("Remover base de dados?");
  if (input){
    localStorage.removeItem(storageKey);
    veiculos = [];
  }
}

/**
 * Carrega os dados dos veículos a partir do localStorage.
 * Em caso de erro, solicita reinicialização.
 */
function carregar() {
  let veiculosDB = localStorage.getItem("veiculos");
  let dataObj;
  if (veiculosDB && veiculosDB != "") {
    try {
      dataObj = JSON.parse(veiculosDB);
      getDataWithIndex(dataObj);
    } catch {
      reInicializar(
        "Ocorreu um erro ao aceder à base de dados local.\nDeseja (re)inicializar?"
      );
    }
  }
}

/**
 * Reinicializa a base de dados local com os dados padrão.
 *
 * @param {string} [msg] - Mensagem de confirmação.
 */
function reInicializar(
  msg = "Tem a certeza que deseja (re)inicializar todos os veiculos?"
) {
  let input = confirm(msg);
  if (input) {
    getDataWithIndex(db);
    guardar("veiculos", veiculos);
  }
}

/**
 * Atribui um índice interno a cada veículo e atualiza o array global.
 *
 * @param {Array<Object>} source - Array de veículos sem índice interno.
 */
function getDataWithIndex(source) {
  let id = 0;
  veiculos = source.map((item) => {
    const copy = { ...item };
    copy["data-index"] = id++;
    return copy;
  });
}
