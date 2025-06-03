// 입력받은 도메인을 크롤링하여 의심사이트인지 확인하는 코드
import { isContent } from '../Util/utils.js';
import { loadSignatureDB, calculateSimilarity } from '../Signature/analyzeSimilarity.js';
import axios from 'axios';

await loadSignatureDB();

async function crawlSite(domain) {
    try {
        const url = `http://${domain}`;
        const res = await axios.get(url, { timeout: 3000 });
        const $ = cheerio.load(res.data);

        const title = $('title').text();
        const bodyText = $('body').text();
        const html = $.html();

        const isSuspicious = isContent(title + bodyText);

        const { name: sigName, matchRatio } = calculateSimilarity(html);

        if (isSuspicious || matchRatio > 0.6) {
            console.log(`[의심 사이트] ${domain}`);
            if (sigName) {
                console.log(`  → 시그니처 일치: ${sigName} (${(matchRatio * 100).toFixed(1)}%)`);
            }
        } else {
            console.log(`[정상이거나 불확실] ${domain}`);
        }

        return { domain, title, isSuspicious, sigName, matchRatio };
    } catch (err) {
        console.log(`[크롤링 실패] ${domain} - ${err.message}`);
        return null;
    }
}

export default crawlSite;

// 입력받은 도메인을 크롤링하여 의심사이트인지 확인하는 코드
// 시그니처 기능을 탑재하지 않은 버전
// import axios from "axios";
// import * as cheerio from "cheerio";
// import { isContent } from "./Util/utils.js";

// async function crawlSite(domain) {
//   try {
//     const url = `http://${domain}`;
//     const res = await axios.get(url, { timeout: 3000 });
//     const $ = cheerio.load(res.data);

//     const title = $("title").text();
//     const bodyText = $("body").text();

//     const isSuspicious = isContent(title + bodyText);

//     if (isSuspicious) {
//       console.log(`[의심 사이트] ${domain}`);
//     } else {
//       console.log(`[정상이거나 불확실] ${domain}`);
//     }

//     return { domain, title, isSuspicious };
//   } catch (err) {
//     console.log(`[크롤링 실패] ${domain} - ${err.message}`);
//     return null;
//   }
// }

// export default crawlSite;
