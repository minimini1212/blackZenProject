import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
const app = express();
app.use(express.static("Asset"));

// const dns = require('dns');
// const dnsPromises = dns.promises;

// const options = {

//     family: 6,
//     hints: dns.ADDRCONFIG | dns.V4MAPPED,
// };

// const ip = await dnsPromises.lookup('geeksforgeeks.org', options);

import dns from 'dns/promises';

async function checkDomain(domain) {
  try {
    const result = await dns.lookup(domain);
    console.log(`${domain} -> ${result.address}`, '\n', result);
  } catch (error) {
    if (error.code === 'ENOTFOUND') {
      console.log(`${domain} 는 존재하지 않습니다.`);
    } else {
      console.log(`${domain} 에서 다른 오류 발생:`, error.message);
    }
  }
}

checkDomain('tistory.com');


// app.get("/api/chart", async (req, res) => {
//   try {
//     const html = await axios.get("https://www.genie.co.kr/chart/top200");
//     const $ = cheerio.load(html.data);
//     const bodyList = $("tr.list");
//     const ulList = [];

//     bodyList.each((i, element) => {
//       ulList.push({
//         rank: i + 1,
//         title: $(element).find("td.info a.title").text().replace(/\s/g, ""),
//         artist: $(element).find("td.info a.artist").text().replace(/\s/g, ""),
//       });
//     });

//     console.log(ulList);

//     res.json(ulList);
//   } catch (err) {
//     res.status(500).json({ error: "크롤링 실패" });
//   }
// });

// app.listen(3000, () => {
//   console.log("http://localhost:3000 실행 중");
// });


// 내가 활성화시킨 페이지
app.get("/api/chart", async (req, res) => {
  try {
    const html = await axios.get("http://localhost:8080/spring_mybatis/");
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