import axios from "axios";
import * as cheerio from "cheerio";

async function crawlSite(domain) {
  try {
    const url = `http://${domain}`;
    const res = await axios.get(url, { timeout: 3000 });
    const $ = cheerio.load(res.data);

     // ex) 사이트 제목 추출
    const title = $("title").text();
    console.log(`[크롤링 완료] ${domain} - TITLE: ${title}`);

    return { domain, title };
  } catch (err) {
    console.log(`[크롤링 실패] ${domain} - ${err.message}`);
    return null;
  }
}

export default crawlSite;
