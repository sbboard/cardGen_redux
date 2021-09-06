import { useState } from "react";
import Instructions from "./Instructions";

import StepOne from "./CardImgUpload";
import StepThree from "./PositionImg";
import StepFour from "./PlayerStats";
import StepSix from "./Specials";
import StepSeven from "./FunFact";

const Uploader = (props) => {
  //STEP CHANGERS
  const [uploadStep, setStep] = useState(0);

  function nextStep() {
    if (uploadStep < instructions.length - 1) {
      setStep(uploadStep + 1);
    }
  }

  function finishCard() {
    props.finishCard(true);
  }

  function prevStep() {
    if (uploadStep !== 0) {
      setStep(uploadStep - 1);
    }
  }

  //STEPS
  const instructions = [
    ["Upload Player Image", "description 1"],
    ["Position Image", "description 3"],
    ["Player Information", "description 4"],
    ["Position Image In Circle", "description 5"],
    ["Special Skills", "description 6"],
    ["Fun Fact", "description 7"],
  ];

  function renderOptions(param) {
    switch (param) {
      case 0:
        return (
          //card img uploader
          <StepOne
            changeImg={props.changeImg}
            checkImg={props.checkImg}
          ></StepOne>
        );
      case 1:
        return (
          <StepThree
            uploadedImg={props.checkImg}
            cardWidth={props.cardWidth}
            cardHeight={props.cardHeight}
            changeZoom={props.changeZoom}
            changeLeftCrop={props.changeLeftCrop}
            changeTopCrop={props.changeTopCrop}
            zoom={props.zoomAmt}
            leftCrop={props.leftCrop}
            topCrop={props.topCrop}
            circle={false}
          ></StepThree>
        );
      case 2:
        return (
          <StepFour
            changeName={props.changeName}
            changeNumber={props.changeNumber}
            changeRank={props.changeRank}
            changePosition={props.changePosition}
            checkName={props.checkName}
            checkNumber={props.checkNumber}
            checkPosition={props.checkPosition}
            checkRank={props.checkRank}
            teamList={props.teamList}
            changeTeam={props.changeTeam}
            checkTeam={props.checkTeam}
          ></StepFour>
        );
      case 4:
        return (
          <StepThree
            uploadedImg={props.checkImg}
            cardWidth={props.cardWidth}
            cardHeight={props.cardWidth}
            changeZoom={props.changeCircleZoom}
            changeLeftCrop={props.changeCircleLeftCrop}
            changeTopCrop={props.changeCircleTopCrop}
            zoom={props.zoomCircleAmt}
            leftCrop={props.leftCircleCrop}
            topCrop={props.topCircleCrop}
            circle={true}
          ></StepThree>
        );
      case 5:
        return (
          <StepSix
            setSp={props.setSp}
            setSpName={props.setSpName}
            checkSpName={props.checkSpName}
            checkSpSp={props.checkSpSp}
          ></StepSix>
        );
      case 6:
        return (
          <StepSeven
            setFact={props.setFact}
            checkFact={props.checkFact}
          ></StepSeven>
        );
      default:
        return "foo";
    }
  }

  function prevBtn() {
    let disabled = false;
    if (uploadStep === 0) {
      disabled = true;
    } else {
      disabled = false;
    }
    return (
      <button onClick={prevStep} disabled={disabled}>
        prev step
      </button>
    );
  }

  function nextBtn() {
    //step 1 AKA upload Pic
    if (uploadStep === 0) {
      if (props.checkImg === null) {
        return (
          <button onClick={nextStep} disabled={true}>
            next step
          </button>
        );
      } else {
        return (
          <button onClick={nextStep} disabled={false}>
            next step
          </button>
        );
      }
    }
    //steps 3 and 5 = position images
    //6 == Spirit Special
    if (uploadStep === 1 || uploadStep === 4 || uploadStep === 5) {
      return (
        <button onClick={nextStep} disabled={false}>
          next step
        </button>
      );
    }
    //step 4 = player staps
    if (uploadStep === 2) {
      if (
        props.checkName === null ||
        props.checkName.length < 1 ||
        props.checkNumber === null ||
        props.checkNumber.length < 1 ||
        props.checkTeam === null ||
        props.checkTeam.length < 1
      ) {
        // return (
        //   <button onClick={nextStep} disabled={true}>
        //     next step
        //   </button>
        return (
          <button onClick={finishCard} disabled={true}>
            finish
          </button>
        );
      } else {
        return (
          <button onClick={finishCard} disabled={false}>
            finish
          </button>
        );
      }
    }
    if (uploadStep === 6) {
      if (props.checkFact == null) {
        return (
          <button onClick={finishCard} disabled={true}>
            finish
          </button>
        );
      } else {
        return (
          <button onClick={finishCard} disabled={false}>
            finish
          </button>
        );
      }
    }
  }

  return (
    <div id="uploader">
      <Instructions
        msg={instructions[uploadStep][0]}
        descrip={instructions[uploadStep][1]}
        stepNo={uploadStep + 1}
      />
      {renderOptions(uploadStep)}
      <div id="navBtns">
        {prevBtn()}
        {nextBtn()}
      </div>
    </div>
  );
};

export default Uploader;
