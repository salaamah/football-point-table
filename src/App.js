import './App.css';
import Table from './components/Table/Table';

function App() {
  let rank = [3,0,2,1];
  let teams = ['KSA','Arg','Mex','Pol'];
  let MP = [0,0,0,0];
  let W = [0,0,0,0];
  let D = [0,0,0,0];
  let L = [0,0,0,0];
  let points = [0,0,0,0];
  let GF = [0,0,0,0];
  let GA = [0,0,0,0];
  let GD = [0,0,0,0];
  let pointTable = [rank,teams,MP,W,D,L,GF,GA,GD,points];
  return (
    <div className="App">
      <Table pointTable = {pointTable}></Table>
    </div>
  );
}

export default App;
