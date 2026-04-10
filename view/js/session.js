const getSession = ()=>{
const session = localStorage.getItem("authToken")

if(!session){
  location.href ="../index.html"
  return
}
if(session !=="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1Ym5hQGdtYWlsLmNvbSIsIm1vYmlsZSI6IjEyMzQ1NjY2NCIsImZ1bGxuYW1lIjoibHVibmEiLCJpZCI6IjY5ZDFlMTI1YzgwODIyZjY2NDc1ZTE5ZiIsImlhdCI6MTc3NTc0ODgwNiwiZXhwIjoxNzc2MzUzNjA2fQ.Trn32kWltV_MR273FxWdH38lYzhJfhM9umMm8cmOpPs"){
location.href ="../index.html"
  return

}
alert("success")
}
getSession ()
