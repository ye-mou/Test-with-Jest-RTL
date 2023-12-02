import { render, screen } from "@testing-library/react";
import Header from "../Header";

test("Should show welcome messages", () => {
  render(<Header />);
  expect(
    screen.getByText("Welcome to my word definitions")
  ).toBeInTheDocument();
});
