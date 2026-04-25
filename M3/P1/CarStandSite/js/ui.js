
async function editar(i) {
  
  const v = await GetVeiculoById(i); 
  form.VeiculoID.value = i;
  form.marca.value = v.nome;
  form.modelo.value = v.modelo;
  form.ano.value = v.ano;
  form.inspecao.value = toUnifiedDate(new Date(v.dataDeInspecao), false); // sem fusos horários envolvidos
  form.vendido.checked = v.vendido;

}

async function getFilters()
{
    //collect all selected sortController.marca.selectEl select options
    const marcaOption = [...sortController.marca.selectEl.options]
    .filter(o => o.selected)
    .map(o => parseInt(o.value));
    //collect all selected sortController.ano.selectEl select options
    const anoOption = [...sortController.ano.selectEl.options]
    .filter(o => o.selected)
    .map(o => parseInt(o.value));
    //collect all selected sortController.modelo.selectEl select options
    const modeloOption = [...sortController.modelo.selectEl.options]
    .filter(o => o.selected)
    .map(o => parseInt(o.value));
    //collect 
    const vendido = fVendido.value === "" ? null : fVendido.value === "true";
    
    const filter = {
      marcas: marcaOption,  
      modelos: modeloOption,
      anos: anoOption,
      vendido: vendido      
    };
    
    return filter;
}

function handleLogin()
{
    formLogin.classList = ["hidden"]
    formLogin.username.value = "";
    formLogin.password.value = "";
    if (userObject.userToken == null)
    {
        profileimg.src = "./images/ProfileGuest.png";
        loginMessage.innerText = "Welcome Guest!";
        btlogout.style.display = "none";
    }
    else
    {
        profileimg.src = "./images/Profile.png";
        loginMessage.innerText = `Welcome ${userObject.username}!`;
        btlogout.style.display = "block";
    }
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
  if (value == null)
        td.innerHTML = "Sem inspeções";
  else
  {
      let date = new Date(value);
      td.innerHTML = `${toUnifiedDate(date, true)} (${inspecaoEstado(date)})`;
    }
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
  bt1.setAttribute("veiculoID", value);
  bt1.addEventListener("click", (e) => {
    editar(e.target.getAttribute("veiculoID"));
  });
  bt2.innerText = "Remover";
  bt2.setAttribute("veiculoID", value);
  bt2.addEventListener("click", (e) => {
    deleteVeiculos(e.target.getAttribute("veiculoID"));

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
    cellArr.push(getCellString(element["nome"]));
    cellArr.push(getCellString(element["modelo"]));
    cellArr.push(getCellString(element["ano"]));
    cellArr.push(getCellDate(element["dataDeInspecao"]));
    cellArr.push(getCellCustom(element["vendido"]));
    cellArr.push(getCellButtons(element["veiculoID"]));
    let tr = getRow(cellArr);
    parentElement.appendChild(tr);
  });
}

function clearVehicleForm()
{
  form.VeiculoID.value = "";
  form.marca.value = "";
  form.modelo.value = "";
  form.ano.value = "";
  form.inspecao.value = "";
  form.vendido.checked = false;
}

