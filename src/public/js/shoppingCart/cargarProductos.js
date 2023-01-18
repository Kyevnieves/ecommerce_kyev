// const productList = document.querySelector(".productList");
/* document.addEventListener("DOMContentLoaded", () => {
  fetch("https://fakestoreapi.com/products?limit=8")
    .then((res) => res.json())
    .then((json) => {
      let html = "";
      json.forEach((product) => {
        html += `
        <div class="col-lg-3 col-md-6 col-12">
                <!-- Start Single Product -->
                <div class="single-product">
                    <div class="product-image">
                        <img class="img-product" src="${product.image}" alt="#">
                        <div class="button">
                            <a href="#" class="btn add-to-cart-button"><i class="lni lni-cart"></i> Add to Cart</a>
                        </div>
                    </div>
                    <div class="product-info">
                        <span class="category">${product.category}</span>
                        <h4 class="title">
                            <a href="/product/${product.id}">${product.title}</a>
                        </h4>
                        <ul class="review">
                            <li><i class="lni lni-star-filled"></i></li>
                            <li><i class="lni lni-star-filled"></i></li>
                            <li><i class="lni lni-star-filled"></i></li>
                            <li><i class="lni lni-star-filled"></i></li>
                            <li><i class="lni lni-star"></i></li>
                            <li><span>${product.rating.count} Review(s)</span></li>
                        </ul>
                        <div class="price">
                            <span>$${product.price}</span>
                        </div>
                    </div>
                </div>
                <!-- End Single Product -->
            </div>
        `;
      });
      productList.innerHTML = html;
    });
});
*/

const imgGallery = document.querySelectorAll(".gallery-img");
const mainImg = document.querySelector(".main-img img");
imgGallery.forEach((img) => {
  img.addEventListener("click", () => {
    mainImg.src = img.src;
  });
});
const input = document.querySelector(".inputBuscar");
const urlBusq = document.querySelector(".urlBusqueda");
input === null
  ? console.log("No estas en shop")
  : input.addEventListener("keyup", (e) => {
      e.preventDefault();
      // console.log(window.location);
      let location = window.location;
      let href = location.href;
      let host = window.location.origin;
      let busqueda = e.target.value;
      let parametro = `${host}/shop?title=${busqueda}`;
      if (href.includes("category")) {
        parametro = `${href}&title=${busqueda}`;
      }
      urlBusq.href = parametro;
      if (e.key === "Enter") {
        e.preventDefault();
        urlBusq.click();
      }
    });
