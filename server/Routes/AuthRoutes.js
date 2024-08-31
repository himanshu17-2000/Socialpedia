import express from "express";
import { getdemo, login, register } from "../Controllers/AuthController.js";
import upload from "../multer-config.js";
const authRoutes = express.Router();
authRoutes.post("/login", login);
authRoutes.post("/register", upload.single("picture"), register);

export default authRoutes;
