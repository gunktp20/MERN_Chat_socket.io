import { StatusCodes } from "http-status-codes";
import User from "../models/User.mjs";
import { BadRequestError, UnAuthenticatedError, NotFoundError } from "../errors/index.mjs";
import validator from "validator";

const register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !email || !password) {
    throw new BadRequestError("Please provide all value !");
  }

  if (!validator.isEmail(email)) {
    throw new BadRequestError("Please provide a valid Email !");
  }

  const userAlreadyExists = await User.findOne({ username });
  if (userAlreadyExists) {
    throw new BadRequestError("username already in use");
  }

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("email already in use");
  }
  const user = await User.create({
    username,
    email,
    password,
  });

  res.status(200).json({
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    }
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide all values!");
  }
  const user = await User.findOne({ username: username }).select("+password");

  if (!user) {

    throw new NotFoundError("Not found your account!");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Password is not correct!");
  }

  const token = user.createToken();

  res.status(200).json({
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    token: token,
  });
};

const findUser = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new NotFoundError("Not found your account!");
  }

  res.status(StatusCodes.OK).json({
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

const getUsers = async (req, res) => {
  const users = await User.find()
  const { username, email, _id } = users;
  res.status(200).json(users)
}



export { register, login, findUser, getUsers };
