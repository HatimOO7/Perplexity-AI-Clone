"use client";
import React from 'react'
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { supabase } from '@/services/superbase';





function SearchQueryResult() {
    const { libId } = useParams();
    const [searchInputRecord, setSearchInputRecord] = useState();
    console.log(libId);

    useEffect(() => {
        GetSearchQueryRecord();
    }, []);

    const GetSearchQueryRecord = async () => {

        let { data: Library, error } = await supabase
            .from('Library')
            .select('*,Chats(*)')
            .eq('libId', libId);

        setSearchInputRecord(Library[0]);
    }

  return (
    
    <div>
       <Header searchInputRecord={searchInputRecord} />
    </div>
  )
}

export default SearchQueryResult
