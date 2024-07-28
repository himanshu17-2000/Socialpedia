import express from "express";
import { getdemo, login } from "../Controllers/AuthController.js";

const authRoutes = express.Router();
authRoutes.post("/login", login);

export default authRoutes;
