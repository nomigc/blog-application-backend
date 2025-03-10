import { createBlogService, deleteBlogService, editBlogService, getAllService, getSingleService } from "../services";
class BlogController {
  async createBlog(req, res) {
    const { id } = req.user;
    const { status, json } = await createBlogService(req.body, req.files, id);
    return res.status(status).json(json);
  }

  async editBlog(req, res) {
    const { status, json } = await editBlogService(req.body, req.params.id, req.files);
    return res.status(status).json(json);
  }

  async getSingleBlog(req, res) {
    const { status, json } = await getSingleService(req.params.id);
    return res.status(status).json(json);
  }

  async deleteBlog(req, res) {
    const { status, json } = await deleteBlogService(req.params.id);
    return res.status(status).json(json);
  }

  async getAllBlog(req, res) {
    const { status, json } = await getAllService(req.params);
    return res.status(status).json(json);
  }
}

export const { createBlog, editBlog, getSingleBlog, deleteBlog, getAllBlog } = new BlogController();
