import { Box, Heading, useColorModeValue, useToken } from "@chakra-ui/react";
import React, { useState } from "react";

import DefinitionDisplay from "./DefinitionDisplay";
import SearchBar from "./SearchBar";
import WordDisplay from "./WordDisplay";

interface Phonetic {
  text: string;
  audio?: string;
}

// Define the shape of the data returned from the API by defining an interface
export interface Definition {
  word: string;
  phonetics: Phonetic[];
  origin?: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example: string;
      synonyms: string[];
      antonyms: string[];
    }[];
  }[];
}

// Define the shape of the props
const Search: React.FC = () => {
  // State to track the current word
  const [word, setWord] = useState<string>("");
  // State to track the definitions
  const [definitions, setDefinitions] = useState<Definition[]>([]);

  // Handler function for initiating a search
  // This function is run when the user clicks the search button
  // This function is asynchronous because it uses the fetch API
  // The function is marked as async so that we can use the await keyword
  const handleSearch = async (searchWord: string) => {
    if (searchWord) {
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: Definition[] = await response.json();

        setWord(searchWord);
        setDefinitions(data);
      } catch (error) {
        console.error("Error fetching data:", error);

        // Handle errors, e.g., display an error message to the user
        if (error instanceof Error) {
          alert(error.message);
        }

        // Clear the word and definitions
        setWord("");
        setDefinitions([]);
      }
    }
  };
  // Handler function to clear the search input
  const handleClear = () => {
    setWord("");
    setDefinitions([]);
  };

  return (
    <Box
      p={4}
      bg={useColorModeValue("gray.100", "gray.800")}
      color={useToken("colors", "gray.800", "gray.200")}
    >
      <Heading as="h1" size="xl" mb={4}>
        Search for a word
      </Heading>
      <SearchBar onSearch={handleSearch} onClear={handleClear} />
      <WordDisplay word={word} />

      {definitions.map((definition, index) => (
        <DefinitionDisplay key={index} definition={definition} />
      ))}
    </Box>
  );
};

export default Search;
