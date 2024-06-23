// __tests__/UserPage.test.tsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserPage from "../app/[userId]/page";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// Mock the modules
jest.mock("@/utils/supabase/server");
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));
jest.mock("@/app/[userId]/components/UserForm", () => {
  return function MockUserForm({ authId }: { authId: string }) {
    return <div data-testid="user-form">User Form: {authId}</div>;
  };
});

describe("UserPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("ログイン済みの場合UserFormをレンダリングする", async () => {
    // Mock Supabase client
    const mockUser = { id: "test-user-id" };
    const mockSupabase = {
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: mockUser } }),
      },
    };
    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    // Render the component
    await render(await UserPage());

    // Check if UserForm is rendered with correct props
    expect(screen.getByTestId("user-form")).toHaveTextContent(
      "User Form: test-user-id"
    );
    expect(redirect).not.toHaveBeenCalled();
  });

  it("ログインしていない場合ログインページにリダイレクトする", async () => {
    // Mock Supabase client to return no user
    const mockSupabase = {
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: null } }),
      },
    };
    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    // Render the component
    await UserPage();

    // Check if redirect was called
    expect(redirect).toHaveBeenCalledWith("/login");
    expect(screen.queryByTestId("user-form")).not.toBeInTheDocument();
  });

  it("エラーが発生した場合適切に処理する", async () => {
    const mockSupabase = {
      auth: {
        getUser: jest.fn().mockRejectedValue(new Error("Auth error")),
      },
    };
    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    await expect(UserPage()).rejects.toThrow("Auth error");
    expect(redirect).not.toHaveBeenCalled();
  });
});
