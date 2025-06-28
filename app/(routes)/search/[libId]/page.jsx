"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/services/superbase';
import Header from './_components/Header';

function SearchQueryResult() {
  const params = useParams();
  const libId = params?.libId;
  const [searchInputRecord, setSearchInputRecord] = useState(null);

  useEffect(() => {
    if (libId) {
      GetSearchQueryRecord();
    }
  }, [libId]);

  const GetSearchQueryRecord = async () => {
    const { data: Library, error } = await supabase
      .from('Library')
      .select('*, Chats(*)')
      .eq('libId', libId);

    if (Library && Library.length > 0) {
      setSearchInputRecord(Library[0]);
    } else {
      console.warn('No Library data found:', Library, error);
      setSearchInputRecord(null);
    }
  };

  return (
    <div>
      <Header searchInputRecord={searchInputRecord} />
    </div>
  );
}

export default SearchQueryResult;
