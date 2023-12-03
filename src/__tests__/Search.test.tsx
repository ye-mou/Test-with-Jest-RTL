import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "../components/Search";

describe("Search component", () => {
  test("should allow users to search for a word and display the result of the word", async () => {
    render(<Search />);

    // Check if the search bar is displayed and wait for the user to type in the search bar
    const searchInput = screen.getByPlaceholderText("Enter a word");
    await userEvent.type(searchInput, "hello");
    await waitFor(() => expect(searchInput).toHaveValue("hello"));

    // Check if DefinitionDisplay component is rendered
    await waitFor(() => {
      const definitionDisplay = screen.getByTestId("definition-display");
      expect(definitionDisplay).toBeInTheDocument();
    });

    // Check if the word is displayed
    const heading = screen.getByRole("heading", { name: /hello/i });
    expect(heading).toBeInTheDocument();

    // Check if the part of speech, definition, and audio button are displayed
    const partOfSpeech = screen.getByTestId("part-of-speech");
    expect(partOfSpeech).toBeInTheDocument();

    // Check if the primary definition is displayed
    const primaryDefinition = screen.getByTestId("definition");
    expect(primaryDefinition).toBeInTheDocument();
    expect(primaryDefinition).toHaveTextContent(
      "Definition: A greeting (salutation) said when meeting someone or acknowledging someone’s arrival or presence."
    );

    // Check if the secondary definition is displayed
    const secondaryDefinition = screen.getByText("Part of Speech: noun");
    expect(secondaryDefinition).toBeInTheDocument();

    // Check if the audio button is displayed
    const audioButton = screen.getByRole("button", { name: /Listen/i });
    expect(audioButton).toBeInTheDocument();
  });
});
