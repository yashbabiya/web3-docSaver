import React from "react";

export default function Card(props) {
  return (
    <div className="card">
      
     {props.title && <h1> | <span>What is {props.title} ?</span></h1>}
      <div className={`main ${props.rev}`}>
        <div className="glass">
          <p className="highlight"><span>{props.des}</span></p>
        </div>
        <div className="img">
          <img className="cardImg" src={props.img} alt="img" />
        </div>
          {props.num  && <b>/0{props.num}</b>}
      </div>
    </div>
  );
}
