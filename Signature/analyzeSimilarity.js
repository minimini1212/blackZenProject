import { readFile } from 'fs/promises';
import * as cheerio from 'cheerio';

let signatureDB = [];

// 시그니처 DB 불러오기
export async function loadSignatureDB(path = './Util/signaturePatterns.json') {
    const raw = await readFile(path, 'utf-8');
    signatureDB = JSON.parse(raw);
}

// 유사도 분석 (0~1 사이 값)
export function calculateSimilarity(htmlSource) {
    const $ = cheerio.load(htmlSource);

    // 전체 HTML
    const htmlText = $.html();
    let bestMatch = { name: null, matchRatio: 0 };

    for (const sig of signatureDB) {
        // HTML에 포함되어 있는 패턴의 개수를 계산
        const matches = sig.patterns.filter((p) => htmlText.includes(p)).length;

        // 비율 계산
        const ratio = matches / sig.patterns.length;

        // 반복으로 돌아가는 시그니쳐가 비율이 더 높다면 bestMatch에 재할당
        if (ratio > bestMatch.matchRatio) {
            bestMatch = { name: sig.name, matchRatio: ratio };
        }
    }

    return bestMatch;
}
