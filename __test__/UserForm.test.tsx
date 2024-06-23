// UserForm.test.tsx
import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import UserForm from "@/app/[userId]/components/UserForm";
import { createClient } from "@/utils/supabase/client";
import { setCookie } from "nookies";

// モックの設定
jest.mock("@/utils/supabase/client");
jest.mock("nookies");
jest.mock("@/app/[userId]/components/Profile", () => {
  return function MockProfile() {
    return <div data-testid="profile">Profile Component</div>;
  };
});
jest.mock("@/app/[userId]/components/History", () => {
  return function MockHistory() {
    return <div data-testid="history">History Component</div>;
  };
});

describe("UserForm", () => {
  const mockAuthId = "test-auth-id";
  const mockUserData = {
    user_id: "test-user-id",
    display_name: "Test User",
    display_image: "test-image.jpg",
    email: "test@example.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("初期状態でローディング表示がされること", async () => {
    const mockSupabase = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest
        .fn()
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              setTimeout(() => resolve({ data: null }), 100)
            )
        ),
    };
    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    render(<UserForm authId={mockAuthId} />);

    await waitFor(() => {
      expect(screen.getByText("読み込み中...")).toBeInTheDocument();
    });
  });

  it("ユーザーデータが正常に取得された場合、ProfileとHistoryコンポーネントが表示されること", async () => {
    const mockSupabase = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockUserData }),
    };
    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    await act(async () => {
      render(<UserForm authId={mockAuthId} />);
    });

    await waitFor(() => {
      expect(screen.queryByText("読み込み中...")).not.toBeInTheDocument();
      expect(screen.getByTestId("profile")).toBeInTheDocument();
      expect(screen.getByTestId("history")).toBeInTheDocument();
    });

    expect(setCookie).toHaveBeenCalledWith(
      null,
      "userId",
      mockUserData.user_id,
      expect.objectContaining({
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      })
    );
  });

  it("ユーザーデータの取得に失敗した場合、エラーアラートが表示されること", async () => {
    const mockSupabase = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockRejectedValue(new Error("Test error")),
    };
    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    await act(async () => {
      render(<UserForm authId={mockAuthId} />);
    });

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Error loading user data!");
    });

    alertMock.mockRestore();
  });

  it("authIdが提供されない場合、ユーザーデータが取得されないこと", async () => {
    const mockSupabase = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(),
    };
    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    await act(async () => {
      render(<UserForm authId="" />);
    });

    expect(mockSupabase.from).not.toHaveBeenCalled();
  });
});
