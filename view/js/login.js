
axios.defaults.baseURL = SERVER
const toast = new Notyf({
  position: { x: "center", y: "top" },
})

const checkSession = async () => {
  const session = await getSession();

  if(session)
  
  location.href ="/dashbord"

}
  checkSession()

const login = async (e) => {
  try {
    e.preventDefault();
    const form = e.target;
    const elements = form.elements;
    const payload = {
      email: elements.email.value,
      password: elements.password.value,
    };
    const { data } = await axios.post(`/api/login`, payload);
    toast.success(data.message);
    //localStorage.setItem("authToken",data.token)
    localStorage.setItem("token", data.token)
    setTimeout(() => {
      location.href ="/dashbord";
       //location.href ="C:\Users\hp\OneDrive\Desktop\filemoon\view\app\dashbord.html"
    }, 2000);
  } catch (err) {
    console.log(err);
    toast.error(err.response ? err.response.data.message : err.message);
  }
};
