import prisma from "../DB/db.config.js";

// fetch all users
export const fetchUsers = async (req, res) => {
  const fetchUsers = await prisma.user.findMany({
    include: {
      post: {
        select: {
          title: true,
          comment_count: true
        }
      },
    },
    // select: {
    //   _count: {
    //     select: {
    //       post: true,
    //       comment: true
    //     },
    //   },
    // },
  });

  return res.json({
    status: 200,
    data: fetchUsers,
    msg: "Fetch all users successfully",
  });
};

// fetch single user
export const showUser = async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });

  return res.json({
    status: 200,
    data: user,
    msg: "Fetch single user successfully",
  });
};

// create users
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.json({
      status: 400,
      message: "Email Already Taken. please input another one",
    });
  }

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return res.json({
    status: 200,
    data: newUser,
    msg: "User created successfully",
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
