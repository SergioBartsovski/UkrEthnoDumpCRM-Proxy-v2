import express from "express";
import fetch from "node-fetch";
import cors from "cors"; // 👈 Import the cors library

const app = express();
const port = process.env.PORT || 8080;

const googleSheetsUrl =
  "https://script.google.com/macros/s/AKfycbzr6GpT9VuUrxeNcafXK9B78s5Ob8VTuhvUaLfRSiqkdFj_x7mAcKF_Z7sLhrC11F6k/exec";

// 💡 Configure CORS to allow only your GitHub Pages domain
app.use(
  cors({
    origin: "https://sergiobartsovski.github.io", // Replace with your exact GitHub Pages URL
  })
);

// The rest of your code remains the same
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const data = req.body;
    const response = await fetch(googleSheetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseText = await response.text();
    res.status(response.status).send(responseText);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).send("An error occurred while proxying the request.");
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
