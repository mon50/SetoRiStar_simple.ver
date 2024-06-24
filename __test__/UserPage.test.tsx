// __tests__/UserPage.test.tsx
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import UserPage from "@/app/[userId]/page";
import GetUser from "@/utils/actions/getUser";
import { redirect } from "next/navigation";

// GetUserとredirectをモック化
jest.mock("@/utils/actions/getUser");
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

// UserFormコンポーネントをモック化
jest.mock("@/app/[userId]/components/UserForm", () => {
  return function MockUserForm({ authId }: { authId: string }) {
    return (
      <div data-testid="user-form" data-authid={authId}>
        Mocked UserForm
      </div>
    );
  };
});

describe("UserPage", () => {
  it("ユーザーが存在する場合、UserFormを表示する", async () => {
    const mockUser = { id: "123" };
    (GetUser as jest.Mock).mockResolvedValue(mockUser);

    render(await UserPage());

    await waitFor(() => {
      const userForm = screen.getByTestId("user-form");
      expect(userForm).toBeInTheDocument();
      expect(userForm).toHaveAttribute("data-authid", "123");
      expect(screen.getByText("Mocked UserForm")).toBeInTheDocument();
    });
  });

  it("ユーザーが存在しない場合、ログインページにリダイレクトする", async () => {
    (GetUser as jest.Mock).mockResolvedValue(null);

    await UserPage();

    expect(redirect).toHaveBeenCalledWith("/login");
  });
});
