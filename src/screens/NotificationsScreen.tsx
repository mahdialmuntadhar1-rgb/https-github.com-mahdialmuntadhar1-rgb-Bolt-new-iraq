import React from 'react';
import { Bell, Heart, MessageCircle, UserPlus, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const notifications = [
  { id: 1, type: 'like', user: 'Ahmed Ali', text: 'liked your post.', time: '2m ago', icon: Heart, color: 'text-red-500 bg-red-50' },
  { id: 2, type: 'comment', user: 'Sara K.', text: 'commented: "Looks amazing!"', time: '1h ago', icon: MessageCircle, color: 'text-blue-500 bg-blue-50' },
  { id: 3, type: 'follow', user: 'Green Garden Cafe', text: 'started following you.', time: '3h ago', icon: UserPlus, color: 'text-green-500 bg-green-50' },
  { id: 4, type: 'review', user: 'Baghdad Grill', text: 'replied to your review.', time: '1d ago', icon: Star, color: 'text-yellow-500 bg-yellow-50' },
];

export function NotificationsScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-[#F7F7F7] z-30 flex flex-col"
    >
      <div className="bg-white pt-safe px-4 pb-3 shadow-sm border-b border-gray-100 shrink-0">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Notifications</h1>
        <p className="text-sm text-gray-500">You have 2 unread notifications</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {notifications.map((notif, idx) => {
          const Icon = notif.icon;
          const isUnread = idx < 2;
          return (
            <div key={notif.id} className={`bg-white p-4 rounded-2xl shadow-sm border ${isUnread ? 'border-[#FF6B6B]/30' : 'border-gray-100'} flex items-start gap-3`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.color}`}>
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800"><span className="font-bold text-gray-900">{notif.user}</span> {notif.text}</p>
                <span className="text-xs text-gray-400 mt-1 block">{notif.time}</span>
              </div>
              {isUnread && <div className="w-2 h-2 rounded-full bg-[#FF6B6B] mt-2 shrink-0" />}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
