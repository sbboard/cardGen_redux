import React, { useRef, useEffect } from "react";
import SClogo from "./cardElements/sclogo.png";

const Canvas = (props) => {
  function adjust(color, amount) {
    return (
      "#" +
      color
        .replace(/^#/, "")
        .replace(/../g, (color) =>
          (
            "0" +
            Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(
              16
            )
          ).substr(-2)
        )
    );
  }

  const cardRef = useRef(null);
  useEffect(() => {
    const canvas = cardRef.current;

    const ctx = canvas.getContext("2d");
    let card = canvas;

    const borderThickness = props.cardWidth * 0.125;
    card.width = props.cardWidth + borderThickness * 2;
    card.height = props.cardHeight + borderThickness * 2;
    let zoom = props.zoomAmt;
    let leftCrop = props.leftCrop;
    let topCrop = props.topCrop;

    ctx.font = `40px Times New Roman`;
    ctx.fillText(`loading`, 10, 40);

    let startBuild = new Promise(function (resolve, reject) {
      let img = new Image();
      img.src = props.playerImg;
      img.onload = function () {
        ctx.drawImage(
          img,
          leftCrop + borderThickness,
          topCrop + borderThickness,
          img.width * zoom,
          img.height * zoom
        );
        resolve();
      };
    });

    function topLayer() {
      const fontSize = card.width * 0.3;
      const thumbnailSize = fontSize / 1.5;
      const nameText = props.playerName.toUpperCase();
      const textWidth = card.width * 0.6;

      //innerborder
      var bggrdd = ctx.createLinearGradient(0, 0, 0, card.height);
      bggrdd.addColorStop(0, adjust("#" + props.cardColor, 50));
      bggrdd.addColorStop(1, adjust("#" + props.cardColor, 0));
      ctx.fillStyle = bggrdd;
      //top border
      ctx.fillRect(0, 0, card.width, borderThickness);
      //left border
      ctx.fillRect(0, 0, borderThickness, card.height);
      //right border
      ctx.fillRect(
        card.width - borderThickness,
        0,
        borderThickness,
        card.height
      );
      //bottom border
      ctx.fillRect(
        0,
        card.height - borderThickness,
        card.width,
        borderThickness
      );
      //outerborder
      var bggrd = ctx.createLinearGradient(0, 0, 0, card.height);
      bggrd.addColorStop(0, adjust("#" + props.seccardColor, 0));
      bggrd.addColorStop(1, adjust("#" + props.seccardColor, -50));
      ctx.fillStyle = bggrd;
      //top border
      ctx.fillRect(0, 0, card.width, borderThickness * 0.75);
      //left border
      ctx.fillRect(0, 0, borderThickness / 3, card.height);
      //right border
      ctx.fillRect(
        card.width - (borderThickness - (borderThickness / 3) * 2),
        0,
        borderThickness,
        card.height
      );
      //bottom border
      ctx.fillRect(
        0,
        card.height - borderThickness * 0.75,
        card.width,
        borderThickness * 1.25
      );

      //add team status
      ctx.rotate((-90 * Math.PI) / 180);
      ctx.font = `${fontSize / 5}px Impact`;
      ctx.fillStyle = adjust("#" + props.cardColor, 200);
      ctx.fillText(
        props.teamtype,
        (card.height -
          (card.height - ctx.measureText(props.teamtype).width) / 2) *
          -1,
        card.width * 0.09,
        card.width
      );
      ctx.rotate((90 * Math.PI) / 180);

      //add number
      let numberText = `${props.playerNumber}`;
      if (numberText < 10) {
        numberText = "0" + numberText;
      }
      ctx.font = `${fontSize / 5}px Impact`;
      ctx.fillStyle = adjust("#" + props.cardColor, 200);
      ctx.fillText(
        numberText,
        card.width * 0.904,
        card.height * 0.78,
        borderThickness / 1.75
      );
      ctx.fillText(
        numberText,
        card.width * 0.904,
        card.height * 0.83,
        borderThickness / 1.75
      );
      ctx.fillText(
        numberText,
        card.width * 0.904,
        card.height * 0.88,
        borderThickness / 1.75
      );

      //add rank
      // if (props.rank !== null) {
      //   ctx.font = `italic ${fontSize / 3}px Impact`;
      //   ctx.lineWidth = 5;
      //   let grd;
      //   if (props.rank === "MVP") {
      //     ctx.strokeStyle = "#da7e00";
      //     grd = ctx.createLinearGradient(
      //       0,
      //       card.height - card.height * 0.075,
      //       0,
      //       card.height - card.height * 0.025
      //     );
      //     grd.addColorStop(0, "yellow");
      //     grd.addColorStop(1, "#ffc300");
      //   } else {
      //     grd = ctx.createLinearGradient(
      //       0,
      //       card.height - card.height * 0.075,
      //       0,
      //       card.height - card.height * 0.025
      //     );
      //     grd.addColorStop(0, "white");
      //     ctx.strokeStyle = "grey";
      //     grd.addColorStop(1, "#ccc");
      //   }

      //   ctx.strokeText(
      //     `${props.rank}`,
      //     (card.width - ctx.measureText(props.rank).width) / 2,
      //     card.height - card.height * 0.0125
      //   );
      //   ctx.fillStyle = grd;
      //   ctx.fillText(
      //     `${props.rank}`,
      //     (card.width - ctx.measureText(props.rank).width) / 2,
      //     card.height - card.height * 0.0125
      //   );
      // }

      //add team name
      const descText = props.playerTeam.toUpperCase();
      ctx.font = `italic ${fontSize / 2}px Impact`;

      ctx.strokeStyle = "black";
      ctx.lineWidth = 15;
      ctx.strokeText(
        `${descText}`,
        card.width * 0.015,
        card.height * 0.105,
        textWidth + card.width * 0.05
      );

      //add year Text
      const year = 1996;
      ctx.font = `italic ${fontSize / 6}px Impact`;

      ctx.strokeStyle = "black";
      ctx.lineWidth = 7.5;
      ctx.strokeText(
        `${year} LINEUP`,
        borderThickness - card.width * 0.05,
        borderThickness + card.height * 0.07,
        textWidth / 2
      );

      ctx.fillStyle = "white";
      ctx.fillText(
        `${year} LINEUP`,
        borderThickness - card.width * 0.05,
        borderThickness + card.height * 0.07,
        textWidth / 2
      );

      ctx.font = `italic ${fontSize / 2}px Impact`;

      ctx.fillStyle = "white";
      ctx.fillText(
        `${descText}`,
        card.width * 0.015,
        card.height * 0.105,
        textWidth + card.width * 0.05
      );

      //add team thumbnail
      let img = new Image();
      img.src = props.teamImg;
      img.onload = function () {
        ctx.drawImage(
          img,
          card.width * 0.71,
          card.height * 0.01,
          thumbnailSize + card.width * 0.05,
          thumbnailSize + card.width * 0.05
        );
      };

      //add name
      ctx.font = `italic ${fontSize / 2}px Impact`;
      ctx.strokeStyle = "black";
      ctx.lineWidth = 10;
      ctx.fillStyle = "white";
      ctx.strokeText(
        `${nameText}`,
        card.width * 0.01,
        card.height - card.height * 0.0125,
        card.width - borderThickness * 2
      );
      ctx.fillText(
        `${nameText}`,
        card.width * 0.01,
        card.height - card.height * 0.0125,
        card.width - borderThickness * 2
      );

      //add SC logo
      let logoimg = new Image();
      logoimg.src = SClogo;
      logoimg.onload = function () {
        ctx.drawImage(
          logoimg,
          card.width - thumbnailSize / 1.5,
          card.height - thumbnailSize / 1.4,
          thumbnailSize / 1.5,
          thumbnailSize / 1.5
        );
      };
    }

    startBuild.then(topLayer);
    var dwn = document.getElementById("btndownload");
    dwn.onclick = function () {
      download(canvas, "mycard-front.png");
    };

    //create download link
    function download(canvas, filename) {
      var lnk = document.createElement("a"),
        e;
      lnk.download = filename;
      lnk.href = canvas.toDataURL("image/png;base64");
      if (document.createEvent) {
        e = document.createEvent("MouseEvents");
        e.initMouseEvent(
          "click",
          true,
          true,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        );
        lnk.dispatchEvent(e);
      } else if (lnk.fireEvent) {
        lnk.fireEvent("onclick");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reload() {
    window.location.reload();
  }

  return (
    <div>
      <canvas ref={cardRef}>
        Your browser does not support the HTML5 canvas tag.
      </canvas>
      <div id="finalBtns">
        <button id="btndownload">Download Card</button>
        <button onClick={reload}>Start Over</button>
      </div>
    </div>
  );
};

export default Canvas;
