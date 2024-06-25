// Calendar.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Calendar from "@/app/[userId]/calendar/components/Calendar";
import { useCalendar } from "@/hooks/useCalendar";

// useCalendarフックをモック化
jest.mock("@/hooks/useCalendar");

// FullCalendarコンポーネントをモック化
jest.mock("@fullcalendar/react", () => ({
  __esModule: true,
  default: (props: any) => (
    <div
      data-testid="full-calendar"
      data-header-toolbar={JSON.stringify(props.headerToolbar)}
    >
      FullCalendar Mock
    </div>
  ),
}));
jest.mock("@fullcalendar/daygrid", () => ({}));
jest.mock("@fullcalendar/interaction", () => ({}));

// ModalExampleコンポーネントをモック化
jest.mock("@/components/common/Modal", () => {
  return function MockModal(props: any) {
    return <div data-testid="modal">Modal Mock</div>;
  };
});

describe("Calendar Component", () => {
  const mockUseCalendar = useCalendar as jest.MockedFunction<
    typeof useCalendar
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("ローディング中の表示をテスト", () => {
    mockUseCalendar.mockReturnValue({
      loading: true,
      error: null,
      userId: "",
      clickedDate: null,
      isModalOpen: false,
      setIsModalOpen: jest.fn(),
      handleDateClick: jest.fn(),
      dayCellClassNames: jest.fn(),
      events: [],
      headerToolbar: {
        start: "",
        center: "",
        end: "",
      },
      isMobile: false,
    });

    render(<Calendar />);
    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
  });

  it("エラー発生時の表示をテスト", () => {
    const errorMessage = "テストエラー";
    mockUseCalendar.mockReturnValue({
      loading: false,
      error: errorMessage,
      userId: "",
      clickedDate: null,
      isModalOpen: false,
      setIsModalOpen: jest.fn(),
      handleDateClick: jest.fn(),
      dayCellClassNames: jest.fn(),
      events: [],
      headerToolbar: {
        start: "",
        center: "",
        end: "",
      },
      isMobile: false,
    });

    render(<Calendar />);
    expect(
      screen.getByText(`エラーが発生しました: ${errorMessage}`)
    ).toBeInTheDocument();
  });

  it("カレンダーが正常に表示されることをテスト", () => {
    mockUseCalendar.mockReturnValue({
      loading: false,
      error: null,
      userId: "test-user",
      clickedDate: new Date(),
      isModalOpen: false,
      setIsModalOpen: jest.fn(),
      handleDateClick: jest.fn(),
      dayCellClassNames: jest.fn(),
      events: [],
      headerToolbar: {
        start: "prev,next today",
        center: "title",
        end: "dayGridMonth,dayGridWeek,dayGridDay",
      },
      isMobile: false,
    });

    render(<Calendar />);
    expect(screen.getByTestId("full-calendar")).toBeInTheDocument();
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("モバイル用のヘッダーツールバーが正しく設定されることをテスト", () => {
    mockUseCalendar.mockReturnValue({
      loading: false,
      error: null,
      userId: "test-user",
      clickedDate: new Date(),
      isModalOpen: false,
      setIsModalOpen: jest.fn(),
      handleDateClick: jest.fn(),
      dayCellClassNames: jest.fn(),
      events: [],
      headerToolbar: {
        start: "prev,next",
        center: "title",
        end: "",
      },
      isMobile: true,
    });

    render(<Calendar />);
    const fullCalendar = screen.getByTestId("full-calendar");
    expect(fullCalendar).toHaveAttribute(
      "data-header-toolbar",
      JSON.stringify({
        start: "prev,next",
        center: "title",
        end: "",
      })
    );
  });
});
