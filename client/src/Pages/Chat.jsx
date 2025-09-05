import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '@/Context/UserContext';
import { getChats, postChat } from '@/Api/chatApi';

const Chat = () => {
  const { userId } = useContext(UserContext);
  const { id: receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const response = await getChats(userId, receiverId);
      setMessages(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      const res = await postChat({
        senderId: userId,
        receiverId,
        text,
      });

      setText('');
      setMessages((prev) => [...prev, res.data.data]);
      scrollToBottom();
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  useEffect(() => {
    if (userId && receiverId) {
      fetchMessages();
    }
  }, [userId, receiverId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white flex flex-col items-center p-4">
      <div className="w-full max-w-3xl flex flex-col border border-zinc-700 rounded-xl overflow-hidden bg-zinc-800 shadow-lg">
        {/* Header */}
       

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-zinc-900">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xs px-4 py-3 rounded-xl text-sm shadow-md ${
                msg.senderId === userId
                  ? 'ml-auto bg-indigo-600 text-white'
                  : 'mr-auto bg-zinc-700 text-white'
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-3 border-t border-zinc-700 p-4 bg-zinc-800">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 rounded-full bg-zinc-700 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-full text-white font-medium transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
