const express = require("express");
const request = require("request");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/albums", (req, res) => {
  request(
    { url: "https://stg-resque.hakuapp.com/albums.json" },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: err.message });
      }
      res.json(JSON.parse(body));
    }
  );
});

app.get("/songs/:album", (req, res) => {
  const albumId = req.params.album;
  request(
    { url: `https://stg-resque.hakuapp.com/songs.json?album_id=${albumId}` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: err.message });
      }
      res.json(JSON.parse(body));
    }
  );
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
