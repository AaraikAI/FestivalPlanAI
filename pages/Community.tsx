
import React, { useState } from 'react';
import { useCommunity } from '../context/CommunityContext';
import { useAuth } from '../context/AuthContext';

const Community: React.FC = () => {
  const { posts, addPost, likePost } = useCommunity();
  const { user } = useAuth();
  const [filter, setFilter] = useState('All');
  const [newPostContent, setNewPostContent] = useState('');
  
  // Filter logic
  const displayPosts = filter === 'Challenge' 
    ? posts.filter(p => p.tags.includes('Challenge') || p.tags.includes('GreenDiwali2024'))
    : posts;

  const handlePost = () => {
    if (!newPostContent.trim()) return;
    addPost(newPostContent, ['Community']);
    setNewPostContent('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
       <div className="text-center py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">FestPlan Community 🌍</h1>
          <p className="text-gray-500 max-w-xl mx-auto">Connect with other planners, share sustainable ideas, and get inspired by the best festivals across India.</p>
       </div>

       {/* Categories */}
       <div className="flex justify-center gap-2 flex-wrap">
          {['All', 'Sustainable Tips', 'Vendor Reviews', 'DIY Decor', 'Recipes'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === cat 
                    ? 'bg-gray-900 text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                  {cat}
              </button>
          ))}
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Feed */}
           <div className="md:col-span-2 space-y-6">
               {filter === 'Challenge' && (
                   <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center justify-between mb-4 animate-in fade-in">
                       <span className="text-orange-800 font-bold">Viewing #GreenDiwali2024 Challenge Entries</span>
                       <button onClick={() => setFilter('All')} className="text-xs text-orange-600 hover:underline">Clear Filter</button>
                   </div>
               )}

               {/* Create Post Input */}
               <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold flex-shrink-0">
                      {user?.avatar || '?'}
                  </div>
                  <div className="flex-1">
                      <input 
                        type="text" 
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Share an idea or ask a question..." 
                        className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                      <div className="flex justify-between items-center mt-3 px-1">
                          <div className="flex gap-4 text-gray-400 text-xs font-medium">
                              <button className="hover:text-gray-600 flex items-center gap-1">📷 Photo</button>
                              <button className="hover:text-gray-600 flex items-center gap-1">🔗 Link</button>
                          </div>
                          <button 
                            onClick={handlePost}
                            disabled={!newPostContent.trim()}
                            className="bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-orange-700 disabled:opacity-50"
                          >
                            Post
                          </button>
                      </div>
                  </div>
               </div>

               {/* Posts */}
               {displayPosts.map(post => (
                   <div key={post.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                       <div className="p-5">
                           <div className="flex items-center gap-3 mb-4">
                               <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full border border-gray-100" />
                               <div>
                                   <h4 className="font-bold text-gray-900 text-sm">{post.author}</h4>
                                   <p className="text-xs text-gray-400">{post.timestamp}</p>
                               </div>
                               <button className="ml-auto text-gray-300 hover:text-gray-500">•••</button>
                           </div>
                           
                           <h3 className="font-bold text-lg text-gray-800 mb-2">{post.title}</h3>
                           <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.content}</p>
                           
                           {post.image && (
                               <div className="mb-4 rounded-xl overflow-hidden h-64">
                                   <img src={post.image} alt="Post" className="w-full h-full object-cover" />
                               </div>
                           )}

                           <div className="flex flex-wrap gap-2 mb-4">
                               {post.tags.map(tag => (
                                   <span key={tag} className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">#{tag}</span>
                               ))}
                           </div>

                           <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                               <div className="flex gap-6">
                                   <button 
                                     onClick={() => likePost(post.id)}
                                     className="flex items-center gap-2 text-gray-500 text-sm hover:text-red-500 transition-colors group"
                                   >
                                       <span className="group-hover:scale-110 transition-transform">❤️</span> {post.likes}
                                   </button>
                                   <button className="flex items-center gap-2 text-gray-500 text-sm hover:text-blue-500 transition-colors">
                                       <span>💬</span> {post.comments}
                                   </button>
                               </div>
                               <button className="text-gray-400 hover:text-gray-600">
                                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                               </button>
                           </div>
                       </div>
                   </div>
               ))}
           </div>

           {/* Sidebar */}
           <div className="space-y-6 hidden md:block">
               <div className="bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
                   <h3 className="font-bold text-lg mb-2">Trending Challenge 🏆</h3>
                   <p className="text-sm text-orange-100 mb-4">#GreenDiwali2024</p>
                   <p className="text-xs text-white/80 mb-4">Share your eco-friendly decoration ideas and win exclusive badges!</p>
                   <button 
                     onClick={() => setFilter('Challenge')}
                     className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-2 rounded-lg text-sm transition-colors border border-white/30"
                   >
                       View Challenge Results
                   </button>
               </div>

               <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                   <h3 className="font-bold text-gray-900 mb-4">Top Contributors</h3>
                   <div className="space-y-4">
                       {[1,2,3].map(i => (
                           <div key={i} className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                   U{i}
                               </div>
                               <div className="flex-1">
                                   <p className="text-sm font-medium text-gray-800">User {i}</p>
                                   <p className="text-[10px] text-gray-400">1.2k likes • 45 posts</p>
                               </div>
                               <span className="text-xs font-bold text-orange-500">#{i}</span>
                           </div>
                       ))}
                   </div>
               </div>
           </div>
       </div>
    </div>
  );
};

export default Community;
