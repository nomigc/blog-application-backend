import { createBlog } from "../services";

class BlogController {
  async create(req, res) {
    const { status, json } = await createBlog(req.body);
    return res.status(status).json(json);
  }
}

export const { create } = new BlogController();
