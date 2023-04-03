import './App.css';
import BasicForm from './components/BasicForm';
import { useState } from 'react';
import ImageToText from './components/ImageToText';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormicForm from './components/FormicForm';

function App() {

  const [data, setData] = useState([])

  const handleData = (data) => {
    setData(data)
  }


  return (
    <div className="App">
      <ToastContainer />
      <h1><u>Happy Club</u></h1>
      <div className="top_div">
        <div className="left_div">
          <hr />
          <h1>Welcome to HappyClub</h1>
          <hr /> <br />
          <BasicForm handleData={handleData} />
        </div>
        <div className="mid_div">
          <hr />
          <h2>Club Member's</h2>
          <hr />
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

        <div className="right_div">
          <ImageToText />
        </div>
      </div>

      <hr />
      <div className="bottom_div">
            <FormicForm/>
      </div>

    </div>
  );
}

export default App;
