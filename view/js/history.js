axios.defaults.baseURL = SERVER
window.onload = ()=>{
    fetchHistory()
}
const getToken = () => {
    const options = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
     return options
}
const toast = new Notyf({
    position: { x: "center", y: "top" },
})

const logout = ()=>{
localStorage.clear()
location.href = "/login"
}
 const fetchHistory = async()=>{
   try{
const {data} = await axios.get("api/share",getToken())
console.log(data)
const table= document.getElementById("table")
const notFoundUi = `
<div class="p-16 text-center">
  <h1 class="text-gray-500">Oops! You have not shared any file yet</h1>
</div>
`
if(data.length === 0){

    table.innerHTML = notFoundUi
    return
}
for(let item of data){
console.log(item)
const ui = `
<tr class="text-gray-500 border-b border-gray-100">

                  <td class="py-3 pl-6">${item.file?.filename}</td>

                      <td>${item.receiverEmail}</td>
                          <td>${moment(item.createdAt).format('DD MMM YYYY')}</td>
                      
     </tr>   
`
table.innerHTML += ui
}
   }catch(err){
toast.error(err.response ? err.response.data.message : err.message)
   }
 }