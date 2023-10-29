import prisma from "../DB/db.config.js";

// fetch all posts
export const fetchPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      comment: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      id: "desc",
    },

    where: {
      comment_count: {
        gt: 0,
      },
    },
  });

  return res.json({
    status: 200,
    data: posts,
    msg: "Fetch all posts successfully",
  });
};

// fetch single post
// export const singlePost = async (req, res) => {
//   const postId = req.params.id;
//   const post = await prisma.post.findFirst({
//     where: {
//       id: Number(postId),
//     },
//   });

//   return res.json({
//     status: 200,
//     data: post,
//     msg: "Fetch single posts successfully",
//   });
// };

// create post
export const createPost = async (req, res) => {
  const { user_id, title, description } = req.body;
  const newPost = await prisma.post.create({
    data: {
      user_id: Number(user_id),
      title,
      description,
    },
  });

  return res.json({
    status: 200,
    data: newPost,
    msg: "Post created successfully",
  });
};

// update post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, description } = req.body;

  const updatePost = await prisma.post.update({
    where: {
      id: Number(postId),
    },
    data: {
      title,
      description,
    },
  });

  return res.json({
    status: 200,
    data: updatePost,
    msg: "Post update Successfully",
  });
};

// delete post
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const deletePost = await prisma.post.delete({
    where: {
      id: Number(postId),
    },
  });

  return res.json({
    status: 200,
    data: deletePost,
    msg: "Delete user successfully",
  });
};

// Search the post
export const searchPost = async (req, res) => {
  const { query } = req.query;
  const post = await prisma.post.findMany({
    where: {
      description: {
        search: query,
      },
    },
  });

  return res.json({
    status: 200,
    data: post,
    msg: "Search post successfully",
  });
}
