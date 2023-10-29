import prisma from "../DB/db.config.js";

// fetch all comment
export const fetchComment = async (req, res) => {
  const comments = await prisma.comment.findMany({
    include: {
      user: true,
      post: {
        include: {
          user: true,
        },
      },
    },
  });

  return res.json({
    status: 200,
    data: comments,
    msg: "Fetch all comments successfully",
  });
};

// fetch single comment
export const singleComment = async (req, res) => {
  const commentId = req.params.id;
  const comment = await prisma.comment.findFirst({
    where: {
      id: Number(commentId),
    },
  });

  return res.json({
    status: 200,
    data: comment,
    msg: "Fetch single comment successfully",
  });
};

// create comment
export const createComment = async (req, res) => {
  const { user_id, post_id, comment } = req.body;

  await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comment_count: {
        increment: 1,
      },
    },
  });

  const newComment = await prisma.comment.create({
    data: {
      user_id: Number(user_id),
      post_id: Number(post_id),
      comment,
    },
  });

  return res.json({
    status: 200,
    data: newComment,
    msg: "Comment created successfully",
  });
};

// update comment
export const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const { comment } = req.body;

  const updateComment = await prisma.comment.update({
    where: {
      id: Number(commentId),
    },
    data: {
      comment,
    },
  });

  return res.json({
    status: 200,
    data: updateComment,
    msg: "Comment update Successfully",
  });
};

// delete comment
export const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  const { postId } = req.body;
  await prisma.post.update({
    where: {
      id: Number(postId),
    },
    data: {
      comment_count: {
        decrement: 1,
      },
    },
  });
  const deleteComment = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  return res.json({
    status: 200,
    data: deleteComment,
    msg: "Delete comment successfully",
  });
};
