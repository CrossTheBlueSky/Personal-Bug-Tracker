import React from "react";
import "./index.css";


function Card(props){
    const bug = props
    const projectColor = {color : props.projectColor}
    let riskColor = {color: "grey"};
    const bugPreview = props.description.slice(0, 100);
    let tagsPreview = props.tags.slice(0, 25) + "...";
    if(props.tags.length < 25){
        tagsPreview = props.tags
  
    }

    switch (props.severity){
        case 'Trivial':
            riskColor = {color: "cyan"}
        break;
        case 'Minor':
            riskColor = {color: "yellow"}
        break;
        case 'Moderate' :
            riskColor = {color: "darkorange"}
        break;
        case 'Severe' :
            riskColor = {color: "red"}
        break;
        default:
            console.log("You didn't pick something in the dropdown you cunt");

    }

    function clickHandler(){
        opener()
        bugSetter(bug)
    }

    let opener = props.onClick
    let bugSetter = props.bugSetter
    return <div className="Card" 
    onClick = {clickHandler}
    >  
        <h5>{props.name}<span style={projectColor}>{props.project}</span></h5>
        <h6 style={riskColor}>{props.severity}</h6>
        <p style={{height:"5.5em"}}>{bugPreview + "..."}</p>
        <p style={{fontSize:".75rem", color:"rgb(60, 126, 183)"}}>{tagsPreview}</p>
    </div>

}

export default Card;