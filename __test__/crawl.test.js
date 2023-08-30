import { normalizeURL } from '../crawl';
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
