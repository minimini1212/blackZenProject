import { customAlphabet } from 'nanoid';

const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';

// nanoid라이브러리를 통한 4글자 난수 생성
const generateId = customAlphabet(alphabet, 4); 


// 미리 발견한 불법사이트 목록을 prefixes에 설정
const prefixes = ["illegalsite", "betzone", "casino", "xgame"];
const suffixes = ["", "-game", "-123", "-bet"];
const tlds = [".com", ".net", ".xyz", ".site"];

// 100개의 도메인 후보 생성하기
const DOMAIN_COUNT = 100;

function generateDomains() {
  return Array.from({ length: DOMAIN_COUNT }, () => {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const tld = tlds[Math.floor(Math.random() * tlds.length)];
    const rand = generateId();

    return `${rand}${prefix}${suffix}${tld}`;
  });
}

export default generateDomains;
