// UserForm.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import UserForm from "@/app/[userId]/components/UserForm";
import { useUserInfo } from "@/hooks/useUserInfo";

// モックの設定
jest.mock("@/hooks/useUserInfo");
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

  it("authIdが空文字の場合、エラーメッセージが表示されること", () => {
    render(<UserForm authId="" />);
    expect(
      screen.getByText("ユーザー情報が見つかりません。")
    ).toBeInTheDocument();
    expect(useUserInfo).not.toHaveBeenCalled();
  });

  it("初期状態でローディング表示がされること", () => {
    (useUserInfo as jest.Mock).mockReturnValue({
      loading: true,
      userId: null,
      user: null,
    });

    render(<UserForm authId={mockAuthId} />);

    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
  });

  it("ユーザーデータが正常に取得された場合、ProfileとHistoryコンポーネントが表示されること", () => {
    (useUserInfo as jest.Mock).mockReturnValue({
      loading: false,
      userId: mockUserData.user_id,
      user: mockUserData,
    });

    render(<UserForm authId={mockAuthId} />);

    expect(screen.queryByText("読み込み中...")).not.toBeInTheDocument();
    expect(screen.getByTestId("profile")).toBeInTheDocument();
    expect(screen.getByTestId("history")).toBeInTheDocument();
  });

  it("ユーザーデータが取得できない場合、Historyコンポーネントが表示されないこと", () => {
    (useUserInfo as jest.Mock).mockReturnValue({
      loading: false,
      userId: null,
      user: null,
    });

    render(<UserForm authId={mockAuthId} />);

    expect(screen.queryByText("読み込み中...")).not.toBeInTheDocument();
    expect(screen.getByTestId("profile")).toBeInTheDocument();
    expect(screen.queryByTestId("history")).not.toBeInTheDocument();
  });
});
