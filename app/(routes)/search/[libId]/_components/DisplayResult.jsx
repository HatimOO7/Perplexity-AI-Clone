import React, { useState } from "react";
import AnswerDisplay from "./AnswerDisplay";
import {
  LucideSparkles,
  LucideImage,
  LucideVideo,
  LucideList,
} from "lucide-react";

const tabs = [
  { label: "Answer", icon: LucideSparkles },
  { label: "Images", icon: LucideImage },
  { label: "Videos", icon: LucideVideo },
  { label: "Sources", icon: LucideList },
];

function DisplayResult({ searchInputRecord }) {
  const [activeTab, setActiveTab] = useState("Answer");

  // Example search results
  const chat = {
    searchResult: ["Example Source 1", "Example Source 2"],
  };

  return (
    <div className="mt-7">
      <h2 className="font-medium text-3xl line-clamp-2">
        {searchInputRecord?.searchinput}
      </h2>

      <div className="flex items-center space-x-6 border-b border-gray-200 pb-2 mt-6">
        {tabs.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            className={`flex items-center gap-1 relative text-sm font-medium text-gray-700 hover:text-black ${
              activeTab === label ? "text-black" : ""
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>

            {label === "Sources" && chat?.searchResult?.length > 0 && (
              <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                {chat.searchResult.length}
              </span>
            )}

            {activeTab === label && (
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-black rounded"></span>
            )}
          </button>
        ))}

        <div className="ml-auto text-sm text-gray-500">
          1 task <span className="ml-1">↗</span>
        </div>
      </div>

      <div className="mt-4">
        {activeTab === "Answer" ? (
          <p className="text-gray-800">Answer content here</p>
        ) : activeTab === "Images" ? (
          <img
            src="https://via.placeholder.com/300"
            alt="Placeholder"
            className="rounded"
          />
        ) : activeTab === "Videos" ? (
          <p className="text-gray-800">Videos tab content</p>
        ) : activeTab === "Sources" ? (
          <ul className="text-gray-800 list-disc pl-6">
            {chat.searchResult.map((source, i) => (
              <li key={i}>{source}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <hr className="my-5" />
      <div>
        {activeTab == "Answer" ? 
          <AnswerDisplay /> : null}
      </div>
    </div>
  );
}

export default DisplayResult;
