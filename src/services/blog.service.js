import Blog from "../models/blog.model.js";

//@desc     Get all blogs
//@route    GET /api/blogs/
//@access   Public
const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    if (!blogs) req.status(404).send({ msg: "Blogs not found." });
    res.json(blogs);
  } catch (error) {
    res.status(500);
    return next(error);
  }
};

//@desc     Get single blog
//@route    GET /api/blogs/:id
//@access   Public
const getSingleBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById({ _id: req.params.id });
    if (!blog) res.status(404).send({ msg: "Blog not found." });
    res.json(blog);
  } catch (error) {
    res.status(500);
    return next(error);
  }
};

//@desc     Create a blog
//@route    POST /api/blogs/
//@access   Private
const createBlog = async (req, res, next) => {
  try {
    const blog = new Blog({
      title: req.body.title,
      type: req.body.type,
      image: req.body.image,
      shortDescription: req.body.shortDescription,
      longDescription: req.body.longDescription,
      author: req.user.id,
      content: req.body.content,
      isPublished: false,
    });
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500);
    return next(error);
  }
};

//@desc     Update a blog
//@route    PUT /api/blogs/:id
//@access   Private
const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById({ _id: req.params.id });
    if (!blog) res.status(404).send({ msg: "Blog not found." });
    if (blog) {
      blog.title = req.body.title || blog.title;
      blog.slug = req.body.slug || blog.slug;
      blog.shortDescription =
        req.body.shortDescription || blog.shortDescription;
      blog.longDescription = req.body.longDescription || blog.longDescription;
      blog.content = req.body.content || blog.content;
      blog.isPublished = req.body.isPublished || blog.isPublished;
    }
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(500);
    return next(error);
  }
};

//@desc     Publish a Blog
//@route    PUT /api/blogs/:id/publish
//@access   Private
const publishBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById({ _id: req.params.id });
    if (!blog) res.status(404).send({ msg: "Blog not found." });

    if (blog) {
      blog.isPublished = true;
      blog.publishedAt = Date.now();
    }
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

//@desc     Remove a blog
//@route    DELETE /api/blogs/:id
//@access   Private
const removeBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById({ _id: req.params.id });
    if (!blog) res.status(404).send({ msg: "Blog not found." });
    await blog.remove();
    res.status(200).json({ message: "Blog Removed." });
  } catch (error) {
    res.status(500);
    return next(error);
  }
};

export {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  publishBlog,
  removeBlog,
};
