import React from "react";
import "./index.css";
import "./app.css";

function Search(props){




    return    ( 

    <input onChange={ event => props.onSearch(event.target.value)} type="text" placeholder="search by Id or Tags" size="50"></input>

)

}

export default Search;