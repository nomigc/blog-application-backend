import { create, createBlog, deleteBlog, editBlog, getAllBlog, getSingleBlog } from '@/app/controllers';
import { AsyncTryCatch, router as BlogRouter } from '@/utils';

const url = 'blog'
const appendUrl = (segment) => `${url}/${segment}`

BlogRouter.post(url, AsyncTryCatch(createBlog))
BlogRouter.put(appendUrl(':id'), AsyncTryCatch(editBlog))
BlogRouter.get(appendUrl(':id'), AsyncTryCatch(getSingleBlog))
BlogRouter.delete(appendUrl(':id'), AsyncTryCatch(deleteBlog))
BlogRouter.get(url, AsyncTryCatch(getAllBlog))

export default BlogRouter