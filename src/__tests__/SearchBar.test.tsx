import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

// This is to group the tests
describe("SearchBar", () => {
  test("renders SearchBar correctly", () => {
    const onSearchMock = jest.fn();
    const onClearMock = jest.fn();

    render(<SearchBar onSearch={onSearchMock} onClear={onClearMock} />);

    // Check if the input, search button, and clear button exist by their test ids
    const inputElement = screen.getByTestId("search-input");
    const searchButton = screen.getByTestId("search-button");
    const clearButton = screen.getByTestId("clear-button");

    expect(inputElement).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });

  test("displays error message when searching with an empty field", () => {
    const onSearchMock = jest.fn();
    const onClearMock = jest.fn();

    render(<SearchBar onSearch={onSearchMock} onClear={onClearMock} />);

    // Trigger a search without entering a word
    fireEvent.click(screen.getByTestId("search-button"));

    // Check if the error message is displayed
    const errorMessage = screen.getByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();

    // Check that onSearch and onClear callbacks are not called
    expect(onSearchMock).not.toHaveBeenCalled();
    expect(onClearMock).not.toHaveBeenCalled();
  });

  test("clears error message when clearing the search field", () => {
    const onSearchMock = jest.fn();
    const onClearMock = jest.fn();

    render(<SearchBar onSearch={onSearchMock} onClear={onClearMock} />);

    // Trigger a search without entering a word
    fireEvent.click(screen.getByTestId("search-button"));

    // Check if the error message is displayed
    const errorMessage = screen.getByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });
});
