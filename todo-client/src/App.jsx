import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Todo from './pages/Todo';
import './App.css'

const App = () => {

  //generating random user id
  useEffect(() => {
    if (!window.localStorage.getItem('userId')) {
      window.localStorage.setItem('userId', uuidv4());
    }
  }, [])

  return (
    <div className="App">
      <Todo/>
    </div>
  )
}

export default App
