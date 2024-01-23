import React from "react";

export default function DisplayLocations(props) {
  console.log(props.location);
  return (
    <div>
      {props.location.map((result, index) => (
        <div key={index}>
            <button onClick={() =>{props.onClick(result.name)} }>{result.name}</button>
        </div>
      ))}
    </div>
  );
}
