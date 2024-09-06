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
  const [scientists, setScientists] = useState(people);
  const [filterText, setFilterText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    const sto = setTimeout(() => {
      setSearchText(textInput);
    }, 1000);
    return () => {
      clearTimeout(sto);
    };
  }, [textInput]);

  const filteredScientists = scientists.filter(
    (el) =>
      (filterText ? el.profession === filterText : true) &&
      (el.name.toLowerCase().includes(searchText.toLowerCase()) ||
        el.profession.toLowerCase().includes(searchText.toLowerCase()) ||
        el.id.toString().includes(searchText))
  );

  const professionList = Array.from(
    new Set(scientists.map((el) => el.profession))
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
          Search text:
          <input
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </label>
      </form>
      <ul>
        {filteredScientists.map((el) => (
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
      {sname}, {profession}
    </li>
  );
}

export default App;
