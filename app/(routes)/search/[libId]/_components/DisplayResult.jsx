import React, { useEffect, useState } from "react";
import AnswerDisplay from "./AnswerDisplay";
import axios from "axios";
import { supabase } from "@/services/supabase";

import {
  LucideSparkles,
  LucideImage,
  LucideVideo,
  LucideList,
} from "lucide-react";
import { SEARCH_RESULT } from "@/services/Shared";
import { useParams } from "next/navigation";

const tabs = [
  { label: "Answer", icon: LucideSparkles },
  { label: "Images", icon: LucideImage },
  { label: "Videos", icon: LucideVideo },
  { label: "Sources", icon: LucideList, badge: 10 },
];

function DisplayResult({ searchInputRecord }) {
  const [activeTab, setActiveTab] = useState("Answer");
  const [searchResult, setSearchResult] = useState(SEARCH_RESULT);
  const { libId } = useParams();

  useEffect(() => {
    //update this methods

    searchInputRecord && GetSearchApiResult(searchInputRecord.searchinput);
  }, [searchInputRecord]);

  const GetSearchApiResult = async (searchInput) => {
    //const result = await axios.post('/api/brave-search-api', {
    //searchInput: searchInputRecord?.searchInput,
    //searchType: searchInputRecord?.type
    //});
    //console.log("DEKHO", result.data);
    const searchResp = SEARCH_RESULT;
    const formattedSearchResp = searchResp?.web?.results?.map(
      (item, index) => ({
        title: item?.title,
        description: item?.description,
        long_name: item?.profile?.long_name,
        img: item?.profile.img,
        url: item?.url,
        thumbnail: item?.thumbnail?.src,
      })
    );

    console.log("Formatted Search Response:", formattedSearchResp);

    const { data, error } = await supabase
      .from("Chats")
      .insert([
        {
          libId: libId,
          searchResult: formattedSearchResp,
        },
      ])
      .select();

    console.log(data.id);

    await GenerateAIResp(formattedSearchResp, data[0]?.id);
  };

  // Example search results
  const GenerateAIResp = async (formattedSearchResp, recordId) => {
    const result = await axios.post("/api/llm-model", {
      searchInput: searchInputRecord?.searchInput,
      searchResult: formattedSearchResp,
      recordId: recordId,
    });

    console.log("AI Response:", result.data);
    const runId = result.data;

    const interval = setInterval(async () => {
      const runResp = await axios.post("/api/get-inngest-status", {
        runId: runId,
      });
      if (runResp?.data?.data[0]?.status == 'Completed') {

        console.log('Completed!!!')

        clearInterval(interval);

        //get updated data from supabase
      }
    }, 1000);

   
  };

  return (
    <div className="mt-7">
      <h2 className="font-medium text-3xl line-clamp-2">
        {searchInputRecord?.searchinput}
      </h2>

      <div className="flex items-center space-x-6 border-b border-gray-200 pb-2 mt-6">
        {tabs.map(({ label, icon: Icon, badge }) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            className={`flex items-center gap-1 relative text-sm font-medium text-gray-700 hover:text-black ${
              activeTab === label ? "text-black" : ""
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            {badge && (
              <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                {badge}
              </span>
            )}
            {activeTab === label && (
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-black rounded"></span>
            )}
          </button>
        ))}
        <div className="ml-auto text-sm text-gray-500">
          1 task <span className="ml-1">–</span>
        </div>
      </div>

      <div>
        {activeTab === "Answer" ? (
          <AnswerDisplay searchResult={searchResult} />
        ) : null}
      </div>
    </div>
  );
}

export default DisplayResult;
