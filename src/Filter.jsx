import React from "react"

function Filter(props){
    
    return (
    <select>
      <option>Filter</option>
      <option value = "project">by Project</option>
      <option value = "language">by Language</option>
      <option value = "frontend">Frontend only</option>
      <option value = "backend">Backend only</option>
    </select>
    )
}

export default Filter;