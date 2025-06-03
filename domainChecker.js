import dns from 'dns/promises';

async function isDomainActive(domain) {
  try {
    const result = await dns.lookup(domain);
    console.log(`[✅] ${domain} is active. IP: ${result.address}`);
    return true;
  } catch (err) {
    console.log(`[❌] ${domain} is inactive or does not exist.`);
    return false;
  }
}

export default isDomainActive;
