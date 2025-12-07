/* script.js
   All JS features required:
   - More than one function
   - DOM interaction (select, modify, listen)
   - Conditional branching
   - Objects, arrays, array methods
   - Uses template literals exclusively for output strings
   - localStorage usage
   - Lazy-load small decorative images (if used)
*/

/* ---------------- Data ---------------- */
const DESTINATIONS = [
  { id:1, name:"Isle of Skye, Scotland", style:"adventure", eco:true, family:false, cost:1200, blurb:"Dramatic cliffs, coastal hikes, sustainable guesthouses.", image:"Eco-Travel-Adventure/images/laos.jpg"},
  { id:2, name:"San Juan Islands, USA", style:"relax", eco:true, family:true, cost:900, blurb:"Orcas, kayaking, community-led tours.", image: "Eco-Travel-Adventure/images/azores.jpg"},
  { id:3, name:"Azores, Portugal", style:"adventure", eco:true, family:true, cost:1000, blurb:"Volcanic landscapes, local farms, whale watching.", image:"Eco-Travel-Adventure/images/port.jpg"},
  { id:4, name:"Tuscany countryside, Italy", style:"culture", eco:false, family:true, cost:1500, blurb:"Small towns, agritourism, slow food experiences.", image:"Eco-Travel-Adventure/images/houses.jpg"},
  { id:5, name:"Luang Prabang, Laos", style:"culture", eco:false, family:false, cost:1100, blurb:"Heritage sites, local crafts, mindful tours.", image:"Eco-Travel-Adventure/images/houses.jpg" }
];

/* --------- Helpers: short selectors ---------- */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

/* --------- Nav toggle for mobile ---------- */
function setupNavToggle(){
  const btns = $$('.nav-toggle');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const list = btn.parentElement.querySelector('#navList');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (list) {
        list.style.display = expanded ? 'none' : 'flex';
        btn.setAttribute('aria-expanded', String(!expanded));
      }
    });
  });
}

/* --------- Render destination cards (used on destinations.html) ---------- */
function buildDestCard(d){
  return `<li class="card" data-id="${d.id}">
    <img src="${d.image}" alt="${d.name}" loading="lazy">
    <h3>${d.name}</h3>
    <p>${d.blurb}</p>
    <p><strong>Style:</strong> ${d.style} • <strong>Est. cost:</strong> $${d.cost}</p>
    <p>${d.eco ? 'Eco-friendly options available' : 'Check eco options'}</p>
  </li>`;
}

function renderDestinationList(){
  const list = $('#destList');
  if (!list) return;
  const html = DESTINATIONS.map(d => buildDestCard(d)).join('');
  list.innerHTML = html;
}

/* --------- Filter function (array methods) ---------- */
function filterDestinations({style='', maxBudget=0, prefs=[]} = {}){
  return DESTINATIONS
    .filter(d => style ? d.style === style : true)
    .filter(d => maxBudget > 0 ? d.cost <= maxBudget : true)
    .filter(d => {
      if (prefs.includes('eco') && !d.eco) return false;
      if (prefs.includes('family') && !d.family) return false;
      return true;
    })
    .sort((a,b) => a.cost - b.cost);
}

function showFilterResults(matches){
  const container = $('#destResults');
  if (!container) return;
  if (!matches || matches.length === 0) {
    container.textContent = `No matches found. Try different filters.`;
    return;
  }
  const html = matches.map(m => `<li>${m.name} — $${m.cost} — ${m.style}</li>`).join('');
  container.innerHTML = `<strong>${matches.length} result(s):</strong><ul>${html}</ul>`;
}

/* --------- Quiz: findMatches, displayResults, storage --------- */
function findMatches(style, budget, prefs){
  return DESTINATIONS
    .filter(d => d.style === style)
    .filter(d => budget > 0 ? d.cost <= budget : true)
    .filter(d => {
      if (prefs.includes('family') && !d.family) return false;
      if (prefs.includes('eco') && !d.eco) return false;
      return true;
    })
    .sort((a,b) => a.cost - b.cost);
}

function buildRecommendation(d){
  return `Recommendation: ${d.name} — ${d.blurb} Estimated cost: $${d.cost}. ${d.eco ? 'Eco-friendly' : 'Consider greener options'}`;
}

function displayResults(results){
  const out = $('#quizOutput');
  if(!out) return;
  if(!results || results.length === 0){
    out.textContent = `No matches found. Try changing preferences.`;
    return;
  }
  out.innerHTML = `<ul>${results.map(r => `<li>${buildRecommendation(r)}</li>`).join('')}</ul>`;
}

/* localStorage helpers */
function saveLastRecommendation(text){
  localStorage.setItem('eco_lastRecommendation', text);
}
function loadLastRecommendation(){
  return localStorage.getItem('eco_lastRecommendation');
}
function clearLastRecommendation(){
  localStorage.removeItem('eco_lastRecommendation');
}

/* --------- Carbon estimator ------- */
const EMISSION_FACTORS = { economy:0.09, business:0.18, first:0.3 };
function estimateCarbon(distanceKm, cls){
  const factor = EMISSION_FACTORS[cls] || EMISSION_FACTORS.economy;
  const kg = distanceKm * factor;
  return kg;
}

/* --------- Dark mode (persisted) ------- */
function applyDarkMode(enabled){
  if (enabled) document.body.classList.add('dark'); else document.body.classList.remove('dark');
  const toggles = $$('#darkToggle');
  toggles.forEach(t => t.setAttribute('aria-pressed', String(enabled)));
  localStorage.setItem('eco_darkMode', enabled ? '1' : '0');
}

/* --------- Event handlers --------- */
function handleFilterSubmit(e){
  if (e) e.preventDefault();
  const style = $('#filterStyle') ? $('#filterStyle').value : '';
  const maxBudget = $('#maxBudget') ? Number($('#maxBudget').value || 0) : 0;
  const prefs = $$('input[name="pref"]:checked').map(i => i.value);
  const matches = filterDestinations({style, maxBudget, prefs});
  showFilterResults(matches);
}

function handleQuizSubmit(e){
  if (e) e.preventDefault();
  const styleEl = $('#travelStyle');
  if (!styleEl) return;
  const style = styleEl.value;
  if (!style) {
    $('#quizOutput').textContent = `Please select a travel style.`;
    return;
  }
  const budget = Number($('#budget').value || 0);
  const prefs = $$('input[name="pref"]:checked').map(i => i.value);
  const matches = findMatches(style, budget, prefs);
  displayResults(matches);
  const summary = matches.length ? `Saved: ${matches[0].name} (style:${style})` : `Saved: no-match-${style}`;
  saveLastRecommendation(summary);
}

function handleCarbonSubmit(e){
  if (e) e.preventDefault();
  const distance = Number($('#distance') ? $('#distance').value : 0);
  const cls = $('#classType') ? $('#classType').value : 'economy';
  if (!distance || distance <= 0) {
    $('#carbonOutput').textContent = `Enter a valid distance in km.`;
    return;
  }
  const kg = estimateCarbon(distance, cls);
  $('#carbonOutput').textContent = `Estimated emissions: ${kg.toFixed(1)} kg CO₂ for ${distance} km (${cls}).`;
}

function handleClearStorage(e){
  if (e) e.preventDefault();
  clearLastRecommendation();
  const out = $('#quizOutput');
  if (out) out.textContent = 'Saved recommendation cleared.';
}

/* --------- Initialization (runs on DOMContentLoaded) --------- */
function init(){
  setupNavToggle();
  renderDestinationList();

  // filter form
  const filterForm = $('#filterForm');
  if (filterForm) filterForm.addEventListener('submit', handleFilterSubmit);

  // show top picks by default
  const destResults = $('#destResults');
  if (destResults) {
    const top = DESTINATIONS.slice(0,3);
    showFilterResults(top);
  }

  // quiz form
  const quizForm = $('#styleQuiz');
  if (quizForm) quizForm.addEventListener('submit', handleQuizSubmit);

  // carbon form
  const carbonForm = $('#carbonForm');
  if (carbonForm) carbonForm.addEventListener('submit', handleCarbonSubmit);

  // clear storage
  const clearBtn = $('#clearStorage');
  if (clearBtn) clearBtn.addEventListener('click', handleClearStorage);

  // dark mode
  const dmToggle = $('#darkToggle');
  if (dmToggle) dmToggle.addEventListener('click', () => {
    const enabled = !document.body.classList.contains('dark');
    applyDarkMode(enabled);
  });

  // restore stored recommendation
  const last = loadLastRecommendation();
  const quizOut = $('#quizOutput');
  if (last && quizOut) quizOut.textContent = `Last saved recommendation: ${last}`;

  // restore dark mode
  if (localStorage.getItem('eco_darkMode') === '1') applyDarkMode(true);
}

/* run init */
document.addEventListener('DOMContentLoaded', init);

document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;
document.getElementById("currentYear").textContent = new Date().getFullYear();
