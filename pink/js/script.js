"use strict";

var mainNav = document.querySelector(".main-nav");
var mainButton = document.querySelector(".main-nav__toggle");

mainNav.classList.remove("main-nav--nojs");

  var onToggleHeandler = function (e) {
    if (!mainNav.classList.contains("main-nav--opend")) {
      mainNav.className = "main-nav " + "main-nav--opend";
    } else {
      mainNav.className = "main-nav " + "main-nav--closed";
    }
  };

mainButton.addEventListener("click", onToggleHeandler);
