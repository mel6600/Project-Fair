import React, { useState,useEffect, useContext } from 'react';
import {Modal,Button} from 'react-bootstrap';
import landingimg from '../assets/OIP.jfif'
import SERVERURL from '../../Services/serverurl';
import { editProjectapi } from '../../Services/allapi';
import { editResponseContext } from './Context/Contextapi';




const Edit = ({project}) => {

  const {editresponse,seteditresponse}=useContext(editResponseContext)


const handleUpdate=async()=>{
  const {id,title,language,gitHub,URL,overview,projectImage}= additems

  if(title && language && gitHub && URL && overview  ){
    const reqBody= new FormData()
    reqBody.append("title",title)
    reqBody.append("language",language)
    reqBody.append("gitHub",gitHub)
    reqBody.append("URL",URL)
    reqBody.append("overview",overview)
    preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
    const token=sessionStorage.getItem("token")
  

    if(token){
      const reqHeader={
        "Content-Type":preview?"multipart/form-data":"application/json",
        "Authorization":`Bearer ${token}`


      }
      try {
        const result= await editProjectapi(id,reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          handleClose()
          seteditresponse(result)
        }
        else{
          console.log(result.response);
          
        }
        
      } catch (error) {
        console.log(error);
        
      }

  }
}
  else{
    alert('please fill the form completely')
  }
}

  const [imagefilestatus,setimagefilestatus]=useState(true)


  const [additems,setadditems]=useState({
    id:project?._id,
    title:project?.title,
    language:project?.language,
    gitHub:project?.gitHub,
    URL:project?.URL,
    overview:project?.overview,
    projectImage:""

  })


  const [preview,setpreview]=useState("")

    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false)
      setadditems( {
        id:project?._id,
        title:project?.title,
        language:project?.language,
        gitHub:project?.gitHub,
        URL:project?.URL,
        overview:project?.overview,
        projectImage:""
      }
    )
    };
    const handleShow = () => {
      setShow(true);
      setadditems( {
        id:project?._id,
        title:project?.title,
        language:project?.language,
        gitHub:project?.gitHub,
        URL:project?.URL,
        overview:project?.overview,
        projectImage:""
      }
    )
    }

    useEffect(()=>{
      if(additems.projectImage.type=="image/jpeg"||additems.projectImage.type=="image/png"||additems.projectImage.type=="image/jpg"){
        setpreview(URL.createObjectURL(additems.projectImage))
        setimagefilestatus(true)
      }else{
        setimagefilestatus(false)
        setpreview("")
     setadditems({...additems,projectImage:''})
      }
    },[additems.projectImage])



  return (
   <>
   <button onClick={handleShow} className='btn'><i className="fa-solid fa-edit"></i></button>
   <Modal size='lg' centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Project Detail!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="row align-items-center">
<div className="col-lg-4">
  

<label > <input type="file"  onChange={e=>setadditems({...additems,projectImage:e.target.files[0]})}  style={{display:'none'}} /><img  style={{height:'200px'}} className='img-fluid' src={preview?preview:`${SERVERURL}/Uploads/${project?.projectImage}`} alt=''></img></label>

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
          <Button onClick={handleUpdate} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>

   </>

   
  )
}

export default Edit
