import React from 'react'
import Image from 'next/image';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"

function AppSidebar() {
    
  // Define your desired background color using the oklch format
  const sidebarBackgroundColor = 'oklch(0.953 0 196.25)';

  return (
    <Sidebar style={{ backgroundColor: sidebarBackgroundColor }}>
      <SidebarHeader style={{ backgroundColor: sidebarBackgroundColor }} className="flex items-center py-5" >
        
        <Image src={"/logo.png"} alt="Logo" width={150} height={100} />
      </SidebarHeader>
      <SidebarContent style={{ backgroundColor: sidebarBackgroundColor }}>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar