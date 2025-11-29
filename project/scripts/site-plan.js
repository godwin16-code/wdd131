// Placeholder JS file for site plan interactivity
console.log("Site plan loaded. You can add interactive elements here if needed.");

// Example: highlight all section headers when clicked
document.querySelectorAll("section h2").forEach(header => {
    header.addEventListener("click", () => {
        header.style.color = "#F39C12"; // temporary highlight
    });
});
