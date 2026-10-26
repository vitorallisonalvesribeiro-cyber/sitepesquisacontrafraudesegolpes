const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const topBtn = document.getElementById("topBtn");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const opened = navLinks.classList.contains("open");
    menuBtn.textContent = opened ? "×" : "☰";
    menuBtn.setAttribute("aria-expanded", String(opened));
  });
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.textContent = "☰";
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}
if (topBtn) {
  window.addEventListener("scroll", () => topBtn.classList.toggle("show", window.scrollY > 600));
  topBtn.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));
}
const counters = document.querySelectorAll("[data-target]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      const decimals = String(target).includes(".") ? 1 : 0;
      const start = performance.now();
      function update(now) {
        const progress = Math.min((now - start) / 1300, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = prefix + (target * eased).toLocaleString("pt-BR", {
          minimumFractionDigits: decimals, maximumFractionDigits: decimals
        }) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      obs.unobserve(el);
    });
  }, {threshold: 0.35});
  counters.forEach(counter => observer.observe(counter));
} else {
  counters.forEach(el => el.textContent = (el.dataset.prefix || "") + Number(el.dataset.target).toLocaleString("pt-BR") + (el.dataset.suffix || ""));
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) { e.preventDefault(); target.scrollIntoView({behavior:"smooth", block:"start"}); }
  });
});
