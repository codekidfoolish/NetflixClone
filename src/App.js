import './App.scss';
import { BrowserRouter as Router, Routes, Route}  from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
