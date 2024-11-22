import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import Projectcard from '../Components/Projectcard'
import { allProjectapi } from '../Services/allapi'

const Projects = () => {
const[search,setsearch]=useState("")
const [allProjects,setallProjects]=useState([])
console.log(allProjects);

useEffect(()=>{
    getAllprojects()
},[search])

const getAllprojects=async()=>{
    const token=sessionStorage.getItem('token')
    if(token){
        const reqHeader={
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
        try {
            const result=await allProjectapi(search,reqHeader)
            console.log(result);
            if(result.status==200){
                setallProjects(result.data)
            }
            
        } catch (error) {
            console.log(error);
            
            
        }
    }
}


  return (
    <>
<Header/>
<div className='mt-5 container-fluid' >
    <div className='d-flex justify-content-between'>
<h1>
    All Projects
</h1>
<input onChange={e=>setsearch(e.target.value)} type="text" name="" className='w-25 from-control rounded' id="" placeholder='Search Projects' />
    </div>
<Row className='mt-5'>
    {
        allProjects?.length>0 ?
        allProjects?.map(project=>(
            <Col key={project?.id} className='mb-3'>
    <Projectcard displayData={project}/>
    </Col>

        ))
        :
<div>Project not Found</div>
    }
   

</Row>
</div>

    </>
  )
}

export default Projects
