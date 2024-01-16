import './App.css'
import HomePage from './pages/homePage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>  
     <HomePage/>
      <ToastContainer
      autoClose={3000}/>
    </>
  )
}

export default App
