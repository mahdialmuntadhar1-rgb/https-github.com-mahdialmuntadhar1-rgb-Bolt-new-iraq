import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { MOCK_STORIES } from '../data/mockData';
import { X, Heart, Send, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function StoryViewerScreen({ storyId }: { storyId: string }) {
  const { pop } = useNavigation();
  const initialIndex = MOCK_STORIES.findIndex((s) => s.id === storyId);
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const STORY_DURATION = 5000;
  const currentStory = MOCK_STORIES[currentIndex];

  useEffect(() => {
    if (isPaused) return;
    setProgress(0);
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / STORY_DURATION) * 100;
      if (newProgress >= 100) {
        clearInterval(timer);
        handleNext();
      } else {
        setProgress(newProgress);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const handleNext = () => {
    if (currentIndex < MOCK_STORIES.length - 1) { setCurrentIndex((p) => p + 1); setProgress(0); }
    else pop();
  };

  const handlePrev = () => {
    if (currentIndex > 0) { setCurrentIndex((p) => p - 1); setProgress(0); }
    else setProgress(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 bg-black z-[100] flex flex-col"
    >
      {/* Progress Bars */}
      <div className="absolute top-0 left-0 right-0 pt-safe px-2 flex gap-1 z-20">
        {MOCK_STORIES.map((_, idx) => (
          <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-white transition-all duration-75 ease-linear"
              style={{ width: idx === currentIndex ? `${progress}%` : idx < currentIndex ? '100%' : '0%' }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 pt-safe mt-4 px-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <img src={currentStory.authorImage} alt={currentStory.authorName} className="w-8 h-8 rounded-full border border-white/50" />
          <div>
            <h3 className="text-white font-bold text-sm drop-shadow-md">{currentStory.authorName}</h3>
            <p className="text-white/80 text-xs drop-shadow-md">{currentStory.timestamp}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white drop-shadow-md"><MoreHorizontal size={24} /></button>
          <button onClick={pop} className="text-white drop-shadow-md"><X size={28} /></button>
        </div>
      </div>

      {/* Image */}
      <div
        className="flex-1 relative"
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentStory.id}
            src={currentStory.imageUrl}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-y-0 left-0 w-1/3 z-10" onClick={handlePrev} />
        <div className="absolute inset-y-0 right-0 w-2/3 z-10" onClick={handleNext} />
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 pb-safe p-4 flex items-center gap-3 z-20 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex-1 bg-white/20 backdrop-blur-md rounded-full px-4 py-3 border border-white/30 flex items-center">
          <input type="text" placeholder="Send message..." className="bg-transparent text-white placeholder-white/70 outline-none w-full text-sm" />
        </div>
        <button className="w-12 h-12 rounded-full flex items-center justify-center text-white"><Heart size={28} /></button>
        <button className="w-12 h-12 rounded-full flex items-center justify-center text-white"><Send size={24} /></button>
      </div>
    </motion.div>
  );
}
