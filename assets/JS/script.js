const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NWNjMDc5YzQ1ZjAwMTU2OWI0YmIiLCJpYXQiOjE3Mjc0MjE2MzIsImV4cCI6MTcyODYzMTIzMn0.VQGAWIQJo1zqRq41TwLc2TanfTjipD3RmbruAXxcuFg";
const prodContainer = document.getElementById("products-container");
const modalButton = document.querySelector("#staticBackdrop .modal-footer button:last-of-type");

window.onload = function () {
  getProducts();
};

async function getProducts() {
  const loadingElement = document.querySelector(".loading");
  loadingElement.style.display = "block";
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/`, {
      headers: { Authorization: "Bearer " + apiKey },
    });

    if (!response.ok) {
      throw new Error(`HTTP error ! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    prodContainer.innerHTML = "";
    data.forEach((element) => {
      const card = document.createElement("div");
      card.className = "col";
      card.innerHTML = ` <div class="card mb-4 shadow-sm">
            <div class="text-center p-1" id="contImg">
            <img src="${element.imageUrl}" class="bd-placeholder-img card-img-top h-100 object-fit-cover " data-id="${element._id}"/>
            </div>
            <div class="card-body">
              <h5 class="card-title">${element.name}</h5>
              <p class="card-text">${element.price}€</p>
              <div class="d-flex justify-content-between align-items-center"> 
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary view-btn" data-id="${element._id}" data-src="${element.imageUrl}"  data-alt="${element.name}">Edit</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary hide-btn" data-id="${element._id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Delete</button>
                </div>
              </div>
            </div>
          </div>`;
      prodContainer.appendChild(card);
    });

    const deletes = document.querySelectorAll(".btn-group button:last-of-type");
    const edites = document.querySelectorAll(".btn-group button:first-of-type");
    const images = document.querySelectorAll(".card img");

    deletes.forEach((d) => {
      d.addEventListener("click", function () {
        const id = d.dataset.id;
        modalButton.addEventListener("click", async function () {
          await deleteProduct(id);
          getProducts();
        });
      });
    });

    edites.forEach((e) => {
      e.addEventListener("click", async function () {
        const id = e.dataset.id;
        location.assign(`./backoffice.html?cardId=${id}`);
      });
    });

    images.forEach((i) => {
      i.addEventListener("click", async function () {
        const id = i.dataset.id;
        location.assign(`./details.html?imgId=${id}`);
      });
    });
  } catch (err) {
    console.log(err);
  } finally {
    loadingElement.style.display = "none";
  }
}

async function deleteProduct(id) {
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + apiKey,
      },
    });
    if (response.ok) {
      console.log("La rimozione è andata a buon fine!");
    } else {
      throw new Error("Risposta non andata a buon fine!");
    }
  } catch (err) {
    console.log(err);
  }
}
