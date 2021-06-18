import React from "react";
import "./Message.scss";

const Message = (props) => {
  return (
    <>
      <div className="message">{props}</div>
    </>
  );
};

export default Message;
