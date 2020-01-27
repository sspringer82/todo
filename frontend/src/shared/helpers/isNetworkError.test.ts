import isNetworkError from './isNetworkError';
describe('isNetworkError', () => {
  it('should return true if an exception is a network error', () => {
    const networkError = new Error('Network Error');
    const result = isNetworkError(networkError);
    expect(result).toBe(true);
  });
  it('should be false if the object is not an exception', () => {
    const networkError = { message: 'Network Error' };
    const result = isNetworkError(networkError as any);
    expect(result).toBe(false);
  });
  it('should be false if the message is not Network Error', () => {
    const networkError = new Error('Some other error');
    const result = isNetworkError(networkError);
    expect(result).toBe(false);
  });
});
