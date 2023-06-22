import { useEffect, useState } from 'react'
import Card from "./Card.jsx"
import './App.css'
import Search from "./Search.jsx"
import Sort from "./Sort.jsx"
import Filter from "./Filter.jsx"
import FormDialog from "./FormDialog.jsx"
import ProjectDialog from "./ProjectDialog.jsx"
import FullScreenDialog from './FullScreenDialog.jsx'
import {saveAs} from "file-saver"

function App() {

const placeholderBug1 = {name: "ADefault1", project:"Aplaceholder1", reproduce: "You do the thing and it happens", severity : "Moderate", description: "A lot of text. So much text. An absurd amount of text. More text than anyone should ever or will ever need, and yet it's all here, in black and white for the world to see", notes: "a place for notes", tags: "javascript react"}
const placeholderBug2 = {name: "BDefault2", project:"Bplaceholder2", reproduce: "You do the thing and it happens", severity : "Moderate", description: "A lot of text. So much text. An absurd amount of text. More text than anyone should ever or will ever need, and yet it's all here, in black and white for the world to see", notes: "a place for notes", tags: "javascript react"}
const placeholderBug3 = {name: "CDefault3", project: "Cplaceholder3", reproduce: "You do the thing and it happens", severity : "Severe", description: "A lot of text. So much text. An absurd amount of text. More text than anyone should ever or will ever need, and yet it's all here, in black and white for the world to see", notes: "a place for notes", tags: "javascript react"}
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

  function sorter(type){
    const toSort = [...renderedBugs]
    setRenderedBugs(null)

    function whichSort(k){
      switch(k){
        case "AlphAsc": return toSort.sort((a, b)=> { 
          const nameA = a.name.toUpperCase()
          const nameB = b.name.toUpperCase()
          if(nameA < nameB){
            return -1
          } else if( nameA > nameB){
            return 1
          }else {
            return 0
          }
        })
        case "AlphDesc": return toSort.sort((a, b)=> { 
          const nameA = a.name.toUpperCase()
          const nameB = b.name.toUpperCase()
          if(nameB < nameA){
            return -1
          } else if( nameB > nameA){
            return 1
          }else {
            return 0
          }
        })
        case "ProjAsc": return toSort.sort((a, b)=> { 
          const projectA = a.project.toUpperCase()
          const projectB = b.project.toUpperCase()
          if(projectA < projectB){
            return -1
          } else if( projectA > projectB){
            return 1
          }else {
            return 0
          }
        })
        case "ProjDesc": return toSort.sort((a, b)=> { 
          const projectA = a.project.toUpperCase()
          const projectB = b.project.toUpperCase()
          if(projectB < projectA){
            return -1
          } else if( projectB > projectA){
            return 1
          }else {
            return 0
          }
        })
        case "SevAsc": return toSort.sort((a, b) => {
          const sev = {Trivial: 0, Minor: 1, Moderate: 2, Severe: 3}

          return sev[a.severity] - sev[b.severity]
        })
        case "SevDesc": return toSort.sort((a, b) => {
          const sev = {Trivial: 0, Minor: 1, Moderate: 2, Severe: 3}

          return sev[b.severity] - sev[a.severity]
        })
      }
    }
    
    
    const sortedList = whichSort(type)
    setRenderedBugs(sortedList)
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
          <Sort sort={sorter}/>
          {/* <Filter /> */}
        </div>
      </div>
      <div className="container">{renderedBugs.map(createCard)}</div>
    </div>
  );
}

export default App;
