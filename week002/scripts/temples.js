// scripts/temples.js

// Footer dynamic fields
const yearSpan = document.getElementById('currentyear');
const modSpan = document.getElementById('lastModified');

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (modSpan) modSpan.textContent = document.lastModified;

// Hamburger toggle (mobile view)
const button = document.getElementById('hamburger');
const navList = document.querySelector('#primary-nav ul');
const icon = document.querySelector('#hamburger .hamburger-icon');

function toggleMenu() {
  if (!navList) return;
  const isOpen = navList.classList.toggle('open');
  button?.setAttribute('aria-expanded', String(isOpen));
  if (icon) icon.textContent = isOpen ? '✕' : '☰';
}
button?.addEventListener('click', toggleMenu);

// Close the menu after clicking a link (mobile)
navList?.addEventListener('click', (e) => {
  const target = e.target;
  if (target && target.matches('a')) {
    if (navList.classList.contains('open')) toggleMenu();
  }
});
