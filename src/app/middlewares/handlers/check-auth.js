import { Users } from '@/app/models';
import { verifyToken } from '@/app/services';
import { invalidResponse } from '@/utils';

export async function checkAuth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(404)
      .send(invalidResponse('Authorizations was not provided', null));
  }
  const token = authorization.split(' ')[1];

  if (!token) {
    return res
      .status(404)
      .send(invalidResponse('Token was not provided', null));
  }
  try {
    const { _, payload } = verifyToken(token);

    const { id, email } = payload;
    req.user = {
      id,
      email,
    };

    const user = await Users.findById(id);
    if (!user)
      return res
        .status(401)
        .json(invalidResponse('Invalid user! Login again!', null));

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json(invalidResponse('Not Authorized!', null));
  }
}
