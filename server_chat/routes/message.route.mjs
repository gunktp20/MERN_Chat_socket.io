import express from "express";
import { createMessage, getMessage } from "../controllers/message.controller.mjs";
const router = express.Router();

router.route("/").post(createMessage)
router.route("/:chatId").get(getMessage)

export default router;
