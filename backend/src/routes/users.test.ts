import { expect, jest, describe, test, afterEach } from '@jest/globals';
import request from 'supertest';
import app from '../app';
import { User, MOCK_USERS } from '../models/__mock__/user';

jest.mock('../models/user', () => jest.requireActual('../models/__mock__/user'));
jest.mock('jsonwebtoken', () => jest.requireActual('../models/__mock__/jsonwebtoken'));

afterEach(() => {
  MOCK_USERS.splice(0, MOCK_USERS.length);
});

describe('GET /users/me', () => {
  test('올바른 JWT 쿠키가 설정되어있으면 유저 정보와 함께 200 응답을 받는다.', async () => {
    MOCK_USERS.push(new User(1, 'apple@example.com', 'mock_encrypted_apple123'));

    const response = await request(app)
      .get('/users/me')
      .set('Cookie', 'accessToken=mock_jwt_apple@example.com');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      email: 'apple@example.com',
    });
  });
});
