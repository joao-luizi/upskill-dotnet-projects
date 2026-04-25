const storeID = 1;
const pageSize = 3;

let currentPage = 1;
let modoTop5Ativo = false;
let showFavorites = false;
let currentUser = undefined;

const modalDetalhes = document.getElementById("modal-detalhes");
const btnTop5 = document.querySelector("#btn-top5");
const favoritosBtn = document.querySelector("#favoritos");
const listaCursos = document.querySelector("#lista-cursos");

//#region Carrinho Components
const carrinho = document.querySelector("#carrinho");
const divcarrinho = document.querySelector("#lista-carrinho tbody");
const limparcarrinhoBtn = document.querySelector("#limpar-carrinho");
const finalizarcarrinhoBtn = document.querySelector("#finalizar-carrinho");
//#endregion Carrinho Components

//#region Confirm Login Components
const confirmContainer = document.getElementById("container-confirm");
const confirmLogInForm = document.getElementById("confirmForm");
const confirmCancelBtn = document.getElementById("confirm-cancelbtn");
//#endregion Confirm Login Components

//#region Login Components
const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("login-button");
const loginCancelBtn = document.getElementById("login-cancelbtn");
const loginLogOutBtn = document.getElementById("login-logout");
const loginContainer = document.getElementById("container-login");
const loginBackDrop = document.getElementById("login-backdrop");
const inputPsw = document.getElementById("inputPsw");
const inputUname = document.getElementById("inputUname");
const loginWelcome = document.getElementById("login-welcome");
const toggleShowPsw = document.getElementById("toggleShowPsw");
//#endregion Login Components

//#region Adicionar Curso Components
const containerAddCurso = document.getElementById("container-addcurso");
const AddCursoForm = document.getElementById("addCurso");
const adicionarCurso = document.getElementById("adicionar-curso");
const cancelarAddCurso = document.getElementById("addCurso-cancelbtn");
//#endregion Adicionar Curso Components

/**
 * @brief Initializes the application state.
 *
 * Loads persisted data, sets up event listeners, updates the login UI,
 * and renders the initial course list.
 */
function Init() {
  getLocalBookDb();
  getLocalStoreInfo();
  initEventListeners();
  updateLoginUI();
  showHeart();
  renderizarCursos();
}

/**
 * @brief Handles the add-course form submission.
 *
 * Prevents default form submission, builds a course object from form data,
 * validates ISBN uniqueness, and persists the new course if valid.
 *
 * @param {Event} e
 *        Submit event triggered by the add-course form.
 */
function submitAddCursoForm(e) {
  e.preventDefault();
  const form = e.target;
  let curso = {
    ISBN: form.ISBN.value,
    titulo: form.titulo.value,
    autor: form.autor.value,
    categoria: form.categoria.value,
    preco: Number(form.preco.value),
    promocao: form.promocao.value === "true",
    rating: Number(form.rating.value),
    imagem: form.imagem.value,
    info: form.info.value,
  };
  if (existsISBN(curso.ISBN)) {
    alert("Este ISBN j´s existe na base de dados");
  } else {
    bookDb.push(curso);
    saveLocalItem("books", bookDb);
    addCursoFormReset();
    hideAddCurso();
    renderizarCursos();
  }
}

/**
 * @brief Confirms user credentials and finalizes the checkout process.
 *
 * Validates the entered credentials against the currently logged-in user.
 * On success, updates store sales data based on cart contents, persists
 * changes, clears the cart, and updates the UI.
 *
 * @param {Event} e
 *        Submit event triggered by the checkout confirmation form.
 */
function submitConfirmForm(e) {
  e.preventDefault();
  const form = e.target;
  if (
    currentUser.username === form.confirmUname.value &&
    currentUser.userpass === form.confirmPsw.value
  ) {
    const currStore = dbStores.find((item) => item.storeid === storeID);
    artigoscarrinho.forEach((item) => {
      if (currStore.storesales.some((element) => element.ISBN === item.id)) {
        const existingElement = currStore.storesales.find(
          (element) => element.ISBN === item.id
        );
        existingElement.salecount += item.qtd;
      } else {
        currStore.storesales.push({ ISBN: item.id, salecount: item.qtd });
      }
    });
    saveLocalItem("stores", dbStores);
    artigoscarrinho = [];
    hideConfirmLogin();
    confirmFormReset();
    limparcarrinho();
    mostrarTop5Vendas();
    alert("Obrigado pela sua preferência");
  } else {
    alert("Autenticação Inválida");
  }
}

/**
 * @brief Handles user login form submission.
 *
 * Validates user credentials and, on success, updates the login state
 * and refreshes the UI accordingly.
 *
 * @param {Event} e
 *        Submit event triggered by the login form.
 */
function submitLoginForm(e) {
  e.preventDefault();
  const form = e.target;
  if (checkUserLogin(form.inputUname.value, form.inputPsw.value)) {
    showFavorites = false;
    updateLoginUI();
    hideLogin();
    showHeart();
    renderizarCursos();
  }
}

/**
 * @brief Checks authentication requirements before checkout.
 *
 * Verifies that the cart is not empty and prompts user authentication
 * if required before proceeding with the purchase.
 */
function finalizarCompra() {
  if (artigoscarrinho.length > 0) {
    if (currentUser) {
      showConfirmLogin();
    } else {
      alert("Por favor autentique-se para concluir esta acção");
    }
  }
}

/**
 * @brief Toggles the favorites filter and refreshes the UI.
 *
 * Ensures the user is authenticated, switches the favorites display state,
 * resets pagination, and re-renders the course list.
 *
 * @param {Event} e
 *        Event triggered by the favorites filter action.
 */
function filtrarFavoritos(e) {
  e.preventDefault();
  if (!currentUser) {
    alert("Faz login para veres os teus favoritos!");
    return;
  }
  if (currentUser.userrole === "user") {
    if (showFavorites === true) {
      showFavorites = false;
    } else {
      showFavorites = true;
    }
    currentPage = 1;
    showHeart();
    renderizarCursos();
  }
}

/**
 * @brief Initializes all static event listeners used in the application.
 *
 * Registers event handlers for cart actions, course management, authentication,
 * filtering, and global UI interactions that are not dynamically assigned.
 */
function initEventListeners() {
  confirmLogInForm.addEventListener("submit", submitConfirmForm);

  //#region Carrinho Components
  carrinho.addEventListener("click", eliminarCurso);
  limparcarrinhoBtn.addEventListener("click", limparcarrinho);
  finalizarcarrinhoBtn.addEventListener("click", finalizarCompra);
  //#endregion Carrinho Components

  //#region Adicionar Curso Components
  AddCursoForm.addEventListener("submit", submitAddCursoForm);
  adicionarCurso.addEventListener("click", (e) => {
    e.preventDefault();
    showAddCurso();
  });
  cancelarAddCurso.addEventListener("click", hideAddCurso);
  //#endregion Adicionar Curso Components

  //#region Login Components
  loginForm.addEventListener("submit", submitLoginForm);
  loginBtn.addEventListener("click", showLogin);
  loginCancelBtn.addEventListener("click", hideLogin);
  loginLogOutBtn.addEventListener("click", () => {
    currentUser = undefined;
    currentPage = 1;
    modoTop5Ativo = false;
    showFavorites = false;
    showHeart();
    updateLoginUI();
    hideLogin();
    mostrarTop5Vendas();
    renderizarCursos();
  });
  toggleShowPsw.addEventListener("change", togglePswVisible);
  //#endregion Login Components

  confirmCancelBtn.addEventListener("click", hideConfirmLogin);
  listaCursos.addEventListener("click", adicionarRemoverCurso);
  favoritosBtn.addEventListener("click", filtrarFavoritos);
  btnTop5.addEventListener("click", (e) => {
    e.preventDefault();
    modoTop5Ativo = !modoTop5Ativo;
    mostrarTop5Vendas();
  });
  document.querySelector("#category-filter").addEventListener("change", () => {
    currentPage = 1;
    renderizarCursos();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (loginContainer.style.display === "block") hideLogin();
      if (confirmContainer.style.display === "block") hideConfirmLogin();
      if (containerAddCurso.style.display === "block") hideAddCurso();
      if (modalDetalhes && modalDetalhes.style.display === "block") {
        fecharModal();
      }
    }
  });
}

/**
 * @brief Handles clicks on course cards.
 *
 * Detects which action was triggered (view details, toggle favorites,
 * add to cart, or delete course) based on the clicked element's class
 * and executes the corresponding behavior.
 *
 * @param {Event} e
 *        Click event triggered on the course card container.
 */
function adicionarRemoverCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("ver-detalhes")) {
    const cursoId = e.target.getAttribute("data-id");
    const cursoSelecionado = bookDb.find((curso) => curso.ISBN === cursoId);
    mostrarModalDetalhes(cursoSelecionado);
  }
  if (e.target.classList.contains("botao-favoritos")) {
    const cursoId = e.target.getAttribute("data-id");
    gerirFavoritos(cursoId);
  }
  if (e.target.classList.contains("adicionar-carrinho")) {
    const curso = e.target.parentElement.parentElement;
    lerDadosCurso(curso);
  }
  if (e.target.classList.contains("apagar-curso-card")) {
    if (currentUser) {
      const curso = e.target.parentElement.parentElement;
      apagarCurso(curso);
    } else {
      alert("Por favor autentique-se para concluir esta acção");
    }
  }
}

/**
 * @brief Deletes a course from the database and the cart if present.
 *
 * Removes the course identified by its ID from both the local book database
 * and the shopping cart, persists the updated database, and refreshes
 * the UI components (course list and cart).
 *
 * @param {HTMLElement} curso
 *        The course card element containing the course ID in a child <a> element.
 */
function apagarCurso(curso) {
  const cursoId = curso.querySelector("a").getAttribute("data-id");
  //remover id dos artigos carrnho
  artigoscarrinho = artigoscarrinho.filter((curso) => curso.id !== cursoId);
  //remover id da bd
  bookDb = bookDb.filter((curso) => curso.ISBN !== cursoId);
  //salvar bd
  saveLocalItem("books", bookDb);
  //recarregar
  currentPage = 1;
  renderizarCursos();
  carrinhoHTML();
}

/**
 * @brief Reads course data and adds it to the shopping cart.
 *
 * Extracts relevant information from the course card element, checks
 * if the course is already in the cart, increments quantity if present,
 * or adds it as a new item. Updates the cart UI afterwards.
 *
 * @param {HTMLElement} curso
 *        The course card element containing the course information.
 */
function lerDadosCurso(curso) {
  const infoCurso = {
    imagem: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    preco: curso.querySelector(".preco span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    qtd: 1,
  };

  if (artigoscarrinho.some((curso) => curso.id === infoCurso.id)) {
    const cursos = artigoscarrinho.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.qtd++;
        return curso;
      } else {
        return curso;
      }
    });
    artigoscarrinho = [...cursos];
  } else {
    artigoscarrinho = [...artigoscarrinho, infoCurso];
  }
  carrinhoHTML();
}

/**
 * @brief Removes a course from the shopping cart.
 *
 * Detects if the clicked element corresponds to a cart delete action,
 * removes the associated course from the cart array, and updates the cart UI.
 *
 * @param {Event} e
 *        Click event triggered on the cart container.
 */
function eliminarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("apagar-curso")) {
    // e.target.parentElement.parentElement.remove();
    const cursoId = e.target.getAttribute("data-id");
    artigoscarrinho = artigoscarrinho.filter((curso) => curso.id !== cursoId);
    carrinhoHTML();
  }
}

/**
 * @brief Toggles a course as a favorite for the current user.
 *
 * Adds the course ID to the user's favorites if not present, or removes it
 * if already favorited. Updates the user data and refreshes the course list.
 *
 * @param {string} cursoId
 *        The ID of the course to toggle as a favorite.
 */
function gerirFavoritos(cursoId) {
  if (!currentUser) {
    return alert("Por favor, faça login para marcar cursos favoritos.");
  }
  if (currentUser.userfavs.includes(cursoId)) {
    currentUser.userfavs = currentUser.userfavs.filter(
      (curso) => curso !== cursoId
    );
  } else {
    currentUser.userfavs.push(cursoId);
  }
  updateUser(currentUser);
  renderizarCursos();
}

/**
 * @brief Returns a list of unique values for a given property in an array of objects.
 *
 * Extracts the specified property from each object, removes duplicates,
 * and returns the resulting array.
 *
 * @param {Array<Object>} arr
 *        The array of objects to process.
 * @param {string} prop
 *        The property name to extract unique values from.
 * @returns {Array<*>} An array of unique values for the specified property.
 */
function getListUnique(arr, prop) {
  return [...new Set(arr.map((e) => e[prop]))];
}

/**
 * @brief Finds a course by ISBN and shows its details.
 *
 * Searches the local book database for a course matching the given ISBN,
 * and displays its details if found.
 *
 * @param {string} isbn
 *        The ISBN of the course to view.
 */
function verDetalhesCurso(isbn) {
  const curso = bookDb.find((c) => c.ISBN === isbn);
  if (curso) {
    mostrarDetalhes(curso);
  }
}
