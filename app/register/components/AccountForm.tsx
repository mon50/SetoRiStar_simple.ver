"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [display_image, setDisplayImage] = useState<string | null>(null);
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const getUser = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("users")
        .select(`display_name, display_image, email, birthday`)
        .eq("auth_id", user.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setDisplayName(data.display_name);
        setDisplayImage(data.display_image);
        setEmail(data.email);
        setBirthday(data.birthday ? new Date(data.birthday) : null);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getUser();
    console.log(user);
  }, [user, getUser]);

  async function updateUser({
    display_name,
    display_image,
    email,
    birthday,
  }: {
    display_name: string | null;
    display_image: string | null;
    email: string | null;
    birthday: Date | null;
  }) {
    if (!user) return;

    try {
      setLoading(true);

      const { error } = await supabase.from("users").upsert({
        auth_id: user.id,
        display_name,
        display_image,
        email,
        birthday: birthday ? birthday.toISOString() : null,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="user_id">UserId</label>
        <input id="user_id" type="text" value={user?.id || ""} disabled />
      </div>
      <div>
        <label htmlFor="display_name">DisplayName</label>
        <input
          id="display_name"
          type="text"
          value={displayName || ""}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="display_image">DisplayImage</label>
        <input
          id="display_image"
          type="text"
          value={display_image || ""}
          onChange={(e) => setDisplayImage(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="birthday">Birthday</label>
        <input
          id="birthday"
          type="date"
          value={birthday ? birthday.toISOString().split("T")[0] : ""}
          onChange={(e) =>
            setBirthday(e.target.value ? new Date(e.target.value) : null)
          }
        />
      </div>

      <div>
        {" "}
        //TODO: sigininHookを使いアカウント情報をStoreに保存
        <button
          className="button primary block"
          onClick={() =>
            updateUser({
              display_name: displayName,
              display_image,
              email,
              birthday,
            })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>
      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
