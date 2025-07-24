import React from 'react';

function VideoListTab({ chat }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
      {(chat?.searchVideoResult || []).map((item, index) => (
        <div
          key={index}
          className="flex flex-col bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl p-3 cursor-pointer transform hover:scale-[1.03]"
          onClick={() => window.open(item?.url, '_blank')}
        >
          <div className="h-[100px] w-full flex items-center justify-center overflow-hidden rounded-xl bg-gray-100">
            <img
              src={item?.thumbnail || item.img || "/placeholder.png"}
              alt={item?.title || "Video Thumbnail"}
              className="object-cover h-full w-full"
            />
          </div>

          <h2 className="text-sm mt-3 text-center font-medium text-gray-800 line-clamp-3">
            {item?.title || "No Title"}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default VideoListTab;
