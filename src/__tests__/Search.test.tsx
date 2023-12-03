import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "../components/search/Search";

describe("Search component", () => {
  test("should allow users to search for a word and display the result of the word", async () => {
    render(<Search />);

    const searchInput = screen.getByPlaceholderText("Enter a word");
    expect(searchInput).toBeInTheDocument();

    await userEvent.type(searchInput, "hello");
    await waitFor(() => expect(searchInput).toHaveValue("hello"));

    const searchButton = screen.getByRole("button", { name: /Search/i });
    expect(searchButton).toBeInTheDocument();
    await userEvent.click(searchButton);
    await waitFor(() => expect(searchInput).toHaveValue(""));

    // Use findByText to wait for the text to appear
    const searchResults = await screen.findByText("hello");
    expect(searchResults).toBeInTheDocument();

    // Check if the word is displayed
    const word = screen.getByText("hello");
    expect(word).toBeInTheDocument();

    // Check if the phonetic text is displayed
    const phonetic = screen.getByText("/həˈləʊ/");
    expect(phonetic).toBeInTheDocument();

    // Check if the phonetic audio is displayed
    const audio = screen.getByRole("button", { name: /Listen/i });
    expect(audio).toBeInTheDocument();

    // Check if the origin is displayed
    const origin = screen.getByText("early 19th century");
    expect(origin).toBeInTheDocument();

    // Check if the part of speech is displayed
    const partOfSpeech = screen.getByText("exclamation");
    expect(partOfSpeech).toBeInTheDocument();

    // Check if the definition is displayed
    const definition = screen.getByText(
      "used as a greeting or to begin a phone conversation"
    );
    expect(definition).toBeInTheDocument();

    // Check if the example is displayed
    const example = screen.getByText("hello there, Katie!");
    expect(example).toBeInTheDocument();

    // Check if the synonyms are displayed
    const synonyms = screen.getByText("hi");
    expect(synonyms).toBeInTheDocument();
  });
});
