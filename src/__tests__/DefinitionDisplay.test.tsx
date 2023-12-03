// DefinitionDisplay.test.tsx
import { render, screen, within } from "@testing-library/react";
import DefinitionDisplay from "../components/DefinitionDisplay";
import apiMockData from "../components/search/apiMockData.json";

describe("DefinitionDisplay", () => {
  test("renders the definition component", () => {
    const mockDefinition = apiMockData[0]; // Assuming you have only one definition in the array

    render(<DefinitionDisplay definition={mockDefinition} />);

    // Test if the word is displayed
    expect(screen.getByText("hello")).toBeInTheDocument();

    // Use within to narrow down the search scope
    const partOfSpeechElement = within(
      screen.getByTestId("part-of-speech")
    ).getByText("Part of Speech: exclamation");
    expect(partOfSpeechElement).toBeInTheDocument();

    const definitionElement = within(
      screen.getByTestId("definition")
    ).getByText(
      "Definition: used as a greeting or to begin a phone conversation."
    );
    expect(definitionElement).toBeInTheDocument();

    // You can add more specific tests based on your component's content
  });
});
