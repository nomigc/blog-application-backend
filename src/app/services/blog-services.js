import { invalidResponse, successfulResponse } from "@/utils";
import { Blogs } from "../models";

export class BlogServices {
  async createBlog(body, files) {
    const { title, description, user } = body;
    if (!title || !description || !user) {
      return invalidResponse('All fields are required!');
    }
    let media;
    if (files) {
      media = files.media[0].filename;
    }
    const blog = await Blogs.create({ title, description, media, user });
    if (!blog) {
      return invalidResponse('Blog creation failed!');
    }

    return successfulResponse('Blog created successfully!', blog);
  }

  async editBlog(body, params, files) {
    const { id } = params;
    if (!id) {
      return invalidResponse('Blog id is required!');
    }

    const { title, description, user } = body;
    let media;
    if (files) {
      media = files.media[0].filename;
    }
    const blog = await Blogs.findByIdAndUpdate(
      id,
      { title, description, media, user },
      { new: true }
    )
    if (!blog) {
      return invalidResponse('Blog update failed!');
    }

    return successfulResponse('Blog updated successfully!', blog);
  }

  async getSingle(id) {
    const blog = await Blogs.findById(id);
    if (!blog) {
      return invalidResponse('Blog not found!');
    }
    return successfulResponse('Blog found successfully!', blog);
  }

  async deleteBlog(id) {
    const blog = await Blogs.findByIdAndDelete(id);
    if (!blog) {
      return invalidResponse('Blog not found!');
    }
    return successfulResponse('Blog deleted successfully!', blog);
  }

  async getAll() {
    const blogs = await Blogs.find();
    if (blogs.length === 0) {
      return invalidResponse('Blogs not found!');
    }
    return successfulResponse('Blogs found successfully!', blogs);
  }
}
export const { createBlog, editBlog, getSingle, deleteBlog, getAll } = new BlogServices();
