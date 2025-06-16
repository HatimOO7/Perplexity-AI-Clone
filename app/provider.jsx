"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/services/superbase";
import { UserDetailContext } from "@/components/context/UserDetailContext";

function Provider ({ children }) {
  const { user } = useUser();
  const [userDetail,setUserDetail]=useState();

  useEffect(() => {
    user && CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    let { data: Users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", user?.primaryEmailAddress.emailAddress);


    console.log(Users);


    if (Users.length == 0) {
      const { data, error } = await supabase
        .from("users")
        .insert([{
            name: user?.fullName,
            email: user?.primaryEmailAddress.emailAddress
        },
    ])
        .select();
        
        setUserDetail(data[0]);
        return;
    }

    setUserDetail(Users[0]);
  };
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div className="w-full">{children}</div>
    </UserDetailContext.Provider>
  );
};

export default Provider;
