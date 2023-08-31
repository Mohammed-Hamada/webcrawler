import { JSDOM } from 'jsdom';

const crawlPage = async (currentURL) => {
  try {
    const response = await fetch(currentURL);
    if (response.status > 399)
      throw new Error(`Error in fetch with status code: ${response.status}`);

    const contentType = response.headers.get('Content-Type');
    if (!contentType.includes('text/html')) {
      throw new Error(`Non HTML response, content type: ${contentType}`);
    }
    return response.text();
  } catch (error) {
    console.log(
      `Error: (${error.message}) when crawling url: (${currentURL}).`
    );
  }
};

const getURLsFromHTML = (htmlBody, baseURL) => {
  const urls = [];
  const domObj = new JSDOM(htmlBody);
  const linkElements = domObj.window.document.querySelectorAll('a');
  for (const linkElement of linkElements) {
    const href = linkElement.href;

    if (linkElement.href.charAt(0) === '/') {
      try {
        const urlObj = new URL(`${baseURL}${href}`);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`Error with relative url: ${error.message}`);
      }
    } else {
      try {
        const urlObj = new URL(href);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`Error with absolute url: ${error.message}`);
      }
    }
  }

  return urls;
};

const normalizeURL = (urlString) => {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  if (hostPath.length && hostPath.slice(-1) === '/') {
    return hostPath.slice(0, -1);
  }
  return hostPath;
};

export { normalizeURL, getURLsFromHTML, crawlPage };
