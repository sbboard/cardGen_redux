import React, { useRef, useEffect } from "react";

const FunFact = (props) => {
  useEffect(() => {
    if (props.checkFact !== null) {
      factInput.current.value = props.checkFact;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const factInput = useRef(null);

  function updateFact() {
    props.setFact(factInput.current.value);
  }

  function doItForMe() {
    const funfacts = ["has 9 toes", "never met his dad"];
    factInput.current.value =
      funfacts[Math.floor(Math.random() * funfacts.length)];
    updateFact();
  }

  return (
    <div>
      <form>
        <label>Fun Fact</label>
        <textarea ref={factInput} onChange={updateFact}></textarea>
      </form>
      <button onClick={doItForMe}>Choose For Me</button>
    </div>
  );
};

export default FunFact;
