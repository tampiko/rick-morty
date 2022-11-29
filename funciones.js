let url = {
  base: "https://rickandmortyapi.com/api",
};

let getPersonajesData = (callback) => {
  fetch(`${url.base}/character`)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    });
};

let getLugaresData = (callback) => {
  fetch("https://rickandmortyapi.com/api/location")
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    });
};

let getEpisodiosData = (callback) => {
  fetch("https://rickandmortyapi.com/api/episode")
    .then((response) => response.json())
    .then((data) => callback(data));
};

export { getPersonajesData, getLugaresData, getEpisodiosData };
