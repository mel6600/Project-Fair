import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div style={{height:"300px"}} className='container w-100 mt-5 ' >
     <div  className='d-flex justify-content-between'>
        <div style={{width:"400px"}}>
          <h3> Project Fair</h3>
          <p>Designed and built with all the love in the world by the Bootstrap team with the help of our contributors.</p>
          <p>Code licensed MIT, docs CC BY 3.0.
          </p>
          <p>Currently v5.3.2.</p>
        </div>
  <div className=' d-flex justify-content flex-column'>
    <h3>Links</h3>
    <Link style={{textDecoration:"none"}} to={'./'}>Home </Link>
    <Link style={{textDecoration:"none"}} to={'./Home'}>Login</Link>
    <Link style={{textDecoration:"none"}} to={'./History'}>Register</Link>
  </div>
  <div className='d-flex flex-column'>
    <h3>GUIDES</h3>
  <a style={{textDecoration:"none"}} href="https://react.dev/">React</a>
  <a style={{textDecoration:"none"}} href="https://react-bootstrap.github.io/">React Bootstrap</a>
  <a style={{textDecoration:"none"}} href="https://www.w3schools.com/react/react_router.asp">Routing</a>
  </div>
  <div className='d-flex flex-column'>
    <h3>Contact Us</h3>
    <div className='d-flex justify-content-between align-items-center'>
  <input type="text" className='form-control' />
  <button className='btn btn-info ms-2 '><i class="fa-solid fa-arrow-right"></i></button>
    </div>
    <div className='d-flex justify-content-between'>
  <a  href=""><i class="fa-brands fa-instagram"></i></a>
  <a  href=""><i class="fa-brands fa-facebook"></i></a>
  <a  href=""><i class="fa-brands fa-linkedin"></i></a>
  <a  href=""><i class="fa-brands fa-google"></i></a>
    </div>
  
  </div>
     </div>
     <p style={{textAlign:"center"}}>Copyright © 2023 Media Player. Built with React.</p>
    </div>
  )
}

export default Footer
