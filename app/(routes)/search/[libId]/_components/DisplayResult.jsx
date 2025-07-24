"use client";
import React, { useEffect, useState } from "react";
import AnswerDisplay from "./AnswerDisplay";
import axios from "axios";
import { supabase } from "@/services/supabase";
import VideoListTab from "./VideoListTab";
import ImageListTab from "./ImageListTab";
import SourceListTab from "./SourceListTab";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LucideSparkles,
  LucideImage,
  LucideVideo,
  LucideList,
  Send,
  Loader2Icon,
} from "lucide-react";

const tabs = [
  { label: "Answer", icon: LucideSparkles },
  { label: "Images", icon: LucideImage },
  { label: "Videos", icon: LucideVideo },
  { label: "Sources", icon: LucideList },
];

function DisplayResult({ searchInputRecord }) {
  const [activeTab, setActiveTab] = useState("Answer");
  const [searchResult, setSearchResult] = useState(searchInputRecord);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [userInput, setUserInput] = useState("");
  const { libId } = useParams();

  useEffect(() => {
    const init = async () => {
      if (searchInputRecord?.Chats?.length === 0) {
        await GetSearchApiResult(searchInputRecord.searchinput);
      } else {
        setSearchResult(searchInputRecord);
      }
      console.log("Search Input Record:", searchInputRecord);
    };
    init();
  }, [searchInputRecord]);

  const GetSearchApiResult = async (searchInput) => {
    setLoadingSearch(true);
    try {
      const result = await axios.post("/api/brave-search-api", {
        searchInput: searchInput,
        searchType: searchInputRecord?.type ?? "Search",
      });

      const searchResp = result.data;

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

      const { data, error } = await supabase
        .from("Chats")
        .insert([
          {
            libId: libId,
            searchResult: formattedSearchResp,
            searchVideoResult: formattedVideoSearchResp,
            userSearchInput: searchInput,
          },
        ])
        .select();

      if (error) {
        console.error("Error inserting chat:", error);
        return;
      }

      await GetSearchRecords();
      setLoadingSearch(false);

      if (data?.[0]?.id) {
        await GenerateAIResp(formattedSearchResp, data[0].id);
      }
    } catch (error) {
      console.error("Error fetching or processing search results:", error);
      setLoadingSearch(false);
    }
  };

  const GenerateAIResp = async (formattedSearchResp, recordId) => {
    try {
      const result = await axios.post("/api/llm-model", {
        searchInput: searchInputRecord?.searchInput,
        searchResult: formattedSearchResp,
        recordId: recordId,
      });

      const runId = result.data;

      const interval = setInterval(async () => {
        const runResp = await axios.post("/api/get-inngest-status", {
          runId: runId,
        });
        if (runResp?.data?.data?.[0]?.status === "Completed") {
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
      .eq("libId", libId)
      .order("id", { foreignTable: "Chats", ascending: true });

    if (error) {
      console.error("Error fetching library records:", error);
      return;
    }

    if (Library?.[0]) {
      setSearchResult(Library[0]);
    }
  };

  return (
    <div className="mt-7 pb-32">
      {!searchResult?.Chats && (
        <div>
          <div className="w-full h-5 bg-accent animate-pulse rounded-md"></div>
          <div className="w-1/2 mt-2 h-5 bg-accent animate-pulse rounded-md"></div>
          <div className="w-[70%] mt-2 h-5 bg-accent animate-pulse rounded-md"></div>
        </div>
      )}

      {searchResult?.Chats?.map((chat, index) => (
        <div key={index} className="mt-7">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-700">
            {chat?.userSearchInput}
          </h2>

          <div className="flex flex-wrap items-center gap-4 border-b border-gray-200 pb-2 mt-6">
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
           
          </div>

          <div className="mt-4">
            {activeTab === "Answer" ? (
              <AnswerDisplay chat={chat} loading={loadingSearch} />
            ) : activeTab === "Images" ? (
              <ImageListTab chat={chat} />
            ) : activeTab === "Videos" ? (
              <VideoListTab chat={chat} />
            ) : activeTab === "Sources" ? (
              <SourceListTab chat={chat} />
            ) : null}
          </div>

          <hr className="my-6 border-gray-200" />
        </div>
      ))}

      {/* Responsive Input Box */}
      <div
        className="
    bg-white p-3 px-5 rounded-lg shadow-md flex items-center gap-3
    justify-between
    bottom-6
    right-6
    w-[90%] sm:w-[400px] md:w-[500px] lg:w-[600px]
    z-50

    lg:right-[20%]
  "
      >
        <input
          placeholder="Type anything here..."
          className="outline-none w-full mr-4 text-sm"
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        />
        {userInput?.length > 0 && (
          <Button
            onClick={() => GetSearchApiResult(userInput)}
            disabled={loadingSearch}
          >
            {loadingSearch ? (
              <Loader2Icon className="animate-spin w-4 h-4" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

export default DisplayResult;
