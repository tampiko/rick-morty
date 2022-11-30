let url = {
  base: "https://rickandmortyapi.com/api",
};

function getData(tipo, page = 1) {
  console.log(`getData => ${tipo} | page => ${page}`);
  // tipo => character || location || episode
  let pagina;
  page != 1 ? (pagina = `?page=${page}`) : (pagina = ``);
  console.log(`Url => ${url.base}/${tipo}${pagina}`);
  return fetch(`${url.base}/${tipo}${pagina}`)
    .then((response) => response.json())
    .then((data) => data);
}

const limpiaDiv = () => {
  let bs = document.querySelector("#lista");
  bs.innerHTML = "";
};

const creaBotones = (info) => {
  console.log(`Crea botones`);
  console.table(info);
  let bs = document.querySelector("#divBotones");
  bs.innerHTML = "";
  let posicionPagina = 0;
  let siguientePagina = 0;
  let paginaAnterior = 1;
  let posicionTipo;
  let tipo = "";

  info.next
    ? (posicionPagina = info.next.indexOf("?"))
    : (posicionPagina = info.prev.indexOf("?"));

  // Busca Tipo
  if (info.next) {
    console.log("tiene next");
    posicionTipo = info.next.indexOf("api/") + 4;
    tipo = info.next.substring(posicionTipo, posicionPagina);
    siguientePagina = info.next.substring(posicionPagina + 6);
    console.log(`== siguientePagina == > ${siguientePagina}`);
  } else {
    console.log("tiene prev");
    posicionTipo = info.prev.indexOf("api/") + 4;
    tipo = info.prev.substring(posicionTipo, posicionPagina);
    paginaAnterior = info.prev.substring(posicionPagina + 6);
    console.log(`== paginaAnterior == > ${paginaAnterior}`);
  }

  // Boton Inicio
  if (info.prev) {
    let btnInicio = document.createElement("button");
    btnInicio.className = "btn btn-primary";
    btnInicio.innerHTML = `&leftarrowtail; Inicio`;
    btnInicio.onclick = function () {
      getData(tipo);
    };
    bs.appendChild(btnInicio);
  }

  // Boton Anterior
  if (info.prev) {
    let btnAnterior = document.createElement("button");
    btnAnterior.className = "btn btn-outline-primary";
    btnAnterior.innerHTML = `&leftarrow; Anterior`;
    btnAnterior.onclick = function () {
      getData(tipo, paginaAnterior);
    };
    bs.appendChild(btnAnterior);
  }

  // Pagina Actual
  let paginaActual = siguientePagina - 1;
  console.log(`paginaActual => ${paginaActual}`);
  let mostrandoInicio = (paginaActual - 1) * 20 + 1;
  let mostrandoFin = mostrandoInicio + 19;

  let Label = document.createElement("span");
  Label.className = "ms-2 me-2";
  Label.innerHTML = `Pagina ${paginaActual} (Mostrando del ${mostrandoInicio} al ${mostrandoFin} de ${info.count})`;
  bs.appendChild(Label);

  // Boton Siguiente
  if (info.next) {
    let btnSiguiente = document.createElement("button");
    btnSiguiente.className = "btn btn-outline-primary";
    btnSiguiente.innerHTML = "Siguiente &rightarrow;";
    btnSiguiente.onclick = function () {
      generaPagina(tipo, siguientePagina);
    };
    bs.appendChild(btnSiguiente);
  }

  // Boton Final
  if (info.next) {
    let btnFinal = document.createElement("button");
    btnFinal.className = "btn btn-primary";
    btnFinal.innerHTML = "Final &rightarrowtail;";
    btnFinal.onclick = function () {
      generaPagina(tipo, info.pages);
    };
    bs.appendChild(btnFinal);
  }
};

function hola(nombre) {
  console.log("hola ", nombre);
}

const generaPagina = (tipo, page) => {
  console.log(`tipo => ${tipo}`);
  console.log(`page => ${page}`);
  if (!page) {
    page = 1;
  }
  getData(tipo, page).then((data) => {
    console.log(`data => ${data}`);
    limpiaDiv();
    data.results.forEach((personaje) => {
      creaPersonajeCard(personaje);
    });
    console.log(`manda crear botones`);
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
