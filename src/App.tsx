import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import Search from "./components/Search";

function App() {
  return (
    <ChakraProvider>
      <Header />
      <Search />
    </ChakraProvider>
  );
}

export default App;
