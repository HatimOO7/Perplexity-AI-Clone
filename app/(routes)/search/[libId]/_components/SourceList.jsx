import Image from 'next/image';
import React from 'react';

function SourceList({ webResult, loadingSearch }) {
  const duplicatedResults = [...(webResult || []), ...(webResult || [])];

  return (
    <div className='mt-5'>

      {/* Mobile & Tablet: horizontal animation inside masked container */}
      <div className='sm:hidden relative'>
        <div className='mask-wrapper'>
          <div className='scroll-container animate-scroll-horizontal'>
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
      </div>

      {/* PC view: grid */}
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

      <style jsx>{`
        .mask-wrapper {
          width: 100%;
          overflow-x: hidden;
          position: relative;
          touch-action: pan-y;
        }

        .scroll-container {
          display: inline-flex;
          gap: 12px;
          white-space: nowrap;
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
