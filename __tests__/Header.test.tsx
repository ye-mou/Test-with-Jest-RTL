import { render, screen } from "@testing-library/react";
import Header from "../src/components/Header";

test("Should show welcome messages", () => {
  render(<Header />);
  const linkElement = screen.getByText(/Welcome to my word definitions/i);
  expect(linkElement).toBeInTheDocument();
});
