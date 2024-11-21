import React, { createContext, useState } from 'react'
export const addResponseContext= createContext("")
export const editResponseContext= createContext("")
function Contextapi({children}) {

    const[addresponse,setaddresponse]=useState("")
    const[editresponse,seteditresponse]=useState("")

  return (
  <>
<addResponseContext.Provider value={{addresponse,setaddresponse}} >
   <editResponseContext.Provider value={{editresponse,seteditresponse}}> {children}</editResponseContext.Provider>
    </addResponseContext.Provider>

  </>
  )
}

export default Contextapi
