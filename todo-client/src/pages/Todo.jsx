import { useState, useEffect } from 'react';
import Tile from '../components/tiles/Tile';
import Axios from 'axios';
import './Todo.css'

const Todo = () => {
  const [title, setTitle] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    getTasks();
  }, [])

  const addTask = async () => {
    if (title.length < 0) {
      return;
    }
    try {
      const payload = {
        title,
        userId: window.localStorage.getItem('userId')
      }
      await Axios.post('http://localhost:8080/api/todos', payload).then(res => {
        setList([...list, res.data.todo]);
        setTitle("");
        console.log(res);
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getTasks = async () => {
    try {
      await Axios.get(`http://localhost:8080/api/todos/${window.localStorage.getItem('userId')}`).then(res => {
        setList(res.data);
        console.log(res);
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async (id) => {
    try {
      await Axios.delete(`http://localhost:8080/api/todos/${id}`).then(res => {
        setList(list.filter(item => item._id !== id));
        console.log(res);
      })
    } catch (error) {
      console.log(error)
    }
  }

  const toggleCompletion = async (id, completed) => {
    try {
      await Axios.patch(`http://localhost:8080/api/todos/${id}`, {completed: !completed}).then(res => {
        setList(list.map(item => {
          if (item._id === id) {
            item.completed = !item.completed;
          }
          return item;
        }))
        console.log(res);
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="Todo">
      <header>
        <p>To-Do List</p>
      </header>

      <section className='add-task-con'> 
        <p>Add a new task in the list</p>
        <div className="inp-con">
          <input type="text" placeholder="Enter the task here" onChange={(e)=>setTitle(e.target.value)}/>
          <div className="button" onClick={addTask}>Submit</div>
        </div>
      </section>

      <section className='todos-con'>
        <div className="action-bar">
          <p>Added task in to to-do list</p>
          <p>Filter: Completed</p>
        </div>
        <div className="todos-list">
          {list.map((val, idx) => {
            return <div className='tile-wrapper' key={idx}>
              <p className='num'>{idx+1}.</p>
              <Tile
                todo={val}
                deleteTask={deleteTask}
                toggleCompletion={toggleCompletion}
              />
            </div>
          })}
        </div>
      </section>
    </div>
  )
}

export default Todo
