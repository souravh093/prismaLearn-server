import prisma from "../DB/db.config.js";

// fetch all posts
export const fetchPosts = async (req, res) => {
  const posts = await prisma.user.findMany();

  return res.json({
    status: 200,
    data: posts,
    msg: "Fetch all posts successfully",
  });
};

// fetch single post
export const singlePost = async (req, res) => {
  const userId = req.params.id;
  const post = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });

  return res.json({
    status: 200,
    data: post,
    msg: "Fetch single posts successfully",
  });
};

// create post
export const createPost = async (req, res) => {
  const { user_id, title, description } = req.body;

  const newPost = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return res.json({
    status: 200,
    data: newPost,
    msg: "Post created successfully",
  });
};

// update user
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;

  const updateUser = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      name,
      email,
      password,
    },
  });

  return res.json({
    status: 200,
    data: updateUser,
    msg: "User update Successfully",
  });
};

// delete user
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.user.delete({
    where: {
      id: Number(userId),
    },
  });

  return res.json({ status: 200, data: user, msg: "Delete user successfully" });
};
