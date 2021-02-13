import React from "react";
import Header from "./components/Header/Header";
import AllBoards from "./pages/AllBoards/AllBoards";
function App() {
  return (
    <div className="bg-blue-50 w-screen h-screen font-mono overflow-x-hidden">
      <Header></Header>
      <AllBoards></AllBoards>
    </div>
  );
}
export default App;
