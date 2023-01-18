const cartContainer = document.querySelector(".shopping-list");
const cartContainerCart = document.querySelector(".cart-list-head");
const productList = document.querySelector(".productList");
const cartTotalValue = document.querySelector(".total-amount");
const cartTotalValueCartSection = document.querySelector(".total-amount-cart");
const cartTotalValueCartSectionTotal = document.querySelector(
  ".total-amount-cart-section"
);
const countItems = document.querySelector(".count-items");
const tasaDolar = 19;
const cartCountInfo = document.querySelector(".total-items");
let cartItemID = 1;
eventListeners();
function eventListeners() {
  window.addEventListener("DOMContentLoaded", () => {
    loadCart();
    loadCartSection();
  });
}

function updateCartInfo() {
  let cartInfo = findCartInfo();
  cartCountInfo.textContent = cartInfo.productCount;
  cartTotalValue.textContent = `${cartInfo.total}$`;
  // cartTotalValueCartSection.textContent = `${cartInfo.total}$`;
  cartTotalValueCartSectionTotal === null
    ? console.log("No estas en cart section")
    : (cartTotalValueCartSectionTotal.textContent = `${cartInfo.total}$`);
  countItems.textContent = `${cartInfo.productCount} Item`;
  //  cartTotalValue2.textContent = cartInfo.total;
  productsInCart = JSON.parse(localStorage.getItem("products"));
}

if (!productList) {
  console.log("No existe lista de productos");
} else {
  productList.addEventListener("click", purchaseProduct);
}

function purchaseProduct(e) {
  if (e.target.classList.contains("add-to-cart-button")) {
    e.preventDefault();
    let product = e.target.parentElement.parentElement.parentElement;
    getProductInfo(product);
  }
}
function getProductInfo(product) {
  let productInfo = {
    id: cartItemID,
    imgSrc: product.querySelector(".product-image img").src,
    name: product.querySelector(".title a").textContent,
    category: product.querySelector(".category").textContent,
    price: product.querySelector(".price span").textContent,
    /*   cantidad: parseFloat(product.querySelector(".inputCantidad").value).toFixed(
      2
    ), */
    cantidad: 1,
  };
  console.log(productInfo);
  cartItemID++;
  addToCartList(productInfo);
  saveProductInStorage(productInfo);
}

function addToCartList(product) {
  const cartItem = document.createElement("li");
  cartItem.classList.add("singleProduct");
  cartItem.setAttribute("data-id", `${product.id}`);
  cartItem.innerHTML = `
    <a href="javascript:void(0)" class="remove" title="Remove this item"><i class="lni lni-close"></i></a>
    <div class="cart-img-head">
    <a class="cart-img" href="product-details.html"><img src="${
      product.imgSrc
    }" alt="#"></a>
    </div>
    <div class="content">
    <h4><a href="product-details.html">${product.name}</a></h4>
    <p class="quantity">${product.cantidad}x - <span class="amount">$${
    product.price.substr(1) * product.cantidad
  }</span></p></div>
    `;
  cartContainer.appendChild(cartItem);
}

function saveProductInStorage(item) {
  let products = getProductFromStorage();
  products.push(item);
  localStorage.setItem("products", JSON.stringify(products));
  updateCartInfo();
  console.log(products);
}

function getProductFromStorage() {
  return localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
  // returns empty array if there isn't any product info
}

function loadCart() {
  let products = getProductFromStorage();
  if (products.length < 1) {
    cartItemID = 1; // if there is no any product in the local storage
  } else {
    cartItemID = products[products.length - 1].id;
    cartItemID++;
    // else get the id of the last product and increase it by 1
  }
  products.forEach((product) => addToCartList(product));
  // calculate and update UI of cart info
  updateCartInfo();
}

function loadCartSection() {
  let products = getProductFromStorage();
  if (products.length < 1) {
    cartItemID = 1; // if there is no any product in the local storage
  } else {
    cartItemID = products[products.length - 1].id;
    cartItemID++;
    // else get the id of the last product and increase it by 1
  }
  products.forEach((product) => addToCartSection(product));
  // calculate and update UI of cart info
  updateCartInfo();
}

function addToCartSection(product) {
  const cartItem = document.createElement("div");
  cartItem.classList.add("singleProduct");
  cartItem.setAttribute("data-id", `${product.id}`);
  cartItem.innerHTML = `
  <div class="cart-single-list" data-id="${product.id}">
  <div class="row align-items-center">
  <div class="col-lg-1 col-md-1 col-12">
  <a href="product-details.html">
  <img src="${product.imgSrc}"></a>
  </div>
  <div class="col-lg-4 col-md-3 col-12">
  <h5 class="product-name"><a href="product-details.html">${product.name}</a></h5>
  <p class="product-des"><span><em>Categoria:</em> ${product.category}</span></p>
  </div>
  <div class="col-lg-2 col-md-2 col-12">
  <div class="count-input">
  <select class="form-control"><option>${product.cantidad}</option></select></div>
  </div>
  <div class="col-lg-2 col-md-2 col-12"><p>$${product.price}</p></div>
  <div class="col-lg-2 col-md-2 col-12"><p>--</p></div>
  <div class="col-lg-1 col-md-2 col-12"><a class="remove-item" href="javascript:void(0)"><i class="lni lni-close"></i></a></div>
  </div>
  </div>
  
  `;
  cartContainerCart.appendChild(cartItem);
}

function findCartInfo() {
  let products = getProductFromStorage();
  let total = products.reduce((acc, product) => {
    let price = parseFloat(product.price.substr(1)); // removing dollar sign
    let cantidad = parseFloat(product.cantidad).toFixed(2);
    let TotalPrice = (cantidad *= price);
    return (acc += TotalPrice);
  }, 0); // adding all the prices

  return {
    // total2: (total*tasaDolar).toFixed(2),
    total: total.toFixed(2),
    productCount: products.length,
  };
}

cartContainer.addEventListener("click", deleteProduct);
cartContainerCart === null
  ? console.log("No existe el container cart")
  : cartContainerCart.addEventListener("click", deleteProductCartSection);
function deleteProduct(e) {
  let cartItem;
  if (e.target.classList.contains("remove")) {
    cartItem = e.target.parentElement;
  } else if (e.target.tagName === "I") {
    cartItem = e.target.parentElement.parentElement;
  }
  cartItem.remove();
  let products = getProductFromStorage();
  let updatedProducts = products.filter((product) => {
    return product.id !== parseInt(cartItem.dataset.id);
  });
  localStorage.setItem("products", JSON.stringify(updatedProducts)); // updating the product list after the deletion
  updateCartInfo();
}

function deleteProductCartSection(e) {
  let cartItem;
  if (e.target.classList.contains("remove-item")) {
    cartItem = e.target.parentElement.parentElement.parentElement;
  } else if (e.target.tagName === "I") {
    cartItem = e.target.parentElement.parentElement.parentElement.parentElement;
  }
  cartItem.remove();
  let products = getProductFromStorage();
  let updatedProducts = products.filter((product) => {
    return product.id !== parseInt(cartItem.dataset.id);
  });
  localStorage.setItem("products", JSON.stringify(updatedProducts)); // updating the product list after the deletion
  updateCartInfo();
}
