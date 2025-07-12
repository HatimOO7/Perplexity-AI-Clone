
"use client";
import React, { useEffect } from "react";
import { supabase } from "@/services/supabase";
import { useUser } from "@clerk/nextjs";

function Library() {
  const { user } = useUser();

  useEffect(() => {
    user && GetLibraryHistory();
  }, [user]);
  const GetLibraryHistory = async () => {
    let { data: Library, error } = await supabase
      .from("Library")
      .select("*")
      .eq("userEmail", user?.primaryEmailAddress?.emailAddress);
      console.log("Library Data:", Library);
  };

  return (
    <div className="mt-20 px-10 md:px-20 lg:px-36 xl:px-56 ">
      <h2 className="font-bold text-2xl">Library</h2>
    </div>
  );
}

export default Library;
