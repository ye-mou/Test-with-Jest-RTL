// DefinitionDisplay.tsx
import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Definition } from "./Search";

interface DefinitionDisplayProps {
  definition: Definition;
}

const DefinitionDisplay: React.FC<DefinitionDisplayProps> = ({
  definition,
}) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Heading as="h2" size="lg" mb={4}>
        {definition.word}
      </Heading>

      {/* Display a minimal set of information */}
      <Box mb={4}>
        <Text>Part of Speech: {definition.meanings[0].partOfSpeech}</Text>
        <Text>
          Definition: {definition.meanings[0].definitions[0].definition}
        </Text>
      </Box>

      {/* Display additional meanings */}
      <Box mb={4}>
        {definition.meanings.map((meaning, index) => (
          <div key={index}>
            <Text>Part of Speech: {meaning.partOfSpeech}</Text>
            <Text>Definition: {meaning.definitions[0].definition}</Text>
          </div>
        ))}
      </Box>

      {/* Display phonetics */}
      <Box>
        {definition.phonetics.length > 0 && (
          <div>
            <Text>{definition.phonetics[0].text}</Text>
            {definition.phonetics[0].audio && (
              <div>
                <audio controls>
                  <source
                    src={definition.phonetics[0].audio}
                    type="audio/mpeg"
                  />
                </audio>
              </div>
            )}
          </div>
        )}
      </Box>
    </Box>
  );
};

export default DefinitionDisplay;
