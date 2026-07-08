// ===== Copy contract address =====
const copyBtn = document.getElementById("copyBtn");
const contractAddress = document.getElementById("contractAddress");

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  ta.remove();
  return ok;
}

if (copyBtn && contractAddress) {
  copyBtn.addEventListener("click", async () => {
    const text = contractAddress.textContent.trim();
    let copied = false;
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      copied = fallbackCopy(text);
    }
    copyBtn.textContent = copied ? "COPIED!" : "ERROR";
    setTimeout(() => (copyBtn.textContent = "COPY"), 1800);
  });
}

// ===== Mobile hamburger menu =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ===== Navbar shadow on scroll =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 10);
});

// ===== Scroll reveal =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===== "Coming soon" toast for Telegram =====
let toastTimer;
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.querySelectorAll(".tg-soon").forEach((link) =>
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showToast("Telegram — Coming soon! 🐾");
  })
);
