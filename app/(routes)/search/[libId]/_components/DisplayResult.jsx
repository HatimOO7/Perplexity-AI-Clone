//ai
import React, { useEffect, useState } from "react";
import AnswerDisplay from "./AnswerDisplay";
import axios from "axios";
import { supabase } from "@/services/supabase";
import VideoListTab from "./VideoListTab";

import {
  LucideSparkles,
  LucideImage,
  LucideVideo,
  LucideList,
} from "lucide-react";
import { SEARCH_RESULT } from "@/services/Shared"; // You might not need this if you're fetching live data
import { useParams } from "next/navigation";
import ImageListTab from "./ImageListTab";
import SourceListTab from "./SourceListTab";

const tabs = [
  { label: "Answer", icon: LucideSparkles },
  { label: "Images", icon: LucideImage },
  { label: "Videos", icon: LucideVideo },
  { label: "Sources", icon: LucideList, badge: 9 },
];

function DisplayResult({ searchInputRecord }) {
  const [activeTab, setActiveTab] = useState("Answer");
  const [searchResult, setSearchResult] = useState(searchInputRecord); // Consider initializing with null or an empty object
  const { libId } = useParams();

   useEffect(() => {
    //update this methods

    searchInputRecord?.Chats?.length==0 && GetSearchApiResult(searchInputRecord.searchinput);
    setSearchResult(searchInputRecord)
    console.log("Search Input Record:", searchInputRecord);
  }, [searchInputRecord]);

  const GetSearchApiResult = async (searchInput) => {
    try {
      // Uncomment and use this to get actual search results
      const result = await axios.post("/api/brave-search-api", {
        searchInput: searchInput, // Use the passed searchInput
        searchType: searchInputRecord?.type, // Assuming searchInputRecord has a type
      });

      console.log("Brave Search API Result:", result.data); // Log the actual API response

      const searchResp = result.data; // Use the data from the API call

      const formattedSearchResp = searchResp?.web?.results?.map((item) => ({
        title: item?.title,
        description: item?.description,
        long_name: item?.profile?.long_name,
        img: item?.profile?.img,
        url: item?.url,
        thumbnail: item?.thumbnail?.src,
        original: item?.thumbnail?.original,
      }));

      const formattedVideoSearchResp = searchResp?.videos?.results?.map(
        (item) => ({
          url: item?.url,
          title: item?.title,
          description: item?.description,
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
            searchVideoResult: formattedVideoSearchResp,
            userSearchInput: searchInput, // Use the passed searchInput
          },
        ])
        .select();

      if (error) {
        console.error("Error inserting chat:", error);
        return;
      }

      console.log("Supabase Insert Data:", data);

      await GetSearchRecords(); // Re-fetch records after insertion

      await GenerateAIResp(formattedSearchResp, data[0]?.id);
    } catch (error) {
      console.error("Error fetching or processing search results:", error);
    }
  };

  const GenerateAIResp = async (formattedSearchResp, recordId) => {
    try {
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
        if (runResp?.data?.data[0]?.status === "Completed") {
          console.log("Completed!!!");
          await GetSearchRecords();
          clearInterval(interval);
        }
      }, 1000);
    } catch (error) {
      console.error("Error generating AI response:", error);
    }
  };

  const GetSearchRecords = async () => {
    let { data: Library, error } = await supabase
      .from("Library")
      .select("*,Chats(*)")
      .eq("libId", libId);

    if (error) {
      console.error("Error fetching library records:", error);
      return;
    }
    setSearchResult(Library[0]); // Update the state with the fetched library data
  };

  return (
    <div className="mt-7">
      {searchResult?.Chats?.map((chat, index) => (
        <div key={index} className="mt-7">
          <h2 className="font-bold text-4xl text-gray-600">
            {chat?.userSearchInput}
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
              <AnswerDisplay chat={chat} />
            ) : activeTab === "Images" ? (
              <ImageListTab chat={chat} />
            ) : activeTab === "Videos" ? (
              <VideoListTab chat={chat} />
            ) : activeTab === "Sources" ? (
              <SourceListTab chat={chat} />
            ) : null}
          </div>

          <hr className="my-5 border-gray-200" />
        </div>
      ))}
    </div>
  );
}

export default DisplayResult;