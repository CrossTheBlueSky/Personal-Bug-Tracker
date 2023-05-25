import { useState, useEffect } from 'react'
import Card from "./Card.jsx"
import './App.css'
import Search from "./Search.jsx"
import Sort from "./Sort.jsx"
import Filter from "./Filter.jsx"
import FormDialog from "./FormDialog.jsx"

function App() {
  const [bugList, setBugList] = useState([]);

  //const placeholderBug = {name: "Default", severity : "Trivial", description: "A lot of text. So much text. An absurd amount of text. More text than anyone should ever or will ever need, and yet it's all here, in black and white for the world to see"}

  function onAdd(props) {
    setBugList((prevBugList) => {
      return [...prevBugList, props];
    });
  }

  function createCard(props) {
    return (
      <Card
        title={props.name}
        description={props.description}
        severity={props.severity}
      />
    );
  }

  return (
    <div>
      <div id="Heading">
        <h1>Bug Repository</h1>
        <h2> Get ya bugs here, step right up!</h2>
      </div>
      <nav style ={{display: "flex", justifyContent: "space-around"}}>
        <div>
          <Search /> <FormDialog onAdd={onAdd} />
        </div>
        <div>
          <Sort />
          <Filter />
        </div>
      </nav>
      <div className="container">{bugList.map(createCard)}</div>
    </div>
  );
}

export default App;
