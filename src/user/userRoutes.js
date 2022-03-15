const { Router } = require("express");
const { addUser, login, updatePassword, deleteUser, userList } = require("./userControllers");
const { hashPassword, comparePassword, checkToken } = require("../middleware");
const userRouter = Router();

//POST request goes to user folder, then hash, then userController.js addUser
userRouter.post("/user", hashPassword, addUser);
//Can't have the same http verbs on the same path e.g. post("/user")
userRouter.post("/login", comparePassword, login);
userRouter.get("/user", checkToken, login);
// userRouter.get("/allusers", userList);
userRouter.patch("/user", hashPassword, checkToken, updatePassword);
userRouter.delete("/user/:filterKey/:deleteVal", deleteUser);

module.exports = userRouter;