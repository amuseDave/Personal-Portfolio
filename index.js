// header/navigation START
const headerNav = document.querySelector(".header-nav");
const navLinks = document.querySelectorAll(".nav-link");

headerNav.addEventListener("mouseover", (e) => {
  navLinks.forEach((link) => {
    link.style.opacity = e.target.classList.contains("header-nav") ? 1 : 0.5;
  });
  e.target.style.opacity = 1;
});

headerNav.addEventListener("mouseout", (e) => {
  navLinks.forEach((link) => {
    link.style.opacity = 1;
  });
});
headerNav.addEventListener("click", (e) => {
  if (!e.target.classList.contains("nav-link")) return;
  const element = document.querySelector(`.${e.target.dataset.link}`);
  element.scrollIntoView({ behavior: "smooth" });
});
// header/navigation END

// SECTION SLIDER START
//
let currentImg = 0;
const showCaseImages = document.querySelectorAll(".img-showcase");
const totalImages = showCaseImages.length;
const dotCont = document.querySelector(".dots-container");

function createDots() {
  showCaseImages.forEach((img, i) => {
    dotCont.insertAdjacentHTML(
      "beforeend",
      `<button class="dot dot-${i}" data-dot=${i}>`
    );
  });
  activateDot();
}
function activateDot() {
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("dot-active", i === currentImg);
  });
}

function transform() {
  showCaseImages.forEach((img, i) => {
    img.style.transform = `translateX(-${100 * currentImg}%)`;
  });
}

function slide(e) {
  console.log(currentImg);
  currentImg += e.target.classList.contains("arrow-right") ? 1 : -1;
  if (currentImg === totalImages) currentImg = 0;
  if (currentImg === -1) currentImg = totalImages - 1;
  transform();
  activateDot();
}

document.querySelector(".dots-container").addEventListener("click", (e) => {
  if (!e.target.classList.contains("dot")) return;
  currentImg = Number(e.target.dataset.dot);
  transform();
  activateDot();
});
document.querySelector(".arrow-left").addEventListener("click", slide);

document.querySelector(".arrow-right").addEventListener("click", slide);
createDots();
transform();
//SECTION SLIDER END

//Scroll feature for appering START
// Intersection Observer for about section
const about = document.querySelector(".about-container");
about.classList.add("section-hidden");
const section = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    about.classList.remove("section-hidden");
    observer.unobserve(entry.target);
  },
  { threshold: 0.3 }
);
section.observe(about);

// Intersection Observer for header sticky
const header = document.querySelector(".header");
const page = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    header.classList.toggle("header-sticky", !entry.isIntersecting);
  },
  { threshold: 0.6 }
);
page.observe(document.querySelector(".projects"));

//Scroll feature for appering END

//
// SECTION ABOUT START

let click = 0;
const buttons = document.querySelectorAll(".button");
buttons[click].classList.add("btn-active");

document.querySelector(".about-me-buttons").addEventListener("click", (e) => {
  if (!e.target.classList.contains("button")) return;
  buttons.forEach((button) => {
    button.classList.remove("btn-active");
  });
  e.target.classList.add("btn-active");
});
