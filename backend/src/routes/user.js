import { Router } from "express";
import {
  handleRegister,
  handleLogin,
  handleGetAllUsers,
  handleGetUserById
} from "../controllers/user.js";

const router = Router();

// ✅ Routes
router.get("/get-all", handleGetAllUsers);
router.get('/:id', handleGetUserById);
router.post("/register", handleRegister);
router.post("/login", handleLogin);

export default router;
