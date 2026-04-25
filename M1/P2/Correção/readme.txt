Esta pasta contém uma versão corrigida do Projecto 2, desenvolvida após a entrega.

A funcionalidade de pesquisa sugerida não se encontrava operacional na versão original.

Com o objetivo de garantir a completude funcional do projecto e consolidar a aprendizagem, foi implementada uma correção pontual e de impacto reduzido no código existente.

A intervenção minimalista que permite solucionar a falta de funcionalidade de pesquisa com recurso à caixa de pesquisa consiste nas seguintes adições:

Ficheiro ui.js

function renderizarCursos() {
  // Reference to the container where the courses will be inserted
  const listaCursos = document.querySelector("#lista-cursos");		    *codigo existente
  const start = (currentPage - 1) * pageSize;				            *codigo existente
  const end = start + pageSize;						                    *codigo existente
  let filteredBooks = bookDb;						                    *codigo existente
  if (pesquisaDb){							                            *adicionar
    filteredBooks = pesquisaDb						                    *adicionar
  }									                                    *adicionar

Ficheiro db.js
let dbStores = [];							                            *codigo existente
let bookDb = [];							                            *codigo existente
let artigoscarrinho = [];						                        *codigo existente
let pesquisaDb = undefined						                        *adicionar

Ficheiro  app.js

(...codigo prévio...)	
let showFavorites = false;						                        *codigo existente
let currentUser = undefined;						                    *codigo existente
								
const pesquisa = document.getElementById("pesquisa");			        *adicionar
const modalDetalhes = document.getElementById("modal-detalhes");	    *codigo existente


function submitPesquisaForm(e) {					                    *adicionar
  e.preventDefault();							                        *adicionar
  const searchValue = pesquisa.buscador.value;				            *adicionar
  console.log(searchValue);						                        *adicionar
  if (searchValue !== "") {						                        *adicionar
    pesquisaDb = [];							                        *adicionar
    for (let i = 0; i < bookDb.length; i++) {				            *adicionar
      for (const key in bookDb[i]) {					                *adicionar
        if (key === "titulo" || key === "autor" || key === "info") {	*adicionar
          if (bookDb[i][key].includes(searchValue)) {			        *adicionar
            pesquisaDb.push(bookDb[i]);					                *adicionar
            break;							                            *adicionar
          }								                                *adicionar
        }								                                *adicionar
      }									                                *adicionar
    }									                                *adicionar
  } else {								                                *adicionar
    pesquisaDb = undefined;						                        *adicionar
  }									                                    *adicionar
  renderizarCursos();							                        *adicionar
}									                                    *adicionar

function initEventListeners() {						                    *codigo existente
  pesquisa.addEventListener("submit", submitPesquisaForm);		        *adicionar
(...restante codigo...)