import React from "react";

function LikesComponent(props) {
  return (
    <div onClick={props.onLike} style={{ cursor: "pointer" }}>
      {props.isClicked ? (
        <i className="fa fa-heart"></i>
      ) : (
        <i className="fa fa-heart-o"></i>
      )}
    </div>
  );
}

export default LikesComponent;
