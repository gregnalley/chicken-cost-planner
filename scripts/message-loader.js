function loadFooterMessage() {
  const messageElement = document.getElementById("footer-message");

  if (!messageElement) return;

  if (!Array.isArray(BCP_MESSAGES) || BCP_MESSAGES.length === 0) {
    return;
  }

  const previousIndex = Number(
    sessionStorage.getItem("bcp-last-footer-message")
  );

  let newIndex;

  if (BCP_MESSAGES.length === 1) {
    newIndex = 0;
  } else {
    do {
      newIndex = Math.floor(Math.random() * BCP_MESSAGES.length);
    } while (newIndex === previousIndex);
  }

  messageElement.textContent = BCP_MESSAGES[newIndex];

  sessionStorage.setItem(
    "bcp-last-footer-message",
    String(newIndex)
  );
}