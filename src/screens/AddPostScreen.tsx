import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { X, Image as ImageIcon, Video, MapPin, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

export function AddPostScreen() {
  const { pop } = useNavigation();
  const [content, setContent] = useState('');

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-white z-50 flex flex-col"
    >
      <div className="pt-safe px-4 pb-3 shadow-sm border-b border-gray-100 flex items-center justify-between">
        <button onClick={pop} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full"><X size={24} /></button>
        <h1 className="text-lg font-bold text-gray-900">Create Post</h1>
        <button
          onClick={pop}
          disabled={!content.trim()}
          className="bg-[#FF6B6B] text-white px-4 py-1.5 rounded-full font-bold text-sm disabled:opacity-50"
        >
          Post
        </button>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <div className="flex gap-3 mb-4">
          <img src="https://i.pravatar.cc/150?u=mahdi" className="w-10 h-10 rounded-full object-cover" />
          <div className="flex-1">
            <h3 className="font-bold text-sm text-gray-900">Mahdi Al-Muntadhar</h3>
            <div className="flex items-center gap-1 text-xs text-[#FF6B6B] bg-[#FF6B6B]/10 w-fit px-2 py-0.5 rounded-full mt-1">
              <MapPin size={10} /> Baghdad
            </div>
          </div>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening in your city?"
          className="w-full flex-1 resize-none outline-none text-lg text-gray-800 placeholder-gray-400"
          autoFocus
        />
        <div className="border-t border-gray-100 pt-4 pb-safe flex items-center gap-4 text-gray-500">
          <button className="hover:text-[#FF6B6B] transition-colors"><ImageIcon size={24} /></button>
          <button className="hover:text-[#FF6B6B] transition-colors"><Video size={24} /></button>
          <button className="hover:text-[#FF6B6B] transition-colors"><MapPin size={24} /></button>
          <button className="hover:text-[#FF6B6B] transition-colors"><Smile size={24} /></button>
        </div>
      </div>
    </motion.div>
  );
}
