import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './page/Login'
import SignUp from './page/Signup'
import Landing from './page/Landing'
import Home from './page/Home'
import Profile from './page/Profile'
import {TableWithStripedRows} from './page/History'

function App() {

  return (
   <>
     <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/history" element={<TableWithStripedRows/>} />
        </Routes>
      </Router>
     
   </>
  )
}

export default App
