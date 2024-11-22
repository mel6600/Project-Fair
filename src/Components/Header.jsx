import React, { useContext } from 'react'
import { Navbar,Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../Context/Authcontext'

const Header = ({insideDashboard}) => {


  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

const Navigate=useNavigate()
const handleLogout=()=>{
  sessionStorage.clear()
  setIsAuthorised(false)

  Navigate('/')
}


  return (
 <>
  <Navbar style={{zIndex:'10'}} className=" bg-danger position-fixed w-100 top-0 border-rounded">
        <Container>
          <Navbar.Brand >
        <Link className='fw-bolder' to={'/'} style={{textDecoration:'none', color:'white'}}> 
        <i className='fa-brands fa-docker'></i>
        Project Fair
        </Link>
          </Navbar.Brand>
          {
      insideDashboard &&
      <div className='ms-auto'>
        <button onClick={handleLogout} style={{textDecoration:'none'}} className='btn btn-link'>Logout <i class="fa fa-sign-out" aria-hidden="true"></i>
        </button>
      </div>
}
        </Container>
   
      </Navbar>
  
 </>
  )
}

export default Header
