import axios from "axios"

const CommonApi=async(httpMthod,url,body,reqHeader)=> {
const reqConfig={
    method:httpMthod,
    url,
    data:body,
    headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
}

return await axios(reqConfig).then(res=>{
    return res
}).catch(err=>{
    return err
})
}

export default CommonApi