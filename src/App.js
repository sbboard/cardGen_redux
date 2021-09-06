import React from "react";
import { useSelector } from "react-redux";
import "./App.sass";
import Uploader from "./Uploader/Uploader";
import CardOutput from "./CardOutput/Canvas";
import teamList from "./teamList";
import logo from "./strikeOutLogo.png"

function App() {
  const playerInfo = useSelector((state) => state.playerInfo);
  const isFinished = useSelector((state) => state.process.isFinished);

  const display = function () {
    if (isFinished) {
      return <CardOutput />;
    } else {
      return <Uploader />;
    }
  };

  return (
    <div className="App">
      <img id="logo" src={logo} alt="StrikeOut Logo" />
      <h1>Summer Classics Card Creator</h1>
      {display()}
      {playerInfo.name}
      <a
        id="strikeLink"
        href="https://twitter.com/gyangufaito/status/1347286890152648704"
      >
        Read StrikeOut every Wednesday!
      </a>
    </div>
  );
}

export default App;
