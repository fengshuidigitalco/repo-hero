import { determineErrorMessage } from '../utils';

describe('determineErrorMessage', () => {
  it('returns the correct text for a 403 error', () => {
    expect(determineErrorMessage(403)).toEqual(
      'Search request limit reached. Please try again in a bit',
    );
  });

  it('returns the correct text for a 422 error', () => {
    expect(determineErrorMessage(422)).toEqual(
      'Incorrectly formatted query. This code is broken!',
    );
  });

  it('returns the correct text for a 503 error', () => {
    expect(determineErrorMessage(503)).toEqual(
      "Gitub's API is down. Please try again in a bit.",
    );
  });

  it('returns the correct text for a 401 error', () => {
    expect(determineErrorMessage(401)).toEqual(
      'An error occurred. Please try again in a bit.',
    );
  });
});
