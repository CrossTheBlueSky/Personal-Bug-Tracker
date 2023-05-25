import React from "react";
import "./index.css";


function Card(props){

    let riskColor = {color: "grey"};
    const bugPreview = props.description.slice(0, 100);
    switch (props.severity){
        case 'Trivial':
            riskColor = {color: "cyan"}
            console.log(riskColor)
        break;
        case 'Minor':
            riskColor = {color: "yellow"}
            console.log(riskColor)
        break;
        case 'Moderate' :
            riskColor = {color: "darkorange"}
            console.log(riskColor)
        break;
        case 'Severe' :
            riskColor = {color: "red"}
            console.log(riskColor)
        break;
        default:
            console.log("You didn't pick something in the dropdown you cunt");
            console.log(riskColor)

    }
    return <div className="Card" 
    onClick = {() => {console.log("clicked")}}
    >  
        <h5>{props.title}</h5>
        <h6 style={riskColor}>{props.severity}</h6>
        <p>{bugPreview + "..."}</p>
        <p>{props.tags}</p>
    </div>

}

export default Card;