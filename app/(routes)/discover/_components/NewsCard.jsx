import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

function NewsCard({ news }) {
    return (
        <div
            className="border rounded-2xl mt-6 cursor-pointer"
            onClick={() => window.open(news?.url, '_blank')}
        >
            <img
                src={news?.thumbnail?.original}
                alt={news?.title}
                width={700}
                height={300}
                className="rounded-2xl w-full bg-black"
            />
            <div className="p-4">
                <h2 className="font-bold text-xl text-gray-600">{news?.title}</h2>

                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        p: ({ node, ...props }) => (
                            <p className="text-md mt-2 line-clamp-2 text-gray-500" {...props} />
                        ),
                        strong: ({ node, ...props }) => (
                            <strong className="font-semibold text-gray-700" {...props} />
                        ),
                        a: ({ node, ...props }) => (
                            <a className="text-blue-600 underline" target="_blank" rel="noopener noreferrer" {...props} />
                        )
                    }}
                >
                    {news?.description || ''}
                </ReactMarkdown>
            </div>
        </div>
    );
}

export default NewsCard;
