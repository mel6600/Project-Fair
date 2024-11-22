
import CommonApi from "./commonapi";
import SERVERURL from "./serverurl";


export const registerApi= async(reqbody)=>{
return await CommonApi("POST",`${SERVERURL}/register`,reqbody)
}


export const loginApi= async(reqbody)=>{
    return await CommonApi("POST",`${SERVERURL}/login`,reqbody)
    }

    export const addProjectapi=async(reqbody,reqHeader)=>{
        return await CommonApi("POST",`${SERVERURL}/dashboard/add`,reqbody,reqHeader)
    }

    
    export const homeProjectapi=async()=>{
        return await CommonApi("GET",`${SERVERURL}/get-home-projects`,"")
    }

      
    export const userProjectapi=async(reqHeader)=>{
        return await CommonApi("GET",`${SERVERURL}/user-projects`,"",reqHeader)
    }

    export const allProjectapi=async(search,reqHeader)=>{
        return await CommonApi("GET",`${SERVERURL}/all-projects?search=${search}`,"",reqHeader)
    }


    export const editProjectapi=async(pid,reqBody,reqHeader)=>{
        return await CommonApi("PUT",`${SERVERURL}/project/${pid}/edit`,reqBody,reqHeader)
    }

    export const removeProjectapi=async(pid,reqHeader)=>{
        return await CommonApi("DELETE",`${SERVERURL}/project/${pid}/remove`,{},reqHeader)
    }

    export const editUserAPI = async (reqBody,reqHeader)=>{
        return await CommonApi("PUT",`${SERVERURL}/user/edit`,reqBody,reqHeader)
    }

    

    

  

 