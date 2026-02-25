const STORAGE_KEY = "family-landing-language";
const THEME_STORAGE_KEY = "family-landing-theme";

function getCurrentTheme() {
  return document.documentElement.getAttribute("data-theme") || "light";
}

function applyLanguage(lang) {
  const theme = getCurrentTheme();
  const dictionary = TRANSLATIONS[theme]?.[lang] || TRANSLATIONS.light[lang];
  if (!dictionary) return;

  document.documentElement.lang = lang;

  const elements = document.querySelectorAll("[data-i18n-key]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n-key");
    const value = dictionary[key];
    if (typeof value === "string") {
      el.textContent = value;
    }
  });

  const toggleButtons = document.querySelectorAll(
    ".language-toggle__btn[data-lang]"
  );
  toggleButtons.forEach((btn) => {
    const isActive = btn.getAttribute("data-lang") === lang;
    btn.classList.toggle("language-toggle__btn--active", isActive);
  });
}

function getCurrentLanguage() {
  return document.documentElement.lang || "es";
}

function reapplyTexts() {
  applyLanguage(getCurrentLanguage());
}

function setupScrollAnimations() {
  const animated = document.querySelectorAll("[data-animate]");
  if (!animated.length) return;

  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || prefersReduced) {
    animated.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  animated.forEach((el) => observer.observe(el));
}

const VALID_LANGS = ["es", "en", "be"];

function getInitialLanguage() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && VALID_LANGS.includes(stored)) {
    return stored;
  }

  const browserLang = navigator.language || navigator.userLanguage || "es";
  if (browserLang.toLowerCase().startsWith("es")) return "es";
  if (browserLang.toLowerCase().startsWith("en")) return "en";

  return "es";
}

function handleLanguageToggleClick(event) {
  const button = event.target.closest(".language-toggle__btn[data-lang]");
  if (!button) return;

  const lang = button.getAttribute("data-lang");
  if (!lang || !VALID_LANGS.includes(lang)) return;

  window.localStorage.setItem(STORAGE_KEY, lang);
  applyLanguage(lang);
}

function getInitialTheme() {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  reapplyTexts();
}

function handleThemeToggle() {
  const current = getCurrentTheme();
  applyTheme(current === "dark" ? "light" : "dark");
}

/* ── Easter egg: Console message ── */

function printConsoleEasterEgg() {
  console.log(
    "%c" +
      "╔═══════════════════════════════════════╗\n" +
      "║       D & S · Valencia Edition        ║\n" +
      "╚═══════════════════════════════════════╝",
    "color: #3b82f6; font-size: 14px; font-weight: bold; font-family: monospace;"
  );
  console.log(
    "%cКалі ты гэта чытаеш — ты дакладна з tech.\nМы таксама. Так што давай без фармальнасцяў.\n\nЗдай нам кватэру, і мы абяцаем:\n• Плаціць своечасова\n• Не ламаць нічога\n• Не адкрываць гэты код у production\n\nP.S. Паспрабуй тройны клік па нашым імені ў хедэры.\nP.P.S. Набяры «piso» на клавіятуры.",
    "color: #94a3b8; font-size: 12px; line-height: 1.6; font-family: monospace;"
  );
}

/* ── Easter egg: Triple-click brand → Belarusian ── */

function setupBrandEasterEgg() {
  const brand = document.querySelector(".brand-text");
  if (!brand) return;

  let clickCount = 0;
  let clickTimer = null;

  brand.addEventListener("click", () => {
    clickCount++;
    clearTimeout(clickTimer);

    if (clickCount >= 3) {
      clickCount = 0;
      const currentLang = getCurrentLanguage();
      if (currentLang === "be") {
        window.localStorage.setItem(STORAGE_KEY, "es");
        applyLanguage("es");
      } else {
        window.localStorage.setItem(STORAGE_KEY, "be");
        applyLanguage("be");
      }
    } else {
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 500);
    }
  });
}

/* ── Easter egg: Tab visibility — title change ── */

function setupTabEasterEgg() {
  const originalTitle = document.title;
  let returned = false;

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      document.title = "Vuelve! Aún no tenemos piso...";
      returned = false;
    } else if (!returned) {
      document.title = "¡Has vuelto! ❤";
      returned = true;
      setTimeout(() => {
        document.title = originalTitle;
      }, 2000);
    }
  });
}

/* ── Easter egg: Night footer (00:00–06:00) ── */

function applyNightFooter() {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 6) {
    const footer = document.querySelector(".footer-text");
    if (!footer) return;
    const lang = getCurrentLanguage();
    const nightTexts = {
      es: "Denis & Svetlana · Son las " + hour + " de la mañana y no hacemos ruido. Solo CSS.",
      en: "Denis & Svetlana · It's " + hour + " a.m. and we're not making noise. Just CSS.",
      be: "Дзяніс & Святлана · Зараз " + hour + " ночы, а мы ціха праўім CSS.",
    };
    footer.textContent = nightTexts[lang] || nightTexts.es;
  }
}

function triggerMatrixRain() {
  const overlay = document.getElementById("konamiOverlay");
  const banner = document.getElementById("konamiBanner");
  const canvas = document.getElementById("matrixCanvas");
  if (!overlay || !canvas || !banner) return;

  overlay.classList.add("is-active");
  banner.classList.add("is-active");

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);
  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01";

  let frames = 0;
  const maxFrames = 120;

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff41";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    frames++;
    if (frames < maxFrames) {
      requestAnimationFrame(draw);
    } else {
      overlay.classList.remove("is-active");
      banner.classList.remove("is-active");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  draw();
}

/* ── Easter egg: Long hover on main photo → tooltip ── */

function setupPhotoTooltip() {
  const photo = document.querySelector(".photo-placeholder--main");
  const heroMedia = document.querySelector(".hero-media");
  if (!photo || !heroMedia) return;

  const tooltip = document.createElement("span");
  tooltip.className = "photo-tooltip";
  heroMedia.appendChild(tooltip);

  const texts = {
    es: "Sí, somos reales. No, no es IA. Sí, también sonreímos en persona.",
    en: "Yes, we're real. No, it's not AI. Yes, we smile in person too.",
    be: "Так, мы сапраўдныя. Не, гэта не нейрасетка. Так, ужывую таксама ўсміхаемся.",
  };

  let hoverTimer = null;

  photo.addEventListener("mouseenter", () => {
    hoverTimer = setTimeout(() => {
      tooltip.textContent = texts[getCurrentLanguage()] || texts.es;
      tooltip.classList.add("is-visible");
    }, 4000);
  });

  photo.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimer);
    tooltip.classList.remove("is-visible");
  });
}

/* ── Easter eggs: Konami Code + Secret word "piso" (single keydown listener) ── */

function setupKeyboardEasterEggs() {
  const konamiSequence = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "KeyB", "KeyA",
  ];
  let konamiPos = 0;

  const secretWord = "piso";
  let wordBuffer = "";

  document.addEventListener("keydown", (e) => {
    if (e.code === konamiSequence[konamiPos]) {
      konamiPos++;
      if (konamiPos === konamiSequence.length) {
        konamiPos = 0;
        triggerMatrixRain();
      }
    } else {
      konamiPos = 0;
    }

    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    wordBuffer += e.key.toLowerCase();
    if (wordBuffer.length > 20) wordBuffer = wordBuffer.slice(-20);
    if (wordBuffer.endsWith(secretWord)) {
      wordBuffer = "";
      triggerConfetti();
    }
  });
}

function triggerConfetti() {
  const colors = ["#ce1720", "#ffffff", "#3b82f6", "#f59e0b", "#10b981", "#8b5cf6"];
  const count = 60;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.top = "-10px";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.6 + "s";
    piece.style.animationDuration = 1.2 + Math.random() * 1.2 + "s";
    piece.style.width = 6 + Math.random() * 6 + "px";
    piece.style.height = 6 + Math.random() * 6 + "px";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3000);
  }

  const banner = document.getElementById("confettiBanner");
  if (banner) {
    const msgs = {
      es: "¡Has escrito «piso»! Ahora solo falta que nos lo alquiles.",
      en: "You typed «piso»! Now just rent it to us.",
      be: "Ты набраў «piso»! Засталося толькі здаць нам кватэру.",
    };
    banner.textContent = msgs[getCurrentLanguage()] || msgs.es;
    banner.classList.add("is-active");
    setTimeout(() => banner.classList.remove("is-active"), 3000);
  }
}

/* ── Init ── */

document.addEventListener("DOMContentLoaded", () => {
  printConsoleEasterEgg();

  applyTheme(getInitialTheme());

  const initialLang = getInitialLanguage();
  applyLanguage(initialLang);

  const languageToggle = document.querySelector(".language-toggle");
  if (languageToggle) {
    languageToggle.addEventListener("click", handleLanguageToggleClick);
  }

  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", handleThemeToggle);
  }

  setupBrandEasterEgg();
  setupTabEasterEgg();
  setupKeyboardEasterEggs();
  setupPhotoTooltip();
  applyNightFooter();
  setupScrollAnimations();
});
