import express from "express";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 8080;

// URL вашего Google Apps Script
const googleSheetsUrl =
  "https://script.google.com/macros/s/AKfycbzr6GpT9VuUrxeNcafXK9B78s5Ob8VTuhvUaLfRSiqkdFj_x7mAcKF_Z7sLhrC11F6k/exec";

// Разрешаем запросы с вашего домена. ОБЯЗАТЕЛЬНО ИЗМЕНИТЕ АДРЕС!
// После того, как вы получите URL своего сайта на GitHub Pages, замените 'YOUR-GITHUB-PAGES-URL' на 'https://sergiobartsovski.github.io'
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // '*' for testing, replace with your domain later.
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Парсинг JSON-тела запроса
app.use(express.json());

// Обработка POST-запросов
app.post("/", async (req, res) => {
  try {
    const data = req.body;

    // Пересылаем запрос в Google Apps Script
    const response = await fetch(googleSheetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseText = await response.text();

    // Отправляем ответ обратно клиенту
    res.status(response.status).send(responseText);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).send("An error occurred while proxying the request.");
  }
});

// Запускаем сервер
app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
