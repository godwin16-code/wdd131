// Retrieve review count from localStorage
let count = localStorage.getItem("reviewCount");
count = count ? parseInt(count) : 0;

// Increment count
count++;
localStorage.setItem("reviewCount", count);

// Display count on page
document.getElementById("reviewCount").textContent = count;
