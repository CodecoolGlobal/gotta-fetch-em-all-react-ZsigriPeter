import React from "react";


export default function DisplayLocations(props) {
  console.log(props.location);
  return (
    <div>
      {props.location.map((result, index) => (
        <div 
        className ="locations" 
        key={index}
        style={{ backgroundImage: `url(/pics/locations/${result.name}.jpg)`, backgroundSize: 'cover', padding: '20px' }}
        >
          <h1>{result.name}</h1>
            <button onClick={() =>{props.onClick(result.name)} }>Chose place</button>
        </div>
      ))}
    </div>
  );
}
