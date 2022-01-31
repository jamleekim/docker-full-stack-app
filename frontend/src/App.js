import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {


  useEffect(() => {
    // 여기서 데이터베이스에 있는 값을 가져온다.
    axios.get('/api/values')
    .then(reponse => {
      console.log('response', reponse)
      setLists(reponse.data)
    })
  }, [])

  const changeHandler = (event) => {
    setValue(event.currentTarget.value)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    axios.post('/api/value', {value : value})
      .then(response => {
        if(response.data.success){
          console.log('response', response)
          setLists([...lists, response.data])
          setValue("");
        } else {
          alert("데이터베이스에 값을 저장하는 것을 실패했습니다.")
        }
      })
  }

  const [ lists, setLists ] = useState([])
  const [ value, setValue ] = useState("")

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />       
        <div className="container">

          {lists && lists.map((list, index)=> (
            <li key={index}>{list.value}</li>
          ))}

          <form className="example" onSubmit={submitHandler}>
            <input 
              type="text"
              placeholder="입력해주세요.."
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">확인</button>
          </form>

        </div>
      </header>
    </div>
  );
}

export default App;
