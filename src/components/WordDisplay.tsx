import React from "react";

interface Props {
  word: string;
}

const WordDisplay: React.FC<Props> = ({ word }) => {
  return (
    <div>
      <p>{word}</p>
    </div>
  );
};

export default WordDisplay;
