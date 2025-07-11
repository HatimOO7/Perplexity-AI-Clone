"use client";
import React from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AIModelsOption } from "@/services/Shared";
import { supabase } from "@/services/supabase";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";


function ChatInputBox (){
  const [userSearchInput, setUserSearchInput] = useState();
  const [searchType,setSearchType]= useState('search');
  
  const { user } = useUser();
  const [loading,setLoading]=useState(false);
  const router = useRouter();
  
  const onSearchQuery = async () => {
    setLoading(true);
    const libId=uuidv4();
    const {data} = await supabase.from('Library').insert([
      {
        searchinput: userSearchInput,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        type: searchType,
        libId: libId
      }
    ]).select();
    setLoading(false);
    router.push('/search/' + libId);

    console.log(data[0]);
  }
  return (
    <div className="flex flex-col h-screen items-center justify-center w-full">
      <Image src="/logo.png" alt="Logo" width={260} height={250} />
      <div className="p-2 w-full max-w-2xl border rounded-2xl mt-10">
        <div className="flex items-end justify-between">
          <Tabs defaultValue="Search" className="w-[400px]">
            <TabsContent value="Search">

              
              <input
                type="text"
                placeholder="Ask Anything"
                onChange={(e) => setUserSearchInput(e.target.value)}
                className="w-full p-4 outline-none "
              />


            </TabsContent>

            <TabsContent value="Research">
              <input
                type="text"
                placeholder="Research Anything"
                 onChange={(e) => setUserSearchInput(e.target.value)}
                className="w-full p-4 outline-none "
              />
            </TabsContent>
            <TabsList>
              <TabsTrigger value="Search" className={"text-primary"} onClick={()=>setSearchType('search')}>
                <SearchCheck />
                Search
              </TabsTrigger>
              <TabsTrigger value="Research" className={"text-primary"} onClick={()=>setSearchType('research')}>
                <Atom />
                Research
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-4 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <Cpu className="text-gray-500 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/*<DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator /> */}

                {AIModelsOption.map((model, index) => (
                  <DropdownMenuItem key={index}>
                    <div className="mb-1">
                      <h2 className="text-sm">{model.name}</h2>
                      <p className="text-x5">{model.desc}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost">
              <Globe className="text-gray-500 h-5 w-5" />
            </Button>

            <Button variant="ghost">
              <Paperclip className="text-gray-500 h-5 w-5" />
            </Button>
            <Button variant="ghost">
              <Mic className="text-gray-500 h-5 w-5" />
            </Button>

            <Button
              className="cursor-pointer"
              onClick={() => {
                userSearchInput ? onSearchQuery() : null;
              }}
            >
              {!userSearchInput?<AudioLines className='text-white h-5 w-5' />
            :<ArrowRight  className='text-white h-5 w-5' disabled={loading}/>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInputBox;
