/*
Contains all functions with DOM manipulation or HTML elements
*/

/**
 * @brief Populates the category filter combobox.
 *
 * Clears the category filter and fills it with unique, sorted category values
 * extracted from the "categoria" property of the given book objects.
 *
 * @param {Array<Object>} filteredBooks
 *        Array of book objects containing a "categoria" property.
 */
function preencherFiltroCategorias(filteredBooks) {
  const filtroCategoria = document.querySelector("#category-filter");
  if (!filtroCategoria) return;
  const oldValue = filtroCategoria.selectedOptions[0].value;
  filtroCategoria.innerHTML = '<option value="">Todas as categorias</option>';
  getListUnique(filteredBooks, "categoria")
    .sort()
    .forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      filtroCategoria.appendChild(opt);
    });
  for (let i = 0; i < filtroCategoria.options.length; i++) {
    if (filtroCategoria.options[i].value == oldValue) {
      filtroCategoria.selectedIndex = i;
    }
  }
}

/**
 * @brief Toggles the visibility of the password input field.
 *
 * Changes the password input type between "password" and "text"
 * based on the state of the triggering checkbox, allowing the
 * user to show or hide the password content.
 *
 * @param {Event} e Event object triggered by the checkbox interaction.
 * @returns {void}
 */
function togglePswVisible(e) {
  if (e.target.checked) inputPsw.type = "text";
  else inputPsw.type = "password";
}

//#region ShowModals
/**
 * @brief Displays the login form modal.
 *
 * Resets the login form state and makes both the login container
 * and the backdrop visible, displaying the login modal centered
 * on the screen.
 *
 * @returns {void}
 */
function showLogin() {
  loginFormReset();
  loginContainer.style.display = "block";
  loginBackDrop.style.display = "block";
}

/**
 * @brief Displays the "Add Curso" form modal.
 *
 * Resets the add-curso form and shows its container along with
 * the shared backdrop, blocking interaction with the background
 * content.
 *
 * @returns {void}
 */
function showAddCurso() {
  addCursoFormReset();
  containerAddCurso.style.display = "block";
  loginBackDrop.style.display = "block";
}

/**
 * @brief Displays the login confirmation modal.
 *
 * Resets the confirmation form and shows the confirmation
 * container together with the backdrop, ensuring user focus
 * on the confirmation step.
 *
 * @returns {void}
 */
function showConfirmLogin() {
  confirmFormReset();
  confirmContainer.style.display = "block";
  loginBackDrop.style.display = "block";
}

/**
 * @brief Displays a modal with detailed information about a course.
 *
 * Populates the modal fields with the course title and description,
 * including duration, level, content, and custom info, then makes
 * the modal visible along with the backdrop.
 *
 * @param {Object} curso
 *        The course object containing details to display in the modal.
 */
function mostrarModalDetalhes(curso) {
  const modal = document.getElementById("modal-detalhes");
  const titulo = document.getElementById("modal-titulo");
  const descricao = document.getElementById("modal-descricao");

  titulo.innerText = curso.titulo;
  descricao.innerHTML =
    `<div>
            <p><strong>Duração Total:</strong> 45 horas | <strong>Nível:</strong> Principiante</p>
            <p><strong>Conteúdo:</strong> 150 aulas com acesso vitalício.</p>
            <hr>
            <p><strong>Descrição:</strong></p>
            <p>${curso.info}</p>
        </div>` ||
    "Este curso ainda não tem uma descrição detalhada disponível.";
  modal.style.display = "block";
  document.getElementById("login-backdrop").style.display = "block";
}

//#endregionShowModals

//#region  HideModals
/**
 * @brief Hides the "Add Curso" form modal.
 *
 * Hides the add-curso container and removes the backdrop,
 * restoring interaction with the main page content.
 *
 * @returns {void}
 */
function hideAddCurso() {
  containerAddCurso.style.display = "none";
  loginBackDrop.style.display = "none";
}

/**
 * @brief Hides the login form modal.
 *
 * Hides the login container and removes the backdrop,
 * returning the interface to its normal state.
 *
 * @returns {void}
 */
function hideLogin() {
  loginContainer.style.display = "none";
  loginBackDrop.style.display = "none";
}

/**
 * @brief Hides the login confirmation modal.
 *
 * Hides the confirmation container and removes the backdrop,
 * concluding the login confirmation workflow.
 *
 * @returns {void}
 */
function hideConfirmLogin() {
  confirmContainer.style.display = "none";
  loginBackDrop.style.display = "none";
}

/**
 * @brief Hides the Modal form.
 *
 * Hides the modal container and removes the backdrop,
 * concluding the show details workflow.
 *
 * @returns {void}
 */
function fecharModal() {
  document.getElementById("modal-detalhes").style.display = "none";
  document.getElementById("login-backdrop").style.display = "none";
}

//#endregion HideModals

//#region ResetModals
/**
 * @brief Resets the "Add Curso" form fields to their default values.
 *
 * Clears all text inputs, resets numeric and boolean fields
 * to their initial state, and prepares the form for a new
 * course insertion.
 *
 * @returns {void}
 */
function addCursoFormReset() {
  const target = AddCursoForm;
  target.ISBN.value = "";
  target.titulo.value = "";
  target.autor.value = "";
  target.categoria.value = "";
  target.preco.value = 0;
  target.promocao.value = false;
  target.rating.value = 5;
  target.imagem.value = "";
  target.info.value = "";
}

/**
 * @brief Resets the login confirmation form.
 *
 * Clears the username and password confirmation fields
 * and disables the password visibility checkbox.
 *
 * @returns {void}
 */
function confirmFormReset() {
  const target = confirmLogInForm;
  target.confirmUname.value = "";
  target.confirmPsw.value = "";
}

/**
 * @brief Resets the login form to its initial state.
 *
 * Clears username and password inputs, resets the password
 * visibility toggle, and updates the visibility of the
 * logout button based on the current user state.
 *
 * @returns {void}
 */
function loginFormReset() {
  inputPsw.value = "";
  inputUname.value = "";
  toggleShowPsw.checked = false;
  if (!currentUser) loginLogOutBtn.style.display = "none";
  else loginLogOutBtn.style.display = "block";
}
//#endregion ResetModals

/**
 * @brief Updates the login-related UI elements based on the current user state.
 *
 * Adjusts profile icon, welcome message, and administrative controls
 * according to whether a user is logged in and if the user has
 * administrator privileges.
 *
 * Default state corresponds to a guest (non-authenticated, non-admin) user.
 *
 * @returns {void}
 */
function updateLoginUI() {
  const targetImg = loginBtn.querySelector("img");

  targetImg.src = "./img/ProfileGuest.png";
  loginWelcome.innerText = "Welcome Guest";
  adicionarCurso.style.display = "none";
  adicionarCurso.classList.remove("button", "u-middle-width", "inserir-curso");

  if (currentUser) {
    targetImg.src = "./img/Profile.png";
    loginWelcome.innerText = `Welcome ${currentUser.username}`;

    if (currentUser.userrole === "admin") {
      loginWelcome.innerText += " (admin)";
      adicionarCurso.classList.add("button", "u-middle-width", "inserir-curso");
      adicionarCurso.style.display = "inline-block";
    }
  }
}

/**
 * @brief Generates and displays pagination controls for a filtered book list.
 *
 * Dynamically creates pagination buttons based on the number of
 * filtered books and the configured page size. Each button updates
 * the current page and triggers a re-render of the course list.
 *
 * Pagination controls are not displayed when only a single page
 * is required.
 *
 * @param {Array} filteredBooks Array containing the filtered book objects.
 * @returns {void}
 */
function paginacao(filteredBooks) {
  const paginacaoContainer = document.getElementById("paginacao");
  paginacaoContainer.innerHTML = "";
  let bookDbSize = filteredBooks.length;
  const totalPages = Math.ceil(bookDbSize / pageSize);
  if (totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.dataset.page = i;

      btn.addEventListener("click", function () {
        currentPage = Number(this.dataset.page);
        renderizarCursos();
      });
      paginacaoContainer.appendChild(btn);
    }
  }
}

/**
 * @brief Renders the course list with current filters, pagination, and user-specific actions.
 *
 * Applies favorites and category filters, slices the array for the current page,
 * builds the course cards with appropriate buttons based on user role, and updates
 * the UI container. Also updates category filter options and pagination controls.
 */
function renderizarCursos() {
  // Reference to the container where the courses will be inserted
  const listaCursos = document.querySelector("#lista-cursos");
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  let filteredBooks = bookDb;
  //introduzir outros filtros aquil um a um por exemplo
  if (showFavorites) {
    filteredBooks = filteredBooks.filter((item) =>
      currentUser.userfavs.some((element) => element === item.ISBN)
    );
  }

  const categoriaSelecionada = document.querySelector("#category-filter").value;
  let finalFilter = filteredBooks;
  if (categoriaSelecionada !== "") {
    finalFilter = filteredBooks.filter(
      (curso) => curso.categoria === categoriaSelecionada
    );
  }
  booksToShow = finalFilter.slice(start, end);

  // Clear any hard-coded content from the container (optional, if content should be replaced)
  listaCursos.innerHTML = `
          <h1 id="cabecalho" class="cabecalho">Cursos Online</h1>
     `;

  // Create a counter to track the number of items added to the current row
  let row;

  // Loop through the database (db) and create HTML for each course
  booksToShow.forEach((curso, index) => {
    // For every 3 items, create a new row
    if (index % 3 === 0) {
      row = document.createElement("div");
      row.classList.add("row");
      listaCursos.appendChild(row); // Append the row to the main container
    }
    // Create a new div for the course card
    const courseCard = document.createElement("div");
    courseCard.classList.add("four", "columns");

    // Build the inner HTML for the course card using template literals
    let heartToShow = "🤍";
    if (currentUser && currentUser.userfavs.includes(curso.ISBN)) {
      heartToShow = "❤️";
    }
    let userTopHTML = "";
    let userBottomHTML = `<a href="#" class="u-full-width button input ver-detalhes" data-id="${curso.ISBN}">Saber Mais</a>
    <a href="#" class="u-full-width button-primary button input adicionar-carrinho" data-id='${curso.ISBN}'>Adicionar ao Carrinho</a>`;
    if (currentUser) {
      if (currentUser.userrole === "admin") {
        userTopHTML = `<a href="#" class="apagar-curso-card" data-id=${curso.ISBN}>Apagar Curso</a>`;
      }
      if (currentUser.userrole === "user") {
        userTopHTML = `<button class="favoritosCard" data-id="${curso.ISBN}" onclick="gerirFavoritos('${curso.ISBN}')">${heartToShow}</button> `;
      }
    }

    courseCard.innerHTML = `
          <div class="card">
          <div class="login-row">
            ${userTopHTML}
            </div>
            <img src="img/${curso.imagem}" class="imagen-curso u-full-width">
            <div class="info-card">
            <h4>${curso.titulo}</h4>
            <p>${curso.autor}</p>
            <img src="img/estrelas.png">
                <p class="preco">${curso.preco}€ <span class="u-pull-right">${
      curso.promocao ? "15€" : ""
    }</span></p>
                ${userBottomHTML}
            </div>
        </div>
    `;
    // Append the course card to the current row
    row.appendChild(courseCard);
  });
  preencherFiltroCategorias(filteredBooks);
  paginacao(finalFilter);
}

/**
 * @brief Updates the favorites button icon based on the current favorites state.
 *
 * Displays a filled or outlined heart icon depending on the value
 * of the global `showFavorites` flag, visually indicating whether
 * the favorites filter is active.
 *
 * @returns {void}
 */
function showHeart() {
  if (showFavorites === true) {
    favoritosBtn.innerHTML = "❤️";
  } else {
    favoritosBtn.innerHTML = "🤍";
  }
}

/**
 * @brief Builds and renders the shopping cart items in the DOM.
 *
 * Clears the current cart display and dynamically creates
 * table rows for each course present in the shopping cart,
 * displaying its image, title, price, quantity, and a remove action.
 *
 * @returns {void}
 */
function carrinhoHTML() {
  limparcarrinho();
  artigoscarrinho.forEach((curso) => {
    const row = document.createElement("tr");
    row.innerHTML = `
               <td>  
                    <img src="${curso.imagem}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.preco}</td>
               <td>${curso.qtd} </td>
               <td>
                    <a href="#" class="apagar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
    divcarrinho.appendChild(row);
  });
}

/**
 * @brief Clears all items from the shopping cart container.
 *
 * Removes every child node from the cart DOM element,
 * effectively emptying the shopping cart display.
 *
 * @returns {void}
 */
function limparcarrinho() {
  // divcarrinho.innerHTML = '';
  while (divcarrinho.firstChild) {
    divcarrinho.removeChild(divcarrinho.firstChild);
  }
}

/**
 * @brief Displays the top 5 best-selling courses.
 *
 * When activated, retrieves sales data from the store, determines the top 5
 * courses by sales count, builds their UI cards, and displays them in the
 * top-5 container. Updates the top-5 button icon based on active state.
 */
function mostrarTop5Vendas() {
  const icon = document.querySelector("#btn-top5");
  const containerTop5 = document.getElementById("top5-container");
  const listaTop5 = document.getElementById("top5-list");

  if (!containerTop5 || !listaTop5) {
    console.error(
      "Erro: Elementos 'top5-container' ou 'top5-list' não encontrados no HTML."
    );
    return;
  }

  if (modoTop5Ativo) {
    icon.src = "img/fireRed.png";
    containerTop5.style.display = "block";

    const store = dbStores[0];
    const vendas = store ? store.storesales : [];
    const top5Data = [...vendas]
      .sort((a, b) => b.salecount - a.salecount)
      .slice(0, 5);

    listaTop5.innerHTML = "";

    top5Data.forEach((venda, index) => {
      const curso = bookDb.find((l) => l.ISBN === venda.ISBN);
      if (curso) {
        const col = document.createElement("div");
        col.style.width = "20%";
        col.style.float = "left";
        col.style.boxSizing = "border-box";
        col.style.cursor = "pointer";
        col.style.padding = "0 5px";

        col.innerHTML = `
    <div class="card-top5 card-top5-a">
        <div class="card-top5-b">
            <img src="img/fireWhite.png" alt="" class="badge-top5"> #${
              index + 1
            }
        </div>
        <img src="img/${curso.imagem}" class="u-full-width card-top5-c">
       
        <div class="card-top5-d">
            <h6 class="card-top5-e" title="${curso.titulo}">
                ${curso.titulo}
            </h6>
        </div>
    </div>
`;
        col.onclick = () => verDetalhesCurso(curso.ISBN);
        listaTop5.appendChild(col);
      }
    });
  } else {
    icon.src = "img/fireGray.png";
    containerTop5.style.display = "none";
  }
}
