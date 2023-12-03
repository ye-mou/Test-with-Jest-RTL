// DefinitionDisplay.test.tsx
import { render, screen, within } from "@testing-library/react";
import DefinitionDisplay from "../components/DefinitionDisplay";

// Test if the word is displayed
describe("DefinitionDisplay", () => {
  test("renders the definition component", () => {
    // Mock the definition data
    const mockDefinition = {
      word: "hello",
      phonetics: [
        {
          text: "/həˈləʊ/",
          audio: "https://lex-audio.useremarkable.com/mp3/hello_us_1_rr.mp3",
        },
      ],
      origin: "early 19th century",
      meanings: [
        {
          partOfSpeech: "exclamation",
          definitions: [
            {
              definition:
                "used as a greeting or to begin a phone conversation.",
              example: "hello there, Katie!",
              synonyms: ["hi", "howdy", "hey", "aloha", "greetings", "hiya"],
              antonyms: ["goodbye"],
            },
          ],
        },
      ],
    };
    render(<DefinitionDisplay definition={mockDefinition} />);

    // Test if the word is displayed
    expect(screen.getByText("hello")).toBeInTheDocument();

    // Scope is used to narrow down the search to a specific element
    const partOfSpeechElement = within(
      screen.getByTestId("part-of-speech")
    ).getByText("Part of Speech: exclamation");
    expect(partOfSpeechElement).toBeInTheDocument();

    // Test if the definition is displayed
    const definitionElement = within(
      screen.getByTestId("definition")
    ).getByText(
      "Definition: used as a greeting or to begin a phone conversation."
    );
    expect(definitionElement).toBeInTheDocument();
  });
});
