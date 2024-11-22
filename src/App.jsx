
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Projects from './Pages/Projects'
import Dashboard from './Pages/Dashboard'
import Authent from './Pages/Authent'
import Footer from './Components/Footer'
import { useContext } from 'react'
import { tokenAuthContext } from './Context/Authcontext'

function App() {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

  return (
    <>
      

<Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/login' element={<Authent/>}/>
  <Route path='/register' element={<Authent insideRegister={true}/>}/>
        <Route path='/projects' element={isAuthorised ? <Projects/>:<Navigate to={'/login'}/>}/>
        <Route path='/dashboard' element={isAuthorised?<Dashboard/>:<Navigate to={'/login'}/>}/>

</Routes>
<Footer/>
    </>
  )
}

export default App
