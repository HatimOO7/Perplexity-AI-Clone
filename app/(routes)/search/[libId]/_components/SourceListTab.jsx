import Image from 'next/image'
import React from 'react'

function SourceListTab({ chat }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 px-4 md:px-6 lg:px-8">
      {chat?.searchResult.map((item, index) => (
        <div
          key={index}
          className="border-2 mt-6 p-4 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-300"
          onClick={() => window.open(item.url, '_blank')}
        >
          <div className="flex gap-3 items-center">
            <h2 className="text-sm md:text-base font-semibold">{index + 1}</h2>
            <Image
              src={item.img}
              alt={item.title}
              width={24}
              height={24}
              className="rounded-full w-6 h-6 border"
            />
            <div>
              <h2 className="text-xs md:text-sm text-gray-700">{item.long_name}</h2>
            </div>
          </div>
          <h2 className="mt-2 line-clamp-1 font-bold text-base md:text-lg text-gray-600">
            {item.title}
          </h2>
          <h2 className="mt-1 text-xs md:text-sm text-gray-600">{item.title}</h2>
        </div>
      ))}
    </div>
  )
}

export default SourceListTab
