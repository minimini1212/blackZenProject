import generateDomains from './Domain/domainGenerator.js';
import isDomainActive from './Domain/domainChecker.js';
import crawlSite from './Crawler/crawler.js';
import { saveResultsToFile } from './Util/saveResults.js';
import { printSummary } from './Util/printSummary.js';

async function run() {
    // 도메인 후보 생성
    const domains = generateDomains();
    // 결과저장을 위한 변수
    const results = [];

    // 후보들로 반복문 실행
    for (const domain of domains) {
        // 도메인이 실제존재하는지 확인 true/false를 isActive 변수에 할당
        const isActive = await isDomainActive(domain);
        
        // isActive가 true면 크롤링 실행 및 결과 저장
        if (isActive) {
            const result = await crawlSite(domain);
            results.push(result);
        } else {
            // 도메인이 비활성인 경우도 기록
            results.push({
                domain,
                title: null,
                isSuspicious: false,
                sigName: null,
                matchRatio: 0,
                note: '비활성 도메인'
            });
        }
    }

    printSummary(results);
    saveResultsToFile(results);
}

run();
