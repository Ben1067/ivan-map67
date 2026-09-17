/* ============ ПОЛНОЭКРАННЫЙ РЕЖИМ ============ */
const fsBtn = document.getElementById("fullscreenBtn");

// Создаём кнопку выхода поверх карты
const exitFsBtn = document.createElement("button");
exitFsBtn.textContent = "⛶ Выйти";
exitFsBtn.style.cssText = `
  position: fixed; top: 14px; right: 14px;
  padding: 9px 16px;
  border-radius: 10px;
  border: 1px solid rgba(148,163,184,0.3);
  background: rgba(30,41,59,0.9);
  backdrop-filter: blur(10px);
  color: #f1f5f9;
  font-size: 13px; font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  z-index: 5000;
  display: none;
  box-shadow: 0 4px 14px rgba(0,0,0,0.4);
  transition: 0.2s;
`;
exitFsBtn.addEventListener("mouseenter", () => {
  exitFsBtn.style.background = "#38bdf8";
  exitFsBtn.style.color = "#0f172a";
});
exitFsBtn.addEventListener("mouseleave", () => {
  exitFsBtn.style.background = "rgba(30,41,59,0.9)";
  exitFsBtn.style.color = "#f1f5f9";
});
exitFsBtn.addEventListener("click", exitFullscreen);
document.body.appendChild(exitFsBtn);

function isFullscreen() {
  return !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
}

function enterFullscreen() {
  const el = document.documentElement;
  if (el.requestFullscreen) el.requestFullscreen();
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  else if (el.msRequestFullscreen) el.msRequestFullscreen();
}

function exitFullscreen() {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  else if (document.msExitFullscreen) document.msExitFullscreen();
}

fsBtn.addEventListener("click", () => {
  if (isFullscreen()) exitFullscreen();
  else enterFullscreen();
});

// Обновление UI при входе/выходе
function updateFsUI() {
  const fs = isFullscreen();
  fsBtn.textContent = fs ? "⛶" : "⛶";
  fsBtn.title = fs ? "Выйти из полного экрана (Esc)" : "Полный экран (F)";
  exitFsBtn.style.display = fs ? "block" : "none";
  // Пересчёт размера карты
  setTimeout(() => map.invalidateSize(), 200);
}

document.addEventListener("fullscreenchange", updateFsUI);
document.addEventListener("webkitfullscreenchange", updateFsUI);
document.addEventListener("msfullscreenchange", updateFsUI);

// Клавиша F — быстрый вход/выход, Esc — выход
document.addEventListener("keydown", e => {
  // Не срабатывает, если пользователь пишет в поле ввода
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

  if (e.key === "f" || e.key === "F" || e.key === "а" || e.key === "А") {
    e.preventDefault();
    if (isFullscreen()) exitFullscreen();
    else enterFullscreen();
  }
  if (e.key === "Escape" && isFullscreen()) {
    exitFullscreen();
  }
});