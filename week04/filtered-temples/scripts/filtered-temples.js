/* -----------------------------------------
   TEMPLE DATA
------------------------------------------ */

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },

  /* -----------------------------------------
     YOUR 3 EXTRA TEMPLES
  ----------------------------------------- */
  {
  templeName: "Accra Ghana",
  location: "Accra, Ghana",
  dedicated: "2004, January, 11",
  area: 17500,
  imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/400x250/accra-ghana-temple-lds-108286-wallpaper.jpg"
},
{
  templeName: "Rome Italy",
  location: "Rome, Italy",
  dedicated: "2019, March, 10",
  area: 41000,
  imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-exterior-2192533.jpg"
},
{
  templeName: "Johannesburg South Africa",
  location: "Johannesburg, South Africa",
  dedicated: "1985, August, 25",
  area: 19184,
  imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/johannesburg-south-africa/400x250/johannesburg-south-africa-temple.jpg"
}

];

/* -----------------------------------------
   SELECT DOM ELEMENTS
------------------------------------------ */
const gallery = document.querySelector(".gallery");
const navLinks = document.querySelectorAll("nav a");

/* -----------------------------------------
   TEMPLE CARD GENERATOR
------------------------------------------ */
function displayTemples(filteredTemples) {
  gallery.innerHTML = ""; // clear previous

  filteredTemples.forEach((temple) => {
    const figure = document.createElement("figure");

    figure.innerHTML = `
      <img src="${temple.imageUrl}" loading="lazy" alt="${temple.templeName}">
      <figcaption>${temple.templeName}</figcaption>
      <div class="temple-details">
        <p><strong>Location:</strong> ${temple.location}</p>
        <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
        <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
      </div>
    `;

    gallery.appendChild(figure);
  });
}

/* -----------------------------------------
   FILTER FUNCTIONS
------------------------------------------ */
function filterOld() {
  return temples.filter((t) => parseInt(t.dedicated) < 1900);
}

function filterNew() {
  return temples.filter((t) => parseInt(t.dedicated) > 2000);
}

function filterLarge() {
  return temples.filter((t) => t.area > 90000);
}

function filterSmall() {
  return temples.filter((t) => t.area < 10000);
}

/* -----------------------------------------
   NAVIGATION EVENTS
------------------------------------------ */
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const filter = e.target.textContent.trim();

    switch (filter) {
      case "Home":
        displayTemples(temples);
        break;

      case "Old":
        displayTemples(filterOld());
        break;

      case "New":
        displayTemples(filterNew());
        break;

      case "Large":
        displayTemples(filterLarge());
        break;

      case "Small":
        displayTemples(filterSmall());
        break;
    }
  });
});

/* -----------------------------------------
   HAMBURGER MENU
------------------------------------------ */
const hamBtn = document.querySelector("#hamburger");
const nav = document.querySelector("#primary-nav");

hamBtn.addEventListener("click", () => {
  nav.classList.toggle("open");

  // toggle icon
  const icon = hamBtn.querySelector(".hamburger-icon");
  icon.textContent = nav.classList.contains("open") ? "✕" : "☰";
});

/* -----------------------------------------
   FOOTER YEAR & LAST MODIFIED
------------------------------------------ */
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

/* -----------------------------------------
   INITIAL LOAD
------------------------------------------ */
displayTemples(temples);
