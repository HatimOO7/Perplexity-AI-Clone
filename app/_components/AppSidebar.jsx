"use client";
import { usePathname } from 'next/navigation';

import React from 'react'
import Image from 'next/image';
//import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Compass, GalleryHorizontal, LogIn, Search } from 'lucide-react';


const MenuOptions = [
  {
    title: "Home",
    icon: Search,
    path: "/",
  },
  {
    title: "Discover",
    icon: Compass,
    path: "/discover",
  },
  {
    title: "Library",
    icon: GalleryHorizontal,
    path: "/library",
  },
  {
    title: "Sign In",
    icon: LogIn,
    path: "#",
  },
];

function AppSidebar() {

    const path=usePathname();
    
 
  const sidebarBackgroundColor = 'oklch(0.953 0 196.25)';

  return (
    <Sidebar style={{ backgroundColor: sidebarBackgroundColor }}>
      <SidebarHeader style={{ backgroundColor: sidebarBackgroundColor }} className="flex items-center py-5" >
        
        <Image src={"/logo.png"} alt="Logo" width={150} height={100} />
      </SidebarHeader>
      <SidebarContent style={{ backgroundColor: sidebarBackgroundColor }}>
        <SidebarGroup>
        <SidebarContent>
            <SidebarMenu>
                {MenuOptions.map((menu, index) => (
                     <SidebarMenuItem key={index}>
                   <SidebarMenuButton asChild className={`p-5 py-6 hover:bg-transparent hover:font-bold ${
                      path?.includes(menu.path) && "font-bold"
                    }`}>

                     <a href={menu.path} className=''>
                         <menu.icon className='h-8 w-8'/> <span className='text-lg'>{menu.title}</span>
                     
                     
                     </a>

                   </SidebarMenuButton>
                   </SidebarMenuItem>
                ))}
            </SidebarMenu>
            <Button className={'rounded-full mx-4 mt-4'}>Sign Up</Button>
        </SidebarContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter style={{ backgroundColor: sidebarBackgroundColor }}>
        <div className="p-3 flex flex-col">
          
          <h2 className="text-gray-400 mt-3">Try Pro</h2>
          <p className="text-gray-400">
            Upgrade for image upload, smarter AI & more copilot
          </p>

          <Button
            variant={"secondary"}
            className={"text-gray-500 cursor-pointer"}
          >
            Learn More
          </Button>
        </div>
      </SidebarFooter>
  </Sidebar>
  )
}

export default AppSidebar