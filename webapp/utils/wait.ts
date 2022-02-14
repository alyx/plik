/**
 * Returns a promise that resolves after the given amount of time.
 * @param ms
 * @returns
 */
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
