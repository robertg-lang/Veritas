import React from 'react';
import { Tweet } from '../types';
import { Heart, MessageCircle, Share2, BadgeCheck } from 'lucide-react';

interface PostItemProps {
  post: Tweet;
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m";
    return Math.floor(seconds) + "s";
  };

  return (
    <div className="border-b border-slate-100 p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
      <div className="flex gap-4">
        <img 
          src={post.author.avatar} 
          alt={post.author.name} 
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-base hover:underline">{post.author.name}</span>
              {post.author.verified && <BadgeCheck className="w-4 h-4 text-indigo-500" />}
              <span className="text-slate-500 text-sm">@{post.author.handle}</span>
              <span className="text-slate-400 text-sm">· {timeAgo(post.timestamp)}</span>
            </div>
            
            <div className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity">
              Score: {post.qualityScore}
            </div>
          </div>
          
          <p className="text-slate-800 mt-1 mb-3 text-[15px] leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
          
          <div className="flex items-center justify-between text-slate-400 max-w-md">
            <button className="flex items-center gap-2 group/btn hover:text-indigo-500 transition-colors">
              <div className="p-2 rounded-full group-hover/btn:bg-indigo-50 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-xs">Reply</span>
            </button>
            <button className="flex items-center gap-2 group/btn hover:text-pink-500 transition-colors">
              <div className="p-2 rounded-full group-hover/btn:bg-pink-50 transition-colors">
                 <Heart className="w-4 h-4" />
              </div>
              <span className="text-xs">{post.likes}</span>
            </button>
             <button className="flex items-center gap-2 group/btn hover:text-green-500 transition-colors">
              <div className="p-2 rounded-full group-hover/btn:bg-green-50 transition-colors">
                 <Share2 className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};