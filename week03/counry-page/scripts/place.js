document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified " + document.lastModified;

const temp = 10;
const wind = 5;

function calculateWindChill(temp, wind) {
    return (
        13.12 +
        0.6215 * temp -
        11.37 * Math.pow(wind, 0.16) +
        0.3965 * temp * Math.pow(wind, 0.16)
    ).toFixed(1);
}

let windChillResult;

if (temp <= 10 && wind > 4.8) {
    windChillResult = calculateWindChill(temp, wind);
} else{
    windChillResult = "N/A";
}

document.getElementById("windChill").textContent = windChillResult;