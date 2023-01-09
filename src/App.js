import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Table from './components/Table/Table';
import {addTeam} from './components/myFunctions/ptFunctions'

function App() {
  // let rank = [3,0,2,1];
  // let teams = ['KSA','Arg','Mex','Pol'];
  // let MP = [0,0,0,0];
  // let W = [0,0,0,0];
  // let D = [0,0,0,0];
  // let L = [0,0,0,0];
  // let points = [0,0,0,0];
  // let GF = [0,0,0,0];
  // let GA = [0,0,0,0];
  // let GD = [0,0,0,0];
  let rank = [];
  let teams = [];
  let MP = [];
  let W = [];
  let D = [];
  let L = [];
  let points = [];
  let GF = [];
  let GA = [];
  let GD = [];
  let pt = [rank,teams,MP,W,D,L,GF,GA,GD,points];
  const [pointTable, setPointTable] = useState(pt);
  const [teamName, setTeamName] = useState("");
  function handleChange (event){
    setTeamName(event.target.value);
  }
  function handleSubmit(event){
    event.preventDefault();
    pt = pointTable;
    teamName.length > 0 && addTeam(teamName,pt);
    setPointTable(pt);
    console.log(teams);
    setTeamName("");
    document.getElementById('teamInput').value = '';
  }
  return (
    <div className="App">
      <Header></Header>
      <form onSubmit={handleSubmit}>
        <label>
          Team Name:
          <input id='teamInput' type="text" name="name" onChange={handleChange}/>
        </label>
        <input type="submit" value="Add" />
      </form>
      <Table pointTable = {pointTable}></Table>
    </div>
  );
}

export default App;
