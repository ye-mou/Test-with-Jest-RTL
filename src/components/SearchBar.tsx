import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (word: string) => void;
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {
  const [word, setWord] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    if (word.trim() === "") {
      setError("The search is empty 👻! Try to type a word");
    } else {
      setError(null);
      onSearch(word);
    }
  };

  const handleClear = () => {
    setWord("");
    setError(null);
    onClear();
  };

  return (
    <Flex direction="column" mb={4}>
      <Flex alignItems="center">
        <Input
          type="text"
          border={"1px"}
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
          variant="filled"
          mr={2}
        />
        <Button colorScheme="teal" onClick={handleSearch} mr={2} border={"1px"}>
          Search
        </Button>
        <Button onClick={handleClear} variant="outline" border={"1px"}>
          Clear
        </Button>
      </Flex>
      {error && (
        <Text color="red" mt={2}>
          {error}
        </Text>
      )}
    </Flex>
  );
};

export default SearchBar;
