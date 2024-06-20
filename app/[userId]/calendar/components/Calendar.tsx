"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import "./Calendar.css";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useState } from "react";
import { LiveData } from "@/types/ArtistType";
import { createClient } from "@/utils/supabase/client";
import ModalExample from "@/components/common/Modal";

export default function Calendar() {
  const cookies = parseCookies();
  const userId = cookies.userId;
  const [liveData, setLiveData] = useState<LiveData[]>([]);
  const [clickedDate, setClickedDate] = useState<Date | null>(null); // 追加
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const getUserLive = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);

      const { data: liveIdsData, error: liveIdsError } = await supabase
        .from("user_live_schedules")
        .select("live_id")
        .eq("user_id", userId);

      if (liveIdsError) {
        console.error("Error fetching live IDs:", liveIdsError);
        return [];
      }

      const liveIds = liveIdsData.map((item) => item.live_id);

      const { data: liveData, error: liveDataError } = await supabase
        .from("lives")
        .select(
          `
                *,
                artists (
                    artist_name
                )
            `
        )
        .in("live_id", liveIds)
        .order("date", { ascending: false });

      if (liveDataError) {
        console.error("Error fetching live data:", liveDataError);
        return [];
      }
      setLiveData(liveData);
      console.log(liveData);
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [userId, supabase]);

  useEffect(() => {
    getUserLive();
    console.log(userId);
  }, [userId, getUserLive]);

  if (loading) {
    return <p>読み込み中...</p>; // ユーザーデータを取得中に読み込み状態を表示
  }
  //FIXME:any
  const handleDateClick = (arg: DateClickArg) => {
    setClickedDate(arg.date);
    setIsModalOpen(true);
  };

  const dayCellClassNames = (dateInfo: any) => {
    const classes = [];
    if (dateInfo.date.getDay() === 0) {
      classes.push("fc-day-sun");
    } else if (dateInfo.date.getDay() === 6) {
      classes.push("fc-day-sat");
    }
    return classes;
  };
  const events = liveData.map((live) => {
    return {
      title: live.live_title,
      date: live.date,
    };
  });

  return (
    <div className="w-full p-6 m-4 bg-tertiary-main rounded-lg shadow-md">
      <ModalExample
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        date={clickedDate}
        userId={userId}
      />
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        weekends={true}
        firstDay={1}
        events={events}
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        buttonText={{
          today: "今日",
          month: "月",
          week: "週",
          day: "日",
        }}
        dayCellClassNames={dayCellClassNames}
        customButtons={{
          custom1: {
            text: "Custom Button",
            click: function () {
              alert("clicked the custom button!");
            },
          },
        }}
      />
    </div>
  );
}
