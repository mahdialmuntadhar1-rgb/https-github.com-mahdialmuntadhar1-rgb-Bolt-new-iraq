import React, { useState } from 'react';
import { Settings, Grid, Bookmark, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { MOCK_BUSINESSES } from '../data/mockData';

export function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-[#F7F7F7] z-30 flex flex-col overflow-y-auto no-scrollbar"
    >
      <div className="bg-white pt-safe px-4 pb-6 shadow-sm border-b border-gray-100 shrink-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"><Settings size={24} /></button>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 border-2 border-white shadow-md overflow-hidden shrink-0">
            <img src="https://i.pravatar.cc/150?u=mahdi" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">Mahdi Al-Muntadhar</h2>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><MapPin size={14} /> Baghdad, Iraq</p>
            <div className="flex gap-4 mt-3">
              <div><span className="font-bold text-gray-900">124</span> <span className="text-xs text-gray-500">Posts</span></div>
              <div><span className="font-bold text-gray-900">1.2k</span> <span className="text-xs text-gray-500">Followers</span></div>
              <div><span className="font-bold text-gray-900">340</span> <span className="text-xs text-gray-500">Following</span></div>
            </div>
          </div>
        </div>
        <button className="mt-4 w-full py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
          Edit Profile
        </button>
      </div>

      <div className="bg-white border-b border-gray-100 flex shrink-0">
        {([['posts', <Grid size={20} />], ['saved', <Bookmark size={20} />]] as const).map(([tab, icon]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={cn('flex-1 py-4 flex items-center justify-center transition-colors', activeTab === tab ? 'text-[#FF6B6B] border-b-2 border-[#FF6B6B]' : 'text-gray-400')}
          >
            {icon}
          </button>
        ))}
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-1">
          {MOCK_BUSINESSES.slice(0, 9).map((b, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img src={b.imageUrl} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
