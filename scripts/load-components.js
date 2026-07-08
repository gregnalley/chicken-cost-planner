fetch('nav.html')
.then(response => response.text())
.then(data => {
document.getElementById('navigation').innerHTML = data;
});

fetch('footer.html')
.then(response => response.text())
.then(data => {
document.getElementById('footer').innerHTML = data;
});

function loadHealthDisclaimer() {
  const disclaimer = document.getElementById("health-disclaimer");

  if (!disclaimer) return;

  fetch("health-disclaimer.html")
    .then(response => response.text())
    .then(data => {
      disclaimer.innerHTML = data;
    })
    .catch(error => console.error("Error loading health disclaimer:", error));
}