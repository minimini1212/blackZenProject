// 의심 키워드 목록 변수
export const keywords = [
    '바카라',
    '슬롯',
    '먹튀',
    '카지노',
    '보증',
    '베팅',
    '토토',
    '에볼루션',
    '머니',
    '환전',
    '미니게임',
    '스포츠중계',
];

// 필터 함수 정의 코드
export function isContent(text) {
    return keywords.some((keyword) => text.includes(keyword));
}
