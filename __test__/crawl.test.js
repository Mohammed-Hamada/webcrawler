import { normalizeURL, getURLsFromHTML } from '../crawl';
import { describe, it, expect } from '@jest/globals';

describe('Test normalizeURL Function', () => {
  it('normalizeURL strip protocol', () => {
    const input = 'https://docs.google.com/path';
    const actual = normalizeURL(input);
    const expected = 'docs.google.com/path';

    expect(actual).toEqual(expected);
  });

  it('normalizeURL strip last slash', () => {
    const input = 'https://docs.google.com/path/';
    const actual = normalizeURL(input);
    const expected = 'docs.google.com/path';

    expect(actual).toEqual(expected);
  });

  it('normalizeURL capitals', () => {
    const input = 'https://DOCS.google.com/path/';
    const actual = normalizeURL(input);
    const expected = 'docs.google.com/path';

    expect(actual).toEqual(expected);
  });

  it('normalizeURL strip http', () => {
    const input = 'http://docs.google.com/path';
    const actual = normalizeURL(input);
    const expected = 'docs.google.com/path';

    expect(actual).toEqual(expected);
  });
});

describe('Test getURLsFromHTML Function', () => {
  it('getURLsFromHTML absolute URL', () => {
    const inputHTMLBody = `
    <html>
      <body>
        <a href="https://www.google.ps/path">
          docs.google App
        </a>
      </body>
    </html>
    `;
    const inputBaseURL = 'https://www.google.ps';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://www.google.ps/path'];

    expect(actual).toEqual(expected);
  });

  it('getURLsFromHTML relative URL', () => {
    const inputHTMLBody = `
    <html>
      <body>
        <a href="/path/">
          docs.google App
        </a>
      </body>
    </html>
    `;
    const inputBaseURL = 'https://www.google.ps';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://www.google.ps/path/'];

    expect(actual).toEqual(expected);
  });

  it('getURLsFromHTML relative and absolute URLs', () => {
    const inputHTMLBody = `
    <html>
      <body>
        <a href="https://docs.google.com/path/">
          docs.google App
        </a>
        <a href="/path/">
          docs.google App
        </a>
      </body>
    </html>
    `;
    const inputBaseURL = 'https://www.google.ps';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [
      'https://docs.google.com/path/',
      'https://www.google.ps/path/',
    ];

    expect(actual).toEqual(expected);
  });

  it('getURLsFromHTML invalid URL', () => {
    const inputHTMLBody = `
    <html>
      <body>
        <a href="invalid">
          docs.google App
        </a>
      </body>
    </html>
    `;
    const inputBaseURL = 'https://www.google.ps';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];

    expect(actual).toEqual(expected);
  });
});

describe('Test crawlPage Function', () => {
  it('crawlPage strip protocol', () => {
    const input = 'https://docs.google.com/path';
    const actual = crawlPage(input);
    const expected = 'docs.google.com/path';

    expect(actual).toEqual(expected);
  });
});
