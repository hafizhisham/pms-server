import express from "express";
import cors from "cors";
import register from "./controller/auth/register.js";
import login from "./controller/auth/login.js";
import view from "./controller/user/view.js";
import editUser from "./controller/user/editUser.js";
import deleteUser from "./controller/user/deleteUser.js";
import listAll from "./controller/user/listAll.js";
import { check } from "express-validator";
import validatorResponse from "./middleware/validatorResponse.js";
import isAuthenticated from "./middleware/isAuthenticated.js";
import logout from "./controller/auth/logout.js";
import isAdmin from "./middleware/isAdmin.js";
import checkStatus from "./controller/health/checkStatus.js";
import addProject from "./controller/project/addProject.js";
import viewProject from "./controller/project/viewProject.js";
import listAllProject from "./controller/project/listAllProject.js";
import deleteProject from "./controller/project/deleteProject.js";
import editProject from "./controller/project/editProject.js";
import resetPassword from "./controller/user/resetpassword.js";
import ipaddress from "./controller/ipaddress/index.js";

const app = express();
app.use(express.json());
app.use(cors());

// public routes
app.get("/", checkStatus);
app.get("/public", (req, res) =>
  res.status(200).json({ message: "Public route" })
);
app.post(
  "/api/register",
  check("email").notEmpty().bail().isEmail().bail(),
  check("username").notEmpty().bail().isLength({ min: 4 }).bail(),
  check("password").notEmpty().bail().isLength({ min: 8 }).bail(),
  validatorResponse,
  register
);
app.post(
  "/api/login",
  check("identifier").notEmpty().bail(),
  check("password").notEmpty().bail().isLength({ min: 4 }).bail(),
  validatorResponse,
  login
);

// private routes
app.get("/private", isAuthenticated, (req, res) =>
  res.status(200).json({ message: "Private route", user: req.user })
);

// users
app.get("/admin", isAuthenticated, isAdmin, (req, res) =>
  res.status(200).json({ message: "Admin route", user: req.user })
);
app.get("/api/users", isAuthenticated, listAll);
app.get("/api/users/:username", isAuthenticated, view);
app.put("/api/users/:username", isAuthenticated, editUser);
app.put("/api/users/resetpassword/:username", isAuthenticated, resetPassword);
app.delete("/api/users/:username", isAuthenticated, deleteUser);
app.put("/api/logout", isAuthenticated, logout);

// projects
app.post("/api/projects/register", isAuthenticated, addProject);
app.get("/api/projects/:id", isAuthenticated, viewProject);
app.get("/api/projects", isAuthenticated, listAllProject);
app.put("/api/projects/:id", isAuthenticated, editProject);
app.delete("/api/projects/:id", isAuthenticated, deleteProject);

// get ip address
app.get("/api/ipaddress", ipaddress);

export default app;
