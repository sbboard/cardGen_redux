import React, { useRef, useEffect } from "react";

const PlayerStats = (props) => {
  const nameInput = useRef(null);
  const numberInput = useRef(null);
  const rankInput = useRef(null);
  const positionInput = useRef(null);

  useEffect(() => {
    if (props.checkName !== null) {
      nameInput.current.value = props.checkName;
    }
    if (props.checkNumber !== null) {
      numberInput.current.value = props.checkNumber;
    }
    if (props.checkRank !== null) {
      rankInput.current.value = props.checkRank;
    }
    if (props.checkPosition !== null) {
      positionInput.current.value = props.checkPosition;
    }
    if (props.checkTeam !== "") {
      selectRef.current.options.selectedIndex =
        props.teamList.findIndex((item) => item.name === props.checkTeam) + 1;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectRef = useRef(null);

  function changeTeam() {
    if (selectRef.current.options.selectedIndex !== 0) {
      props.changeTeam(selectRef.current.options.selectedIndex - 1);
    } else {
      props.changeTeam("");
    }
  }

  function changeName() {
    props.changeName(nameInput.current.value);
  }
  function changeNumber() {
    if (numberInput.current.value > 60) {
      numberInput.current.value = 60;
    }
    props.changeNumber(numberInput.current.value);
  }

  function changePosition() {
    props.changePosition(positionInput.current.value);
  }

  function changeRank() {
    if (rankInput.current.value === "Standard") {
      props.changeRank(null);
    } else {
      props.changeRank(rankInput.current.value);
    }
  }

  function doItForMe() {
    let americanNames = [
      "Sleve McDichael",
      "Onson Sweemey",
      "Darryl Archideld",
      "Anette Smorin",
      "Rey McScriff",
      "Glenallen Mixon",
      "Mario McRlwain",
      "Raul Chamgerlain",
      "Kevin Nogilny",
      "Toni Smehrik",
      "Bobson Dugnutt",
      "Willamina Dustice",
      "Jeromy Gride",
      "Scott Dourove",
      "Shawna Furcotte",
      "Dean Wesrey",
      "Mike Truk",
      "Dwigt Rortugal",
      "Tim Sandaele",
      "Karl Dandleton",
      "Mike Sernandez",
      "Todd Bonzalez",
    ];
    //change name
    nameInput.current.value =
      americanNames[Math.floor(Math.random() * americanNames.length)];
    changeName();
    //change number
    numberInput.current.value = Math.floor(Math.random() * 60) + 1;
    changeNumber();
    //change position
    positionInput.current.options.selectedIndex = Math.floor(
      Math.random() * (positionInput.current.options.length - 1) + 1
    );
    changePosition();
    //change team
    selectRef.current.options.selectedIndex =
      Math.floor(Math.random() * props.teamList.length) + 1;
    props.changeTeam(selectRef.current.options.selectedIndex - 1);
  }

  return (
    <div id="statPage">
      <form>
        <label>Name:</label>
        <input
          type="text"
          ref={nameInput}
          id="name"
          name="name"
          onKeyUp={changeName}
          maxLength="30"
        />
        <br />
        <label>Team:</label>
        <select id="pet-select" ref={selectRef} onChange={changeTeam}>
          <option value="">--Please choose an option--</option>
          {props.teamList.map((item) => {
            return (
              <option value={item.key} key={item.key}>
                {item.name}
              </option>
            );
          })}
        </select>
        <br />
        <label>Number:</label>
        <input
          ref={numberInput}
          type="number"
          id="number"
          name="number"
          onChange={changeNumber}
          max="60"
        />
        <br />

        <label>Position: </label>
        <select onChange={changePosition} ref={positionInput}>
          <option>-- Choose A Position --</option>
          <option>Pitcher</option>
          <option>Catcher</option>
          <option>1st Base</option>
          <option>2nd Base</option>
          <option>3rd Base</option>
          <option>Left-Field</option>
          <option>Center-Field</option>
          <option>Right-Field</option>
          <option>Shortstop</option>
        </select>
        <br />

        <label>Rank:</label>
        <select onChange={changeRank} ref={rankInput}>
          <option>Standard</option>
          <option>Rookie</option>
          <option>MVP</option>
        </select>
      </form>
      <button onClick={doItForMe}>Choose For Me</button>
    </div>
  );
};

export default PlayerStats;
