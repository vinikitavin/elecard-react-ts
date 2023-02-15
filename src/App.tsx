import {TheHeader} from "./components/TheHeader/TheHeader";
import {TheMain} from "./components/TheMain/TheMain/TheMain";
import {TheFooter} from "./components/TheFooter/TheFooter";
import React from "react";

function App() {
  return (
      <div className="App">
        <TheHeader/>
        <TheMain/>
        <TheFooter/>
      </div>
  );
}

export default App;
