import { invalidResponse, successfulResponse } from "@/utils";
import { Blogs } from "../models";

export class BlogServices {
  async createBlogService(body, files, id) {
    if (!id) {
      return invalidResponse('User id is required!');
    }

    const { title, description } = body;
    if (!title || !description || !user) {
      return invalidResponse('All fields are required!');
    }

    let media;
    if (files) {
      media = files.media[0].filename;
    }

    const blog = await Blogs.create({ title, description, media, user: id });
    if (!blog) {
      return invalidResponse('Blog creation failed!');
    }

    return successfulResponse('Blog created successfully!', blog);
  }

  async editBlogService(body, params, files) {
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

  async getSingleService(id) {
    const blog = await Blogs.findById(id);
    if (!blog) {
      return invalidResponse('Blog not found!');
    }
    return successfulResponse('Blog found successfully!', blog);
  }

  async deleteBlogService(id) {
    const blog = await Blogs.findByIdAndDelete(id);
    if (!blog) {
      return invalidResponse('Blog not found!');
    }
    return successfulResponse('Blog deleted successfully!', blog);
  }

  async getAllService() {
    const blogs = await Blogs.find();
    if (blogs.length === 0) {
      return invalidResponse('Blogs not found!');
    }
    return successfulResponse('Blogs found successfully!', blogs);
  }
}
export const { createBlogService, editBlogService, getSingleService, deleteBlogService, getAllService } = new BlogServices();
