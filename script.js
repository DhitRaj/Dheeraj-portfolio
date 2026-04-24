// ─────────────────────────────────────────────
// DARK MODE TOGGLE WITH MEMORY
// ─────────────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const userPref = localStorage.getItem('theme');

if (userPref === 'dark') {
  document.body.classList.add('dark');
  themeIcon.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.add('theme-switching');
  setTimeout(() => document.body.classList.remove('theme-switching'), 400);

  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeIcon.textContent = isDark ? '☀️' : '🌙';
});

// ─────────────────────────────────────────────
// HAMBURGER MENU
// ─────────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Overlay to close nav on outside tap
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

function openMenu() {
  navLinks.classList.add('open');
  menuToggle.classList.add('open');
  menuToggle.setAttribute('aria-expanded', 'true');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navLinks.classList.remove('open');
  menuToggle.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

menuToggle.addEventListener('click', () => {
  navLinks.classList.contains('open') ? closeMenu() : openMenu();
});

overlay.addEventListener('click', closeMenu);

// Close menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// ─────────────────────────────────────────────
// SCROLL TO TOP BUTTON
// ─────────────────────────────────────────────
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '⬆';
scrollBtn.className = 'scroll-top';
scrollBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollBtn);

scrollBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 0.6rem 0.8rem;
  background: #0077ff;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.1rem;
  display: none;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0,119,255,0.35);
  z-index: 1000;
  transition: transform 0.2s, background 0.3s;
`;

window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─────────────────────────────────────────────
// ACTIVE NAV LINK ON SCROLL
// ─────────────────────────────────────────────
const sections = document.querySelectorAll('.section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ─────────────────────────────────────────────
// SCROLL REVEAL EFFECTS
// ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .skills li').forEach(el => {
  el.classList.add('hidden');
  revealObserver.observe(el);
});

// ─────────────────────────────────────────────
// TYPING EFFECT
// ─────────────────────────────────────────────
const phrases = ["Dheeraj", "a Developer", "a Learner", "an Innovator"];
const typingElement = document.querySelector(".typing-text");
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function type() {
  const currentPhrase = phrases[phraseIndex];
  const currentText = currentPhrase.substring(0, letterIndex);
  typingElement.textContent = currentText;

  if (!isDeleting && letterIndex < currentPhrase.length) {
    letterIndex++;
    setTimeout(type, 100);
  } else if (isDeleting && letterIndex > 0) {
    letterIndex--;
    setTimeout(type, 60);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(type, 1000);
  }
}
type();

// ─────────────────────────────────────────────
// GITHUB PROJECTS — CURATED WITH 3D ANIMATED CARDS
// ─────────────────────────────────────────────

const GITHUB_USERNAME = 'DhitRaj';

// Repos to exclude (portfolio repos)
const EXCLUDED_REPOS = new Set([
  'Dheeraj-portfolio',
  'dheeraj_portfolio',
]);

// Curated descriptions & metadata for known projects
const PROJECTS_META = {
  'd2c': {
    description: 'A full-featured D2C (Direct-to-Consumer) e-commerce admin dashboard built with Next.js 16, TypeScript, and Tailwind CSS. Covers product & category management, order tracking, payment processing, inventory/stock management, reports & analytics, support ticketing, and bulk CSV product uploads.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'E-Commerce'],
  },
  'Aimhop-edu-trust': {
    description: 'Production-grade website for Aimhop Education Trust — a full-stack JavaScript application with Docker containerisation and CI/CD via GitHub Actions. Deployed on Vercel, it serves as the official digital presence for the trust featuring course listings and student inquiry management.',
    tags: ['JavaScript', 'Node.js', 'Docker', 'CI/CD', 'Vercel'],
  },
  'aimhop-frontend-': {
    description: 'Next.js 16 frontend for the Aimhop education platform — a TypeScript React app with Radix UI components, dark mode support, and Recharts for data visualisation. Integrates with the Aimhop backend API to display student progress, courses, and institutional analytics.',
    tags: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
  },
  'SkillSwipe': {
    description: 'A Tinder-style skill-exchange platform where users swipe to find and connect with others for skill-swapping. React + Vite frontend with a Node.js/Express backend and MongoDB. Features user authentication, a skill-matching algorithm, real-time connection requests, and profile management.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Full Stack'],
  },
  'School-project': {
    description: 'A comprehensive school management portal built with Next.js 16 and TypeScript. Includes student & teacher management, attendance tracking, grade management, timetable scheduling, and a parent dashboard — with Recharts-powered analytics. Deployed on Vercel.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
  },
  'spotify-clone': {
    description: 'A pixel-perfect Spotify Web Player UI clone built with pure HTML and CSS. Replicates the sidebar, main content area, music player bar, and playlist views — showcasing advanced CSS layout techniques with Flexbox and Grid. Live demo on Vercel.',
    tags: ['HTML', 'CSS', 'UI Clone', 'Flexbox', 'Grid'],
  },
  'Text_based-game': {
    description: 'An interactive text-based adventure game built in vanilla JavaScript. Players navigate a branching storyline, make choices that affect outcomes, and manage an inventory system. Features multiple endings, a save-state system, and a clean terminal-style UI. Live on Vercel.',
    tags: ['JavaScript', 'Game Dev', 'Vanilla JS'],
  },
  'haunted-house-game': {
    description: 'A browser-based haunted house mystery game where players explore rooms, uncover clues, and solve puzzles to escape. Built as a creative side project to explore state machines and DOM-based game logic in JavaScript.',
    tags: ['JavaScript', 'Game Dev'],
  },
};

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  Python:     '#3572A5',
  Java:       '#b07219',
  'C++':      '#f34b7d',
  C:          '#555555',
  Ruby:       '#701516',
  Go:         '#00ADD8',
  Rust:       '#dea584',
  Shell:      '#89e051',
  PHP:        '#4F5D95',
};

const LANG_ICONS = {
  JavaScript: '🟨',
  TypeScript: '🟦',
  HTML:       '🟧',
  CSS:        '🎨',
  Python:     '🐍',
  Java:       '☕',
  'C++':      '⚙️',
  C:          '🔧',
  Ruby:       '💎',
  Go:         '🐹',
  Rust:       '🦀',
  Shell:      '💻',
  PHP:        '🐘',
};

function getLangColor(lang) {
  return LANG_COLORS[lang] || '#8b949e';
}

function getLangIcon(lang) {
  return LANG_ICONS[lang] || '📁';
}

function createProjectCard(repo) {
  const lang = repo.language || 'Unknown';
  const meta = PROJECTS_META[repo.name] || {};
  const desc = meta.description || repo.description || 'No description provided.';
  const tags = meta.tags || [];
  const stars = repo.stargazers_count || 0;
  const forks = repo.forks_count || 0;
  const langColor = getLangColor(lang);
  const langIcon = getLangIcon(lang);
  const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
  const homepageBtn = repo.homepage
    ? `<a href="${repo.homepage}" target="_blank" class="card-btn card-btn-live">🌐 Live Demo</a>`
    : '';

  const tagsHtml = tags.length
    ? `<div class="card-tags">${tags.map(t => `<span class="card-tag">${t}</span>`).join('')}</div>`
    : '';

  const card = document.createElement('div');
  card.className = 'card flip-card';
  card.dataset.lang = lang;

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <div class="card-lang-icon">${langIcon}</div>
        <h3 class="card-title">${repo.name.replace(/[-_]/g, ' ')}</h3>
        <span class="card-lang-badge" style="background:${langColor}20; color:${langColor}; border:1px solid ${langColor}60">
          <span class="lang-dot" style="background:${langColor}"></span>
          ${lang}
        </span>
        ${tagsHtml}
        <div class="card-stats">
          <span title="Stars">⭐ ${stars}</span>
          <span title="Forks">🍴 ${forks}</span>
        </div>
        <p class="card-hint">Tap to flip</p>
      </div>
      <div class="card-back">
        <p class="card-desc">${desc}</p>
        <div class="card-meta">📅 Updated: ${updatedDate}</div>
        <div class="card-actions">
          ${homepageBtn}
          <a href="${repo.html_url}" target="_blank" class="card-btn card-btn-github">
            <svg height="14" width="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  `;

  // 3D tilt on mouse move (desktop, front face only)
  const cardInner = card.querySelector('.card-inner');

  card.addEventListener('mousemove', (e) => {
    if (card.classList.contains('flipped')) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateY = ((x - cx) / cx) * 12;
    const rotateX = -((y - cy) / cy) * 12;
    cardInner.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    if (card.classList.contains('flipped')) return;
    cardInner.style.transform = '';
  });

  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
    cardInner.style.transform = '';
  });

  return card;
}

function renderFilters(repos) {
  const filtersEl = document.getElementById('projectFilters');
  const langs = ['All', ...new Set(repos.map(r => r.language).filter(Boolean))];

  langs.forEach(lang => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (lang === 'All' ? ' active' : '');
    btn.textContent = lang;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.flip-card').forEach(card => {
        const match = lang === 'All' || card.dataset.lang === lang;
        card.style.display = match ? '' : 'none';
      });
    });
    filtersEl.appendChild(btn);
  });
}

async function loadGitHubProjects() {
  const grid = document.getElementById('projectsGrid');
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=50`
    );
    if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    const repos = await res.json();

    // Keep only own (non-fork) repos and exclude portfolio repos
    const ownRepos = repos.filter(r => !r.fork && !EXCLUDED_REPOS.has(r.name));

    grid.innerHTML = '';
    renderFilters(ownRepos);

    ownRepos.forEach((repo, i) => {
      const card = createProjectCard(repo);
      card.style.animationDelay = `${i * 0.07}s`;
      grid.appendChild(card);

      // Intersection observer for entrance animation
      revealObserver.observe(card);
      card.classList.add('hidden');
    });

  } catch (err) {
    grid.innerHTML = `<p class="error-msg">⚠️ Could not load projects. <a href="https://github.com/${GITHUB_USERNAME}" target="_blank">View on GitHub</a></p>`;
    console.error(err);
  }
}

loadGitHubProjects();


