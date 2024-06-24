// History.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import History from "@/app/[userId]/components/History";
import { useUserAttendLiveInfo } from "@/hooks/useUserAttendLiveInfo";

// useUserAttendLiveInfoフックをモック化
jest.mock("@/hooks/useUserAttendLiveInfo");

// HistoryCardコンポーネントをモック化
jest.mock("@/app/[userId]/components/HistoryCard", () => {
  return function MockHistoryCard({ livedata }: { livedata: any }) {
    return <div data-testid="history-card">{livedata.live_id}</div>;
  };
});

describe("History Component", () => {
  const mockUserId = "test-user-id";

  it("ローディング中の表示をテスト", () => {
    (useUserAttendLiveInfo as jest.Mock).mockReturnValue({
      liveData: [],
      loading: true,
      error: null,
    });

    render(<History userId={mockUserId} />);
    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
  });

  it("エラー発生時の表示をテスト", () => {
    const errorMessage = "テストエラー";
    (useUserAttendLiveInfo as jest.Mock).mockReturnValue({
      liveData: [],
      loading: false,
      error: errorMessage,
    });

    render(<History userId={mockUserId} />);
    expect(
      screen.getByText(`エラーが発生しました: ${errorMessage}`)
    ).toBeInTheDocument();
  });

  it("ライブデータがない場合の表示をテスト", () => {
    (useUserAttendLiveInfo as jest.Mock).mockReturnValue({
      liveData: [],
      loading: false,
      error: null,
    });

    render(<History userId={mockUserId} />);
    expect(screen.getByText("No live schedule")).toBeInTheDocument();
  });

  it("ライブデータがある場合の表示をテスト", () => {
    const mockLiveData = [{ live_id: "live1" }, { live_id: "live2" }];
    (useUserAttendLiveInfo as jest.Mock).mockReturnValue({
      liveData: mockLiveData,
      loading: false,
      error: null,
    });

    render(<History userId={mockUserId} />);
    const historyCards = screen.getAllByTestId("history-card");
    expect(historyCards).toHaveLength(2);
    expect(historyCards[0]).toHaveTextContent("live1");
    expect(historyCards[1]).toHaveTextContent("live2");
  });
});
