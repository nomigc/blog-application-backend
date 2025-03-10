import { compare, genSaltSync, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

import { envSaltRounds, envToken, envTokenDuration } from '@/config';

class TokenServices {
  createHash = async (text = '') => {
    try {
      const saltRounds = genSaltSync(parseInt(envSaltRounds));
      const hashedText = await hash(text, saltRounds);
      return hashedText;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  verifyHash = async (text = '', hash = '') => {
    try {
      const isVerified = await compare(text, hash);
      return isVerified;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  createToken = (payload = {}) => {
    try {
      const token = sign(payload, envToken, {
        expiresIn: envTokenDuration,
      });
      return token;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  verifyToken = (token = '') => {
    try {
      const payload = verify(token, envToken);
      return { isValid: true, payload };
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };
}

export const { createHash, verifyHash, createToken, verifyToken } =
  new TokenServices();
