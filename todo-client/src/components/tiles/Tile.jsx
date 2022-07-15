import React from 'react'
import './Tile.css'
import checkmark from '../../assets/checkmark.svg'

const Tile = ({todo}) => {
  return (
    <div className='tile-con completed'>
      <img src={checkmark} alt="" className='checkmark'/>
      <div className='tile-header'>
        <p>Task 1</p>
      </div>

      <div className='tile-actions'>
        <div className="button remove">Mark as completed</div>
        <p>Delete</p>
      </div>

    </div>
  )
}

export default Tile