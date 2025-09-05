import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getChatByGroup } from '@/Api/chatApi';
import { UserContext } from '@/Context/UserContext';

const ChatList = () => {
  const { userId } = useContext(UserContext);
  const [list, setList] = useState([]);

  const fetchChatList = async () => {
    try {
      const response = await getChatByGroup(userId);
      setList(response.data.users);
      console.log(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChatList();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">💬 Chats</h2>

        {list.length === 0 ? (
          <p className="text-gray-500 text-center">No chats yet.</p>
        ) : (
          <div className="space-y-4">
            {list.map((user, index) => (
              <Link
                to={`/text/${user.userId}`}
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition group shadow-sm"
              >
                {/* Avatar Placeholder */}
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold group-hover:scale-105 transition">
                  {user.userId?.charAt(0).toUpperCase() || 'U'}
                </div>

                <div className="flex-1">
                  <p className="font-medium text-sm">
                    Chat with <span className="text-indigo-600">{user.userId}</span>
                  </p>
                  <p className="text-xs text-gray-500">Click to open conversation</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
