import React, { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";

const PositionImg = (props) => {
  const frameStyle = { width: props.cardWidth, height: props.cardHeight, borderRadius: props.circle ? "100%" : "inherit" };
  const theImg = useRef(null);
  const [baseZoom, setBase] = useState(1);
  const [baseWidth, setBaseWidth] = useState(null);
  const [baseHeight, setBaseHeight] = useState(null);
  const [posChange, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function updateImgSize() {
      changeBoundaries({
        left: props.cardWidth - theImg.current.width,
        top: props.cardHeight - theImg.current.height,
        right: 0,
        bottom: 0,
      });
    }
    let myImage = new Image();
    myImage.src = props.uploadedImg;
    myImage.onload = () => {
      setBaseWidth(theImg.current.width);
      setBaseHeight(theImg.current.height);
      //something in this if statement chain is killing gallery images
      if (
        theImg.current.width > props.cardWidth &&
        theImg.current.height > props.cardHeight
      ) {
        if (
          props.cardWidth - theImg.current.width >
          props.cardHeight - theImg.current.height
        ) {
          let newZoom = props.cardWidth / theImg.current.width;
          props.changeZoom(newZoom);
          setBase(newZoom);
          theImg.current.width = theImg.current.width * newZoom;
          updateImgSize();
        } else {
          let newZoom = props.cardHeight / theImg.current.height;
          props.changeZoom(newZoom);
          setBase(newZoom);
          theImg.current.height = theImg.current.height * newZoom;
          updateImgSize();
        }
      } else {
        if (
          props.cardWidth - theImg.current.width >
          props.cardHeight - theImg.current.height
        ) {
          //adjust the zoom radio
          if (props.zoom < props.cardWidth / theImg.current.width) {
            let newZoom = props.cardWidth / theImg.current.width;
            //zoom in
            props.changeZoom(newZoom);
            setBase(newZoom);
            theImg.current.width = theImg.current.width * newZoom;
            updateImgSize();
            //then center
            props.changeLeftCrop(
              ((theImg.current.width * props.zoom - props.cardWidth) / 2) * -1
            );
            props.changeTopCrop(
              ((theImg.current.height * props.zoom - props.cardHeight) / 2) * -1
            );
          }
        } else {
          //if the height is the shorter side
          if (props.zoom < props.cardHeight / theImg.current.height) {
            let newZoom = props.cardHeight / theImg.current.height;
            props.changeZoom(newZoom);
            setBase(newZoom);
            //zoom in
            theImg.current.height = theImg.current.height * newZoom;
            updateImgSize();
            props.changeLeftCrop(
              ((theImg.current.width - props.cardWidth) / 2) * -1
            );
            props.changeTopCrop(
              ((theImg.current.height - props.cardHeight) / 2) * -1
            );
          }
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [boundaries, changeBoundaries] = useState({});

  function handleDrag() {
    window.event.preventDefault();
    changeBoundaries({
      left: props.cardWidth - theImg.current.width,
      top: props.cardHeight - theImg.current.height,
      right: 0,
      bottom: 0,
    });
  }

  function handUp() {
    let transform = theImg.current.style.transform;
    let coords = transform
      .slice(transform.indexOf("(") + 1, transform.indexOf(")"))
      .split(",");
    props.changeTopCrop(parseInt(coords[1]));
    props.changeLeftCrop(parseInt(coords[0]));
    setPos({ x: parseInt(coords[0]), y: parseInt(coords[1]) });
  }
  const zoombar = useRef(null);
  const dragRef = useRef(null);

  function zoomTime() {
    let zoomLvl = zoombar.current.value - 1;
    const oldWidth = theImg.current.width;
    const oldHeight = theImg.current.height;

    let zoomPercent = baseZoom + (baseZoom * (zoomLvl/100))
    theImg.current.width = baseWidth * (zoomPercent);
    theImg.current.height = baseHeight * (zoomPercent);
    props.changeZoom(zoomPercent);

    handleDrag();
    let transform = theImg.current.style.transform;
    let coords = transform
      .slice(transform.indexOf("(") + 1, transform.indexOf(")"))
      .split(",");
    let Y = parseInt(coords[1]);
    let X = parseInt(coords[0]);
    if (Y - (oldHeight - theImg.current.height) * -1 > 0) {
      Y = 0;
    } else {
      Y = Y - (oldHeight - theImg.current.height) * -1;
    }
    if (X - (oldWidth - theImg.current.width) * -1 > 0) {
      X = 0
    } else {
      X = X - (oldWidth - theImg.current.width) * -1;
    }

    setPos({ x: X, y: Y });
    props.changeTopCrop(Y);
    props.changeLeftCrop(X);
  }

  return (
    <div>
      <div id="frameHolder" style={frameStyle}>
        <div id="frame"></div>
        <Draggable
          onDrag={handleDrag}
          bounds={boundaries}
          onStop={handUp}
          defaultPosition={{ x: 0, y: 0 }}
          ref={dragRef}
          position={posChange}
        >
          <img
            id="uploadedImg"
            src={props.uploadedImg}
            alt="uploaded"
            ref={theImg}
          />
        </Draggable>
      </div>
      <div id="zoomBlock">
      <span id="zoomLbl">Zoom:</span> <input
        ref={zoombar}
        onChange={zoomTime}
        type="range"
        min="1"
        max="500"
        defaultValue="1"
      ></input></div>
    </div>
  );
};

export default PositionImg;
