// Get current year and set it in the element with id="currentyear"
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Get last modified date and set it in the element with id="lastModified"
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

const welcomeMsg = document.querySelector('section');
const para = document.createElement('p');
para.textContent = "Welcome Godwin";
welcomeMsg.appendChild(para);

const text = document.createTextNode(" — the premier source for web development knowledge.",);
const linkPara = document.querySelector('p');
linkPara.appendChild(text);