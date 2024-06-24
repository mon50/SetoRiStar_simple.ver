// UserForm.test.tsx
import React from "react";
import { render, screen, act } from "@testing-library/react";
import UserForm from "@/app/[userId]/components/UserForm";
import { getUserInfo } from "@/utils/actions/getUserInfo";

jest.mock("@/utils/actions/getUserInfo");
jest.mock("nookies", () => ({
  setCookie: jest.fn(),
}));
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
    (getUserInfo as jest.Mock).mockReturnValue(new Promise(() => {}));

    await act(async () => {
      render(<UserForm authId={mockAuthId} />);
    });

    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
  });

  it("ユーザーデータが正常に取得された場合、ProfileとHistoryコンポーネントが表示されること", async () => {
    (getUserInfo as jest.Mock).mockResolvedValue({
      data: mockUserData,
      error: null,
      status: 200,
    });

    await act(async () => {
      render(<UserForm authId={mockAuthId} />);
    });

    expect(screen.queryByText("読み込み中...")).not.toBeInTheDocument();
    expect(screen.getByTestId("profile")).toBeInTheDocument();
    expect(screen.getByTestId("history")).toBeInTheDocument();
  });

  it("ユーザーデータの取得に失敗した場合、エラーアラートが表示されること", async () => {
    (getUserInfo as jest.Mock).mockRejectedValue(new Error("Test error"));

    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    await act(async () => {
      render(<UserForm authId={mockAuthId} />);
    });

    expect(alertMock).toHaveBeenCalledWith("Error loading user data!");

    alertMock.mockRestore();
  });

  it("authIdが空文字の場合、getUserInfoが呼び出されないこと", async () => {
    await act(async () => {
      render(<UserForm authId="" />);
    });

    expect(getUserInfo).not.toHaveBeenCalled();
  });
});
