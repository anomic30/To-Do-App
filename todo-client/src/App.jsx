import { useState } from 'react';
import Tile from './components/tiles/Tile';
import './App.css'

const App = () => {
  const [list, setList] = useState(Array(9).fill(0));
  return (
    <div className="App">
      <header>
        <p>To-Do List</p>
      </header>

      <section className='add-task-con'> 
        <p>Add a new task in the list</p>
        <div className="inp-con">
          <input type="text" placeholder="Enter the task here" />
          <div className="button">Submit</div>
        </div>
      </section>

      <section className='todos-con'>
        <div className="action-bar">
          <p>Added task in to to-do list</p>
          <p>Filter: Completed</p>
        </div>
        <div className="todos-list">
          {list.map((val, idx) => {
            return <div className='tile-wrapper'>
              <p className='num'>{idx+1}.</p>
              <Tile key={idx}/>
            </div>
          })}
        </div>
      </section>
    </div>
  )
}

export default App
