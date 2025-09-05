const express = require("express");
const { postChat, getChats, getChatGroup } = require("../controllers/chatController");

const router = express.Router();

router.post('/post-chat',postChat)
router.get('/get-chat',getChats)
router.get('/get-chat-by-group/:userId',getChatGroup)


module.exports = router;