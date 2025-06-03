// 도메인 후보 생성을 위한 코드

import { customAlphabet } from 'nanoid';

const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';

// nanoid라이브러리를 통한 4글자 난수 생성
const generateId = customAlphabet(alphabet, 4);

// 미리 발견한 불법사이트 목록을 prefixes에 설정
const prefixes = ['illegalsite', 'betzone', 'casino', 'xgame'];
const suffixes = ['', '-game', '-123', '-bet'];
const tlds = ['.com', '.net', '.xyz', '.site'];

// 100개의 도메인 후보 생성하기
const DOMAIN_COUNT = 100;

function generateDomains() {
    // 도메인 후보 생성 시 중복 방지를 위하여 Set객체 사용
    const domainSet = new Set();

    while (domainSet.size < DOMAIN_COUNT) {
        // 랜덤으로 조합할 수 있도록 설정
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        const tld = tlds[Math.floor(Math.random() * tlds.length)];
        const rand = generateId();

        const domain = `${rand}${prefix}${suffix}${tld}`;
        domainSet.add(domain);
    }

    return Array.from(domainSet);
}

export default generateDomains;
