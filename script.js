// DARK MODE TOGGLE WITH MEMORY
const themeToggle = document.getElementById('themeToggle');
const userPref = localStorage.getItem('theme');

if (userPref === 'dark') document.body.classList.add('dark');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// SCROLL TO TOP BUTTON
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '⬆️';
scrollBtn.className = 'scroll-top';
document.body.appendChild(scrollBtn);

scrollBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 0.6rem 1rem;
  background: #0077ff;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
  display: none;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  z-index: 1000;
`;

window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// SCROLL REVEAL EFFECTS
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

// TYPING EFFECT
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
// GITHUB PROJECTS — 3D ANIMATED CARDS
// ─────────────────────────────────────────────

const GITHUB_USERNAME = 'DhitRaj';

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
  const desc = repo.description || 'No description provided.';
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

  const card = document.createElement('div');
  card.className = 'card flip-card';
  card.dataset.lang = lang;

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <div class="card-lang-icon">${langIcon}</div>
        <h3 class="card-title">${repo.name.replace(/-/g, ' ')}</h3>
        <span class="card-lang-badge" style="background:${langColor}20; color:${langColor}; border:1px solid ${langColor}60">
          <span class="lang-dot" style="background:${langColor}"></span>
          ${lang}
        </span>
        <div class="card-stats">
          <span title="Stars">⭐ ${stars}</span>
          <span title="Forks">🍴 ${forks}</span>
        </div>
        <p class="card-hint">Hover to flip</p>
      </div>
      <div class="card-back">
        <p class="card-desc">${desc}</p>
        <div class="card-meta">📅 Updated: ${updatedDate}</div>
        <div class="card-actions">
          ${homepageBtn}
          <a href="${repo.html_url}" target="_blank" class="card-btn card-btn-github">
            <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  `;

  // 3D tilt on mouse move (front face only)
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
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`
    );
    if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    const repos = await res.json();

    // Filter out forks (optional: keep personal projects only)
    const ownRepos = repos.filter(r => !r.fork);

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

