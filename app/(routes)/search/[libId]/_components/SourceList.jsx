import Image from 'next/image';
import React from 'react';

function SourceList({ webResult, loadingSearch }) {
  // Duplicate items for smooth infinite scroll effect
  const duplicatedResults = [...(webResult || []), ...(webResult || [])];

  return (
    <div className='mt-5 overflow-x-hidden'>

      {/* Mobile & Tablet: automatic horizontal scrolling */}
      <div className='sm:hidden overflow-hidden relative'>
        <div className='scroll-container whitespace-nowrap animate-scroll-horizontal'>
          {duplicatedResults.map((item, index) => (
            <div
              key={index}
              onClick={() => window.open(item.url, '_blank')}
              className='inline-block p-3 bg-accent rounded-lg cursor-pointer hover:bg-[#e1e3da] min-w-[200px] max-w-[250px] mx-1'
            >
              <div className='flex gap-2 items-center mb-2'>
                <Image
                  src={item?.img}
                  alt={item?.name || 'webResultImage'}
                  width={20}
                  height={20}
                />
                <h2 className='text-xs text-gray-500 line-clamp-1'>{item?.long_name}</h2>
              </div>
              <h2 className='line-clamp-2 text-black text-xs'>{item?.title}</h2>
            </div>
          ))}

          {loadingSearch &&
            [1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className='inline-block rounded-2xl bg-accent animate-pulse min-w-[200px] max-w-[250px] h-[100px] mx-1'
              />
            ))}
        </div>
      </div>

      {/* PC: grid view */}
      <div className='hidden sm:flex flex-wrap gap-3'>
        {webResult?.map((item, index) => (
          <div
            key={index}
            onClick={() => window.open(item.url, '_blank')}
            className='p-3 bg-accent rounded-lg cursor-pointer hover:bg-[#e1e3da] w-full sm:w-[48%] md:w-[30%] lg:w-[200px] min-w-[150px]'
          >
            <div className='flex gap-2 items-center mb-2'>
              <Image
                src={item?.img}
                alt={item?.name || 'webResultImage'}
                width={20}
                height={20}
              />
              <h2 className='text-xs text-gray-500 line-clamp-1'>{item?.long_name}</h2>
            </div>
            <h2 className='line-clamp-2 text-black text-xs'>{item?.title}</h2>
          </div>
        ))}

        {loadingSearch &&
          [1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className='rounded-2xl bg-accent animate-pulse w-full sm:w-[48%] md:w-[30%] lg:w-[200px] min-w-[150px] h-[100px]'
            />
          ))}
      </div>

      {/* Animation styles */}
      <style jsx>{`
        .scroll-container {
          display: inline-flex;
          gap: 12px;
          white-space: nowrap;
          overflow-x: auto;
          overflow-y: hidden;
        }
        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-horizontal {
          animation: scroll-horizontal 30s linear infinite;
        }
        .animate-scroll-horizontal:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default SourceList;
