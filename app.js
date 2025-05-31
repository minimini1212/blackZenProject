const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
app.use(express.static("Asset"));

app.get("/api/chart", async (req, res) => {
  try {
    const html = await axios.get("https://www.genie.co.kr/chart/top200");
    const $ = cheerio.load(html.data);
    const bodyList = $("tr.list");
    const ulList = [];

    bodyList.each((i, element) => {
      ulList.push({
        rank: i + 1,
        title: $(element).find("td.info a.title").text().replace(/\s/g, ""),
        artist: $(element).find("td.info a.artist").text().replace(/\s/g, ""),
      });
    });

    console.log(ulList);

    res.json(ulList);
  } catch (err) {
    res.status(500).json({ error: "크롤링 실패" });
  }
});

app.listen(3000, () => {
  console.log("http://localhost:3000 실행 중");
});