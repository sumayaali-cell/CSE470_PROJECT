const chatModel = require('../models/chatModel')

exports.postChat = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;
    
    if (!senderId || !receiverId || !text) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    const newMessage = new chatModel({
      senderId,
      receiverId,
      text,
    });

    await newMessage.save();

    res.status(201).json({ success: true, message: 'Message sent', data: newMessage });
  } catch (error) {
    
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};



exports.getChats = async (req, res) => {
  const { senderId, receiverId } = req.query;

  try {
    const chats = await chatModel.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ],
    }).sort({ createdAt: 1 }); 

    res.status(200).json({ data: chats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching chats', error: err });
  }
};




exports.getChatGroup = async (req, res) => {
  const { userId } = req.params;

  try {
    const conversations = await chatModel.aggregate([
      {
        $match: {
          $or: [
            { senderId: userId },
            { receiverId: userId }
          ]
        }
      },
      {
        $project: {
          otherUser: {
            $cond: [
              { $eq: ["$senderId", userId] },
              "$receiverId",
              "$senderId"
            ]
          }
        }
      },
      {
        $group: {
          _id: "$otherUser"
        }
      },
      {
        $project: {
          _id: 0,
          userId: "$_id"
        }
      }
    ]);

    res.status(200).json({ success: true, users: conversations });
  } catch (err) {
    console.error("Error in getChatGroup:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


