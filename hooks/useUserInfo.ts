// hooks/useUserInfo.ts
"use client";
import { useState, useCallback, useEffect } from "react";
import { ConnectUserInfo } from "@/types/AccountType";
import { getUserInfo } from "@/utils/actions/getUserInfo";
import { setCookie } from "nookies";

export const useUserInfo = (authId: string) => {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");
  const [user, setUser] = useState<ConnectUserInfo>({
    user_id: "",
    display_name: "",
    display_image: "",
    email: "",
  });

  const getUser = useCallback(async () => {
    if (!authId) return;

    try {
      setLoading(true);

      const { data, error, status } = await getUserInfo(authId);

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setUserId(data.user_id);
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
  }, [authId]);

  useEffect(() => {
    getUser();
  }, [authId, getUser]);

  return { loading, userId, user };
};
