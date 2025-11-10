let startTime = 0;
let timerInterval;
const timerDisplay = document.getElementById('timer');
const stopButton = document.getElementById('stop');
const message = document.getElementById('message');

// URLのパラメータを取得
const params = new URLSearchParams(window.location.search);
const isValidQR = params.get("start") === "1"; // 7階QRにのみ付与

if (isValidQR) {
  startTimer();
} else {
  message.textContent = "⚠️ このページはQRコード経由でのみ起動できます。";
}

function startTimer() {
  message.textContent = "計測中です！階段を降りて2階でQRを読み込んでください。";
  startTime = Date.now();
  stopButton.disabled = false;

  timerInterval = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    timerDisplay.textContent = `${elapsed.toFixed(2)} 秒`;
  }, 10);
}

stopButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  const finalTime = ((Date.now() - startTime) / 1000).toFixed(2);
  timerDisplay.textContent = `あなたのタイム：${finalTime} 秒`;
  stopButton.disabled = true;

  const name = prompt("名前を入力してください（ランキング用）:");
  if (!name) return;

  fetch("【あなたのWebアプリURL】", {
    method: "POST",
    contentType: "application/json",
    body: JSON.stringify({ name: name, time: finalTime })
  })
  .then(res => res.text())
  .then(() => alert("記録が送信されました！"))
  .catch(err => alert("送信に失敗しました"));
});
