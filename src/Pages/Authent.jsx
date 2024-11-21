import React, { useContext, useState } from 'react'
import landingimg from '../assets/download.jfif'
import { Form, FloatingLabel,Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { registerApi,loginApi } from '../../Services/allapi'
import { tokenAuthContext } from '../Components/Context/Authcontext'





const Authent = ({ insideRegister }) => {

    const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

const Navigate=useNavigate( )
const[isLoggedin,setisLoggedin]=useState(false)



    const[newDetails,setnewDetails]=useState({
        username:"",
        email:"",
        password:""
        
        })


        // console.log(newDetails);


const handleRegister=async(e)=>{

e.preventDefault()
if(newDetails.username && newDetails.email && newDetails.password){
    try {
        const result= await registerApi(newDetails)
        console.log(result);
        if(result.status==200){
            alert(`Welcome${result?.data?.username}`)
            setnewDetails({username:"",email:"",password:""})
            Navigate('/login')
        }
        else {
            if(result.response.status==406){
                alert(result.response.data)
                setnewDetails({username:"",email:"",password:""})

            }
        }
     } catch (error) {
         console.log(error);
         
     }
}
else{
    alert('fill the form completely')
}

}


const handleLogin=async(e)=>{
    e.preventDefault()
    if(newDetails.email && newDetails.password){
    try {
        const result= await  loginApi(newDetails)
console.log(result);
if(result.status==200){
setisLoggedin(true)
    sessionStorage.setItem("user",JSON.stringify(result.data.user))
    sessionStorage.setItem("token",(result.data.token))
    setIsAuthorised(true)

setTimeout(()=>{
setisLoggedin(false)
},1700)
    setTimeout(() => {
        // alert(`Welcome ${result.data.user.username}`)
       Navigate('/') 
    }, 2000);

}
else{
    if(result.status==404){
   
        
        alert(`${result.response.data}`)
    }
}

    }
     catch (error) {
        console.log(error);
        
    }  
    }
    else{
        alert("fill the form completely")
    }
}





    return (
        <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
            <div className='container w-75'>
                <div className="card shadow p-2">
                    <div className="row align-items-center">
                        <div className="col-lg">
                            <img className='w-100' src={landingimg} alt="login" />
                        </div>

                        <div className="col-lg">
                            <h1 className='fw-bolder mt-2'>
                                Project Fair
                    ''        </h1>
                            <h5 className='fw-bolder mt-2'>
                                Sign {insideRegister ? "Up" : "In"}
                            </h5>
                            <Form>
                                {
insideRegister &&
<FloatingLabel
controlId="floatingInputname"
label="Username"
className="mb-3"
>
<Form.Control type="text" value={newDetails.username} onChange={e=>setnewDetails({...newDetails,username:e.target.value})} placeholder="username" />
</FloatingLabel>
                                }
                     
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Email"
                                    className="mb-3"
                                >
                                    <Form.Control type="email" value={newDetails.email} onChange={e=>setnewDetails({...newDetails,email:e.target.value})} placeholder="name@example.com" />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password">
                                    <Form.Control type="password" value={newDetails.password} onChange={e=>setnewDetails({...newDetails,password:e.target.value})} placeholder="Password" />
                                </FloatingLabel>  
                          
                            {
                                insideRegister?
                           <div className='mt-3'>
                                 <button onClick={handleRegister} className='btn btn-secondary mb-2'>Register</button>
                                 <p>already have an account?Click here to <Link to={'/login'}>Login</Link></p>
                                    
                           </div>
                           :
                           <div className='mt-3'>
                            <button onClick={handleLogin} className='btn btn-secondary mb-2'> { isLoggedin&& <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>} Login</button>
                            
                            <p>New User? Click here to  <Link to={'/register'}>Register</Link></p>
                           </div>
                            }
                              </Form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Authent
