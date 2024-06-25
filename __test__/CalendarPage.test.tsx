// calendar.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import CalendarPage from "@/app/[userId]/calendar/page"; // パスは実際のファイル構造に合わせて調整してください

// Calendarコンポーネントのモック
jest.mock("@/app/[userId]/calendar/components/Calendar", () => {
  return function MockCalendar() {
    return <div data-testid="calendar">Mock Calendar</div>;
  };
});

describe("Calendar Page", () => {
  it("renders the Calendar component", () => {
    render(<CalendarPage />);

    const calendarComponent = screen.getByTestId("calendar");
    expect(calendarComponent).toBeInTheDocument();
    expect(calendarComponent).toHaveTextContent("Mock Calendar");
  });

  it("applies correct CSS classes", () => {
    render(<CalendarPage />);

    const containerDiv = screen.getByTestId("calendar").parentElement;
    expect(containerDiv).toHaveClass("flex-grow");
    expect(containerDiv).toHaveClass("overflow-auto");
    expect(containerDiv).toHaveClass("p-4");
    expect(containerDiv).toHaveClass("sm:p-6");
    expect(containerDiv).toHaveClass("md:p-8");
  });
});
