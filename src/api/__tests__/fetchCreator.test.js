import fetchMock from 'jest-fetch-mock';
import { fetchCreator } from '../';

let fetch;

beforeEach(() => {
  fetch = jest.spyOn(window, 'fetch');
});

afterEach(() => {
  fetch.mockRestore();
});

describe('fetchCreator', () => {
  it('should resolve as the json object', async () => {
    const data = { items: [{ id: 123, name: 'react-redux' }] };

    fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 'OK',
        headers: {
          Authorization: 'some-token',
          get: () => 'some-token',
        },
        json: () => Promise.resolve(data),
      }),
    );

    fetchMock.mockResponseOnce('', { status: 200 });

    const result = await fetchCreator({
      url: '/search/repositories?q=q=react-redux&sort=best%20match&order=desc',
    });

    expect(result).toEqual(data);
  });

  it('should return with an error and redirect following status 403', async () => {
    fetch.mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 403,
        statusText: 'Bad Request',
        json: () =>
          Promise.resolve({ message: 'Too many requests. Slow down!' }),
      }),
    );

    fetchMock.mockResponseOnce('', { status: 403 });

    const result = await fetchCreator({
      url: '/search/repositories?q=q=react-redux&sort=best%20match&order=desc',
    });

    expect(result.error).toEqual({
      message: 'Too many requests. Slow down!',
      status: 403,
    });
  });
});
