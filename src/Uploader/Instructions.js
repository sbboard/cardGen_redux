const Instructions = (props) => {
    return (
        <div id="instructions">
            <h1>Step {props.stepNo} - {props.msg}</h1>
            {/* <h2>{props.descrip}</h2> */}
        </div>
      );
}

export default Instructions;