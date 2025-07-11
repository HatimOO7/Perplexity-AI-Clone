"use client";

import React from 'react'
import { useParams } from 'next/navigation';
import { supabase } from '@/services/supabase';
import { useEffect } from 'react';
import { useState } from 'react';
import Header from './_components/Header';
import DisplayResult from './_components/DisplayResult';


function SearchQueryResult() {
    const {libId} = useParams();
    const [searchInputRecord, setSearchInputRecord] = useState();


    

useEffect(() => {
        GetSearchQueryRecord();
}, []);


     const GetSearchQueryRecord = async () => {

    let { data: Library, error } = await supabase
        .from('Library')
        .select('*, Chats(*)')
        .eq('libId', libId);
    console.log(Library[0]);
    console.log("✅ Supabase response:", Library); 
    setSearchInputRecord(Library[0]);
    console.log("📦 Current searchInputRecord state:", searchInputRecord);
}

  return (
    <div>
      <Header searchInputRecord={searchInputRecord} />

     <div className='px-10 md:px-20 lg:px-36 xl:px-56 mt-10'>
                <DisplayResult searchInputRecord={searchInputRecord} />
            </div>
    </div>
  )
}

export default SearchQueryResult
