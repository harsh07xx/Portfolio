/* ============================================================
   Harsh Padher — Portfolio Script
   Pure vanilla JavaScript — no framework required
   ============================================================ */

/* ── Data ── */
const NAV_LINKS = [
  { href: "about",     label: "About Me"     },
  { href: "skills",    label: "Skills"       },
  { href: "projects",  label: "Portfolio"    },
  { href: "education", label: "Education"    },
  { href: "contact",   label: "Get In Touch" },
];

const STRENGTHS = [
  { icon: "⚡", label: "Quick Learner"  },
  { icon: "🤝", label: "Team Player"   },
  { icon: "🧩", label: "Problem Solver"},
];

const SKILLS = [
  { icon: "💻", category: "Programming", tags: ["Python", "Java", "C++"] },
  { icon: "🌐", category: "Web",         tags: ["HTML", "CSS", "JavaScript", "ReactJS"] },
  { icon: "🗄️", category: "Database",   tags: ["MySQL", "Firebase"] },
  { icon: "🛠️", category: "Tools",      tags: ["Git", "VS Code", "GitHub"] },
];

const PROJECTS = [
  {
    icon: "🌐", title: "Portfolio Website",
    desc: "Responsive portfolio website built using ReactJS with smooth animations and seamless navigation.",
    tags: ["ReactJS", "CSS", "Responsive", "Animations"],
  },
  {
    icon: "🛒", title: "Amazon Clone",
    desc: "Full-featured e-commerce UI using ReactJS with product filtering and cart functionality.",
    tags: ["ReactJS", "CSS", "E-commerce", "State Management"],
  },
  {
    icon: "🌤️", title: "Weather Application",
    desc: "Real-time weather forecasting app using OpenWeather API integration and dynamic updates.",
    tags: ["API", "JavaScript", "Real-time", "CSS"],
  },
];

const EDUCATION = [
  {
    icon: "🎓",
    title: "Diploma in Computer Engineering & Technology",
    subtitle: "Vidhyadeep Institute of Engineering and Technology",
    meta: "Final Year · Expected Graduation: 2027",
    accent: "#7C3AED",
  },
  {
    icon: "🏅",
    title: "Training & Internship",
    subtitle: "Computer Communication & Internet · Collaboration Skills",
    meta: "Presentations · Software Development · Problem Solving",
    accent: "#06B6D4",
  },
];

/* ── Helpers ── */
function scrollToSection(id, callback) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  if (callback) callback();
}

/* ── Build Nav ── */
function buildNav() {
  const nav          = document.getElementById("main-nav");
  const navList      = document.getElementById("nav-list");
  const hamburger    = document.getElementById("hamburger");
  const mobileMenu   = document.getElementById("mobile-menu");
  const mobileOverlay= document.getElementById("mobile-overlay");

  /* Desktop nav links */
  NAV_LINKS.forEach(({ href, label }) => {
    const li = document.createElement("li");
    const a  = document.createElement("a");
    a.dataset.section = href;
    a.textContent     = label;
    a.addEventListener("click", () => scrollToSection(href));
    li.appendChild(a);
    navList.appendChild(li);
  });

  /* Mobile menu links */
  NAV_LINKS.forEach(({ href, label }) => {
    const a = document.createElement("a");
    a.dataset.section = href;
    a.textContent     = label;
    a.addEventListener("click", () => {
      scrollToSection(href);
      closeMobileMenu();
    });
    mobileMenu.appendChild(a);
  });

  /* Hamburger toggle */
  function openMobileMenu() {
    hamburger.classList.add("open");
    mobileMenu.classList.add("open");
    mobileOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeMobileMenu() {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
    mobileOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", () => {
    hamburger.classList.contains("open") ? closeMobileMenu() : openMobileMenu();
  });
  mobileOverlay.addEventListener("click", closeMobileMenu);

  /* Close on Escape */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeMobileMenu();
  });

  /* Close on resize past breakpoint */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMobileMenu();
  });

  /* Scroll: nav background + active section */
  window.addEventListener("scroll", () => {
    /* Frosted nav */
    if (window.scrollY > 50) nav.classList.add("scrolled");
    else                      nav.classList.remove("scrolled");

    /* Active section highlight */
    let current = "";
    NAV_LINKS.forEach(({ href }) => {
      const section = document.getElementById(href);
      if (section && window.pageYOffset >= section.offsetTop - 200) current = href;
    });
    document.querySelectorAll("[data-section]").forEach(link => {
      link.classList.toggle("active", link.dataset.section === current);
    });
  }, { passive: true });
}

/* ── Build About ── */
function buildAbout() {
  const strengthsEl = document.getElementById("strengths");
  STRENGTHS.forEach(({ icon, label }) => {
    const card = document.createElement("div");
    card.className = "strength-card";
    card.innerHTML = `<span class="strength-icon">${icon}</span><span class="strength-label">${label}</span>`;
    strengthsEl.appendChild(card);
  });
}

/* ── Build Skills ── */
function buildSkills() {
  const grid = document.getElementById("skills-grid");
  SKILLS.forEach(({ icon, category, tags }) => {
    const card = document.createElement("div");
    card.className = "skill-card";
    card.innerHTML = `
      <div class="skill-icon">${icon}</div>
      <div class="skill-category">${category}</div>
      <div class="skill-items">
        ${tags.map(t => `<span class="skill-tag">${t}</span>`).join("")}
      </div>`;
    grid.appendChild(card);
  });
}

/* ── Build Projects ── */
function buildProjects() {
  const list = document.getElementById("projects-list");
  PROJECTS.forEach(({ icon, title, desc, tags }) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <span class="project-icon">${icon}</span>
      <div>
        <p class="project-title">${title}</p>
        <p class="project-desc">${desc}</p>
        <div class="project-tags">
          ${tags.map(t => `<span class="project-tag">${t}</span>`).join("")}
        </div>
      </div>`;
    list.appendChild(card);
  });
}

/* ── Build Education ── */
function buildEducation() {
  const list = document.getElementById("education-list");
  EDUCATION.forEach(({ icon, title, subtitle, meta, accent }) => {
    const card = document.createElement("div");
    card.className = "education-card";
    card.style.borderLeft = `4px solid ${accent}`;
    card.innerHTML = `
      <span class="education-icon">${icon}</span>
      <div>
        <p class="education-title">${title}</p>
        <p class="education-subtitle">${subtitle}</p>
        <p class="education-meta">${meta}</p>
      </div>`;
    list.appendChild(card);
  });
}

/* ── Init ── */
document.addEventListener("DOMContentLoaded", () => {
  buildNav();
  buildAbout();
  buildSkills();
  buildProjects();
  buildEducation();
});
