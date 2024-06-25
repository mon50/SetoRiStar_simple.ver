"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import ModalExample from "@/components/common/Modal";
import { useCalendar } from "@/hooks/useCalendar";

export default function Calendar() {
  const {
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
  } = useCalendar();

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (error) {
    return (
      <p className="text-center py-4 text-red-500">
        エラーが発生しました: {error}
      </p>
    );
  }

  return (
    <div className="w-full p-2 sm:p-4 md:p-6 bg-tertiary-main rounded-lg shadow-md overflow-hidden">
      <ModalExample
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        date={clickedDate}
        userId={userId}
      />
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          weekends={true}
          firstDay={1}
          events={events}
          headerToolbar={
            isMobile
              ? {
                  start: "prev,next",
                  center: "title",
                  end: "",
                }
              : {
                  start: "prev,next today",
                  center: "title",
                  end: "dayGridMonth,dayGridWeek,dayGridDay",
                }
          }
          buttonText={{
            today: "今日",
            month: "月",
            week: "週",
            day: "日",
          }}
          dayCellClassNames={dayCellClassNames}
          height="auto"
          aspectRatio={1.35}
        />
      </div>
    </div>
  );
}
