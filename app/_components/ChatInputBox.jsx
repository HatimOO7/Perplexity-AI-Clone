"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Atom,
  AudioLines,
  Cpu,
  Globe,
  Mic,
  Paperclip,
  SearchCheck,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AIModelsOption } from "@/services/Shared";
import { supabase } from "@/services/supabase";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

function ChatInputBox() {
  const [userSearchInput, setUserSearchInput] = useState();
  const [searchType, setSearchType] = useState("search");

  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSearchQuery = async () => {
    setLoading(true);
    const libId = uuidv4();
    const { data } = await supabase.from("Library").insert([
      {
        searchinput: userSearchInput,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        type: searchType,
        libId: libId,
      },
    ]).select();
    setLoading(false);
    router.push("/search/" + libId);
    console.log(data?.[0]);
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center w-full px-4">
      <Image src="/logo.png" alt="Logo" width={260} height={250} />

      {/* Chat Input Outer Box */}
      <div className="p-4 w-full max-w-2xl border rounded-2xl mt-10 shadow-md bg-white">
        <Tabs defaultValue="Search" className="w-full">
          {/* Input Field */}
          <TabsContent value="Search">
            <input
              type="text"
              placeholder="Ask Anything"
              onChange={(e) => setUserSearchInput(e.target.value)}
              className="w-full p-4 outline-none bg-transparent placeholder-gray-400"
            />
          </TabsContent>

          <TabsContent value="Research">
            <input
              type="text"
              placeholder="Research Anything"
              onChange={(e) => setUserSearchInput(e.target.value)}
              className="w-full p-4 outline-none bg-transparent placeholder-gray-400"
            />
          </TabsContent>

          {/* Controls Row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 mt-2">
            {/* Tabs (Search/Research) - only on lg and up */}
            <div className="hidden lg:flex gap-2">
              <TabsList className="flex gap-2">
                <TabsTrigger
                  value="Search"
                  className="text-primary"
                  onClick={() => setSearchType("search")}
                >
                  <SearchCheck className="mr-1 h-4 w-4" />
                  Search
                </TabsTrigger>
                <TabsTrigger
                  value="Research"
                  className="text-primary"
                  onClick={() => setSearchType("research")}
                >
                  <Atom className="mr-1 h-4 w-4" />
                  Research
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Right Side: More + Submit (all screens) */}
            <div className="flex items-center gap-2 justify-end w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <MoreHorizontal className="text-gray-500 h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Cpu className="h-4 w-4 mr-2 text-gray-600" />
                    Models
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Globe className="h-4 w-4 mr-2 text-gray-600" />
                    Web
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Paperclip className="h-4 w-4 mr-2 text-gray-600" />
                    Attach
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mic className="h-4 w-4 mr-2 text-gray-600" />
                    Mic
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                className="bg-primary text-white"
                onClick={() => {
                  if (userSearchInput) onSearchQuery();
                }}
                disabled={loading}
              >
                {!userSearchInput ? (
                  <AudioLines className="h-5 w-5" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default ChatInputBox;
