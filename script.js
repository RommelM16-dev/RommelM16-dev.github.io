const typingElement = document.getElementById("typingText");

const phrases = [
  "Full Stack Developer",
  "Java + Angular Engineer",
  "SCADA / EMS Integrator",
  "Backend · Frontend · Data",
  "Building secure digital systems"
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typingElement) return;

  const currentPhrase = phrases[phraseIndex];

  if (!deleting) {
    typingElement.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1300);
      return;
    }
  } else {
    typingElement.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, deleting ? 45 : 75);
}

typeLoop();

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.14 });

reveals.forEach((element) => observer.observe(element));

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
});

const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (event) => {
  if (!cursorGlow) return;

  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

const canvas = document.getElementById("matrixCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

let columns = [];
const chars = "01{}[]<>/\\#$%&ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function resizeCanvas() {
  if (!canvas || !ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const columnCount = Math.floor(canvas.width / 22);
  columns = Array.from({ length: columnCount }, () => Math.random() * canvas.height);
}

function drawMatrix() {
  if (!canvas || !ctx) return;

  ctx.fillStyle = "rgba(2, 6, 23, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(57, 255, 20, 0.55)";
  ctx.font = "14px JetBrains Mono";

  columns.forEach((y, index) => {
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    const x = index * 22;

    ctx.fillText(text, x, y);

    if (y > canvas.height + Math.random() * 900) {
      columns[index] = 0;
    } else {
      columns[index] = y + 18;
    }
  });

  requestAnimationFrame(drawMatrix);
}

if (canvas && ctx) {
  resizeCanvas();
  drawMatrix();
  window.addEventListener("resize", resizeCanvas);
}

const easterEggBtn = document.getElementById("easterEggBtn");
const easterEggText = document.getElementById("easterEggText");

if (easterEggBtn && easterEggText) {
  easterEggBtn.addEventListener("click", () => {
    easterEggText.textContent = "ACCESS GRANTED: Reclutador detectado. Ejecutando modo profesional...";
  });
}
