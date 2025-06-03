export function printSummary(results) {
    const total = results.length;
    const suspicious = results.filter((r) => r && r.isSuspicious).length;
    const signatureMatched = results.filter((r) => r && r.sigName).length;
    const failed = results.filter((r) => r === null).length;
    const normal = total - suspicious - failed;

    console.log('\n==== 분석 요약 ====');
    console.log(`총 도메인 수         : ${total}`);
    console.log(`의심 사이트           : ${suspicious}`);
    console.log(`  └ 시그니처 일치     : ${signatureMatched}`);
    console.log(`정상 또는 불확실      : ${normal}`);
    console.log(`크롤링 실패           : ${failed}`);
}
