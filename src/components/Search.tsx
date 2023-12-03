import { Box, Heading, useToken } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import DefinitionDisplay from "./DefinitionDisplay";
import SearchBar from "./SearchBar";

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
  const [word, setWord] = useState<string>("");
  const [definitions, setDefinitions] = useState<Definition[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );

        if (!response || !response.ok) {
          throw new Error("Your search did not return any results");
        }

        const data: Definition[] = await response.json();

        setDefinitions(data);
      } catch (error) {
        console.error("Error fetching data:", error);

        if (error instanceof Error) {
          alert(error.message);
        }

        setDefinitions([]);
      }
    };

    if (word) {
      fetchData();
    }
  }, [word]);

  const handleSearch = (searchWord: string) => {
    setWord(searchWord);
  };

  const handleClear = () => {
    setWord("");
    setDefinitions([]);
  };

  return (
    <Box
      p={4}
      color={useToken("colors", "gray.800", "gray.200")}
      data-testid="search-component"
    >
      {" "}
      {/* Add data-testid for the search component */}
      <Heading as="h1" size="xl" mb={4}>
        Search for a word
      </Heading>
      <SearchBar onSearch={handleSearch} onClear={handleClear} />
      {definitions.map((definition, index) => (
        <DefinitionDisplay key={index} definition={definition} />
      ))}
    </Box>
  );
};

export default Search;
export {};
