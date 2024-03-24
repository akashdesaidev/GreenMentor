import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import NavComp from './Components/NavComp';
import Tasks from './Components/Tasks';
import EditTask from './Components/EditTask';
import CreateTask from './Components/CreateTask';
import { Toaster } from 'sonner';

function App() {

  const token = localStorage.getItem("token") || "";

  return (
    <div className="App">
      <NavComp />
      <Toaster richColors  />
      <Routes>
        <Route path='/create' element={<CreateTask />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={token ? <Tasks /> : <Login />} />
        <Route path='/tasks' element={<Tasks />} />
    
        <Route path="/editTask/:id" element={<EditTask />} />
      </Routes>
    </div>
  );
}

export default App;
