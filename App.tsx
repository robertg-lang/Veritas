import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Composer } from './components/Composer';
import { PostItem } from './components/PostItem';
import { Widgets } from './components/Widgets';
import { Tweet, NavItem, User, AnalysisResult } from './types';

// Mock Data
const currentUser: User = {
  id: 'u1',
  name: 'Alex Sterling',
  handle: 'asterling',
  avatar: 'https://picsum.photos/seed/alex/200',
  verified: true
};

const initialPosts: Tweet[] = [
  {
    id: 't1',
    author: {
      id: 'u2',
      name: 'Dr. Sarah Chen',
      handle: 'schen_phd',
      avatar: 'https://picsum.photos/seed/sarah/200',
      verified: true
    },
    content: "The intersection of quantum computing and biological systems presents a fascinating frontier. If we can model protein folding with high-fidelity qubits, the implications for medicine are boundless.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    likes: 342,
    qualityScore: 98
  },
  {
    id: 't2',
    author: {
      id: 'u3',
      name: 'Marcus Aurelius Fan',
      handle: 'stoic_life',
      avatar: 'https://picsum.photos/seed/marcus/200',
      verified: false
    },
    content: "We suffer more often in imagination than in reality. A simple truth, yet so difficult to practice in our hyper-connected age. Detachment is not indifference; it is clarity.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    likes: 89,
    qualityScore: 92
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<NavItem>(NavItem.HOME);
  const [posts, setPosts] = useState<Tweet[]>(initialPosts);

  const handlePostCreated = (content: string, analysis: AnalysisResult) => {
    const newPost: Tweet = {
      id: Date.now().toString(),
      author: currentUser,
      content: content,
      timestamp: new Date(),
      likes: 0,
      qualityScore: analysis.score,
      critique: analysis.critique
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-7xl flex relative">
        {/* Left Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Feed */}
        <main className="flex-1 min-w-0 border-r border-slate-200 bg-white min-h-screen pb-20">
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <h1 className="text-xl font-bold text-slate-900">{activeTab === NavItem.HOME ? 'Home' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          </div>

          {activeTab === NavItem.HOME && (
            <>
              <Composer currentUser={currentUser} onPostCreated={handlePostCreated} />
              <div className="divide-y divide-slate-100">
                {posts.map((post) => (
                  <PostItem key={post.id} post={post} />
                ))}
              </div>
            </>
          )}

          {activeTab !== NavItem.HOME && (
             <div className="flex flex-col items-center justify-center h-[50vh] text-slate-400">
                <p>This section is under construction.</p>
             </div>
          )}
        </main>

        {/* Right Widgets */}
        <Widgets />
        
        {/* Mobile Nav (Bottom) - Visible only on small screens */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3 z-50">
           {/* Simple icons for mobile nav reuse logic from Sidebar if needed, keeping it simple here */}
           <div className="text-indigo-600 font-bold">Veritas</div>
        </div>
      </div>
    </div>
  );
}