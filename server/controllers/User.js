import Users from "../model/UsersModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    userName,
    birthday,
    // picture,
  } = req.body;
  const salt = await bcrypt.genSalt();
  const passwordToString = password.toString();
  const hashPassword = await bcrypt.hash(
    passwordToString,
    salt
  );
  try {
    await Users.create({
      email: email,
      password: hashPassword,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      birthday: birthday,
      // picture: picture,
    });
    res.json({ msg: "Register succesfull!" });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      msg: "Email or UserName already exist",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(
      req.body.password.toString(),
      user[0].password.toString()
    );
    if (!match)
      return res
        .status(400)
        .json({ msg: "Wrong Password!" });
    const userId = user[0].id;
    const email = user[0].email;
    const accessToken = jwt.sign(
      { userId, email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1200s" }
    );
    res.coolie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 1200 * 1000,
    });
    res.json({ token: accessToken });
  } catch (e) {
    console.log(e);
    res
      .status(404)
      .json({ msg: "Email wasn't found..." });
  }
};

export const logout = (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken)
    return res
      .status(204)
      .json({ msg: "loged out" });
  res.clearCookie("accessToken");
  console.log(
    "accessToken 2=>",
    req.cookies.accessToken
  );
  return res.sendStatus(200);
};

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: [
        "email",
        "firstName",
        "lastName",
        "userName",
        "birthday",
      ],
    });
    res.json(users);
  } catch (e) {
    console.log(e);
    res
      .status(404)
      .json({ msg: "Users not found" });
  }
};
