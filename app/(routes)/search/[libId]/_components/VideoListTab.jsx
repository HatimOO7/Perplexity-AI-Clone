import Image from 'next/image'
import React from 'react'

function VideoListTab({ chat }) {
  return (
    <div className='flex gap-5 flex-wrap mt-6'>
      {(chat?.searchVideoResult || []).map((item, index) => (
        <div key={index} className='flex flex-col bg-accent rounded-xl p-3 w-[200px] h-[180px]'>

          <img
            src={item?.thumbnail || item.img || "/placeholder.png"} // use placeholder if missing
            alt={item?.title || "Video Thumbnail"}
            width={200}
            height={100}
            onClick={() => window.open(item?.url, '_blank')}
            className='object-contain cursor-pointer text-center h-[100px]'
          />

          <h2 className='text-xs mt-2 text-center line-clamp-3'>{item?.title || "No Title"}</h2>

        </div>
      ))}
    </div>
  )
}

export default VideoListTab
