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
const sections = document.querySelectorAll('.section, .card, .skills li');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  section.classList.add('hidden');
  observer.observe(section);
});


const phrases = ["Dheeraj", "a Developer", "a Learner", "an Innovator"];
const typingElement = document.getElementById("typing-text");
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


