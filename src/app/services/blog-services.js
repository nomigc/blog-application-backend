import { invalidResponse, successfulResponse } from "@/utils";
import { Blogs } from "../models";

export class BlogServices {
  async createBlog(body) {
    const { title, description, user } = body;
    if (!title || !description || !user) {
      return invalidResponse('All fields are required!');
    }
    let image;
    if (body.image) {
      image = body.image;
    }
    const blog = await Blogs.create({ title, description, image, user });
    if (!blog) {
      return invalidResponse('Blog creation failed!');
    }

    return successfulResponse('Blog created successfully!', blog);
  }
}
export const { createBlog } = new BlogServices();
