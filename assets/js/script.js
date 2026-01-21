'use strict';

/* =====================
   Helper
===================== */
const elementToggleFunc = (elem) => {
  if (elem) elem.classList.toggle("active");
};

/* =====================
   Sidebar (mobile)
===================== */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
}

/* =====================
   Testimonials (SAFE)
===================== */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

if (
  testimonialsItem.length &&
  modalContainer &&
  modalCloseBtn &&
  overlay &&
  modalImg &&
  modalTitle &&
  modalText
) {
  const testimonialsModalFunc = () => {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  testimonialsItem.forEach(item => {
    item.addEventListener("click", () => {
      modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  });

  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}

/* =====================
   Portfolio Filter
===================== */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = (value) => {
  filterItems.forEach(item => {
    if (value === "all" || item.dataset.category === value) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

if (select) {
  select.addEventListener("click", () => elementToggleFunc(select));
}

selectItems.forEach(item => {
  item.addEventListener("click", () => {
    const value = item.innerText.toLowerCase();
    selectValue.innerText = item.innerText;
    elementToggleFunc(select);
    filterFunc(value);
  });
});

let lastClickedBtn = filterBtns[0];
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.innerText.toLowerCase();
    selectValue.innerText = btn.innerText;
    filterFunc(value);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    btn.classList.add("active");
    lastClickedBtn = btn;
  });
});

/* =====================
   Contact Form
===================== */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  formInputs.forEach(input => {
    input.addEventListener("input", () => {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });
}

/* =====================
   Page Navigation - Hash Routing
===================== */

function activatePage(pageName) {
  const pages = document.querySelectorAll("[data-page]");
  const navLinks = document.querySelectorAll("[data-nav-link]");

  pages.forEach(page => {
    page.classList.toggle("active", page.dataset.page === pageName);
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.textContent.toLowerCase().trim() === pageName
    );
  });

  window.scrollTo(0, 0);
}

/* Nav click → update hash */
const navigationLinks = document.querySelectorAll("[data-nav-link]");

navigationLinks.forEach(link => {
  link.addEventListener("click", () => {
    const page = link.textContent.toLowerCase().trim();
    location.hash = page;
  });
});

/* Hash handler */
function handleHashChange() {
  const hash = location.hash.replace("#", "") || "about";
  activatePage(hash);
}

window.addEventListener("load", handleHashChange);
window.addEventListener("hashchange", handleHashChange);


/* =====================
   Skills Carousel Logic
===================== */
const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const badges = document.querySelectorAll(".skill-badge");
const filters = document.querySelectorAll(".skill-filter");

const scrollAmount = 240;
let autoSlide;

/* Carousel buttons */
if (track && prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    track.scrollLeft -= scrollAmount;
  });

  nextBtn.addEventListener("click", () => {
    track.scrollLeft += scrollAmount;
  });
}

/* Auto-slide */
const startAutoSlide = () => {
  autoSlide = setInterval(() => {
    track.scrollLeft += scrollAmount;
  }, 4000);
};

const stopAutoSlide = () => clearInterval(autoSlide);

track.addEventListener("mouseenter", stopAutoSlide);
track.addEventListener("mouseleave", startAutoSlide);
startAutoSlide();

/* Filtering */
filters.forEach(filter => {
  filter.addEventListener("click", () => {
    const category = filter.dataset.skillFilter;

    filters.forEach(btn => btn.classList.remove("active"));
    filter.classList.add("active");

    badges.forEach(badge => {
      badge.style.display =
        category === "all" || badge.dataset.category === category
          ? "block"
          : "none";
    });

    track.scrollLeft = 0;
  });
});

/* =====================
   Mobile Swipe Support
===================== */
let startX = 0;

track.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  stopAutoSlide();
});

track.addEventListener("touchmove", e => {
  const diff = startX - e.touches[0].clientX;
  track.scrollLeft += diff;
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", startAutoSlide);

/* =====================
   Certificate Modal
===================== */
const modal = document.getElementById("certModal");
const modalTitle2 = document.getElementById("certTitle");
const modalFrame = document.getElementById("certFrame");
const modalLink = document.getElementById("certLink");
const modalClose = document.querySelector(".cert-close");
const modalOverlay = document.querySelector(".cert-overlay");

badges.forEach(badge => {
  badge.addEventListener("click", () => {

    const certFile = badge.dataset.cert;
    const externalLink = badge.dataset.certLink;

    modalTitle2.textContent = badge.dataset.title;

    // Always preview local cert if available
    modalFrame.src = certFile || "";

    // Button logic: external link > local cert
    modalLink.href = externalLink || certFile;

    // Safety: disable button if nothing exists
    if (!externalLink && !certFile) {
      modalLink.setAttribute("disabled", true);
    } else {
      modalLink.removeAttribute("disabled");
    }

    modal.classList.add("active");
  });
});

const closeModal = () => {
  modal.classList.remove("active");
  modalFrame.src = "";
};

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

/* =====================
   Portfolio Modal (Deep Link Enabled)
===================== */
const projectItems = document.querySelectorAll("[data-project]");
const projectModal = document.querySelector("[data-project-modal]");
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectCloseBtn = document.querySelector("[data-project-close]");

const projectTitle = document.querySelector("[data-project-title]");
const projectDescription = document.querySelector("[data-project-description]");
const projectRole = document.querySelector("[data-project-role]");
const projectStack = document.querySelector("[data-project-stack]");
const projectDetails = document.querySelector("[data-project-details]");
const projectOutcome = document.querySelector("[data-project-outcome]");
const projectLinkBtn = document.querySelector("[data-project-link]");

const carouselTrack = document.querySelector("[data-project-carousel]");
const prevBtn2 = document.querySelector(".project-carousel .prev");
const nextBtn2 = document.querySelector(".project-carousel .next");

let currentIndex = 0;
let images = [];

/* =====================
   🔶 NEW: Open project by key (for deep links)
===================== */
function openProjectByKey(key) {
  const project = document.querySelector(
    `.project-item[data-key="${key}"]`
  );
  if (!project) return;

  project.click(); // reuse existing click logic
}

/* =====================
   Carousel Update
===================== */
function updateCarousel() {
  const slide = carouselTrack.children[currentIndex];
  if (!slide) return;

  carouselTrack.scrollTo({
    left: slide.offsetLeft,
    behavior: "smooth"
  });
}

/* =====================
   Project Click Handler
===================== */
projectItems.forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    /* 🔶 NEW: Update URL hash on click */
    if (item.dataset.key) {
      location.hash = `project-${item.dataset.key}`;
    }

    // Inject text content
    projectTitle.textContent = item.dataset.title;
    projectDescription.textContent = item.dataset.description;
    projectRole.textContent = item.dataset.role;
    projectStack.textContent = item.dataset.stack;
    projectDetails.textContent = item.dataset.details;
    projectOutcome.textContent = item.dataset.outcome;

    const link = item.dataset.link;

    projectLinkBtn.onclick = () => {
      window.open(link, "_blank");
    };

    // Build carousel from data-images
    carouselTrack.innerHTML = "";
    images = item.dataset.images.split(",");
    currentIndex = 0;

    images.forEach(entry => {
      const [src, caption] = entry.split("|");

      const figure = document.createElement("figure");
      figure.classList.add("carousel-item");

      const img = document.createElement("img");
      img.src = src.trim();
      img.alt = caption?.trim() || item.dataset.title;

      const figcaption = document.createElement("figcaption");
      figcaption.textContent = caption?.trim() || "";

      figure.appendChild(img);
      figure.appendChild(figcaption);
      carouselTrack.appendChild(figure);
    });

    updateCarousel();

    projectModal.classList.add("active");
    projectOverlay.classList.add("active");
  });
});

/* =====================
   Carousel Controls
===================== */
prevBtn2.addEventListener("click", () => {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
  updateCarousel();
});

nextBtn2.addEventListener("click", () => {
  currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
  updateCarousel();
});

/* =====================
   🔶 UPDATED: Close modal restores hash
===================== */
function closeProjectModal() {
  projectModal.classList.remove("active");
  projectOverlay.classList.remove("active");

  /* 🔶 NEW: Restore portfolio hash */
  location.hash = "portfolio";
}

projectCloseBtn.addEventListener("click", closeProjectModal);
projectOverlay.addEventListener("click", closeProjectModal);

/* =====================
   🔶 NEW: Hash-based project opening
===================== */
function handleProjectHash() {
  const hash = location.hash.replace("#", "");

  if (hash.startsWith("project-")) {
    const key = hash.replace("project-", "");
    activatePage("portfolio");
    openProjectByKey(key);
  }
}

/* Run on load + back/forward */
window.addEventListener("load", handleProjectHash);
window.addEventListener("hashchange", handleProjectHash);

