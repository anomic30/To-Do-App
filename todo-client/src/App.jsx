import './App.css'

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>To-Do List</h1>
      </header>

      <section className='add-task-con'> 
        <p>Add a new task in the list</p>
        <div className="inp-con">
          <input type="text" placeholder="Enter the task here" />
          <button>Submit</button>
        </div>
      </section>
    </div>
  )
}

export default App
