import { type NextRequest } from 'next/server';

import { pathToRegexp as pathToRegexpBase } from 'path-to-regexp';

type Autocomplete<U extends T, T = string> = U | (T & Record<never, never>);

type WithPathPatternWildcard<T = string> = `${T & string}(.*)`;
type PathPattern = Autocomplete<WithPathPatternWildcard>;

type PathMatcherParam = Array<RegExp | PathPattern> | RegExp | PathPattern;

const pathToRegexp = (path: string) => {
  try {
    return pathToRegexpBase(path);
  } catch (e) {
    throw new Error(
      `Invalid path: ${path}.\nConsult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp/tree/6.x\n${(e as Error).message}`,
    );
  }
};

const precomputePathRegex = (patterns: Array<string | RegExp>) => {
  return patterns.map(pattern => (pattern instanceof RegExp ? pattern : pathToRegexp(pattern)));
};

/**
 * Returns a function that accepts a `NextRequest` object and returns whether the request matches the list of
 * predefined paths that can be passed in as the first argument.
 *
 * You can use glob patterns to match multiple paths or a function to match against the request object.
 * Path patterns and limited regular expressions are supported.
 * For more information, see: https://www.npmjs.com/package/path-to-regexp/v/6.3.0
 */
export const createPathMatcher = (paths: PathMatcherParam) => {
  const pathPatterns = [paths || ''].flat().filter(Boolean);
  const matchers = precomputePathRegex(pathPatterns);
  return (req: NextRequest) => matchers.some(matcher => matcher.test(req.nextUrl.pathname));
};

export default createPathMatcher;
