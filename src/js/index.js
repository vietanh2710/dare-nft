/* eslint-disable quotes */
$(document).ready(function () {
  //scoll
  $("a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });

  //handle menu responsive
  $(".hamburger").on("click", function (event) {
    event.preventDefault();
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const backDrop = document.querySelector(".backdrop");

    hamburger.classList.toggle("active");
    backDrop.classList.toggle("active");
    navMenu.classList.toggle("active");

    const navLink = document.querySelectorAll(".nav-link");

    navLink.forEach((n) => n.addEventListener("click", closeMenu));

    function closeMenu() {
      hamburger.classList.remove("active");
      backDrop.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
});
