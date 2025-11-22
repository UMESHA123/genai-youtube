import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_VIDEOS, CURRENT_USER } from '../constants';
import { Bell, ChevronRight, Search } from 'lucide-react';

const Channel = () => {
  const { channelId } = useParams();
  // In a real app, fetch channel details by ID. Using current user or first video's channel for mock.
  const isMe = channelId === 'me' || channelId === CURRENT_USER.id;
  const channelUser = isMe ? CURRENT_USER : { 
      id: 'c1', 
      name: 'Tech Master', 
      avatar: MOCK_VIDEOS[0].channelAvatar, 
      subscribers: '500K', 
      banner: 'https://picsum.photos/seed/banner2/1200/250', 
      description: 'The best tech reviews and tutorials on the planet.'
  };

  const [activeTab, setActiveTab] = useState('videos');
  
  const channelVideos = MOCK_VIDEOS; // Filter by channel in real app

  return (
    <div className="w-full">
      {/* Banner */}
      <div className="h-40 sm:h-60 w-full overflow-hidden">
          <img src={channelUser.banner} alt="Banner" className="w-full h-full object-cover" />
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img src={channelUser.avatar} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-[#0f0f0f] -mt-4 sm:-mt-0" />
            <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold">{channelUser.name}</h1>
                <div className="text-gray-400 text-sm mt-1 flex flex-wrap justify-center sm:justify-start gap-2">
                    <span>@{channelUser.name.replace(' ', '')}</span>
                    <span>•</span>
                    <span>{channelUser.subscribers} subscribers</span>
                    <span>•</span>
                    <span>124 videos</span>
                </div>
                <p className="text-gray-400 text-sm mt-2 max-w-2xl flex items-center justify-center sm:justify-start gap-1 cursor-pointer hover:text-gray-200">
                    {channelUser.description} <ChevronRight size={14} />
                </p>
                <div className="mt-4 flex gap-3 justify-center sm:justify-start">
                    <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">
                        Subscribe
                    </button>
                    <button className="border border-gray-700 px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors">
                        Join
                    </button>
                    <button className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
                         <Bell size={20} />
                    </button>
                </div>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-700 mt-8 overflow-x-auto">
            {['Home', 'Videos', 'Shorts', 'Playlists', 'Community'].map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`pb-3 px-2 text-sm font-medium uppercase tracking-wide border-b-2 transition-colors ${activeTab === tab.toLowerCase() ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                >
                    {tab}
                </button>
            ))}
            <button className="ml-auto hover:text-white text-gray-400"><Search size={20}/></button>
        </div>

        {/* Content Area */}
        <div className="py-6">
            {activeTab === 'videos' || activeTab === 'home' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {channelVideos.map(v => (
                        <div key={v.id} className="flex flex-col gap-2 group cursor-pointer">
                            <div className="relative rounded-xl overflow-hidden aspect-video">
                                <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                <span className="absolute bottom-1 right-1 bg-black/80 text-xs px-1 rounded">{v.duration}</span>
                            </div>
                            <h4 className="font-bold text-sm line-clamp-2 group-hover:text-blue-400">{v.title}</h4>
                            <div className="text-xs text-gray-400">{v.views} views • {v.uploadedAt}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-500">
                    This tab is empty for the prototype.
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Channel;
