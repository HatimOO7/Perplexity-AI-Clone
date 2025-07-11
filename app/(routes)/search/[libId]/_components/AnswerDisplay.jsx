import React from 'react';
import Image from 'next/image';

function AnswerDisplay({ searchResult }) {
  const webResult = searchResult?.web?.results || [];

  return (
    <div>
      <div className="flex gap-2 flex-wrap mt-5">
        {webResult.map((item, index) => {
          const imgSrc = item?.profile?.img;
          const name = item?.profile?.long_name || item?.profile?.name || "Unknown";
          const description = item?.description || "No description available.";

          return (
            <div
              key={index}
              className="p-3 bg-accent rounded-lg mb-3 w-[200px] cursor-pointer hover:bg-[#e1e3da]"

                onClick={() => window.open(item.url, '_blank')}
            >
              <div className="flex gap-2 items-center mb-1">
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-[20px] h-[20px] bg-gray-300 rounded-full" />
                )}
                <h2 className="text-xs font-medium">{item?.profile?.long_name}</h2>
              </div>

              <h2 className="line-clamp-2 text-black text-xs">{item?.description}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AnswerDisplay;