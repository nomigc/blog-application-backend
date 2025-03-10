import { COLLECTIONS } from '@/utils/constants';

export default function getBlogModel({ Schema, model, models }) {
  const blogSchema = new Schema({
    title: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: true
    },
    media: {
      type: [String],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      require: true
    }
  });

  const Blogs =
    models[COLLECTIONS.BLOGS] || model(COLLECTIONS.BLOGS, blogSchema);

  return Blogs;
}
