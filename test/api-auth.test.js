import { getTokenFromHeader } from '../routes/auth.js';

test('getTokenFromHeader returns null if there is no token', () => {
  const result = getTokenFromHeader({ headers: {} });
  expect(result).toBe(null);
});

test('getTokenFromHeader returns the token from the headers', () => {
  const token = 'hi.mom!';
  const authHeader = `Token ${token}`;
  const req = {
    headers: {
      authorization: authHeader
    }
  };

  const result = getTokenFromHeader(req);
  expect(result).toBe(token);
});

//
// "jest": {
//   "testEnvironment": "jest-environment-node",
//   "collectCoverageFrom": [
//     "*.js"
//   ]
// },
