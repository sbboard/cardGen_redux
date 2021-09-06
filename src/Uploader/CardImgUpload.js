import React, { useRef, useState } from "react";
import demoImg1 from "./templateImgs/goky.jpg";
import demoImg2 from "./templateImgs/wario.jpg";
import demoImg3 from "./templateImgs/sonic.jpg";
import demoImg4 from "./templateImgs/sent.jpg";

const CardImgUploader = (props) => {
  //gallery stuff
  const [galleryOn, setGallery] = useState(false);
  const switchGallery = () => {
    setGallery(!galleryOn);
  };
  const demoOne = useRef(null);
  const demoTwo = useRef(null);
  const demoThree = useRef(null);
  const demoFour = useRef(null);

  let gallery = (
    <div>
      <div id="demoPorts">
        <img
          src={demoImg1}
          onClick={() => sendGalleryImg(demoOne)}
          alt="Demo One"
          ref={demoOne}
        />
        <img
          src={demoImg2}
          onClick={() => sendGalleryImg(demoTwo)}
          alt="Demo Two"
          ref={demoTwo}
        />
        <img
          src={demoImg3}
          onClick={() => sendGalleryImg(demoThree)}
          alt="Demo Three"
          ref={demoThree}
        />
        <img
          src={demoImg4}
          onClick={() => sendGalleryImg(demoFour)}
          alt="Demo Four"
          ref={demoFour}
        />
      </div>
      <span id="preSelect" onClick={switchGallery} style={{marginTop: '0'}}>
        return to uploader
      </span>
    </div>
  );

  function sendGalleryImg(elem) {
    demoOne.current.classList.remove("selected")
    demoTwo.current.classList.remove("selected")
    demoThree.current.classList.remove("selected")
    demoFour.current.classList.remove("selected")
    elem.current.classList.add("selected")
    console.log(elem.current)
    props.changeImg(elem.current.src);
  }

  //uploader stuff
  const uploadRef = useRef(null);

  function clickUpload(e) {
    document.getElementById("filetag").click();
  }
  function uploadedImg() {
    var reader = new FileReader();
    reader.onload = function (e) {
      props.changeImg(e.target.result);
    };
    reader.readAsDataURL(uploadRef.current.files[0]);
  }

  const imgThumb = <img src={props.checkImg} alt="thumbnail"></img>;

  let normalUploader = (
    <div>
      <div className="imgBox" onClick={clickUpload}>
        {props.checkImg ? imgThumb : "Upload Card Portrait"}
      </div>
      <input
        type="file"
        id="filetag"
        accept="image/x-png,image/gif,image/jpeg"
        onChange={uploadedImg}
        ref={uploadRef}
      />
      <span id="preSelect" onClick={switchGallery}>
        or use a demo portrait
      </span>
    </div>
  );

  return galleryOn ? gallery : normalUploader;
};

export default CardImgUploader;
