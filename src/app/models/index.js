import { Schema, model, models } from 'mongoose';

// ** models
import getUsersModel from './Users';
import getBlogModel from './Blog';

const args = {
  Schema,
  model,
  models,
};

const Users = getUsersModel(args);
const Blogs = getBlogModel(args);

export { Users, Blogs };
