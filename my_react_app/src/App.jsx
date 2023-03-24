import './App.css';
import BasicForm from './components/BasicForm';
import { useState } from 'react';

function App() {

  const [data, setData] = useState([])

  const handleData = (data) => {
    setData(data)
  }


  return (
    <div className="App">
      <div className="left_div">
        <hr />
        <h1>Welcome to HappyClub</h1>
        <hr /> <br />
        <BasicForm handleData={handleData} />
      </div>
      <div className="right_div">
        <ul>
          {
            data.map((ele) => (
              <li key={ele._id}>
                <p><b>{ele.name}</b> - <span>{ele.mobile}</span></p>
                <p>{ele.city}</p>
                <hr />
              </li>
            ))
          }

        </ul>
      </div>

    </div>
  );
}

export default App;
