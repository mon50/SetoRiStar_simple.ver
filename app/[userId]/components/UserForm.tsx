"use client";
import History from "@/app/[userId]/components/History";
import Profile from "@/app/[userId]/components/Profile";
import { ConnectUserInfo } from "@/types/AccountType";
import { createClient } from "@/utils/supabase/client";
import { setCookie } from "nookies";
import React, { useCallback, useEffect, useState } from "react";

const UserForm = ({ authId }: { authId: string }) => {
  const [loading, setLoading] = useState(true);
  const [user_id, setUser_id] = useState<string>("");
  const [user, setUser] = useState<ConnectUserInfo>({
    user_id: "",
    display_name: "",
    display_image: "",
    email: "",
  });
  const supabase = createClient();

  const getUser = useCallback(async () => {
    if (!authId) return;

    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("users")
        .select(`user_id,display_name, display_image,email`)
        .eq("auth_id", authId)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setUser_id(data.user_id);
        setUser(data);
        setCookie(null, "userId", data.user_id, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [authId, supabase]);

  useEffect(() => {
    getUser();
    console.log(authId);
  }, [authId, getUser]);

  return (
    <>
      <Profile user={user} />
      {/* 線を引く */}
      <hr className="border-t-2 border-gray-300 my-4" />
      <History userId={user_id} />
    </>
  );
};

export default UserForm;
