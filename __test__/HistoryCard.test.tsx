import React from "react";
import { render, screen } from "@testing-library/react";
import HistoryCard from "@/app/[userId]/components/HistoryCard";
import { LiveData } from "@/types/ArtistType";

// Mock the DateDisplay component
jest.mock("@/app/[userId]/components/DateDisplay", () => {
  return function MockDateDisplay({ dateStr }: { dateStr: string }) {
    const date = new Date(dateStr);
    return (
      <div data-testid="date-display">{date.toISOString().split("T")[0]}</div>
    );
  };
});

// Mock the DeleteButton component
jest.mock("@/components/common/DeleteButton", () => ({
  DeleteButton: () => <button data-testid="delete-button">Delete</button>,
}));

describe("HistoryCard", () => {
  const mockLiveData: LiveData = {
    live_id: "1",
    live_title: "Test Concert",
    date: new Date("2023-12-31"),
    venue: "Test Venue",
    capacity: 1000,
    artists: [],
  };

  it("ライブ情報が正しく表示される", () => {
    render(<HistoryCard livedata={mockLiveData} />);

    expect(screen.getByText("Test Concert")).toBeInTheDocument();
    expect(screen.getByText("Test Venue")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByTestId("date-display")).toHaveTextContent("2023-12-31");
  });

  it("すでに終了したイベントに対して、チャットボタンが表示される", () => {
    const pastLiveData = { ...mockLiveData, date: new Date("2000-01-01") };
    render(<HistoryCard livedata={pastLiveData} />);

    expect(screen.getByTestId("ChatIcon")).toBeInTheDocument();
  });

  it("今後のイベントに対して、削除ボタンが表示される", () => {
    const futureLiveData = { ...mockLiveData, date: new Date("2100-01-01") };
    render(<HistoryCard livedata={futureLiveData} userId="test-user" />);

    expect(screen.getByTestId("delete-button")).toBeInTheDocument();
  });

  it("displays disabled chat icon for future events when userId is not provided", () => {
    const futureLiveData = { ...mockLiveData, date: new Date("2100-01-01") };
    render(<HistoryCard livedata={futureLiveData} />);

    const chatIcon = screen.getByTestId("ChatIcon");
    expect(chatIcon).toBeInTheDocument();
    expect(chatIcon.closest("button")).toBeDisabled();
  });

  it("handles missing capacity", () => {
    const liveDataWithoutCapacity = { ...mockLiveData, capacity: undefined };
    render(<HistoryCard livedata={liveDataWithoutCapacity} />);

    expect(screen.getByText("-")).toBeInTheDocument();
  });
});
