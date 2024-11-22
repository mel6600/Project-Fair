import React,{useEffect, useState} from 'react'
import { Collapse } from 'react-bootstrap'
import landingimg from '../assets/thh.jfif'
import SERVERURL from '../Services/serverurl'
import { editUserAPI } from '../Services/allapi'
Collapse
const Profile = () => {

  const [preview,setPreview] = useState("")

  const [existingImg, setExistingImg] = useState("")
  const [userDetails, setUserDetails] = useState({
    username: "", email: "", password: "", github: "", linkedin: "", profilePic: ""
  })


    const [open, setOpen] = useState(false);


    useEffect(() => {
      if (sessionStorage.getItem("user")) {
        const existingUserDetails = JSON.parse(sessionStorage.getItem("user"))
        setUserDetails({
          ...userDetails, username: existingUserDetails.username, email: existingUserDetails.email, password: existingUserDetails.password, github: existingUserDetails.github, linkedin: existingUserDetails.linkedin
        })
        setExistingImg(existingUserDetails.profilePic)
      }
    }, [])
  
    useEffect(()=>{
      if (userDetails.profilePic) {
        setPreview(URL.createObjectURL(userDetails.profilePic))
      }else{
        setPreview("")
      }
    },[userDetails.profilePic])


    const handleUpdateProfilepic=async()=>{
      const {username,email,password,github,linkedin,profilePic} = userDetails
      if (github && linkedin) {
        const reqbody = new FormData()
        reqbody.append("username",username)
        reqbody.append("email",email)
        reqbody.append("password",password)
        reqbody.append("github",github)
        reqbody.append("linkedin",linkedin)
        preview?reqbody.append("profilePic",profilePic):reqbody.append("profilePic",existingImg)
        const token = sessionStorage.getItem("token")
        if (token) {
          const reqHeader = {
            "Content-Type":preview?"multipart/form-data":"application/json",
            "Authorization":`Bearer ${token}`
          }
          // api call
          try {
            const result = await editUserAPI(reqbody,reqHeader)
            if (result.status==200) {
              setOpen(!open)
              sessionStorage.setItem("user",JSON.stringify(result.data))
            }else{
              console.log(result);
            }
          } catch (error) {
            console.log(error);
          }
        }  
      }else{
        alert("Please fill the form completely")
      }
    }
      
    

 

  return (
  <>
  <div className="d-flex justify-content-center">
<h3 className='text-warning'>
Profile
</h3>
<button  onClick={() =>setOpen(!open)} className='btn text-warning fw-bolder'><i className="fa-solid fa-chevron-down"></i> </button>

  </div>
  <Collapse in={open}>
        <div  className='row align-items-center justify-content-center shadow rounded 0-3' id="example-collapse-text">
 <label className='text-center mb-2 '  >
    <input type="file" style={{display:'none'}} onChange={e=>setUserDetails({...userDetails,profilePic:e.target.files[0]})} />
{
  existingImg==""?
  <img src={preview?preview:landingimg} alt="" />:
  <img src={preview?preview:`${SERVERURL}/Uploads/${existingImg}`} alt="" />
}
 </label>
 <div className='mb-3'>
<input value={userDetails.github} type="text" onChange={e=>setUserDetails({...userDetails,github:e.target.value})} className='form-control' placeholder='GITHUB URL'/>
 </div>
 <div className='mb-3'>
<input value={userDetails.linkedin} type="text" onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} className='form-control' placeholder='LINKEDIN URL'/>

 </div>
 <div className="d-grid mt-3">
    <button onClick={handleUpdateProfilepic}  className='btn btn-warning'>Update Profile</button>
</div>


        </div>
      </Collapse>
  </>
  )
}

export default Profile




////<img src={landingimg} alt="" />