
async function triggerSearch()
{
    const filters = await getFilters();
    const results = await GetSearch(filters);
    fillTable(tabela, results);
}
function handleSelectLogic(e) {
    const select = e.target;
    const options = select.options;

    if (options[0].selected) {
        const shouldSelectAll = options[0].selected;

        for (let i = 1; i < options.length; i++) {
            options[i].selected = shouldSelectAll;
        }
        options[0].selected = false;
    }
}

function handleFilterChange(e) {
    handleSelectLogic(e);
    triggerSearch();
}


function SetEventListeners()
{
    resetButton.addEventListener("click", () => { 
         rebuildDB();
    });
    cleanButton.addEventListener("click", () => { 
         deleteDB();
    });
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        upsertVeiculos();
    });
    [profileimg, loginMessage].forEach(e => e.addEventListener("click", () =>{
        if (userObject.username == null)
            formLogin.classList.toggle("hidden");
    }));
    formLogin.addEventListener("submit", (e) =>{
        e.preventDefault();
        getUserToken(formLogin.username.value, formLogin.password.value, localhost + "/login");
    });
    btlogout.addEventListener("click", () =>{
        userObject.username = null;
        userObject.userToken = null;
        deleteToken();
        handleLogin();
    });
    [
        sortController.marca.selectEl, 
        sortController.ano.selectEl, 
        sortController.modelo.selectEl,
        fVendido
    ].forEach(e => e.addEventListener("change", handleFilterChange));
   
}


async function Init()
{
    SetEventListeners();
    await checkUserToken();
    await preencherFiltros()
   
}