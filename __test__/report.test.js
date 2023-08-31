import { sortPages } from '../src/report';
import { describe, it, expect } from '@jest/globals';

describe('Test sortPages Function', () => {
  it('sortPages', () => {
    const input = {
      'wagslane.dev': 20,
      'wagslane.dev/tags': 4,
      'wagslane.dev/about': 12,
    };
    const actual = sortPages(input);
    const expected = [
      ['wagslane.dev', 20],
      ['wagslane.dev/about', 12],
      ['wagslane.dev/tags', 4],
    ];

    expect(actual).toEqual(expected);
  });

  it('sortPages', () => {
    const input = {
      'wagslane.dev/posts/things-i-dont-want-to-do-to-grow-business': 2,
      'wagslane.dev/tags': 62,
      'wagslane.dev/tags/business': 1,
      'wagslane.dev/index.xml': 62,
      'wagslane.dev/posts/dark-patterns': 2,
      'wagslane.dev/about': 62,
      'wagslane.dev/posts/zen-of-proverbs': 2,
      'wagslane.dev': 63,
      'wagslane.dev/tags/clean-code': 1,
    };
    const actual = sortPages(input);
    const expected = [
      ['wagslane.dev', 63],
      ['wagslane.dev/tags', 62],
      ['wagslane.dev/index.xml', 62],
      ['wagslane.dev/about', 62],
      ['wagslane.dev/posts/things-i-dont-want-to-do-to-grow-business', 2],
      ['wagslane.dev/posts/dark-patterns', 2],
      ['wagslane.dev/posts/zen-of-proverbs', 2],
      ['wagslane.dev/tags/business', 1],
      ['wagslane.dev/tags/clean-code', 1],
    ];

    expect(actual).toEqual(expected);
  });
});
