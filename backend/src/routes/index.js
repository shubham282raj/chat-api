import { Router } from "express";
import chat_GPT_routes from "./chat-gpt.js";
import bing_chat_routes from "./bing-chat.js";

const router = Router();

router.use("/chat-gpt", chat_GPT_routes);
router.use("/bing-chat", bing_chat_routes);

export default router;
