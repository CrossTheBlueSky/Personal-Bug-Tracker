import { useEffect, useState } from 'react'
import Card from "./Card.jsx"
import './App.css'
import Search from "./Search.jsx"
import Sort from "./Sort.jsx"
import Filter from "./Filter.jsx"
import FormDialog from "./FormDialog.jsx"
import ProjectDialog from "./ProjectDialog.jsx"
import FullScreenDialog from './FullScreenDialog.jsx'

function App() {

const placeholderBug1 = {name: "Default1", project:"placeholder1", reproduce: "You do the thing and it happens", severity : "Moderate", description: "A lot of text. So much text. An absurd amount of text. More text than anyone should ever or will ever need, and yet it's all here, in black and white for the world to see", notes: "a place for notes", tags: "javascript react"}
const placeholderBug2 = {name: "Default2", project:"placeholder2", reproduce: "You do the thing and it happens", severity : "Moderate", description: "A lot of text. So much text. An absurd amount of text. More text than anyone should ever or will ever need, and yet it's all here, in black and white for the world to see", notes: "a place for notes", tags: "javascript react"}
const placeholderBug3 = {name: "Default3", project: "placeholder3", reproduce: "You do the thing and it happens", severity : "Severe", description: "A lot of text. So much text. An absurd amount of text. More text than anyone should ever or will ever need, and yet it's all here, in black and white for the world to see", notes: "a place for notes", tags: "javascript react"}
const defaultBugList = [placeholderBug1, placeholderBug2, placeholderBug3]

  const [bugList, setBugList] = useState(defaultBugList);
  const [projectList, setProjectList] = useState(allProjects(bugList));
  const [renderedBugs, setRenderedBugs] = useState(defaultBugList);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBug, setCurrentBug] = useState(placeholderBug1)
  useEffect(() => fetchResults(""), [bugList])

  


  function onAdd(props) {
    setBugList((prevBugList) => {
      return [...prevBugList, props];
    });
    setRenderedBugs(bugList);

  }

 function allProjects(props){

  const allProjects = []
  props.forEach((e) =>{
    allProjects.push(e.project)
  })

  return allProjects
 }

 function addProject(props){

    setProjectList((prevProjectList) =>{
      return [...prevProjectList, props]
    })

 }

 function fetchResults(props){

  const query = props.toLowerCase()


let  toShow = bugList.filter(bug => { 

  const nameChecker = bug.name.slice(0, query.length).toLowerCase()
  const tagArr = bug.tags.split(' ').map(e => e.slice(0, query.length)).filter(e => e === query)
  
  return (
    
     nameChecker === query ||
     tagArr.includes(query)
)
    })

 setRenderedBugs(toShow)
 
}

function onDelete(props){
 
  
  const filtered = bugList.filter((e)=> {return e.name != props.name })
  setBugList(filtered)
}

  function onEdit(props){

    onDelete(props)
    onAdd(props)
    
  }


  function createCard(props) {
    return (
      <Card
        name={props.name}
        project={props.project}
        reproduce={props.reproduce}
        description={props.description}
        severity={props.severity}
        tags={props.tags}
        onClick= {modalOpener}
        bugSetter={bugSetter}
      />
    );
  }

  function bugSetter(props){
   setCurrentBug(props)
  }


  function modalOpener(){
  
   setModalOpen(true)

  }
  function modalCloser(){
    setModalOpen(false)

   
  }


  return (
    <div>
      <FullScreenDialog open={modalOpen} handleClose={modalCloser} bug={currentBug} list={bugList} onEdit ={onEdit} onDelete={onDelete}/>
      <div id="Heading">
        <h1>Bug Repository</h1>
        <h2> Get ya bugs here, step right up!</h2>
      </div>
      <div style={{display: "flex", justifyContent: "space-around", paddingBotton: "2px"}}>
        <div style={{display:"flex", flex:"75"}}>
          <Search onSearch={fetchResults} /> <ProjectDialog onAdd={addProject}/> <FormDialog onAdd={onAdd} projects = {projectList}/> 
        </div>
        <div style={{display:"flex", flex:"25", alignContent:"flex-end"}}>
          <Sort />
          <Filter />
        </div>
      </div>
      <div className="container">{renderedBugs.map(createCard)}</div>
    </div>
  );
}

export default App;
