// header/navigation START
const headerNav = document.querySelectorAll(".header-nav");
const navLinks = document.querySelectorAll(".nav-link");
const burgerI = document.querySelector(".burger-i");
const burgerMenu = document.querySelector(".header-nav-burger");
const overlay = document.querySelector(".overlay");
const contacts = document.querySelector(".contacts");
const contactsBtn = document.querySelector(".contacts-bttn");
const aboutCont = document.querySelector(".about-container-wrapper");

headerNav.forEach((header) => {
  header.addEventListener("mouseover", (e) => {
    navLinks.forEach((link) => {
      link.style.opacity = e.target.classList.contains("header-nav") ? 1 : 0.5;
    });
    e.target.style.opacity = 1;
  });
});

headerNav.forEach((header) => {
  header.addEventListener("mouseout", (e) => {
    navLinks.forEach((link) => {
      link.style.opacity = 1;
    });
  });
});
headerNav.forEach((header) => {
  header.addEventListener("click", (e) => {
    if (!e.target.classList.contains("nav-link")) return;
    if (e.target.dataset.link === "contacts") {
      overlay.classList.remove("overlay-hidden");
      contacts.classList.remove("overlay-hidden");
      console.log("logic");
    } else {
      const element = document.querySelector(`.${e.target.dataset.link}`);
      element.scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.querySelector(".nav-link-about").addEventListener("click", () => {
  aboutCont.style.transform = "scale(1.06)";
  setTimeout(() => {
    aboutCont.style.transform = "scale(1)";
  }, 200);
});
document.querySelector(".nav-link-about-2").addEventListener("click", () => {
  aboutCont.style.transform = "scale(1.03)";
  setTimeout(() => {
    aboutCont.style.transform = "scale(1)";
  }, 200);
});

overlay.addEventListener("click", () => {
  overlay.classList.add("overlay-hidden");
  contacts.classList.add("overlay-hidden");
});
window.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key === "Escape") {
    overlay.classList.add("overlay-hidden");
    contacts.classList.add("overlay-hidden");
  }
});
contactsBtn.addEventListener("click", () => {
  overlay.classList.add("overlay-hidden");
  contacts.classList.add("overlay-hidden");
});

burgerI.addEventListener("click", () => {
  if (burgerMenu.classList.contains("header-sticky2")) {
    console.log("works");
    burgerMenu.classList.toggle("header-hidden-y");
  } else {
    console.log("works");
    burgerMenu.classList.toggle("header-hidden");
  }
});
// header/navigation END

// SECTION SLIDER START
//
const images = document.querySelectorAll(".project-showcase .img");
const linkArray = [
  "https://amusedave.github.io/diceGame/",
  "https://amusedave.github.io/RockPaperScissorsGame/",
  "https://amusedave.github.io/audioMemoryGame/",
  "https://amusedave.github.io/amazonProject/",
  "https://amusedave.github.io/youTube/",
  "https://amusedave.github.io/facebook/",
];
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    window.open(linkArray[index], "_blank");
  });
});

let currentImg = 0;
const showCaseImages = document.querySelectorAll(".img-showcase");
const totalImages = showCaseImages.length;
const dotCont = document.querySelector(".dots-container");
const names = document.querySelectorAll(".name");

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
function changeText() {
  names.forEach((name) => {
    name.classList.add("hidden-text");
  });
  document.querySelector(`.name-${currentImg}`).classList.remove("hidden-text");
}

function slideLogic() {
  if (currentImg === totalImages) currentImg = 0;
  if (currentImg === -1) currentImg = totalImages - 1;
  transform();
  activateDot();
  changeText();
}

function slide(e) {
  console.log(currentImg);
  currentImg += e.target.classList.contains("arrow-right") ? 1 : -1;
  slideLogic();
}
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    currentImg--;
  } else if (e.key === "ArrowRight") {
    currentImg++;
  }
  slideLogic();
});

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

const sectionObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section-hidden");
    observer.unobserve(entry.target);
  },
  { threshold: 0.2 }
);

const sections = document.querySelectorAll("section");
sections.forEach((section) => {
  section.classList.add("section-hidden");
  sectionObserver.observe(section);
});
// Intersection Observer for header sticky
const header = document.querySelector(".header");
const burgerSticky = document.querySelector(".header-nav-burger");
const uniqueLink = document.querySelectorAll(".project-link");

const page = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      burgerMenu.classList.add("header-hidden");
      burgerMenu.classList.remove("header-hidden-y");
      burgerMenu.classList.remove("header-transition");
      setTimeout(() => {
        burgerMenu.classList.add("header-transition2");
      }, 300);
    } else if (!entry.isIntersecting) {
      burgerMenu.classList.remove("header-hidden");
      burgerMenu.classList.add("header-hidden-y");
      burgerMenu.classList.remove("header-transition2");
      setTimeout(() => {
        burgerMenu.classList.add("header-transition");
      }, 300);
    }
    header.classList.toggle("header-sticky", !entry.isIntersecting);
    burgerSticky.classList.toggle("header-sticky2", !entry.isIntersecting);
    uniqueLink.forEach((link) => {
      link.classList.toggle("hidden-link", entry.isIntersecting);
    });
  },
  { threshold: 0.6 }
);
page.observe(document.querySelector(".projects"));

//Scroll feature for appering END

//
// SECTION ABOUT START

let textId = 0;
const buttons = document.querySelectorAll(".button");
const texts = document.querySelectorAll(`.text`);

function showButton() {
  buttons.forEach((button) => {
    button.classList.remove("btn-active");
  });
  document.querySelector(`.btn-${textId}`).classList.add("btn-active");
}

function showText() {
  texts.forEach((text) => text.classList.add("hidden"));
  document.querySelector(`.text-${textId}`).classList.remove("hidden");
}
showButton();
showText();
document.querySelector(".about-me-buttons").addEventListener("click", (e) => {
  if (!e.target.classList.contains("button")) return;

  e.target.classList.add("btn-active");
  textId = Number(e.target.dataset.id);
  showText();
  showButton();
});
