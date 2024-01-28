import express from "express";
import { createChat, findUserChats, findChat } from "../controllers/chat.controller.mjs";
const router = express.Router();

router.route("/find/:firstId/:secondId").get(findChat)
router.route("/").post(createChat);
router.route("/:userId").get(findUserChats);



export default router;
