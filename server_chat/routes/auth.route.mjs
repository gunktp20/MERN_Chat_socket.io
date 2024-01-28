import express from "express";
import { findUser, login, register ,getUsers} from "../controllers/auth.controller.mjs";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/find/:userId").get(findUser)
router.route("/user").get(getUsers)

export default router;
