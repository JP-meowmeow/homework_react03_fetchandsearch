import { useState, useEffect } from "react";
import "./App.css";

const people = [
  {
    id: 0,
    name: "Creola Katherine Johnson",
    profession: "mathematician",
  },
  {
    id: 1,
    name: "Mario José Molina-Pasquel Henríquez",
    profession: "chemist",
  },
  {
    id: 2,
    name: "Mohammad Abdus Salam",
    profession: "physicist",
  },
  {
    id: 3,
    name: "Percy Lavon Julian",
    profession: "chemist",
  },
  {
    id: 4,
    name: "Subrahmanyan Chandrasekhar",
    profession: "astrophysicist",
  },
];

function App() {
  const [scientist, setScientist] = useState(people);
  const [filterText, setFilterText] = useState("");
  const [seachText, setSearchText] = useState("");
  const [textInput,setTextInput]=useState("")
 
  useEffect(() => {
    let sto = setTimeout(() => {
      setSearchText(textInput)
    },1000)
    return ()=>{
      clearTimeout(sto)
    }
  },[textInput]);

  function filterarray() {
    return scientist.filter((item)=>{item.name===textInput}).map((el)=>{
      <PersonCard key={el.id} person={el} />
    })}
  
  useEffect(()=>{
  filterarray()
  },[seachText])




  const professionList = Array.from(
    new Set(scientist.map((el) => el.profession))
  );

  
  return (
    <div className="app">
      {professionList.map((el) => (
        <button key={el} onClick={() => setFilterText(el)}>
          {el}
        </button>
      ))}
      <button onClick={() => setFilterText("")}>All</button>
      <p></p>
      <form>
        <label>
          Search text :
          <input value={textInput} onChange={ e => setTextInput(e.target.value)}/>
        </label>
      </form>
      <ul>
        {scientist
          .filter((el) => (filterText ? el.profession === filterText : true))
          .map((el) => (
            <PersonCard key={el.id} person={el} />
          ))}
      </ul>
    </div>
  );
}


function PersonCard(props) {
  const {
    person: { name: sname, profession },
  } = props;

  return (
    <li>
      {sname} , {profession}
    </li>
  );
}

export default App;
