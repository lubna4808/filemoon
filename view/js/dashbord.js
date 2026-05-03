const logout = ()=>{
localStorage.clear()
location.href = "/login"
}

window.onload = () =>{
   showUserDetails() 
}

const showUserDetails = async()=>{
const session = await getSession()
console.log("session",session)
const fullname = document.getElementById("fullname")
const email = document.getElementById("email")
fullname.innerHTML = session.fullname||"N/a"
email.innerHTML = session.email||"N/a"
}