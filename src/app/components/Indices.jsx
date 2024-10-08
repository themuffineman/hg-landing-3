import React from "react";

const indicesData = [
  {
    id: "index-1",
    date: "Step #",
    description: "Step description",
  },
  {
    id: "index-2",
    date: "Step #",
    description: "Step description",
  },
  {
    id: "index-3",
    date: "Step #",
    description: "Step description",
  },
  {
    id: "index-4",
    date: "Step #",
    description: "Step description",
  },
];

const Indices = React.forwardRef(({ setIndicesRef }, ref) => (
  <div className="indices" ref={ref}>
    {indicesData.map((index, i) => (
      <div
        key={index.id}
        className="index"
        id={index.id}
        ref={(el) => setIndicesRef(el, i)}
      >
        <p>{index.date}</p>
        <p>{index.description}</p>
      </div>
    ))}
  </div>
));

export default Indices;
