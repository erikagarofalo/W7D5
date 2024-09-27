const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NWNjMDc5YzQ1ZjAwMTU2OWI0YmIiLCJpYXQiOjE3Mjc0MjE2MzIsImV4cCI6MTcyODYzMTIzMn0.VQGAWIQJo1zqRq41TwLc2TanfTjipD3RmbruAXxcuFg";
const barParameter = new URLSearchParams(location.search).get("imgId");
const dettaglio = document.querySelector(".container-fluid .row");

window.onload = function () {
  getProduct();
};

async function getProduct() {
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${barParameter}`, {
      headers: { Authorization: "Bearer " + apiKey },
    });

    if (!response.ok) {
      throw new Error(`HTTP error ! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    dettaglio.innerHTML += `<div class="col-12 ">
                <h1 class="fw-bold text-center mb-0" id="name">${data.name}</h1>
            </div>
            <div class="col-12 text-center p-5 " id="dettaglio">
                <img src="${data.imageUrl}"
                    alt="ciao" class="w-100" id="image">
            </div>
            <div class="col-12 p-5 pt-0">
                <div class="row align-items-center container d-flex justify-content-between">
                    <div class="col-12 col-md-4 justify-content-center d-flex">
                        <p id="description" class="text-success fw-bolder fs-3">Descrizione: <br><span class="fs-5 fw-medium">${data.description}</span></p>
                    </div>
                    <div class="col-12 col-md-4 justify-content-center d-flex">
                        <p class=" text-warning fs-3 fw-bold" id="brand">Artista:<br> <span class="fs-5 fw-medium">${data.brand}</span></p>
                    </div>
                    <div class="col-12 col-md-4 justify-content-center d-flex">
                        <p class="text-danger fs-3 fw-bolder" id="price">Prezzo:<br> <span class="fs-5 fw-medium">${data.price}€</span></p>
                    </div>
                </div>
            </div>`;
  } catch (err) {
    console.log(err);
  }
}
