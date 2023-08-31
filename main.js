import { crawlPage } from './crawl.js';

const main = async () => {
  if (process.argv.length < 3) {
    console.log('No website provided.');
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log('Too many command line args.');
    process.exit(1);
  }

  const baseURL = process.argv[2];
  console.log(`Starting crawl for ${baseURL}.`);
  await crawlPage(baseURL);
};

main();
