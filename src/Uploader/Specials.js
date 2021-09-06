import React, { useRef, useEffect } from "react";

const Specials = (props) => {
  const specialNameRef = useRef(null);
  const specialRef = useRef(null);

  useEffect(() => {
    specialNameRef.current.value = props.checkSpName;
    specialRef.current.value = props.checkSpSp;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateName() {
    props.setSpName(specialNameRef.current.value);
  }

  function updateSpecial() {
    props.setSp(specialRef.current.value);
  }

  function doItForMe() {
    const specials = [
      {
        name: "HIS SUNT DRACONES",
        description:
          "Has 7 fingers - each finger representing one of the 7 seas. When he cracks that knuckles (can only crack 1 per game) it unleashes the power of the monster dwelling in that sea.",
      },
      {
        name: "MILLENIUM PYRAMID OF POWER",
        description:
          "The power to absorb power and spirit specials from other members of your team. Usually used in a hierachal way so the most important plays have the most power.",
      },
      {
        name: "NANOS GIGANTUM HUMERIS INSIDENTES",
        description: "Controls two giant forearms.",
      },
      {
        name: "THIRD GEAR OVERDRIVE",
        description: "Throw all 3 pitches at once.",
      },
      {
        name: "ACETAMINOPHEN CANON",
        description:
          "Guy charges up headaches like Samus’s charge beam and then unleashes them in the form of raw energy. The worse the headache the more powerful the shot.",
      },
      {
        name: "BUG BITE INFINITE",
        description:
          "If a player hits one of their pitches they are forced to vomit a torrent of bugs.",
      },
      {
        name: "LIFE STRANDING",
        description:
          "Can examine strands of hair and parse everything about a person's life from it.",
      },
    ];
    const random = Math.floor(Math.random() * specials.length);
    specialNameRef.current.value = specials[random].name;
    specialRef.current.value = specials[random].description;

    updateName();
    updateSpecial();
  }

  return (
    <div>
      <form>
        <label>Spirit Special</label>
        <input ref={specialNameRef} onChange={updateName}></input>
        <textarea ref={specialRef} onChange={updateSpecial}></textarea>
      </form>
      <button onClick={doItForMe}>Choose For Me</button>
    </div>
  );
};

export default Specials;
