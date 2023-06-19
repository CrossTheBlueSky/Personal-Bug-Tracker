import React from "react"

function Sort(props){

  return (  <select onChange={event => props.sort(event.target.value)}>
    <option>Sort By</option>
    <option value = "SevAsc">Severity - Ascending</option>
    <option value = "SevDesc">Severity - Descending</option>
    <option value = "AlphAsc">Alphabetical - Ascending</option>
    <option value = "AlphDesc">Alphabetical - Descending</option>
    <option value = "ProjAsc">Project - Ascending</option>
    <option value = "ProjDesc">Project - Descending</option>
  </select>)

}

export default Sort;