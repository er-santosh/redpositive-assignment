import express from "express";
import {
  createUpdateUser,
  deleteUser,
  getAllUsers,
  getUser,
  sendEmail,
} from "../controllers/user";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:_id", getUser);
router.post("/users", createUpdateUser);
router.put("/users/:_id", createUpdateUser);
router.delete("/users/:_id", deleteUser);
router.post("/sendEmail", sendEmail);

export default router;
