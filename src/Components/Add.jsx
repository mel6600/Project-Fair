import React, { useContext, useEffect, useState } from 'react';
import {Modal,Button} from 'react-bootstrap';
import landingimg from '../assets/OIP.jfif'
import { addProjectapi } from '../../Services/allapi';
import { addResponseContext } from './Context/Contextapi';


const Add = () => {


 const {addresponse,setaddresponse}=useContext(addResponseContext)

 const [imagefilestatus,setimagefilestatus]=useState(false)


const [preview,setpreview]=useState(landingimg)
    const [show, setShow] = useState(false);

    const handleClose = () =>{ 
    setadditems({
      title:"",
      language:"",
      gitHub:"",
      URL:"",
      overview:"",
      projectImage:""  //landingimg
  
    })
      setShow(false);

    }

    const handleShow = () => setShow(true);

    const [additems,setadditems]=useState({
      title:"",
      language:"",
      gitHub:"",
      URL:"",
      overview:"",
      projectImage:landingimg
  
    })
  
    console.log(additems);
console.log(additems.projectImage);

 useEffect(()=>{
  if(additems.projectImage.type=="image/jpeg"||additems.projectImage.type=="image/png"||additems.projectImage.type=="image/jpg"){
    setimagefilestatus(true)
    setpreview(URL.createObjectURL(additems.projectImage))
  }
        else{
          setimagefilestatus(false)
          setadditems({...additems,projectImage:""})//landingimg
    
        }
 },[additems.projectImage])

const handleadd=async()=>{
  const {title,language,gitHub,URL,overview,projectImage}= additems
  if(additems.title && additems.language && additems.gitHub && additems.URL && additems.overview && additems.projectImage)
   {
    const reqBody= new FormData()
    reqBody.append("title",title)
    reqBody.append("language",language)
    reqBody.append("gitHub",gitHub)
    reqBody.append("URL",URL)
    reqBody.append("overview",overview)
    reqBody.append("projectImage",projectImage)
   
    const token=sessionStorage.getItem("token")


    if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`


      }
      try {
        const result= await addProjectapi(reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          handleClose()
        setaddresponse(result)
        }
        else{
          alert(`${result.response.data}`)
        }
        
      } catch (error) {
        console.log(error);
        
      }
    }
  }
  else{
    alert('fill the form completely')
  }
}





  return (
<>
<button onClick={handleShow} className='btn btn-primary'>
<i className="fa-solid fa-plus"> </i>New Project
</button>


      <Modal size='lg' centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Project Detail!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="row align-items-center">
<div className="col-lg-4">
  

<label > <input type="file"  onChange={e=>setadditems({...additems,projectImage:e.target.files[0]})}  style={{display:'none'}} /><img  style={{height:'200px'}} className='img-fluid' src={preview} alt=''></img></label>

{
  !imagefilestatus&&
  <div className='text-warning'>
  upload the following file types(jpeg,png,jpg)
  </div>
}
</div>
<div className="col-lg-8">
<div className="mb-2">
    <input type="text" value={additems.title} onChange={e=>setadditems({...additems,title:e.target.value})} className='form-control' placeholder='project title' />
</div>
<div className="mb-2">
    <input type="text" value={additems.language} onChange={e=>setadditems({...additems,language:e.target.value})} className='form-control' placeholder=' languages used in ptoject' />
</div>
<div className="mb-2">
    <input type="text" value={additems.gitHub} onChange={e=>setadditems({...additems,gitHub:e.target.value})} className='form-control' placeholder='Project Github Link' />
</div>
<div className="mb-2">
    <input type="text" value={additems.URL} onChange={e=>setadditems({...additems,URL:e.target.value})} className='form-control' placeholder='Project Website Link' />
</div>
</div>
         </div>
         <input type="text" value={additems.overview} onChange={e=>setadditems({...additems,overview:e.target.value})} className='form-control' placeholder='Project Overview' />
         <div>

         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleadd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>

</>
  )
}

export default Add
