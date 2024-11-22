import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { removeProjectapi, userProjectapi } from '../Services/allapi'
import { addResponseContext, editResponseContext } from '../Context/Contextapi'

const View = () => {


  const {editresponse,seteditresponse}=useContext(editResponseContext)


  const {addresponse,setaddresponse}=useContext(addResponseContext)


  const handleDeleteproject=async(pid)=>{
    const token=sessionStorage.getItem("token")
    if(token){
   const   reqHeader={ 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result=await removeProjectapi(pid,reqHeader)
        if (result.status==200){
          getuserprojects()
        }
        else{
          console.log(result);
          
        }
      } catch (error) {
        console.log(error);
        
      }
    }
  }


  const [userProjects,setuserProjects]=useState([])
console.log(userProjects);

useEffect(()=>{
    getuserprojects()
},[addresponse,editresponse])

const getuserprojects=async()=>{
    const token=sessionStorage.getItem('token')
    if(token){
        const reqHeader={
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
        try {
            const result=await userProjectapi(reqHeader)
            console.log(result);
            if(result.status==200){
                setuserProjects(result.data)
            }
            
        } catch (error) {
            console.log(error);
            
            
        }
    }
}



  return (
   <>
   <div className="d-flex justify-content-between mt-2">
    <h2 className='text-warning'>All Projects</h2>
    <div>
        <Add/>
    </div>
   </div>
 <div className='mt-2'>

{
userProjects?.length>0 ?
userProjects.map(project=>(
  <div key={project?.id} className="border rounded p-2 d-flex justify-content-between mb-3">
  <h3>
    {project?.title}
  </h3>
  <div className="d-flex align-items-center">
      <div>
          <Edit project={project}/>

      </div>
      <div className='btn'>
<a href={project?.gitHub} target='_blank'> <i className='fa-brands fa-github'></i></a>
      </div>
      <button onClick={()=>handleDeleteproject(project?._id)} className='btn text-danger'> <i className='fa-solid fa-trash'></i></button>
  </div>
 </div>
))
:
<div>NO projects uploaded Yet</div>


}
      
      
 </div>
   </>
  )
}

export default View
