let url = {
  base: "https://rickandmortyapi.com/api",
};

function getData(tipo, page = 1) {
  console.log(`getData => ${tipo} | page => ${page}`);
  // tipo => character || location || episode
  let pagina;
  page != 1 ? (pagina = `?page=${page}`) : (pagina = "");
  return fetch(`${url.base}/${tipo}${pagina}`)
    .then((response) => response.json())
    .then((data) => data);
}

const limpiaDiv = () => {
  let bs = document.querySelector("#lista");
  bs.innerHTML = "";
};

const creaBotones = (info) => {
  console.log(info);
  // count: 826
  // next: "https://rickandmortyapi.com/api/character?page=2"
  // pages: 42
  // prev: null

  // Busca Siguiente Pagina
  console.log(info.next);
  let posicionPagina = 0;
  let siguientePagina = 0;
  if (info.next) {
    console.log("entro");
    posicionPagina = info.next.indexOf("?");
    siguientePagina = info.next.substring(posicionPagina + 6);
  }

  // Busca Tipo
  let posicionTipo = info.next.indexOf("api/") + 4;
  let tipo = info.next.substring(posicionTipo, posicionPagina);

  let bs = document.querySelector("#divBotones");
  // paginaAnterior

  // ultimaPagina

  // Boton Inicio
  let btnInicio = document.createElement("button");
  btnInicio.className = "btn btn-primary";
  btnInicio.innerHTML = `&leftarrowtail; Inicio`;
  btnInicio.onclick = function () {
    getData(tipo, 1);
  };

  // Boton Anterior
  let btnAnterior = document.createElement("button");
  btnAnterior.className = "btn btn-outline-primary";
  btnAnterior.innerHTML = `&leftarrow; Anterior`;
  // btnAnterior.onclick = function(){getData(tipo,paginaAnterior)}

  let Label = document.createElement("span");
  Label.className = "ms-2 me-2";
  Label.innerHTML = `Pagina 2 (Mostrando 15 al 30 de ${info.count})`;

  // Boton Siguiente
  let btnSiguiente = document.createElement("button");
  btnSiguiente.className = "btn btn-outline-primary";
  btnSiguiente.innerHTML = "Siguiente &rightarrow;";
  btnSiguiente.onclick = function () {
    generaPagina(tipo, siguientePagina);
  };

  // Boton Final
  let btnFinal = document.createElement("button");
  btnFinal.className = "btn btn-primary";
  btnFinal.innerHTML = "Final &rightarrowtail;";
  btnFinal.onclick = function () {
    generaPagina(tipo, info.pages);
  };
  bs.innerHTML = "";
  bs.appendChild(btnInicio);
  bs.appendChild(btnAnterior);
  bs.appendChild(Label);
  bs.appendChild(btnSiguiente);
  bs.appendChild(btnFinal);
};

function hola(nombre) {
  console.log("hola ", nombre);
}

const generaPagina = (tipo, page = 1) => {
  getData(tipo, page).then((data) => {
    limpiaDiv();
    data.results.forEach((personaje) => {
      creaPersonajeCard(personaje);
    });
    creaBotones(data.info);
  });
};
const creaPersonajeCard = (personaje) => {
  let div = document.createElement("div");
  div.className = "col";
  let codigo = `
    <div class="card">
      <img src="${personaje.image}" class="card-img-top" alt="${personaje.name}">
      <div class="card-body">
        <h5 class="card-title">${personaje.name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
    `;
  div.innerHTML = codigo;
  let bs = document.querySelector("#lista");
  bs.appendChild(div);
};
export { generaPagina };
