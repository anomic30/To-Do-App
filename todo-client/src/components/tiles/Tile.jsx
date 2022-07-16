import React from 'react'
import './Tile.css'
import checkmark from '../../assets/checkmark.svg'

const Tile = ({ todo, deleteTask, toggleCompletion }) => {
  return (
    <div className={`tile-con ${todo.completed? 'completed': null}`}>
      <img src={checkmark} alt="" className='checkmark' />
      <div className='tile-header'>
        <p>{todo.title}</p>
      </div>

      <div className='tile-actions'>
        <div className={`button ${todo.completed? 'remove': null}`}
          onClick={() => { toggleCompletion(todo._id, todo.completed) }}
        >
          {todo.completed? "Mark as incomplete":"Mark as completed"}
        </div>
        <div className="delete-btn"
          onClick={() => { deleteTask(todo._id) }}
        >
          Delete
        </div>
      </div>

    </div>
  )
}

export default Tile