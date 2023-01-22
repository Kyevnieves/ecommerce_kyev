(function () {
  window.onload = function () {
    window.setTimeout(fadeout, 500);
  };

  function fadeout() {
    document.querySelector(".preloader").style.opacity = "0";
    document.querySelector(".preloader").style.display = "none";
  }
  window.onscroll = function () {
    var header_navbar = document.querySelector(".navbar-area");
    var sticky = header_navbar.offsetTop;

    // show or hide the back-top-top button
    var backToTo = document.querySelector(".scroll-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTo.style.display = "flex";
    } else {
      backToTo.style.display = "none";
    }
  };
  let navbarToggler = document.querySelector(".mobile-menu-btn");
  navbarToggler.addEventListener("click", function () {
    navbarToggler.classList.toggle("active");
  });
})();

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

const inputRange = document.querySelector(".form-range");
inputRange.addEventListener("change", (e) => {
  let valorBuscado = e.target.value;
  if (window.location.href.includes("price")) {
    window.location.href =
      window.location.origin + `/shop?price=${valorBuscado}`;
  } else {
    window.location.href = window.location.href + `&price=${valorBuscado}`;
  }
});
