// hooks/useCalendar.ts
import { useState, useCallback } from "react";
import { DateClickArg } from "@fullcalendar/interaction";
import { useMediaQuery, useTheme } from "@mui/material";
import { useUserAttendLiveInfo } from "@/hooks/useUserAttendLiveInfo";
import { parseCookies } from "nookies";

export const useCalendar = () => {
  const cookies = parseCookies();
  const userId = cookies.userId;
  const [clickedDate, setClickedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { liveData, loading, error } = useUserAttendLiveInfo(userId);

  const handleDateClick = useCallback((arg: DateClickArg) => {
    setClickedDate(arg.date);
    setIsModalOpen(true);
  }, []);

  const dayCellClassNames = useCallback((dateInfo: any) => {
    const classes = [];
    if (dateInfo.date.getDay() === 0) {
      classes.push("fc-day-sun");
    } else if (dateInfo.date.getDay() === 6) {
      classes.push("fc-day-sat");
    }
    return classes;
  }, []);

  const events =
    liveData?.map((live) => ({
      title: live.live_title,
      date: live.date,
    })) || [];

  const headerToolbar = isMobile
    ? {
        start: "prev,next",
        center: "title",
        end: "",
      }
    : {
        start: "prev,next today",
        center: "title",
        end: "dayGridMonth,dayGridWeek,dayGridDay",
      };

  return {
    userId,
    clickedDate,
    isModalOpen,
    setIsModalOpen,
    loading,
    error,
    handleDateClick,
    dayCellClassNames,
    events,
    headerToolbar,
    isMobile,
  };
};
