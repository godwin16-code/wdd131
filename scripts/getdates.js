// Get current year and set it in the element with id="currentyear"
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Get last modified date and set it in the element with id="lastModified"
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;