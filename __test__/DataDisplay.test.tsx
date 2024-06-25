import React from "react";
import { render, screen } from "@testing-library/react";
import DateDisplay from "@/app/[userId]/components/DateDisplay";

describe("DateDisplay", () => {
  it("correctly displays the date", () => {
    const testDate = "2023-05-15";
    render(<DateDisplay dateStr={testDate} />);

    // 月のチェック
    expect(screen.getByText("5")).toBeInTheDocument();

    // 日のチェック
    expect(screen.getByText("15")).toBeInTheDocument();

    // 年のチェック
    expect(screen.getByText("2023")).toBeInTheDocument();
  });

  it("handles single digit month and day", () => {
    const testDate = "2023-01-05";
    render(<DateDisplay dateStr={testDate} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
  });

  it("correctly displays the last day of the year", () => {
    const testDate = "2023-12-31";
    render(<DateDisplay dateStr={testDate} />);

    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("31")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
  });

  it("handles leap year", () => {
    const testDate = "2024-02-29";
    render(<DateDisplay dateStr={testDate} />);

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("29")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });
});
