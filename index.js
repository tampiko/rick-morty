console.log("Index.js Loaded");
import {
  getPersonajesData,
  getEpisodiosData,
  getLugaresData,
} from "./funciones.js";

let personajes = getPersonajesData((data) => {
  data.results.forEach((personaje) => {
    console.log(personaje);
    creaCard(personaje);
  });
});

let lugares = getLugaresData((data) => {
  console.log(data);
});

let episodios = getEpisodiosData((data) => {
  console.log(data);
});

const creaCard = (personaje) => {
  let li = document.createElement("li");
  li.className = "list-group-item";
  li.innerHTML = `<img src='${personaje.image}' class='fotoMini'> ${personaje.name}`;
  let bs = document.querySelector("#lista");
  bs.appendChild(li);
};
