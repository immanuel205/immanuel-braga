document.getElementById("year").textContent = new Date().getFullYear();

const typewriterLines = [...document.querySelectorAll("[data-typewriter]")];

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

  async function typeLine(line) {
    const text = line.dataset.typewriter;
    line.textContent = "";
    line.classList.add("is-typing");

    for (const character of text) {
      line.textContent += character;
      await wait(38);
    }

    line.classList.remove("is-typing");
    await wait(220);
  }

  (async () => {
    for (const line of typewriterLines) {
      await typeLine(line);
    }
  })();
}

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const themeLabel = themeToggle.querySelector(".theme-label");
const themeColor = document.querySelector('meta[name="theme-color"]');

function setTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-label", isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap");
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeLabel.textContent = isDark ? "Mode Terang" : "Mode Gelap";
  themeColor.content = isDark ? "#121a15" : "#f7f8f3";
}

const savedTheme = localStorage.getItem("portfolio-theme");
setTheme(savedTheme === "dark" ? "dark" : "light");

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  localStorage.setItem("portfolio-theme", nextTheme);
});

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Buka menu" : "Tutup menu");
  navMenu.classList.toggle("show", !isExpanded);
});

document.querySelectorAll("#navMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu");
  });
});

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();

  formMessage.textContent = `Terima kasih, ${name}! Ini hanya demo, pesan Anda belum dikirim.`;
  contactForm.reset();
});
