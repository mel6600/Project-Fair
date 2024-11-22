import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import landingimg from '../assets/th.jfif'
import Projectcard from '../Components/Projectcard'
import Card from 'react-bootstrap/Card';
import { homeProjectapi } from '../Services/allapi';

const Home = () => {
    const Navigate=useNavigate( )
const[homeProjects,sethomeProjects]=useState([])
console.log(homeProjects);
useEffect(()=>{
getHomeProjects()
},[])

const getHomeProjects=async()=>{
try {
    const result=await homeProjectapi()
    console.log(result);
    if(result.status==200){
        sethomeProjects(result.data)
    }
    
} catch (error) {
    console.log(error);
    
}
}

const handleProject=()=>{
    if(sessionStorage.getItem("token")){
        Navigate('/projects')
    console.log(homeProjects) 
    }
    else{
        alert('Please login to gain full access to all our projects')
    }
}

  return (
  <>
  <div style={{height:'100vh'}} className=' d-flex justify-content-center align-items-center rounded-shadow w-100'>
<div className='container'>
    <div className='container d-flex align-items-center '>
        <div className="col-lg-6">
    <h1 style={{fontSize:'80px'}}>Project Fair</h1>
    <p style={{fontSize:'20px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam itaque voluptatem in laboriosam accusamus, similique quaerat, molestiae eligendi nemo aliquid rerum voluptatibus unde harum quod dolore alias dolorum non consequuntur.</p>

    {
        sessionStorage.getItem("token")?
            <Link className='btn btn-primary' to='/dashboard'>Go to dashboard</Link>
:
    <Link className='btn btn-primary' to='/login'>Get Ready to Explore</Link>
}
        </div>
        <div className="col-lg-6">
    <img style={{height:'100%', width:'100%'}} className='img-fluid' src={landingimg} alt="landing" />
        </div>
    </div>
</div>
  </div>
  <div className='text-center mt-5'>
    <h1>EXPLORE OUR PROJECTS</h1>
    <marquee >
        <div className='d-flex mb-5'>
            {
                homeProjects?.length>0 &&
                homeProjects?.map(project=>(
                    <div key={project?.id} className='me-5'>
                    <Projectcard displayData={project}/>
                </div>
                ))
            }
          

        </div>
    </marquee>
<button onClick={handleProject} className='btn btn-link mt-3'>Click here to view more Projects</button>
  </div>
  <div className='d-flex align-items-center mt-5 flex-column'>
    <h1>Our Testimonials</h1>
<div className='d-flex align-items-center justify-content-evenly mt-5 w-100' >
<Card style={{ width: '18rem' }}>
 
      <Card.Body>
        <Card.Title className='d-flex align-items-center justify-content-evenly flex-column'>
            <img height={'200px'} width={'175px'} src="https://th.bing.com/th?id=OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="" />
            <span className='mt-2'>Max Miller</span>
        </Card.Title>
   
<div className='d-flex justify-content-center'>
    <div className='fa-solid fa-star text-danger'></div>
    <div className='fa-solid fa-star text-danger'></div>
    <div className='fa-solid fa-star text-danger'></div>
    <div className='fa-solid fa-star text-danger'></div>
    <div className='fa-solid fa-star text-danger'></div>
</div>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
 
 <Card.Body>
   <Card.Title className='d-flex align-items-center justify-content-evenly flex-column'>
       <img height={'200px'} width={'175px'} src="https://th.bing.com/th?id=OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="" />
       <span className='mt-2'>Max Miller</span>
   </Card.Title>

<div className='d-flex justify-content-center'>
<div className='fa-solid fa-star text-danger'></div>
<div className='fa-solid fa-star text-danger'></div>
<div className='fa-solid fa-star text-danger'></div>
<div className='fa-solid fa-star text-danger'></div>
<div className='fa-solid fa-star text-danger'></div>
</div>
 </Card.Body>
</Card>
<Card style={{ width: '18rem' }}>
 
      <Card.Body>
        <Card.Title className='d-flex align-items-center justify-content-evenly flex-column'>
            <img height={'200px'} width={'175px'} src="https://th.bing.com/th?id=OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="" />
            <span className='mt-2'>Max Miller</span>
        </Card.Title>
   
<div className='d-flex justify-content-center'>
    <div className='fa-solid fa-star text-danger'></div>
    <div className='fa-solid fa-star text-danger'></div>
    <div className='fa-solid fa-star text-danger'></div>
    <div className='fa-solid fa-star text-danger'></div>
    <div className='fa-solid fa-star text-danger'></div>
</div>
      </Card.Body>
    </Card>
</div>

  </div>
  </>
  )
}

export default Home
