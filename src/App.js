import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from './Components/Login';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import Register from './Components/Register';

function App() {
  return (
    <Router>
       <ToastContainer />
      <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      </Routes>
      
    </Router>
  );
}

export default App;
