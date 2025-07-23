'use client'
import axios from 'axios';
import {
  Cpu, DollarSign, Globe, Palette, Star, Tv, Volleyball, MoreVertical
} from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import NewsCard from './_components/NewsCard';

const options = [
  { title: 'Top', icon: Star },
  { title: 'Tech & Science', icon: Cpu },
  { title: 'Finance', icon: DollarSign },
  { title: 'Art & Culture', icon: Palette },
  { title: 'Sports', icon: Volleyball },
  { title: 'Entertainment', icon: Tv },
];

function Discover() {
  const [selectedOption, setSelectedOption] = useState('Top');
  const [latestNews, setLatestNews] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    selectedOption && GetSearchResult();
  }, [selectedOption]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const GetSearchResult = async () => {
    const result = await axios.post('/api/brave-search-api', {
      searchInput: selectedOption + ' Latest News & Updates',
      searchType: 'Search'
    });
    const webSearchResult = result?.data?.web?.results || [];
    setLatestNews(webSearchResult);
  };

  return (
    <div className="mt-20 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-2xl sm:text-3xl flex items-center gap-2">
          <Globe className="w-6 h-6" />
          <span>Discover</span>
        </h2>

        {/* Three vertical dots with vertical translate to align middle dot */}
        <div className="lg:hidden relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open categories menu"
            className="p-1 hover:text-primary"
            style={{ transform: 'translateY(2px)' }}
          >
            <MoreVertical className="w-6 h-6" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedOption(option.title);
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted transition
                    ${selectedOption === option.title ? 'bg-accent text-primary' : ''}`}
                >
                  <option.icon className="h-4 w-4" />
                  <span>{option.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Large screen category buttons */}
      <div className="hidden lg:flex flex-wrap gap-2 mb-6">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedOption(option.title)}
            className={`flex items-center gap-2 px-4 py-1 text-sm rounded-full 
              border border-transparent hover:text-primary
              ${selectedOption === option.title ? 'bg-accent text-primary' : ''}`}
          >
            <option.icon className="h-4 w-4" />
            <span>{option.title}</span>
          </button>
        ))}
      </div>

      {/* News Cards */}
      <div className="w-full">
        {latestNews.map((news, index) => {
          if (index % 4 === 0) {
            return (
              <div key={index} className="w-full mb-4">
                <NewsCard news={news} />
              </div>
            );
          }

          if (index % 4 === 1) {
            const group = latestNews.slice(index, index + 3);
            return (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {group.map((item, i) => (
                  <NewsCard news={item} key={`${index + i}`} />
                ))}
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}

export default Discover;
