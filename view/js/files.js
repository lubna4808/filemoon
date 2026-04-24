//const { response } = require("express")

//const { response } = require("express")

axios.defaults.baseURL = SERVER

window.onload = ()=>{
    fetchFiles()
}
const toast = new Notyf({
  position: { x: "center", y: "top" },
})
const logout = ()=>{
localStorage.clear()
location.href = "/login"
}
const toggleDrawer =()=>{
    const drawer = document.getElementById("drawer")
    const rightValue=drawer.style.right

    if(rightValue === "0px"){

drawer.style.right = "-33.33%"
   
}else{
    drawer.style.right = "0px"
}
}

const uploadFile = async (e)=>{
    
    try{
    e.preventDefault()
    const progress = document.getElementById("progress")
     const uploadButton = document.getElementById("upload-btn")
    const form = e.target
    const formdata = new FormData(form) 
   const uploadInput= formdata.get('file')
  
    const options ={

      onUploadProgress:(e)=>{
const loaded = e.loaded
const total = e.total
const percentageValue = Math.floor((loaded * 100)/total)
 const progress = document.getElementById("progress")

 progress.style.width = percentageValue+'%'
 progress.innerHTML = percentageValue+'%'
        }
    }
    uploadButton.disabled =true
    const {data} = await axios.post('/api/file',formdata,options)
   toast.success(`${data.filename}has been uploaded !`)
    fetchFiles()
   progress.style.width = 0
    progress.innerHTML =''
    form.reset()
    toggleDrawer()
}catch(err){
toast.error(err.response ? err.response.data.message:err.message)
}
finally{
      uploadButton.disabled = false
}
}
 const getSize =(size)=>{
const mb =(size/1000)/1000
    return  mb.toFixed(2)
 }
            const fetchFiles = async()=>{
            try{
                const {data} = await axios.get('/api/file')
            const table = document.getElementById("files-table")
            table.innerHTML =""
            for(let file of data){
                   console.log(file)
            const ui =`
            <tr>

                    <td class="py-3 pl-6 capitalize">${file.filename}</td>
                      <td class="capitalize">${file.type}</td>
                        <td>${getSize(file.size)} Mb</td>
                          <td>${moment(file.createdAt).format('DD-MMM-YYYY,hh mm A')}</td>
                          <td>
                            
              <div>
                  <button class="bg-rose-400 px-2 py-1 text-white hover:bg-rose-500 rounded" onclick="deleteFile('${file._id}',this)">
                      <i class="ri-delete-bin-4-line"></i>
                         </button>
                 <button class="bg-green-400 px-2 py-1 text-white hover:bg-green-500 rounded" onclick="downloadFile('${file._id}','${file.filename}',this)">
                    <i class="ri-download-line"></i>
                        </button>
              <button class="bg-amber-400 px-2 py-1 text-white hover:bg-amber-500 rounded">
                        <i class="ri-share-line"></i>
                    </button>     
            </div>
        </td>
    </tr>
`
            table.innerHTML  += ui
    }
            }catch(err){
    toast.error(err.response ? err.response.data.message:err.message)
    }
    }
    const deleteFile = async(id,button)=>{
    
    try{
        button.innerHTML = '<i class="fa fa-spinner fa-spin"></i>'
    button.disabled = true

 await axios.delete(`/api/file/${id}`)
 toast.success("File deleted !")
    }catch(err){
toast.error(err.response ? err.response.data.message:err.message)
    }
    finally{
        button.innerHTML = '<i class ="ri-delete-bin-4-line"></i>'
    button.disabled = false
    }
}

const downloadFile = async (id ,filename,button)=>{
    button.innerHTML = '<i class="fa fa-spinner fa-spin"></i>'
    button.disabled = true
    try{
        const options ={
            responseType:'blob'
        }
     const {data} = await  axios.get(`/api/file/download/${id}`,options)
     
    
     const ext = data.type.split("/").pop()
     const url = URL.createObjectURL(data)
    const a = document.createElement("a")
    a.href = url
    a.download =`${filename}.${ext}`
    a.click()
     a.remove()

    }catch(err){
    
       if(!err.response){
         return toast.error(err.message) 
          
         const error = await(err.message.data).text()
          const {message} = JSON.parse(error)
toast.error(message)

        }
    }
finally{
    button.innerHTML = '<i class="ri-download-line"></i>'
    button.disabled = false
    
}
}