import { Users } from '@/app/models';
import { invalidResponse, successfulResponse } from '@/utils';
import { createHash, createToken, verifyHash } from '../services';

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    const { user } = req;

    const isPasswordValid = await verifyHash(password, user.password);
    if (!isPasswordValid) {
      return res 
        .status(400)
        .json(invalidResponse('Email or password is incorrect'));
    }

    const { id, fullName } = user;

    const payload = { id, email, fullName };

    const token = createToken(payload);

    user.password = '';

    res.status(200).json(
      successfulResponse('Users logged in successfully!', {
        user,
        token,
      })
    );
  }

  register = async (req, res) => {
    const { email, password, fullName } = req.body;

    const passwordHash = await createHash(password);

    const user = new Users({
      email,
      fullName,
      password: passwordHash,
    });

    if (!user) {
      return res.status(400).json(invalidResponse('Registration failed'));
    }
    const savedUser = await user.save();

    if (!savedUser) {
      return res.status(400).json(invalidResponse('Registration failed'));
    }
    res
      .status(200)
      .json(successfulResponse('Registration successful', savedUser));
  };
}

export const { login, register } = new AuthController();
