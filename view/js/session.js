axios.defaults.baseURL = SERVER
const getSession = async()=>{
   try{
const session = localStorage.getItem("token")
console.log("data",session)

if(!session){
  return null
}
const payload ={
  token:session
}
const {data}=await axios.post("/api/token/verify", payload)
console.log("data",data)
return data
}

catch(err)
{
return null
}
}

