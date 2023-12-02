import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  test("renders SearchBar correctly", () => {
    const onSearchMock = jest.fn();
    const onClearMock = jest.fn();

    render(<SearchBar onSearch={onSearchMock} onClear={onClearMock} />);

    // Check if the input, search button, and clear button are present
    const inputElement = screen.getByPlaceholderText("Enter a word");
    const searchButton = screen.getByRole("button", { name: "Search" });
    const clearButton = screen.getByRole("button", { name: "Clear" });

    expect(inputElement).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });

  test("displays error message when searching with an empty field", () => {
    const onSearchMock = jest.fn();
    const onClearMock = jest.fn();

    render(<SearchBar onSearch={onSearchMock} onClear={onClearMock} />);

    // Trigger a search without entering a word
    fireEvent.click(screen.getByRole("button", { name: "Search" }));

    // Check if the error message is displayed
    const errorMessage = screen.getByText(
      "The search is empty 👻! Try to type a word"
    );
    expect(errorMessage).toBeInTheDocument();

    // Check that onSearch and onClear callbacks are not called
    expect(onSearchMock).not.toHaveBeenCalled();
    expect(onClearMock).not.toHaveBeenCalled();
  });

  test("clears error message when clearing the search field", () => {
    const onSearchMock = jest.fn();
    const onClearMock = jest.fn();

    render(<SearchBar onSearch={onSearchMock} onClear={onClearMock} />);

    // Trigger a search without entering a word to show the error message
    fireEvent.click(screen.getByRole("button", { name: "Search" }));

    // Check if the error message is displayed
    const errorMessage = screen.getByText(
      "The search is empty 👻! Try to type a word"
    );
    expect(errorMessage).toBeInTheDocument();

    // Trigger the clear button
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));

    // Check if the error message is cleared
    expect(
      screen.queryByText("The search is empty 👻! Try to type a word")
    ).toBeNull();
  });
});
