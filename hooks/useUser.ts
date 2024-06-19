"use client";
import { createClient } from "@/utils/supabase/client";
import { Session, AuthChangeEvent } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient();

export default function userUser() {
    const [session, setSession] = useState<Session|null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event:AuthChangeEvent, session: Session | null) => {
        setSession(session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return {
    session
  };
}
