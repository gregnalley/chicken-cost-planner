function animateCalculatorResults(options = {}) {
  const {
    resultSelector = ".result-card",
    nextStepsSelector = "#nextStepsCard",
    duration = 650
  } = options;

  const resultCards = document.querySelectorAll(resultSelector);

  resultCards.forEach(function (card, index) {
    if (card.id === "nextStepsCard") return;

    card.classList.remove("calculator-result-visible");
    card.classList.add("calculator-result-animated");

    window.setTimeout(function () {
      card.classList.add("calculator-result-visible");
    }, index * 90);
  });

  const nextStepsCard = document.querySelector(nextStepsSelector);

  if (nextStepsCard && nextStepsCard.style.display !== "none") {
    nextStepsCard.classList.remove("calculator-result-visible");
    nextStepsCard.classList.add("calculator-result-animated");

    window.setTimeout(function () {
      nextStepsCard.classList.add("calculator-result-visible");
    }, resultCards.length * 90 + 100);
  }

  animateCalculatorNumbers(duration);
}

function animateCalculatorNumbers(duration = 650) {
  const numberElements = document.querySelectorAll(
    ".result-number[data-result-value]"
  );

  numberElements.forEach(function (element) {
    const finalValue = Number(element.dataset.resultValue);
    const decimals = Number(element.dataset.resultDecimals || 0);
    const prefix = element.dataset.resultPrefix || "";
    const suffix = element.dataset.resultSuffix || "";

    if (!Number.isFinite(finalValue)) return;

    const startValue = 0;
    const startTime = performance.now();

    function updateNumber(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      const currentValue =
        startValue + (finalValue - startValue) * easedProgress;

      element.textContent =
        prefix +
        currentValue.toFixed(decimals) +
        suffix;

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    }

    requestAnimationFrame(updateNumber);
  });
}

function setAnimatedResult(elementId, value, options = {}) {
  const element = document.getElementById(elementId);

  if (!element) return;

  const {
    decimals = 0,
    prefix = "",
    suffix = ""
  } = options;

  element.dataset.resultValue = String(value);
  element.dataset.resultDecimals = String(decimals);
  element.dataset.resultPrefix = prefix;
  element.dataset.resultSuffix = suffix;

  element.textContent =
    prefix +
    Number(value).toFixed(decimals) +
    suffix;
}