export const NETWORK_ERROR = 'Network Error';

export default function isNetworkError(error: Error) {
  return error instanceof Error && error.message === NETWORK_ERROR;
}
