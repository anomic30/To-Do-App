import { useState, useEffect, useRef } from 'react';
import Tile from '../components/tiles/Tile';
import Axios from 'axios';
import './Todo.css'

const Todo = () => {
    const inputRef = useRef();
    const [title, setTitle] = useState('');
    const [list, setList] = useState([]);
    const [filter, setFilter] = useState('all');

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
            await Axios.post('https://revirtspace.herokuapp.com/api/todos', payload).then(res => {
                setList([...list, res.data.todo]);
                setTitle("");
                inputRef.current.value = "";
                console.log(res);
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getTasks = async () => {
        try {
            await Axios.get(`https://revirtspace.herokuapp.com/api/todos/${window.localStorage.getItem('userId')}`).then(res => {
                setList(res.data);
                console.log(res);
            })
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTask = async (id) => {
        try {
            await Axios.delete(`https://revirtspace.herokuapp.com/api/todos/${id}`).then(res => {
                setList(list.filter(item => item._id !== id));
                console.log(res);
            })
        } catch (error) {
            console.log(error)
        }
    }

    const toggleCompletion = async (id, completed) => {
        try {
            await Axios.patch(`https://revirtspace.herokuapp.com/api/todos/${id}`, { completed: !completed }).then(res => {
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
                    <input type="text" placeholder="Enter the task here"
                        ref={inputRef}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="button" onClick={addTask}>Submit</div>
                </div>
            </section>

            <section className='todos-con'>
                <div className="action-bar">
                    <p>Added task in to to-do list</p>
                    <div className="filter-con">
                        <p>Filter: </p>
                        <select defaultValue="all" onChange={(e)=>setFilter(e.target.value)}>
                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="incomplete">Incomplete</option>
                        </select>
                    </div>
                </div>
                <div className="todos-list">
                    {list.filter(item => {
                        if (filter === 'all') {
                            return true;
                        } else if (filter === 'completed') {
                            return item.completed;
                        } else if (filter === 'incomplete') {
                            return !item.completed;
                        }
                    }).map((val, idx) => {
                        return <div className='tile-wrapper' key={idx}>
                            <p className='num'>{idx + 1}.</p>
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
