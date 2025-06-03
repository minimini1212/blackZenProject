import fs from 'fs';

export function saveResultsToFile(results, filename = 'results.json') {
    try {
        fs.writeFileSync(filename, JSON.stringify(results, null, 2));
        console.log(`결과가 ${filename} 파일에 저장되었습니다.`);
    } catch (err) {
        console.error(`결과 저장 실패: ${err.message}`);
    }
}
