'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalCompany = document.querySelector("[data-modal-company]");
const modalDate = document.querySelector("[data-modal-date]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    const imgSrc = this.querySelector("[data-testimonials-avatar]").src;
    const title = this.querySelector("[data-testimonials-title]").textContent;
    const company = this.dataset.company;
    const date = this.dataset.date;
    const text = this.querySelector("[data-testimonials-text]").innerHTML;

    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modalCompany.textContent = company;
    modalDate.textContent = date;
    modalText.innerHTML = text;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    const categories = filterItems[i].dataset.category.toLowerCase().split(", ");
    if (selectedValue === "all" || categories.includes(selectedValue)) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// portfolio modal variables
const portfolioItems = document.querySelectorAll("[data-filter-item]");
const portfolioModalContainer = document.getElementById("portfolio-modal");
const portfolioModalCloseBtn = document.getElementById("portfolio-modal-close-btn");
const portfolioOverlay = document.getElementById("portfolio-overlay");

// modal variable
const portfolioModalImg = document.getElementById("portfolio-modal-img");
const portfolioModalTitle = document.getElementById("portfolio-modal-title");
const portfolioModalCategory = document.getElementById("portfolio-modal-category");
const portfolioModalTools = document.getElementById("portfolio-modal-tools");
const portfolioModalDescription = document.getElementById("portfolio-modal-description");
const portfolioModalViewBtn = document.getElementById("portfolio-modal-view-btn");

// modal toggle function
const portfolioModalFunc = function () {
  portfolioModalContainer.classList.toggle("active");
  portfolioOverlay.classList.toggle("active");
}

// add click event to all portfolio items
portfolioItems.forEach(item => {
  item.addEventListener("click", function () {
    portfolioModalImg.src = this.querySelector("img").src;
    portfolioModalImg.alt = this.querySelector("img").alt;
    portfolioModalTitle.innerHTML = this.querySelector(".project-title").innerHTML;
    portfolioModalCategory.innerHTML = this.querySelector(".project-category").innerHTML;
    portfolioModalTools.innerHTML = this.dataset.tools || "No tools specified.";
    portfolioModalDescription.innerHTML = this.dataset.description || "No additional description available.";
    portfolioModalViewBtn.href = this.dataset.link || "#";
    portfolioModalFunc();
  });
});

// add click event to modal close button and overlay
portfolioModalCloseBtn.addEventListener("click", portfolioModalFunc);
portfolioOverlay.addEventListener("click", portfolioModalFunc);