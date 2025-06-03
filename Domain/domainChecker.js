// 도메인 후보들이 존재하는지 아닌지 확인하는 코드
import dns from 'dns/promises';

async function isDomainActive(domain) {
    try {
        const result = await dns.lookup(domain);
        // console.log(`${domain} => 활성화 ip: ${result.address}`);
        return true;
    } catch (err) {
        // console.log(`${domain} => 비활성화`);
        return false;
    }
}

export default isDomainActive;
