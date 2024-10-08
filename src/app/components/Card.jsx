"use client";
import React from "react";

const Card = React.forwardRef(({ id, phase, title, span }, ref) => (
  <div className="card" id={`card-${id}`} ref={ref}>
    <div className="card-phase">
      <p>Step #{phase}</p>
    </div>
    <div className="card-title">
      <h1>
        {title} <span>{span}</span>
      </h1>
    </div>
  </div>
));

export default Card;
