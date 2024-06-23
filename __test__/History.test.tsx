// History.test.tsx
import React, { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import History from "@/app/[userId]/components/History";
import { createClient } from "@/utils/supabase/client";
import { LiveData } from "@/types/ArtistType";

jest.mock("@/utils/supabase/client");
jest.mock("@/app/[userId]/components/HistoryCard", () => {
  return function MockHistoryCard({ livedata }: { livedata: any }) {
    return <div data-testid="history-card">{livedata.live_id}</div>;
  };
});

describe("History", () => {
  const mockUserId = "test-user-id";
  const mockLiveIds = [{ live_id: "live1" }, { live_id: "live2" }];
  const mockLiveData: LiveData[] = [
    {
      live_id: "live1",
      live_title: "New Year Concert",
      date: new Date("2023-01-01"),
      venue: "Tokyo Dome",
      capacity: 55000,
      artists: [{ artist_name: "Artist A" }, { artist_name: "Artist B" }],
    },
    {
      live_id: "live2",
      live_title: "Winter Festival",
      date: new Date("2023-01-02"),
      venue: "Yokohama Arena",
      capacity: 17000,
      artists: [{ artist_name: "Artist C" }, { artist_name: "Artist D" }],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("エラーが発生した場合、エラーメッセージが表示されること", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const mockSupabase = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      in: jest.fn().mockReturnThis(),
      order: jest.fn().mockRejectedValue(new Error("Test error")),
    };
    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    render(<History userId={mockUserId} />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith("Error loading user data!");
    });

    consoleErrorSpy.mockRestore();
  });

  //:FIXME: テストが通らない
  //   it("ライブデータが正しく表示されること", async () => {
  //     const mockSupabase = {
  //         supabase.from("user_live_schedules").select("live_id").eq("user_id", mockUserId).mockResolvedValue({ data: mockLiveIds }),
  //         supabase.from("lives").select("*", "artists(artist_name)").in("live_id", mockLiveIds).order("date", { ascending: false }).mockResolvedValue({ data: mockLiveData }),

  //     await act(async () => {
  //       render(<History userId={mockUserId} />);
  //     });

  //     await waitFor(() => {
  //       expect(screen.queryByText("読み込み中...")).not.toBeInTheDocument();
  //     });

  //     for (const live of mockLiveData) {
  //       expect(screen.getByText(live.live_id)).toBeInTheDocument();
  //     }
  //   });

  it("ライブデータが空の場合、適切なメッセージが表示されること", async () => {
    const mockSupabase = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      in: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: [] }),
    };
    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    render(<History userId={mockUserId} />);

    await waitFor(() => {
      expect(screen.getByText("No live schedule")).toBeInTheDocument();
    });
  });

  it("ローディング中の表示が正しく行われること", async () => {
    const mockSupabase = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      in: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnValue(new Promise(() => {})), // 永続的なローディング状態をシミュレート
    };
    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    render(<History userId={mockUserId} />);

    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
  });
});
