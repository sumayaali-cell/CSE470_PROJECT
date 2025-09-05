import { getNotification } from '@/Api/postApi';
import { UserContext } from '@/Context/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const { userId } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotification = async () => {
    try {
      const response = await getNotification(userId);
      console.log(response);
      if (response?.data?.data) {
        setNotifications(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNotification();
    }
  }, [userId]);

  if (loading) {
    return <div className="p-4 text-gray-500">Loading notifications...</div>;
  }

  if (!notifications.length) {
    return <div className="p-4 text-gray-500">No notifications found.</div>;
  }

  return (
    <div className="p-4 h-screen">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      <ul className="space-y-2">
        {notifications.map((notification, index) => (
          <Link to={`/text/${notification.user}`} key={index}>
            <li
              className="border rounded-lg p-3 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center space-x-3"
            >
              {/* Item Image */}
              {notification.imageUrl ? (
                <img
                  src={`http://localhost:8000/${notification.imageUrl.replace(/\\/g, "/")}`}
                  alt={notification.itemName || "Item"}
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/48"
                  alt="No item"
                  className="w-12 h-12 object-cover rounded"
                />
              )}

              <div className="flex flex-col">
                {/* Item Name */}
                {notification.itemName && (
                  <p className="font-semibold text-gray-800">
                    {notification.itemName}
                  </p>
                )}
                {/* Notification Message */}
                <p className="text-gray-700">
                  {notification.message || notification.title}
                </p>
                {/* Date */}
                <span className="text-xs text-gray-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;



