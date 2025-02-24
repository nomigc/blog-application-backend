import { createBlog, editBlog } from "../services";

class BlogController {
  async create(req, res) {
    const { status, json } = await createBlog(req.body, req.files);
    return res.status(status).json(json);
  }

  async edit(req, res) {
    const { status, json } = await editBlog(req.body, req.params, req.files);
    return res.status(status).json(json);
  }

  async getSingle(req, res) {
    const { status, json } = await editBlog(req.params);
    return res.status(status).json(json);
  }
}

export const { create, edit } = new BlogController();
