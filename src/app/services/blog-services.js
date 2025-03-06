import { invalidResponse, successfulResponse } from "@/utils";
import { Blogs } from "../models";

export class BlogServices {
  async createBlogService(body, files, id) {
    if (!id) {
      return invalidResponse('User id is required!');
    }

    const { title, description } = body;
    if (!title || !description) {
      return invalidResponse('All fields are required!');
    }

    let media = [];
    if (files && files.length > 0) {
      media = files.map((file) => file.filename)
    }

    const blog = await Blogs.create({ title, description, media, user: id });
    if (!blog) {
      return {
        status: 400,
        json: invalidResponse('Blog creation failed!')
      }
    }

    return {
      status: 201,
      json: successfulResponse('Blog created successfully!', blog)
    }
  }

  async editBlogService(body, id, files) {
    if (!id) {
      return {
        status: 404,
        json: invalidResponse('Blog id is required!')
      }
    }

    const { title, description, user } = body;
    let media;
    if (files && files.length > 0) {
      media = files.map((file) => file.filename)
    }

    const blog = await Blogs.findByIdAndUpdate(
      id,
      { title, description, media, user },
      { new: true }
    )
    if (!blog) {
      return {
        status: 404,
        json: invalidResponse('Blog not found!')
      }
    }

    return {
      status: 200,
      json: successfulResponse('Blog edited successfully!', blog)
    }
  }

  async getSingleService(id) {
    const blog = await Blogs.findById(id);
    if (!blog) {
      return {
        status: 404,
        json: invalidResponse('Blog not found!')
      }
    }
    return {
      status: 200,
      json: successfulResponse('Blog found successfully!', blog)
    }
  }

  async deleteBlogService(id) {
    const blog = await Blogs.findByIdAndDelete(id);
    if (!blog) {
      return {
        status: 404,
        json: invalidResponse('Blog not found!')
      }
    }
    return {
      status: 200,
      json: successfulResponse('Blog deleted successfully!', blog)
    }
  }

  async getAllService() {
    const blogs = await Blogs.find();
    if (blogs.length === 0) {
      return {
        status: 404,
        json: invalidResponse('Blogs not found!')
      }
    }
    return {
      status: 200,
      json: successfulResponse('Blogs found successfully!', blogs)
    }
  }
}
export const { createBlogService, editBlogService, getSingleService, deleteBlogService, getAllService } = new BlogServices();
