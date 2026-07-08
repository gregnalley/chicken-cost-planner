function loadNavigation() {
  const navigation = document.getElementById("navigation");

  if (!navigation) return;

  fetch("nav.html")
    .then(response => response.text())
    .then(data => {
      navigation.innerHTML = data;
    })
    .catch(error => console.error("Error loading navigation:", error));
}

function loadFooter() {
  const footer = document.getElementById("footer");

  if (!footer) return;

  fetch("footer.html")
    .then(response => response.text())
    .then(data => {
      footer.innerHTML = data;
    })
    .catch(error => console.error("Error loading footer:", error));
}

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

document.addEventListener("DOMContentLoaded", function () {
  loadNavigation();
  loadFooter();
  loadHealthDisclaimer();
});