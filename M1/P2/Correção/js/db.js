//{ "ISBN": "<ISBN>", "titulo": "<titulo>", "autor": "<autor>", "categoria": "< categoria
//    >", "preco": <preco>, "promocao": <promocao>, "rating": <rating>, "imagem":
//    "<ficheiro>" }
const db = [
  {
    ISBN: "0001",
    titulo: "HTML5, CSS3, JavaScript para Principiantes",
    autor: "Zé dos Anzóis",
    categoria: "Front End",
    preco: 300,
    promocao: true,
    rating: 5,
    imagem: "curso1.jpg",
    info: "Domine as fundações da web moderna. Este curso prático guia-o desde a criação da primeira página em HTML até à interatividade avançada com JavaScript, permitindo-lhe construir websites profissionais e responsivos do zero.",
  },
  {
    ISBN: "0002",
    titulo: "Curso de Comida Vegetariana",
    autor: "Zé dos Anzóis",
    categoria: "Culinária",
    preco: 200,
    promocao: true,
    rating: 4,
    imagem: "curso2.jpg",
    info: "Descubra como criar pratos vibrantes, saudáveis e cheios de sabor sem utilizar carne. Aprenda técnicas de chef para trabalhar com ingredientes sazonais, proteínas vegetais e temperos que vão revolucionar a sua cozinha diária.",
  },
  {
    ISBN: "0003",
    titulo: "Guitarra para Principiantes",
    autor: "Zé dos Anzóis",
    categoria: "Música",
    preco: 200,
    promocao: true,
    rating: 4,
    imagem: "curso3.jpg",
    info: "Tire a guitarra do saco e comece a tocar as suas músicas favoritas. Através de um método passo-a-passo, aprenderá os acordes fundamentais, ritmos essenciais e a postura correta para evoluir rapidamente e com confiança.",
  },
  {
    ISBN: "0004",
    titulo: "A horta em casa",
    autor: "Zé dos Anzóis",
    categoria: "Jardinagem",
    preco: 200,
    promocao: true,
    rating: 4,
    imagem: "curso4.jpg",
    info: "Não precisa de um quintal enorme para colher os seus próprios alimentos. Aprenda a cultivar legumes, hortaliças e ervas aromáticas em pequenos espaços, como varandas ou cozinhas, utilizando métodos biológicos e sustentáveis.",
  },
  {
    ISBN: "0005",
    titulo: "Decoração com produtos artesanais",
    autor: "Zé dos Anzóis",
    categoria: "Artes",
    preco: 200,
    promocao: true,
    rating: 4,
    imagem: "curso5.jpg",
    info: "Transforme a sua casa num espaço único e acolhedor. Este curso ensina a criar peças decorativas exclusivas utilizando materiais acessíveis e técnicas artesanais, unindo o design moderno ao toque pessoal do 'feito à mão'.",
  },
  {
    ISBN: "0006",
    titulo: "Concurrency in C# Cookbook",
    autor: "O'Reilly",
    categoria: "Parallel Programming",
    preco: 300,
    promocao: true,
    rating: 5,
    imagem: "curso1.jpg",
    info: "Focado em programação paralela e assíncrona, fundamental para .NET moderno",
  },
  {
    ISBN: "0007",
    titulo: "Programação C# 12",
    autor: "O'Reilly",
    categoria: "C# Programming",
    preco: 300,
    promocao: true,
    rating: 5,
    imagem: "curso1.jpg",
    info: " Um guia completo para a linguagem, cobrindo desde o básico até recursos avançados, ótimo para iniciantes e experientes",
  },
  {
    ISBN: "0008",
    titulo: "Criando Microsserviços, 2ª Edição",
    autor: "O'Reilly",
    categoria: "C# Programming",
    preco: 300,
    promocao: true,
    rating: 5,
    imagem: "curso1.jpg",
    info: "Essencial para arquitetura de sistemas modernos com .NET",
  },
  {
    ISBN: "0009",
    titulo: "O Sistema de Tipos C#",
    autor: "O'Reilly",
    categoria: "C# Programming",
    preco: 300,
    promocao: true,
    rating: 5,
    imagem: "curso1.jpg",
    info: "Detalha os tipos e o sistema de tipos, crucial para entender o C# profundamente",
  },
  {
    ISBN: "0010",
    titulo: "Tornando-se Funcional com C#",
    autor: "O'Reilly",
    categoria: "C# Programming",
    preco: 300,
    promocao: true,
    rating: 5,
    imagem: "curso1.jpg",
    info: "Aborda programação funcional em C#, uma abordagem cada vez mais relevante.",
  },
];

let dbStores = [];
let bookDb = [];
let artigoscarrinho = [];
let pesquisaDb = undefined
function saveLocalItem(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

function getLocalItem(key) {
  return localStorage.getItem(key);
}

//#region dbBooksFunctions

/**
 * @brief Loads and initializes the local book database.
 *
 * Retrieves the book database from local storage and attempts to parse it.
 * If the stored data is missing, empty, or corrupted, the function falls
 * back to the default database. When the database is empty, the user is
 * prompted to confirm reinitialization.
 *
 * The function updates the global `bookDb` variable and persists the
 * resulting database back to local storage.
 * @return {void}
 */
function getLocalBookDb() {
  let localBooks = getLocalItem("books");
  let dbBooks = [];

  if (localBooks && localBooks !== "") {
    try {
      dbBooks = JSON.parse(localBooks);
    } catch {
      console.log("Unable to parse book data");
      dbBooks = [...db];
    }
  }
  if (dbBooks === "" || dbBooks.length === 0) {
    const init = confirm(
      "A base de dados de livros está vazia. Pretende (re)inicializar?"
    );
    if (init) dbBooks = [...db];
  }
  bookDb = dbBooks;
  saveLocalItem("books", bookDb);
}

/**
 * @brief Checks whether an ISBN already exists in the book database.
 *
 * Iterates over the current book database and determines if any entry
 * matches the provided ISBN.
 *
 * @param {string} isbn - The ISBN to search for.
 * @returns {boolean} True if the ISBN exists, false otherwise.
 *
 */
function existsISBN(isbn) {
  return bookDb.some((item) => item.ISBN === isbn);
}
//#endregion dbBooksFunctions

//#region dbUsersFunctions

/**
 * @brief Loads the local user database and ensures an admin user exists.
 *
 * Retrieves user data from local storage and attempts to parse it as JSON.
 * If the stored data is missing, empty, or invalid, an empty user list is
 * initialized. The function then ensures that a default administrator
 * account exists by delegating to `assureLocalAdmin`.
 *
 * @return {Array<Object>} The validated list of user objects.
 */
function getLocalUsers() {
  let localUsers = getLocalItem("users");
  let dbUsers = [];

  if (localUsers && localUsers !== "") {
    try {
      dbUsers = JSON.parse(localUsers);
    } catch {
      console.log("Unable to parse user data");
    }
  }
  if (dbUsers === "" || dbUsers.length === 0) {
    dbUsers = [];
  }
  return assureLocalAdmin(dbUsers);
}

/**
 * @brief Ensures that a default administrator user exists.
 *
 * Checks whether a predefined administrator account exists in the provided
 * user database. If the account is missing, it is created and persisted to
 * local storage.
 *
 * @param {Array<Object>} dbUsers - The current list of user objects.
 * @returns {Array<Object>} The updated user database.
 *
 */
function assureLocalAdmin(dbUsers) {
  if (!getUser("upskill", "upskill1234", dbUsers)) {
    dbUsers.push({
      username: "upskill",
      userpass: "upskill1234",
      userfavs: [],
      userrole: "admin",
    });
    saveLocalItem("users", dbUsers);
  }
  return dbUsers;
}

/**
 * @brief Updates an existing user or adds a new one to the user database.
 *
 * Loads the current list of users from local storage and attempts to locate
 * an existing user matching the provided credentials. If found, the user's
 * favorites list is updated. If no match exists, the user is added to the
 * database.
 * The updated user list is persisted back to local storage.
 *
 * @param {Object} user - The user object to update or insert.
 * @param {string} user.username - The user's username.
 * @param {string} user.userpass - The user's password.
 * @param {Array}  user.userfavs - The user's list of favorite items.
 *
 * @return {void}
 *
 */
function updateUser(user) {
  let localUsers = getLocalUsers();
  let dbUser = getUser(user.username, user.userpass, localUsers);
  if (dbUser) {
    dbUser.userfavs = [...user.userfavs];
  } else {
    localUsers.push(user);
  }
  saveLocalItem("users", localUsers);
}

/**
 * @brief Creates and persists a new standard user.
 *
 * Initializes a new user object with the provided credentials and default
 * properties, assigns a non-administrative role, and saves it to local
 * storage.
 *
 * @param {string} username - The username for the new account.
 * @param {string} password - The password for the new account.
 *
 * @return {void}
 */
function saveNewUser(username, password) {
  let localUsers = getLocalUsers();
  const newUser = {
    username: username,
    userpass: password,
    userfavs: [],
    userrole: "user",
  };
  localUsers.push(newUser);
  saveLocalItem("users", localUsers);
}

/**
 * @brief Retrieves a user matching the provided credentials.
 *
 * Searches the provided user list for a user whose username and password
 * match the supplied values.
 *
 * @param {string} username - The username to search for.
 * @param {string} password - The password to match.
 * @param {Array<Object>} localUsers - The list of registered users.
 *
 * @returns {Object|undefined} The matching user object, or undefined if not found.
 */
function getUser(username, password, localUsers) {
  let userObj = localUsers.find(
    (user) => user.username === username && user.userpass === password
  );
  return userObj;
}

/**
 * @brief Counts how many users exist with a given username.
 *
 * Filters the provided user list and returns the number of users whose
 * username matches the supplied value.
 *
 * @param {string} username - The username to search for.
 * @param {Array<Object>} localUsers - The list of registered users.
 *
 * @returns {number} The number of users with the given username.
 */
function getUserNameCount(username, localUsers) {
  let userObj = localUsers.filter((user) => {
    return user.username === username;
  });
  return userObj.length;
}

/**
 * @brief Handles user authentication and optional account creation.
 *
 * Attempts to authenticate a user with the provided credentials. If
 * authentication succeeds, the global `currentUser` is set. If it fails,
 * the function determines whether the username exists and either prompts
 * for account creation or displays an error message.
 *
 * @param {string} username - The username entered by the user.
 * @param {string} password - The password entered by the user.
 *
 * @returns {boolean} True if the login flow completed successfully,
 *                    false if authentication failed due to wrong credentials.
 */
function checkUserLogin(username, password) {
  let localUsers = getLocalUsers();
  const currUser = getUser(username, password, localUsers);
  let loginDone = true;
  if (currUser) {
    currentUser = currUser;
  } else {
    const userExists = getUserNameCount(username, localUsers) > 0;

    if (!userExists) {
      const create = confirm(
        "Utilizador não existe. Pretende criar este utilizador?"
      );
      if (create) {
        saveNewUser(username, password);
        localUsers = getLocalUsers();
        currentUser = getUser(username, password, localUsers);
      }
    } else {
      alert("Wrong Password!");
      loginDone = false;
    }
  }
  return loginDone;
}

//#endregion dbUsersFunctions

//#region dbStoresFunctions
/**
 * @brief Resets the store database to its default state.
 *
 * Initializes the global `dbStores` variable with a predefined set of
 * stores and sales data. This function does not persist the data and
 * should be followed by a call to `saveLocalStoreInfo` if persistence
 * is required.
 * @return {void}
 *
 */
function resetStoreInfo() {
  dbStores = [
    {
      storeid: 1,
      storesales: [
        { ISBN: "0001", salecount: 50 },
        { ISBN: "0002", salecount: 30 },
        { ISBN: "0003", salecount: 20 },
        { ISBN: "0004", salecount: 15 },
        { ISBN: "0005", salecount: 10 },
      ],
    },
  ];
}

/**
 * @brief Loads and validates store data from local storage.
 *
 * Attempts to retrieve and parse the store database from local storage.
 * If the stored data is missing, empty, or invalid, the store database
 * is reset to its default state and persisted.
 *
 * @return {void}
 *
 * @note This function mutates global state and writes to local storage.
 */
function getLocalStoreInfo() {
  let localStore = getLocalItem("stores");
  if (localStore && localStore != "") {
    try {
      dbStores = JSON.parse(localStore);
    } catch {
      console.log("Unable to parse store data");
      resetStoreInfo();
      saveLocalItem("stores", dbStores);
    }
  } else {
    resetStoreInfo();
    saveLocalItem("stores", dbStores);
  }
}
//#endregion dbStoresFunctions
