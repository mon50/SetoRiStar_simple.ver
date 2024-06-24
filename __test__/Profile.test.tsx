// Profile.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Profile from "@/app/[userId]/components/Profile";
import { ConnectUserInfo } from "@/types/AccountType";

// Imageコンポーネントのモック
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe("Profile", () => {
  const mockUser: ConnectUserInfo = {
    user_id: "test-user-id",
    display_name: "Test User",
    display_image: "/test-image.jpg",
    email: "test@example.com",
  };

  it("ユーザー情報が正しく表示されること", () => {
    render(<Profile user={mockUser} />);

    // ユーザー名が表示されていることを確認
    expect(screen.getByText("Test User")).toBeInTheDocument();

    // プロフィール文章が表示されていることを確認
    expect(screen.getByText("プロフィール文章")).toBeInTheDocument();

    // ユーザーアイコンが表示されていることを確認
    const userIcon = screen.getByAltText(
      "ユーザーアイコン"
    ) as HTMLImageElement;
    expect(userIcon).toBeInTheDocument();
    expect(userIcon.src).toContain("/test-image.jpg");
  });

  it("ユーザーアイコンが適切なサイズで表示されること", () => {
    render(<Profile user={mockUser} />);

    const userIcon = screen.getByAltText(
      "ユーザーアイコン"
    ) as HTMLImageElement;
    expect(userIcon).toHaveAttribute("width", "160");
    expect(userIcon).toHaveAttribute("height", "160");
  });

  it("レスポンシブデザインのクラスが適用されていること", () => {
    render(<Profile user={mockUser} />);

    // メインのコンテナに適切なクラスが適用されていることを確認
    const container = screen.getByRole("heading", { name: "Test User" })
      .parentElement?.parentElement;
    expect(container).toHaveClass(
      "flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10"
    );

    // ユーザー名のヘッダーに適切なクラスが適用されていることを確認
    const nameHeader = screen.getByRole("heading", { name: "Test User" });
    expect(nameHeader).toHaveClass("text-xl sm:text-2xl font-bold");
  });
});
