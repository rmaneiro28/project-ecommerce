import $ from "jquery";

$(document).ready(function () {
  $('.categories .category[category="Todas"]').addClass("active");

  $(".category").click(function () {
    var categoryProduct = $(this).attr("category");
    //Agregando la clase active a la categoria seleccionada
    $(".category").removeClass("active");
    $(this).addClass("active");

    $(".product").hide();
    $(".product[category=" + categoryProduct + "]").show();

  });

  $('.category[category="Todas"]').click(function () {
    $(".product").show();
  });
});

document.addEventListener("keyup", (e) => {
  if (e.target.matches("#search")) {
    if (e.key === "Escape") e.target.value = "";
    document.querySelectorAll(".product").forEach((producto) => {
      producto.textContent.toLowerCase().includes(e.target.value.toLowerCase())
        ? producto.classList.remove("filtro")
        : producto.classList.add("filtro");
    });
  }
});
