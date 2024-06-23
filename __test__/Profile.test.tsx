// Profile.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserProfile from "@/app/[userId]/components/Profile";

describe("UserProfile", () => {
  const mockUser = {
    user_id: "test-user-id",
    display_name: "Test User",
    display_image: "https://example.com/test-image.jpg",
    email: "test@example.com",
  };

  it("ユーザー情報が正しく表示されること", () => {
    render(<UserProfile user={mockUser} />);

    expect(screen.getByText(mockUser.display_name)).toBeInTheDocument();
    expect(screen.getByText("プロフィール文章")).toBeInTheDocument();
    expect(screen.getByAltText("ユーザーアイコン")).toHaveAttribute(
      "src",
      mockUser.display_image
    );
  });

  it("レスポンシブデザインの要素が存在すること", () => {
    render(<UserProfile user={mockUser} />);

    const imageContainer = screen.getByRole("img").parentElement;
    expect(imageContainer).toHaveClass("sm:w-40 sm:h-40");

    const nameElement = screen.getByText(mockUser.display_name);
    expect(nameElement).toHaveClass("sm:text-2xl");
  });
});
