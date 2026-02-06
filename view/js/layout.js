const toggleSidebar = ()=>{
    const sidebar = document.getElementById("sidebar")
        const section = document.getElementById("section")
    const dafaultWidth = sidebar.style.width
    if(dafaultWidth  === "0px"){

        sidebar.style.width ="250px"
        section.style.marginLeft ="250px"

    }else{

        sidebar.style.width ="0px"
         section.style.marginLeft ="0px"
    }

}