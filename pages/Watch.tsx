import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Video, Tweet } from '../types';
import { MOCK_VIDEOS, MOCK_COMMENTS, MOCK_TWEETS } from '../constants';
import VideoPlayer from '../components/VideoPlayer';
import CommentSection from '../components/CommentSection';
import VideoChat from '../components/VideoChat';
import { ThumbsUp, ThumbsDown, Share2, Scissors, MoreHorizontal, Twitter, CheckCircle2 } from 'lucide-react';

const Watch = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState<Video | undefined>();
  const [relatedVideos, setRelatedVideos] = useState<(Video | Tweet)[]>([]);

  useEffect(() => {
    // Simulate fetching video
    const found = MOCK_VIDEOS.find(v => v.id === videoId) || MOCK_VIDEOS[0];
    setVideo(found);
    
    // Simulate related videos + tweets mixed
    const related: (Video | Tweet)[] = [...MOCK_VIDEOS.filter(v => v.id !== found.id)];
    // Inject a tweet
    related.splice(1, 0, MOCK_TWEETS[0]);
    related.splice(4, 0, MOCK_TWEETS[1]);
    setRelatedVideos(related);
    
    window.scrollTo(0,0);
  }, [videoId]);

  if (!video) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="w-full max-w-[1800px] mx-auto p-4 lg:p-6 flex flex-col xl:flex-row gap-6">
      {/* Main Content Area - Player & Comments */}
      {/* min-w-0 required for flex children to shrink properly */}
      <div className="flex-1 min-w-0">
        
        {/* Player Container */}
        <div className="w-full">
            <VideoPlayer 
                videoUrl={video.videoUrl} 
                nextVideo={MOCK_VIDEOS.find(v => v.id !== video.id) || null}
                onNext={(v) => navigate(`/watch/${v.id}`)}
                title={video.title}
            />
        </div>

        {/* Video Metadata */}
        <div className="mt-4">
          <h1 className="text-xl md:text-2xl font-bold line-clamp-2">{video.title}</h1>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mt-3 gap-4 pb-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <img 
                src={video.channelAvatar} 
                alt={video.channelName} 
                className="w-10 h-10 rounded-full cursor-pointer hover:opacity-90"
                onClick={() => navigate(`/channel/${video.channelId}`)}
              />
              <div>
                <h3 
                    className="font-bold text-sm cursor-pointer hover:text-gray-300"
                    onClick={() => navigate(`/channel/${video.channelId}`)}
                >{video.channelName}</h3>
                <span className="text-xs text-gray-400">1.2M subscribers</span>
              </div>
              <button className="ml-4 bg-white text-black px-6 py-2 rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
              <div className="flex bg-[#222] rounded-full h-9 items-center px-4 hover:bg-[#2a2a2a] transition-colors">
                <button className="flex items-center gap-2 border-r border-gray-600 pr-3 hover:text-white text-gray-200">
                   <ThumbsUp size={18} /> <span className="text-sm font-medium">12K</span>
                </button>
                <button className="pl-3 hover:text-white text-gray-200">
                   <ThumbsDown size={18} />
                </button>
              </div>
              <button className="bg-[#222] hover:bg-[#333] px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-colors">
                <Share2 size={18} /> Share
              </button>
              <button className="bg-[#222] hover:bg-[#333] p-2 rounded-full transition-colors">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
          
          <div className="mt-4 bg-[#1f1f1f] p-4 rounded-xl text-sm hover:bg-[#2a2a2a] cursor-pointer transition-colors group">
             <div className="font-bold mb-2 text-gray-100">{video.views} views • {video.uploadedAt} <span className="text-gray-400 font-normal ml-2">#{video.category}</span></div>
             <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                {video.description}
             </p>
          </div>
        </div>

        {/* Comments Section - Visible on Large Screens */}
        <div className="hidden xl:block">
            <CommentSection comments={MOCK_COMMENTS} />
        </div>
      </div>

      {/* Sidebar (Recommendations + Chat) */}
      <div className="w-full xl:w-[400px] flex-shrink-0 flex flex-col gap-6">
         {/* Video Assistant (Now separate card) */}
         <div className="w-full">
            <VideoChat video={video} />
         </div>

         {/* Recommendation List */}
         <div className="flex flex-col gap-4">
             {relatedVideos.map((item, idx) => {
                 if ('isTweet' in item) {
                     return (
                         <div key={idx} className="bg-[#16181c] border border-gray-800 rounded-xl p-4 hover:bg-[#1c1f24] transition-colors cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <img src={item.avatar} className="w-6 h-6 rounded-full" />
                                    <span className="font-bold text-xs">{item.username}</span>
                                    <CheckCircle2 size={10} className="text-blue-400" />
                                    <span className="text-gray-500 text-xs">· {item.timestamp}</span>
                                </div>
                                <Twitter size={14} className="text-blue-400" />
                            </div>
                            <p className="text-sm text-gray-200 line-clamp-3">{item.content}</p>
                         </div>
                     )
                 } else {
                    return (
                        <div key={idx} className="flex gap-2 cursor-pointer group" onClick={() => navigate(`/watch/${item.id}`)}>
                            <div className="relative w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                                <img src={item.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                <span className="absolute bottom-1 right-1 bg-black/80 text-xs px-1 rounded text-white font-medium">{item.duration}</span>
                            </div>
                            <div className="flex flex-col gap-1 min-w-0">
                                <h4 className="text-sm font-bold line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">{item.title}</h4>
                                <div className="text-xs text-gray-400">
                                    <p className="hover:text-gray-200">{item.channelName}</p>
                                    <p>{item.views} views • {item.uploadedAt}</p>
                                </div>
                            </div>
                        </div>
                    )
                 }
             })}
         </div>

         {/* Mobile Comments (shown at bottom on small screens) */}
         <div className="block xl:hidden">
             <CommentSection comments={MOCK_COMMENTS} />
         </div>
      </div>
    </div>
  );
};

export default Watch;