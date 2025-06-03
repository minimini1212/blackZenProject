// main.js
import generateDomains from './domainGenerator.js';
import isDomainActive from './domainChecker.js';
import crawlSite from './crawler.js';

async function run() {
    const domains = generateDomains();

    for (const domain of domains) {
        const isActive = await isDomainActive(domain);
        if (isActive) {
            await crawlSite(domain);
        }
    }
}



/*

*/
